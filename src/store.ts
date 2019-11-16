import { createGlobalState } from 'react-hooks-global-state'

const initialState = { url: '', activeTab: 0 }

export const { GlobalStateProvider, useGlobalState } = createGlobalState(
	initialState
)
