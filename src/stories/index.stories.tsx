import React from 'react'
import { Post } from 'chch/dist/types'
import { CssBaseline } from '@material-ui/core'
import randomColor from 'randomcolor'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import _ from 'lodash'
import PostCard from '../pages/Home/PostCard'
import { User } from '../types'
import TimelineBar from '../pages/Home/TimelineBar'
import { theme } from '../theme'

const user: User = {
	id: 'Vu+pao9Sa',
	name: 'あの',
	color: randomColor({ luminosity: 'light', seed: 'Vu+pao9Sa' }),
}

const post: Post = {
	number: 999,
	name: {
		base: '以下、5ちゃんねるからVIPがお送りします',
		isDefault: true,
		raw: '以下、5ちゃんねるからVIPがお送りします',
		wacchoi: false,
	},
	images: ['http://o.5ch.net/1k7mr.png'],
	userId: 'abcdefg',
	timestamp: 1570869053889,
	comma: 999,
	message:
		'ホットミルク久々に飲んでみるわ 子供の頃苦手だった 牛乳は好きだったけど \n ホットミルク久々に飲んでみるわ 子供の頃苦手だった 牛乳は好きだったけど',
}

const postWacchoi: Post = {
	...post,
	name: {
		base: 'テストテスト◆WWWWWWWWWW',
		isDefault: false,
		raw: 'テストテスト◆WWWWWWWWWW (ﾜｯﾁｮｲWW 8f70-cmdO)',
		wacchoi: {
			aa: '8f',
			bb: '70',
			cccc: 'cmdO',
			main: '8f70-cmdO',
			nickname: 'ﾜｯﾁｮｲWW',
			raw: '(ﾜｯﾁｮｲWW 8f70-cmdO)',
		},
	},
}

function makeDummies(n: number, h = 1): number[] {
	const times = _.sortBy(_.range(n).map(() => _.random(h * 60 * 60 * 1000)))

	return times
}

storiesOf('Home', module)
	.addDecorator(muiTheme([theme]))
	.add('PostCard', () => (
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
				<PostCard user={user} post={postWacchoi} />
				<PostCard user={user} post={postWacchoi} />
				<PostCard user={user} post={postWacchoi} />
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
	))
	.add('TimelineBar', () => (
		<>
			<CssBaseline />
			<div style={{ width: '100vw', padding: '2vw' }}>
				<TimelineBar
					postTimes={makeDummies(100)}
					fetchTimes={makeDummies(100)}
					startTime={0}
					currentTime={1 * 60 * 60 * 1000}
					nextFetchTime={1 * 60 * 60 * 1000 + 5 * 60 * 1000} // 5 min after
				/>
			</div>
		</>
	))
