import React from 'react'
import { Post } from 'chch/dist/types'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const CardWrap = styled.div`
	padding: 2px;
`

type Props = {
	post: Post
}

function PostCard({ post }: Props) {
	return (
		<CardWrap>
			<Typography>{post.message}</Typography>
		</CardWrap>
	)
}

export default PostCard
