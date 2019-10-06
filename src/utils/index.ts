export function speak(text: string) {
	const uttr = new SpeechSynthesisUtterance(text)

	uttr.lang = 'ja-JP'
	speechSynthesis.speak(uttr)
}
