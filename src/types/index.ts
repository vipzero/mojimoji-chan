import { Action, AnyAction } from 'redux'
import { ThunkAction as _ThunkAction } from 'redux-thunk'
import { State as _State } from './state'

export type State = _State

export type GetState = () => State

export type ThunkAction = _ThunkAction<
	void | Promise<void>,
	State,
	undefined,
	AnyAction | Action<unknown>
>

export type User = {
	id: string
	name: string
	color: string
	// wachois: string
	// ids: string[]
	// posts: Post[]
}

export type SpeechConfig = {
	volume: number
	rate: number
}
