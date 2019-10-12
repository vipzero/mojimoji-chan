import React, { useEffect } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { Post } from 'chch/dist/types'
import { Button, Typography, TextField, Slider, Grid } from '@material-ui/core'
import { ipcRenderer } from 'electron'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import SpeedDown from '@material-ui/icons/Hotel'
import SpeedUp from '@material-ui/icons/Flight'

import { speak, speakPatch } from '../../utils'
import ColTable from './ColTable'

export type SpeechConfig = {
	volume: number
	rate: number
}

function Home() {
	const [isWatch, setIsWatch] = React.useState<boolean>(false)
	const [posts, setPosts] = React.useState<Post[]>([])
	const [speechConfig, setSpeechConfig] = useLocalStorage<SpeechConfig>(
		'speechConfig',
		{
			volume: 0.5,
			rate: 5,
		}
	)
	const [url, setUrl] = useLocalStorage<string>('url', '')

	useEffect(() => {
		console.log('effect')
		ipcRenderer.removeAllListeners('posts')
		ipcRenderer.on('posts', (event, posts: Post[], nth: number) => {
			console.log(nth)
			// if (nth === 0) {
			// 	// 初期値は最後の2レスだけ読み取る
			// 	posts.splice(0, posts.length - 2)
			// }

			posts.map(p => speakPatch(p.message)).forEach(m => speak(m, speechConfig))
			setPosts(s => s.concat(posts))
		})
		return () => {
			console.log('unmount')
			ipcRenderer.removeAllListeners('posts')
		}
	}, [speechConfig])

	return (
		<div>
			<TextField
				label="URL"
				value={url}
				fullWidth
				onChange={v => setUrl(v.target.value)}
			/>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 2fr',
					gridGap: '8px',
				}}
			>
				<Grid container spacing={2}>
					<Grid item>
						<VolumeDown />
					</Grid>
					<Grid item xs>
						<Slider
							defaultValue={speechConfig.volume}
							getAriaValueText={v => String(v)}
							aria-labelledby="speech-config-volume"
							onChange={(e, volume) => {
								if (typeof volume === 'number') {
									setSpeechConfig({ ...speechConfig, volume })
								}
							}}
							step={0.1}
							marks
							min={0}
							max={1.0}
							valueLabelDisplay="auto"
						/>
					</Grid>
					<Grid item>
						<VolumeUp />
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item>
						<SpeedDown />
					</Grid>
					<Grid item xs>
						<Slider
							defaultValue={speechConfig.rate}
							getAriaValueText={v => String(v)}
							aria-labelledby="speech-config-rate"
							onChange={(e, rate) => {
								if (typeof rate === 'number') {
									setSpeechConfig({ ...speechConfig, rate })
								}
							}}
							step={0.5}
							marks
							min={0}
							max={10.0}
							valueLabelDisplay="auto"
						/>
					</Grid>
					<Grid item>
						<SpeedUp />
					</Grid>
				</Grid>
				<Button
					variant="outlined"
					color={isWatch ? 'primary' : 'default'}
					size="large"
					onClick={async () => {
						if (isWatch) {
							ipcRenderer.send('unwatch')
							setIsWatch(false)
						} else {
							ipcRenderer.send('watch', url)
							setIsWatch(true)
							setPosts([])
						}
					}}
				>
					{isWatch ? '終了' : '読み上げ開始'}
				</Button>
			</div>
			<br />
			<Typography variant="caption">
				(対応確認済み: VIP,パー速VIP) (収集時間: 1分おき) (読み上げ省略:
				40文字以降)
			</Typography>
			<ColTable posts={posts} />
		</div>
	)
}

export default Home