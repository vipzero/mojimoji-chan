import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { timeFormat } from '../../../utils'

export type Memory = { x: number; h: number; text: string }

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	height: 20px;
	background: #1b1e4a;
	justify-content: space-between;
`

const LeftFoot = styled.div`
	display: flex;
	background: #1b1e4a;
	justify-content: space-between;
	> p {
		padding-left: 12px;
	}
`

const RightFoot = styled.div`
	display: flex;
	background: #1b1e4a;
	justify-content: space-between;
	> p {
		padding-left: 12px;
	}
`

type Props = {
	messageCount: number
	startTime: number
	nextFetchTime: number
	lastFetchTime: number
	messageCount15min: number
}

export function TimelineFooter({
	messageCount,
	startTime,
	nextFetchTime,
	lastFetchTime,
	messageCount15min,
}: Props) {
	return (
		<Wrapper>
			<LeftFoot>
				<Typography>レス数 {messageCount}</Typography>
				<Typography>スレ開始時刻 {timeFormat(startTime)}</Typography>
			</LeftFoot>
			<RightFoot>
				<Typography>最終取得 {timeFormat(lastFetchTime)}</Typography>
				<Typography>15分以内レス数 {messageCount15min}</Typography>
				<Typography>次回取得 {timeFormat(nextFetchTime)}</Typography>
			</RightFoot>
		</Wrapper>
	)
}
