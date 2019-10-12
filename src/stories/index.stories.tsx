import React from 'react'
import { Post } from 'chch/dist/types'
import { CssBaseline } from '@material-ui/core'
import PostCard from '../pages/Home/PostCard'
import { User } from '../types'

export default {
	title: 'MojiMojiChan',
}

const user: User = {
	id: 'abcdefg',
	name: 'あの',
}

const post: Post = {
	number: 999,
	name: '以下、5ちゃんねるからVIPがお送りします',
	userId: 'abcdefg',
	timestamp: 1570869053889,
	comma: 999,
	message:
		'ホットミルク久々に飲んでみるわ 子供の頃苦手だった 牛乳は好きだったけど \n ホットミルク久々に飲んでみるわ 子供の頃苦手だった 牛乳は好きだったけど',
}

export const toStorybook = () => (
	<>
		<CssBaseline />
		<h3>Resonsive</h3>
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 2fr 3fr',
				justifyContent: 'space-evenly',
				gridGap: '12px',
			}}
		>
			<PostCard user={user} post={post} />
			<PostCard user={user} post={post} />
			<PostCard user={user} post={post} />
		</div>
		{[200, 350, 500].map(width => (
			<div key={width}>
				<h3>{width}px</h3>
				<div style={{ width: `${width}px` }}>
					<PostCard user={user} post={post} />
				</div>
			</div>
		))}
	</>
)

toStorybook.story = {
	name: 'PostCard',
}
