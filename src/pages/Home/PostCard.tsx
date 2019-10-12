import React from 'react'
import { Post } from 'chch/dist/types'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { User } from '../../types'

const CardWrap = styled.div<{ num: number }>`
	min-height: 50px;
	overflow: hidden;
	background: #f1f6ff;
`
const Header = styled.div`
	background: 10px;
`
const Body = styled.div`
	padding: 2px 8px 4px;
	height: 50px;
`

type Props = {
	post: Post
	user: User
}

function PostCard({ post }: Props) {
	return (
		<CardWrap num={post.number}>
			<Header>
				<Typography variant="caption">{post.number}</Typography>
			</Header>
			<Body>
				<Typography style={{ fontSize: '15px' }}>{post.message}</Typography>
			</Body>
		</CardWrap>
	)
}

export default PostCard
