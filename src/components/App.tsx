import React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import chch from 'chch'
import { Post } from 'chch/dist/dump'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { AppBar } from '@material-ui/core'

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
						const id = await chch.watch(url, true, post => {
							posts.push(post)
							setPosts([...posts, post])
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
						clearInterval(watchId)
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
		</div>
	)
}

export default App
