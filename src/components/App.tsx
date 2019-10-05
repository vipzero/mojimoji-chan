import React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import watch from 'chch/dist/watch'
import { Post } from 'chch/dist/types'
import { Button, Typography, TextField } from '@material-ui/core'
import PostTable from './PostTable'

function App() {
	const [watchId, setWatchId] = React.useState<NodeJS.Timeout | null>(null)
	const [posts, setPosts] = React.useState<Post[]>([])
	const isWatch = !!watchId
	const [url, setUrl] = useLocalStorage<string>('url', '')

	return (
		<div>
			<TextField
				label="URL"
				value={url}
				fullWidth
				onChange={v => setUrl(v.target.value)}
			/>
			{!isWatch && (
				<Button
					variant="outlined"
					color="default"
					size="large"
					onClick={async () => {
						setPosts([])
						const id = await watch(url, post => {
							setPosts(s => [...s, ...post])
						})

						setWatchId(id)
					}}
				>
					読み上げ開始
				</Button>
			)}
			{isWatch && (
				<Button
					variant="outlined"
					color="primary"
					size="large"
					onClick={() => {
						if (watchId) {
							clearInterval(watchId)
						}
						setWatchId(null)
					}}
				>
					終了
				</Button>
			)}
			<br />
			<Typography variant="caption">
				(対応確認済み: VIP,パー速VIP) (収集時間: 1分おき) (読み上げ省略:
				40文字以降)
			</Typography>
			<PostTable posts={posts} />
		</div>
	)
}

export default App
