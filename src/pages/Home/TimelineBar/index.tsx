import React, { useState } from 'react'
import styled from 'styled-components'
import { getSeparatorTimes } from '../../../utils'
import { Block, TimelineDiagram } from './TimelineDiagram'
import { Memory , TimelineFooter } from './TimelineFooter'


const Wrapper = styled.div`
	width: 100%;
	height: 40px;
`

type Props = {
	currentTime: number
	startTime: number
	nextFetchTime: number
	postTimes: number[]
	fetchTimes: number[]
}

function TimelineBar({
	currentTime,
	startTime,
	nextFetchTime,
	postTimes,
	fetchTimes,
}: Props) {
	const colors = {
		post: '#FFE2D6',
		current: 'orange',
		fetch: '#90CC83',
		fetchNext: '#7CCC00',
	}
	const range = (currentTime - startTime) * 1.1
	const blocks: Block[] = [
		...postTimes.map(time => {
			return {
				x: (time - startTime) / range,
				color: colors.post,
			}
		}),
	]
	const { bigLines, mediumLines, smallLines } = getSeparatorTimes(
		startTime,
		startTime + range
	)
	const lines: Block[] = [
		...smallLines.map(scale => {
			return {
				x: (scale.time - startTime) / range,
				color: '#333',
			}
		}),
		...fetchTimes.map(time => {
			return {
				x: (time - startTime) / range,
				color: colors.fetch,
			}
		}),
		{
			x: (currentTime - startTime) / range,
			color: colors.current,
		},
		{
			x: (nextFetchTime - startTime) / range,
			color: colors.fetchNext,
		},
	]
	const memories: Memory[] = [
		...mediumLines.map(scale => ({
			x: (scale.time - startTime) / range,
			text: String(scale.num),
		})),
		...bigLines.map(scale => ({
			x: (scale.time - startTime) / range,
			text: String(scale.num),
		})),
	]

	return (
		<Wrapper>
			<TimelineDiagram blocks={blocks} lines={lines} />
			<TimelineFooter memories={memories}></TimelineFooter>
		</Wrapper>
	)
}

export default TimelineBar
