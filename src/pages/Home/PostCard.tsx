import React from 'react'
import { Post } from 'chch/dist/types'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import dayjs from 'dayjs'
// eslint-disable-next-line import/no-unassigned-import
import 'dayjs/locale/ja'

import { User } from '../../types'

dayjs.locale('ja')

const col = 4
const CardWrap = styled.div<{ num: number }>`
	min-height: 50px;
	min-width: 300px;
	overflow: hidden;
	background: #f0f0f0;
	border: solid 1px gray;
	border-radius: 4px;
	margin-top: ${p => ((p.num - 1) % col) * 12.5}px;
	/* margin-top: -${p => (3 - ((p.num - 1) % col)) * 12.5}px; */
	margin-bottom: -${p => ((p.num - 1) % col) * 12.5}px;
`
const Header = styled.div`
	padding: 4px 8px 2px;
	display: grid;
	grid-auto-flow: column;
	grid-gap: 4px;
	border-bottom: dashed 2px gray;
	background: #bababa;
	/* grid-template-rows: 100px 50px; */
	grid-template-columns: max-content 1fr max-content max-content;
	grid-template-areas: 'icon num wacc id' 'icon name name time';
`
const Body = styled.div`
	padding: 4px 8px 8px;
	overflow: hidden;
	height: 76px;
	display: box;
	margin-bottom: 8px;
`

const Icon = styled.img`
	height: 40px;
	border: 1px solid gray;
`

const LineText = styled(Typography)`
	line-height: 18px !important;
	font-size: 15px !important;
`

type Props = {
	post: Post
	user: User
}

const toName = (post: Post) => {
	return post.name.isDefault ? '' : post.name.base
}

const toIconUrl = (id: string) =>
	`https://avatars.dicebear.com/v2/bottts/${id}.svg`

const toColorUrl = (id: string) =>
	`https://avatars.dicebear.com/v2/initials/${id}.svg`

const toTimeLabel = (ts: number) => dayjs(ts).format('HH:mm:ss.SSS')

const Name = styled(Typography)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

function PostCard({ post }: Props) {
	return (
		<CardWrap num={post.number}>
			<Header>
				<Icon style={{ gridArea: 'icon' }} src={toIconUrl(post.userId)} />
				<Typography style={{ gridArea: 'num' }} variant="body2">
					{post.number}
				</Typography>
				<Typography style={{ gridArea: 'id' }} variant="body2">
					{post.userId}
				</Typography>
				{post.name.wacchoi && (
					<Typography style={{ gridArea: 'wacc' }} variant="body2">
						{post.name.wacchoi.main}
					</Typography>
				)}
				<div style={{ overflow: 'hidden', gridArea: 'name' }}>
					<Name variant="body2">{toName(post)}</Name>
				</div>
				<Typography style={{ gridArea: 'time' }} variant="body2">
					{toTimeLabel(post.timestamp)}
				</Typography>
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
