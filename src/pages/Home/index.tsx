import React, { useEffect } from 'react'
import { Post } from 'chch/dist/types'
import {
	Typography,
	TextField,
	Slider,
	Grid,
	IconButton,
} from '@material-ui/core'
import { ipcRenderer } from 'electron'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import SpeedDown from '@material-ui/icons/Hotel'
import SpeedUp from '@material-ui/icons/Flight'
import PlayIcon from '@material-ui/icons/PlayCircleFilledTwoTone'
import StopIcon from '@material-ui/icons/PauseCircleFilledTwoTone'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
	endWatch,
	startWatch,
	setUrl,
	setVolume,
	setRate,
} from '../../store/Setting/actions'
import {
	getIsWatch,
	getUrl,
	getSpeechConfig,
} from '../../store/Setting/selectors'
import { speak, speakPatch } from '../../utils'
import ColTable from './ColTable'

const Wrapper = styled.div`
	height: calc(100vh - 48px);
	display: grid;
	grid-template-rows: max-content 1fr;
	grid-template-areas: 'control' 'table';
`

function Home() {
	const url = useSelector(getUrl)
	const isWatch = useSelector(getIsWatch)
	const speechConfig = useSelector(getSpeechConfig)
	const [posts, setPosts] = React.useState<Post[]>([])
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('effect')
		ipcRenderer.removeAllListeners('posts')
		ipcRenderer.on('posts', (event, posts: Post[], nth: number) => {
			setPosts(s => s.concat(posts))
			if (nth === 0) {
				// 初期値は最後の2レスだけ読み取る
				posts.splice(0, posts.length - 2)
			}
			posts.map(p => speakPatch(p.message)).forEach(m => speak(m, speechConfig))
		})
		return () => {
			console.log('unmount')
			ipcRenderer.removeAllListeners('posts')
		}
	}, [speechConfig.rate, speechConfig.volume])

	return (
		<Wrapper>
			<div style={{ gridArea: 'control', padding: '12px' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'max-content 1fr',
						gridGap: '1em',
					}}
				>
					{isWatch ? (
						<IconButton
							color="secondary"
							onClick={async () => {
								ipcRenderer.send('unwatch')
								dispatch(endWatch())
							}}
						>
							<StopIcon fontSize="large" />
						</IconButton>
					) : (
						<IconButton
							color={'primary'}
							onClick={async () => {
								ipcRenderer.send('watch', url)
								dispatch(startWatch())
								setPosts([])
							}}
						>
							<PlayIcon fontSize="large" />
						</IconButton>
					)}

					<TextField
						label="URL"
						disabled={isWatch}
						value={url}
						fullWidth
						onChange={v => dispatch(setUrl(v.target.value))}
					/>
				</div>
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
										dispatch(setVolume(volume))
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
										dispatch(setRate(rate))
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
				</div>
				<br />
				<Typography variant="caption">
					(対応確認済み: VIP,パー速VIP) (収集時間: 1分おき) (読み上げ省略:
					40文字以降)
				</Typography>
			</div>
			<div style={{ gridArea: 'table', overflowY: 'scroll' }}>
				<ColTable posts={posts} />
			</div>
		</Wrapper>
	)
}

export default Home
