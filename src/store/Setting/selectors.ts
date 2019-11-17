import { State } from '../../types'

export const getTab = (state: State) => state.Setting.tab
export const getUrl = (state: State) => state.Setting.url
export const getIsWatch = (state: State) => state.Setting.isWatch
export const getSpeechConfig = (state: State) => state.Setting.speechConfig
