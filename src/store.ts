import { createStore } from 'react-hooks-global-state'
import _ from 'lodash'

const persistenceKey = 'mojimoji_store'

export type SpeechConfig = {
	volume: number
	rate: number
}

export type State = {
	url: string
	activeTab: number
	isWatch: boolean
	speechConfig: {
		volume: number
		rate: number
	}
}

const firstState: State = {
	url: '',
	activeTab: 0,
	isWatch: false,
	speechConfig: {
		volume: 0.5,
		rate: 5,
	},
}
const initialStringFromStorage = localStorage.getItem(persistenceKey)
const initialState = _.merge(
	firstState,
	initialStringFromStorage === null ? {} : JSON.parse(initialStringFromStorage)
)

const persistKeys = ['url', 'speechConfig']
const persistentReducer = state => {
	localStorage.setItem(
		persistenceKey,
		JSON.stringify(_.pick(state, persistKeys))
	)
	return state
}

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
	persistentReducer,
	initialState
)
