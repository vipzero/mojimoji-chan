import { State } from '../../types'

export const getUrl = (state: State) => state.Setting.url
export const getSpeechConfig = (state: State) => state.Setting.speechConfig
