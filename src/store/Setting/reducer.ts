import { reducerWithInitialState } from 'typescript-fsa-reducers'
import _ from 'lodash'
import * as actions from './actions'

export type SpeechConfig = {
	volume: number
	rate: number
}

export type State = {
	url: string
	tab: number
	isWatch: boolean
	speechConfig: {
		volume: number
		rate: number
	}
}

const initialState: State = {
	url: '',
	tab: 0,
	isWatch: false,
	speechConfig: {
		volume: 0.5,
		rate: 5,
	},
}

type RecursivePartial<T> = { [Key in keyof T]?: RecursivePartial<T[Key]> }
const merge = (state: State, partial: RecursivePartial<State>) =>
	_.merge({}, state, partial)

export default reducerWithInitialState<State>(initialState)
	.case(actions.setVolume, (state, volume) =>
		merge(state, { speechConfig: { volume } })
	)
	.case(actions.setRate, (state, rate) =>
		merge(state, { speechConfig: { rate } })
	)
	.case(actions.setUrl, (state, url) => merge(state, { url }))
	.case(actions.setTab, (state, tab) => merge(state, { tab }))
	.case(actions.startWatch, (state, rate) => merge(state, { isWatch: true }))
	.case(actions.endWatch, (state, rate) => merge(state, { isWatch: false }))
