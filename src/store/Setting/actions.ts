import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const setVolume = actionCreator<number>('setVolume')
export const setRate = actionCreator<number>('setRate')
export const setUrl = actionCreator<string>('setUrl')
