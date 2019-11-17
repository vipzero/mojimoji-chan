import { combineReducers } from 'redux'
import { State } from './types'
import Setting from './store/Setting/reducer'

export default combineReducers<State>({
	Setting,
})
