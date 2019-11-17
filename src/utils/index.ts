import { SpeechConfig } from '../types'

export function speak(text: string, config: SpeechConfig) {
	const uttr = new SpeechSynthesisUtterance(text)

	console.log(config)
	uttr.lang = 'ja-JP'
	uttr.volume = config.volume
	uttr.rate = config.rate
	console.log(uttr.rate)
	speechSynthesis.speak(uttr)
}

export function speakPatch(text: string) {
	return text.substr(0, 30).replace(/>>/, '')
}
