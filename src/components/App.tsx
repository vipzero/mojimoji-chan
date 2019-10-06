import React, { useEffect } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { Post } from 'chch/dist/types'
import { Button, Typography, TextField } from '@material-ui/core'
import { ipcRenderer } from 'electron'

import { speak, speakPatch } from '../utils'
import PostTable from './PostTable'

function App() {
	const [watchId, setWatchId] = React.useState<NodeJS.Timeout | null>(null)
	const [posts, setPosts] = React.useState<Post[]>([])
	const isWatch = !!watchId
	const [url, setUrl] = useLocalStorage<string>('url', '')

	useEffect(() => {
		console.log('effect')
		ipcRenderer.removeAllListeners('posts')
		ipcRenderer.on('posts', (event, posts: Post[], nth: number) => {
			console.log(nth)
			if (nth === 0) {
				// 初期値は最後の2レスだけ読み取る
				posts.splice(0, posts.length - 2)
			}

			posts.map(p => speakPatch(p.message)).forEach(speak)
			setPosts(s => s.concat(posts))
		})
		return () => {
			console.log('unmount')
			ipcRenderer.removeAllListeners('posts')
		}
	}, [watchId])

	return (
		<div>
			<TextField
				label="URL"
				value={url}
				fullWidth
				onChange={v => setUrl(v.target.value)}
			/>
			<Button
				variant="outlined"
				color={isWatch ? 'primary' : 'default'}
				size="large"
				onClick={async () => {
					if (watchId) {
						await ipcRenderer.send('unwatch', watchId)
						setWatchId(null)
					} else {
						ipcRenderer.once('watchstart', (event, id: NodeJS.Timeout) => {
							setWatchId(id)
						})
						ipcRenderer.send('watch', url)
						setPosts([])
					}
				}}
			>
				{isWatch ? '終了' : '読み上げ開始'}
			</Button>
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
