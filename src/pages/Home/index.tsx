import React, { useEffect, useRef } from 'react'
import { Post } from 'chch/dist/types'
import { TextField, IconButton, Button } from '@material-ui/core'
import ArrowUp from '@material-ui/icons/Publish'
import ArrowDown from '@material-ui/icons/GetApp'
import { ipcRenderer } from 'electron'
import PlayIcon from '@material-ui/icons/PlayCircleFilledTwoTone'
import StopIcon from '@material-ui/icons/PauseCircleFilledTwoTone'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useGlobalState } from '../../globalStore'
import { setUrl } from '../../store/Setting/actions'
import { getUrl, getSpeechConfig } from '../../store/Setting/selectors'
import { speak, speakPatch } from '../../utils'
import { theme } from '../../theme'
import ColTable from './ColTable'
import { TimelineBarThread, Timeline } from './TimelineBar'

const ScrollFrame = styled.div`
	grid-area: table;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 24px;
	}

	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
		background-color: ${theme.palette.background.paper};
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${theme.palette.primary.main};
		border-radius: 8px;
	}
`

const Wrapper = styled.div`
	height: calc(100vh - 48px);
	display: grid;
	grid-template-rows: max-content max-content 1fr max-content max-content;
	grid-template-areas: 'control' 'table-before' 'table' 'table-after' 'timeline';
`

function Home() {
	const url = useSelector(getUrl)
	const [isWatch, setIsWatch] = useGlobalState('isWatch')
	const speechConfig = useSelector(getSpeechConfig)
	const [posts, setPosts] = React.useState<Post[]>([])
	const [timeline, setTimeline] = React.useState<Timeline | null>(null)
	const dispatch = useDispatch()
	const tableRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		console.log('effect')
		ipcRenderer.removeAllListeners('posts')
		ipcRenderer.on(
			'posts',
			(event, posts: Post[], nth: number, nextCallMs: number) => {
				const postTimes = posts.map(p => p.timestamp)
				const fetchTime = Date.now()
				const nextFetchTime = fetchTime + nextCallMs

				setPosts(s => s.concat(posts))
				setTimeline(s => ({
					postTimes: (s === null ? [] : s.postTimes).concat(postTimes),
					fetchTimes: (s === null ? [] : s.fetchTimes).concat([fetchTime]),
					nextFetchTime,
				}))
				if (nth === 0) {
					// 初期値は最後の2レスだけ読み取る
					posts.splice(0, posts.length - 2)
				}
				posts
					.map(p => speakPatch(p.message))
					.forEach(m => speak(m, speechConfig))
			}
		)
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
			<ScrollButtonDiv
				icon={<ArrowUp />}
				gridArea="table-before"
				onClick={() => {
					if (tableRef.current) {
						tableRef.current.scrollTo({ top: 0 })
					}
				}}
				text="Top"
			/>
			<ScrollFrame ref={tableRef}>
				<ColTable posts={posts} />
			</ScrollFrame>
			<ScrollButtonDiv
				icon={<ArrowDown />}
				gridArea="table-after"
				onClick={() => {
					tableRef.current && tableRef.current.scrollTo({ top: 100000 })
				}}
				text="End"
			/>
			<div style={{ gridArea: 'timeline' }}>
				<TimelineBarThread timeline={timeline} />
			</div>
		</Wrapper>
	)
}

const ScrollButtonDiv: React.FC<{
	icon: React.ReactNode
	onClick: () => void
	text: string
	gridArea: string
}> = props => (
	<div style={{ gridArea: props.gridArea, textAlign: 'right' }}>
		<Button
			size="small"
			variant="contained"
			color="primary"
			endIcon={props.icon}
			onClick={props.onClick}
		>
			{props.text}
		</Button>
	</div>
)

export default Home
