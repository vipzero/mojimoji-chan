import React from 'react'
import styled from 'styled-components'

export type Memory = { x: number; text: string }

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	height: 20px;
	background: #1b1e4a;
`

const MemoryLine = styled.div<{ x: number }>`
	position: absolute;
	left: ${p => p.x * 100}%;
	background-color: ${p => p.color};
	margin-top: 5px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	min-height: 10px;
	display: block;
`

const Label = styled.div<{ x: number }>`
	position: absolute;
	left: ${p => p.x * 100}%;
	background-color: ${p => p.color};
	width: 2px;
	height: 100%;
	border-radius: 0;
	min-height: 10px;
	display: block;
`

type Props = {
	memories: Memory[]
}

export function TimelineFooter({ memories }: Props) {
	return (
		<Wrapper>
			{memories.map((block, bi) => (
				<MemoryLine key={bi} x={block.x}>
					{memories.map((memory, i) => (
						<Label key={i} x={memory.x}>
							{memory.text}
						</Label>
					))}
				</MemoryLine>
			))}
		</Wrapper>
	)
}
