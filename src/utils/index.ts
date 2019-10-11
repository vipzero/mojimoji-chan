import { SpeechConfig } from '../components/Home'

export function speak(text: string, config: SpeechConfig) {
	const uttr = new SpeechSynthesisUtterance(text)

	uttr.lang = 'ja-JP'
	uttr.volume = config.volume
	uttr.rate = config.rate
	speechSynthesis.speak(uttr)
}

export function speakPatch(text: string) {
	return text.substr(0, 30).replace(/>>/, '')
}
