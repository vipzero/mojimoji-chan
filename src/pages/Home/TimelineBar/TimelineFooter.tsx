import React from 'react'
import styled from 'styled-components'

export type Memory = { x: number; h: number; text: string }

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	height: 20px;
	background: #1b1e4a;
`

const MemoryLine = styled.div`
	position: absolute;
	background-color: ${p => p.color};
	width: 2px;
	border-radius: 0;
	min-height: 10px;
	display: block;
	border-left: solid white 1px;
	padding-left: 4px;
`

type Props = {
	memories: Memory[]
}

export function TimelineFooter({ memories }: Props) {
	return (
		<Wrapper>
			{memories.map((memory, i) => (
				<MemoryLine
					key={i}
					style={{
						left: `${memory.x * 100}%`,
						height: `${memory.h * 100}%`,
					}}
				>
					{memory.text}
				</MemoryLine>
			))}
		</Wrapper>
	)
}
