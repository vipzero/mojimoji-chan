import React, { useEffect } from 'react'
import { Post } from 'chch/dist/types'
import { TextField, IconButton } from '@material-ui/core'
import { ipcRenderer } from 'electron'
import PlayIcon from '@material-ui/icons/PlayCircleFilledTwoTone'
import StopIcon from '@material-ui/icons/PauseCircleFilledTwoTone'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useGlobalState } from '../../globalStore'
import { setUrl } from '../../store/Setting/actions'
import { getUrl, getSpeechConfig } from '../../store/Setting/selectors'
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
	const [isWatch, setIsWatch] = useGlobalState('isWatch')
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
								setIsWatch(false)
							}}
						>
							<StopIcon fontSize="large" />
						</IconButton>
					) : (
						<IconButton
							color={'primary'}
							onClick={async () => {
								ipcRenderer.send('watch', url)
								setIsWatch(true)
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
			</div>
			<div style={{ gridArea: 'table', overflowY: 'scroll' }}>
				<ColTable posts={posts} />
			</div>
		</Wrapper>
	)
}

export default Home
