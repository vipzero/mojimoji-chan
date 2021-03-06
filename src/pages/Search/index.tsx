import React, { useEffect, useState } from 'react'
import {
	TextField,
	Button,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	Paper,
	IconButton,
} from '@material-ui/core'
import PlayIcon from '@material-ui/icons/PlayCircleFilled'
import styled from 'styled-components'
import { ThreadMin } from 'chch/dist/types'
import { ipcRenderer } from 'electron'
import _ from 'lodash'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { useSelector, useDispatch } from 'react-redux'
import { useGlobalState } from '../../globalStore'
import { getUrl } from '../../store/Setting/selectors'
import { setUrl } from '../../store/Setting/actions'

const Wrapper = styled.div`
	padding: 12px;
`

const ThreadRow = ({ thread }: { thread: ThreadMin }) => {
	const url = useSelector(getUrl)
	const setTab = useGlobalState('tab')[1]
	const setIsWatch = useGlobalState('isWatch')[1]
	const dispatch = useDispatch()

	return (
		<TableRow>
			<TableCell>{thread.title}</TableCell>
			<TableCell>{thread.url}</TableCell>
			<TableCell style={{ width: '2em' }}>
				<IconButton
					disabled={thread.url === url}
					size="small"
					onClick={() => {
						dispatch(setUrl(thread.url))
						ipcRenderer.send('unwatch')
						setIsWatch(false)
						dispatch(setTab(0))
					}}
				>
					<PlayIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

const KeywordBox = styled.div`
	margin-top: 20px;
`
const KeywordHeader = styled.div`
	display: flex;
	margin-bottom: 12px;
	> * {
		margin-right: 12px !important;
	}
`

const threadRows = (threads: ThreadMin[]) =>
	threads.map(thread => <ThreadRow key={thread.id} thread={thread} />)

function Search() {
	const [threads, setThreads] = useState<ThreadMin[]>([])
	const [text, setText] = useState<string>('')
	const [keywords, setKeywords] = useLocalStorage<Record<string, boolean>>(
		'keywords',
		{}
	)

	function loadThread() {
		ipcRenderer.send('loadThreads')
	}
	useEffect(() => {
		ipcRenderer.on('threads', (event, threads: ThreadMin[]) => {
			setThreads(threads)
		})
		loadThread()
	}, [])

	return (
		<Wrapper>
			<div
				style={{
					display: 'grid',
					gridGap: '12px',
					gridTemplateColumns: '400px max-content',
				}}
			>
				<TextField
					label="キーワード"
					value={text}
					fullWidth
					onChange={v => setText(v.target.value)}
				/>
				<Button onClick={loadThread}>スレ更新</Button>
			</div>

			{text !== '' && (
				<KeywordBox>
					<KeywordHeader>
						<Typography variant="h6">{text}</Typography>
						{!keywords[text] && (
							<Button
								style={{ marginLeft: '12px' }}
								size="small"
								onClick={() =>
									setKeywords(_.pickBy({ ...keywords, [text]: true }))
								}
							>
								保存
							</Button>
						)}
					</KeywordHeader>
					<Paper>
						<Table size="small">
							<TableBody>
								{threadRows(threads.filter(th => th.title.includes(text)))}
							</TableBody>
						</Table>
					</Paper>
				</KeywordBox>
			)}
			{_.uniq(_.keys(keywords))
				.filter(v => v !== text)
				.map(keyword => (
					<KeywordBox key={keyword}>
						<KeywordHeader>
							<Typography variant="h6">{keyword}</Typography>
							<Button
								size="small"
								onClick={() =>
									setKeywords(_.pickBy({ ...keywords, [keyword]: false }))
								}
							>
								削除
							</Button>
						</KeywordHeader>
						<Paper>
							<Table size="small">
								<TableBody>
									{threadRows(threads.filter(th => th.title.includes(keyword)))}
								</TableBody>
							</Table>
						</Paper>
					</KeywordBox>
				))}
			<Typography variant="h6" style={{ padding: '12px 0' }}>
				全スレ
			</Typography>
			<Paper>
				<Table size="small">
					<TableBody>
						{threadRows(threads.filter(th => th.title.includes(text)))}
					</TableBody>
				</Table>
			</Paper>
		</Wrapper>
	)
}

export default Search

44
