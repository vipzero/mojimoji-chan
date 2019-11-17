import { applyMiddleware, compose, createStore } from 'redux'
import { createMigrate, persistReducer, persistStore } from 'redux-persist'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { AnyAction } from 'typescript-fsa'
import reducer from './reducer'
import { State } from './types'

const migrations = {}

type StoreKeys = keyof State
const whitelist: StoreKeys[] = ['Setting']

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist,
	migrate: createMigrate(migrations, { debug: false }),
}

export default () => {
	const middleware = [thunk as ThunkMiddleware<State, AnyAction>]
	const enhancers = []

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const devtool = (window as any).__REDUX_DEVTOOLS_EXTENSION__

	if (process.env.NODE_ENV === 'development') {
		if (typeof devtool === 'function') {
			// @ts-ignore
			enhancers.push(devtool())
		}
	}

	const composer = compose(applyMiddleware(...middleware), ...enhancers)

	const persistedReducer = persistReducer(persistConfig, reducer)
	// @ts-ignore
	const store = createStore(persistedReducer, composer)
	const persistor = persistStore(store)

	return { store, persistor }
}
