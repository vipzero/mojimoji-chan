import { reducerWithInitialState } from 'typescript-fsa-reducers'
import _ from 'lodash'
import { SpeechConfig } from '../../types'
import * as actions from './actions'

export type State = {
	url: string
	speechConfig: SpeechConfig
}

const initialState: State = {
	url: '',
	speechConfig: {
		volume: 0.5,
		rate: 1.0,
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
