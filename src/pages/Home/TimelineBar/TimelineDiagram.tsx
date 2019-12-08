import React from 'react'
import styled from 'styled-components'

export type Block = { x: number; color: string }

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	height: 20px;
	background: #1b1e4a;
`

const Block = styled.div<{ x: number; color: string }>`
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

const Line = styled.div<{ x: number; color: string }>`
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
	blocks: Block[]
	lines: Block[]
}

export function TimelineDiagram({ blocks, lines }: Props) {
	return (
		<Wrapper>
			{blocks.map((block, bi) => (
				<Block key={bi} x={block.x} color={block.color} />
			))}
			{lines.map((block, bi) => (
				<Line key={bi} x={block.x} color={block.color} />
			))}
		</Wrapper>
	)
}
