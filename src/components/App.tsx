import React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import chch from 'chch'
import { Post } from 'chch/dist/dump'

function App() {
	const [watchId, setWatchId] = React.useState<NodeJS.Timeout | null>(null)
	const [posts, setPosts] = React.useState<Post[]>([])
	const isWatch = !!watchId
	const [url, setUrl] = useLocalStorage<string>('url', '')
	return (
		<div>
			<h1>読み上げちゃん</h1>
			{!isWatch && (
				<button
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
				</button>
			)}
			{isWatch && (
				<button
					onClick={() => {
						clearInterval(watchId)
						setWatchId(null)
					}}
				>
					終了
				</button>
			)}
			<input value={url} onChange={v => setUrl(v.target.value)} />
		</div>
	)
}

export default App
