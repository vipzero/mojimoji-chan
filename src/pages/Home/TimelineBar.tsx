import React from 'react'
import styled from 'styled-components'

type Props = {
	postTimes: number[]
	fetchTimes: number[]
	nextFetchTime: number
}

const Wrapper = styled.div`
	width: 100%;
`

function TimelineBar(props: Props) {
	return <Wrapper>bar</Wrapper>
}

export default TimelineBar
