import _ from 'lodash'
import dayjs from 'dayjs'
import { SpeechConfig } from '../types'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export function speak(text: string, config: SpeechConfig) {
	const uttr = new SpeechSynthesisUtterance(text)

	uttr.lang = 'ja-JP'
	uttr.volume = config.volume
	uttr.rate = config.rate
	speechSynthesis.speak(uttr)
}

const urlPattern = new RegExp(
	'(?:(?:(?:https?):)?\\/\\/)' +
	'(?:\\S+(?::\\S*)?@)?' +
	'(?:' +
	'(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
	'(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
	'(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
	'(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
	'(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
	'(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
	'|' +
	'(' + // host
	'(?:' +
	'[a-z0-9\\u00a1-\\uffff]' +
	'[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
	')?' +
	'[a-z0-9\\u00a1-\\uffff]\\.' +
	')+' +
	'([a-z\\u00a1-\\uffff]{2,}\\.?)' + // TLD
		')' +
		'(?::\\d{2,5})?' +
		'(?:[/?#]\\S*)?'
)

type SpeakPatch = (text: string) => string

const anchorPatch: SpeakPatch = text => text.substr(0, 30).replace(/>>/, '')
const urlPatch: SpeakPatch = text => {
	return text.replace(urlPattern, '$1$2のURL')
}

const patchs = [anchorPatch, urlPatch]

export function speakPatch(text: string) {
	return patchs.reduce((p, func) => func(p), text)
}

type Scale = { unit: string; scale: number; division: (time: number) => number }

/*
 * 時間の範囲に対して表示する罫線を返す
 * 最大24時間
 * @param range millisec
 * @return { big: Scale; medium: Scale; small: Scale } big: 範囲に 1,2本はいる線, small: bigの次に細かい解像度
 */
export const timeScaleToResolution = (
	range: number
): { big: Scale; medium: Scale; small: Scale } => {
	// const day: Scale = {
	// 	unit: 'DD',
	// 	scale: 24 * 60 * 60 * 1000,
	// 	division: t => Math.floor(t / (24 * 60 * 60 * 1000)),
	// }
	const sec = 1000
	const min = 60 * sec
	const hour = 60 * min
	const hour6Scale: Scale = {
		unit: 'HH',
		scale: 3 * 60 * min,
		division: time => (time / hour + 9) % 24,
	}
	const hourScale: Scale = {
		unit: 'HH',
		scale: 60 * 60 * 1000,
		division: time => (time / hour + 9) % 24,
	}
	const minute15Scale: Scale = {
		unit: 'mm',
		scale: 15 * 60 * 1000,
		division: time => (time / min) % 60,
	}
	const minute5Scale: Scale = {
		unit: 'mm',
		scale: 5 * 60 * 1000,
		division: time => (time / min) % 60,
	}
	const minuteScale: Scale = {
		unit: 'mm',
		scale: 60 * 60 * 1000,
		division: time => (time / min) % 60,
	}
	const second15Scale: Scale = {
		unit: 'ss',
		scale: 15 * 1000,
		division: time => (time / sec) % 60,
	}
	const second5Scale: Scale = {
		unit: 'ss',
		scale: 5 * 1000,
		division: time => (time / sec) % 60,
	}
	const scaleSets = [
		[hour6Scale, hourScale, minute15Scale],
		[hourScale, minute15Scale, minute5Scale],
		[minute15Scale, minute5Scale, minuteScale],
		[minute5Scale, minuteScale, second15Scale],
		[minuteScale, second15Scale, second5Scale],
	]

	for (const [big, medium, small] of scaleSets) {
		if (range >= big.scale) {
			return { big, medium, small }
		}
	}
	return { big: minuteScale, medium: second15Scale, small: second5Scale }
}

export const getSeparatorTimes = (beginTime: number, endTime: number) => {
	const { big, medium, small } = timeScaleToResolution(endTime - beginTime)
	const withLabel = (scale: Scale, time: number) => ({
		time,
		num: scale.division(time),
	})

	return {
		bigLines: _.range(
			beginTime - (beginTime % big.scale),
			endTime,
			big.scale
		).map(withLabel.bind(null, big)),
		mediumLines: _.range(
			beginTime - (beginTime % medium.scale),
			endTime,
			medium.scale
		).map(withLabel.bind(null, medium)),
		smallLines: _.range(
			beginTime - (beginTime % small.scale),
			endTime,
			small.scale
		).map(withLabel.bind(null, small)),
	}
}

export const timeFormatComma = (ts: number) => dayjs(ts).format('HH:mm:ss.SSS')
export const timeFormat = (ts: number) => dayjs(ts).format('HH:mm:ss')
