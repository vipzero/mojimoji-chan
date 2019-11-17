import { createGlobalState } from 'react-hooks-global-state'

type GlobalState = {
	tab: number
	isWatch: boolean
}

const initialState: GlobalState = {
	tab: 0,
	isWatch: false,
}

export const { GlobalStateProvider, useGlobalState } = createGlobalState<
	GlobalState
>(initialState)
