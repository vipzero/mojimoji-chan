export function speak(text: string) {
	const uttr = new SpeechSynthesisUtterance(text)

	uttr.lang = 'ja-JP'
	speechSynthesis.speak(uttr)
}

export function speakPatch(text: string) {
	return text.substr(0, 30).replace(/>>/, '')
}
