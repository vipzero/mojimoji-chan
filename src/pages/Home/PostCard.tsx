import React from 'react'
import { Post } from 'chch/dist/types'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { User } from '../../types'

const col = 4
const CardWrap = styled.div<{ num: number }>`
	min-height: 50px;
	overflow: hidden;
	background: #f0f0f0;
	border-radius: 1em 1em 0 0;
	margin-top: ${p => ((p.num - 1) % col) * 12.5}px;
	/* margin-top: -${p => (3 - ((p.num - 1) % col)) * 12.5}px; */
	margin-bottom: -${p => ((p.num - 1) % col) * 12.5}px;
`
const Header = styled.div`
	padding: 4px 8px 2px;
	display: grid;
	grid-auto-flow: column;
	grid-gap: 4px;
	grid-template-columns: max-content max-content max-content;
	background: #cdcdcd;
	border-radius: 1em;
`
const Body = styled.div`
	padding: 2px 8px 8px;
	overflow: hidden;
	height: 72px;
	display: box;
	margin-bottom: 8px;
`

const Icon = styled.img`
	height: 18px;
	margin-top: 1px;
	border: 1px solid gray;
	padding: 1px;
`

const LineText = styled(Typography)`
	line-height: 18px !important;
	font-size: 15px !important;
`

type Props = {
	post: Post
	user: User
}

const toIconUrl = (id: string) =>
	`https://avatars.dicebear.com/v2/identicon/${id}.svg`

function PostCard({ post }: Props) {
	return (
		<CardWrap num={post.number}>
			<Header>
				<Typography variant="body2">{post.number}</Typography>
				<Typography variant="body2">ID: {post.userId}</Typography>
				<Icon src={toIconUrl(post.userId)} />
			</Header>
			<Body>
				{post.message.split('  ').map((line, i) => (
					<LineText key={i} style={{ fontSize: '15px' }}>
						{line}
					</LineText>
				))}
			</Body>
		</CardWrap>
	)
}

export default PostCard
