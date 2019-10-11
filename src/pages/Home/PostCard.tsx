import React from 'react'
import { Post } from 'chch/dist/types'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const CardWrap = styled.div`
	padding: 8px 10px;
	width: 310px;
	min-width: 310px;
	max-width: 310px;
	min-height: 50px;
	overflow: hidden;
	background: #f1f6ff;
`

type Props = {
	post: Post
}

function PostCard({ post }: Props) {
	return (
		<CardWrap>
			<Typography>{post.number}</Typography>
			<Typography style={{ fontSize: '15px' }}>{post.message}</Typography>
		</CardWrap>
	)
}

export default PostCard
