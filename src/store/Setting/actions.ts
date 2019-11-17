import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const setVolume = actionCreator<number>('setVolume')
export const setRate = actionCreator<number>('setRate')
export const startWatch = actionCreator('startWatch')
export const endWatch = actionCreator('endWatch')
export const setTab = actionCreator<number>('setTab')
export const setUrl = actionCreator<string>('setUrl')
