import React, { useEffect, useState } from 'react'
import {
	TextField,
	Button,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from '@material-ui/core'
import styled from 'styled-components'
import { ThreadMin } from 'chch/dist/types'
import { ipcRenderer } from 'electron'
import _ from 'lodash'
import useLocalStorage from 'react-use/lib/useLocalStorage'

const Wrapper = styled.div`
	padding: 12px;
`

const ThreadRow = ({ thread }: { thread: ThreadMin }) => (
	<TableRow>
		<TableCell>{thread.title}</TableCell>
		<TableCell>{thread.url}</TableCell>
	</TableRow>
)

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
			<Table>
				<TableBody>
					<>
						{text !== '' && (
							<>
								<TableRow>
									<TableCell>{text}</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												setKeywords(_.pickBy({ ...keywords, [text]: true }))
											}
										>
											保存
										</Button>
									</TableCell>
								</TableRow>
								{threadRows(threads.filter(th => th.title.includes(text)))}
							</>
						)}
						{_.uniq(_.keys(keywords)).map(keyword => (
							<>
								<TableRow>
									<TableCell>{keyword}</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												setKeywords(_.pickBy({ ...keywords, [keyword]: false }))
											}
										>
											削除
										</Button>
									</TableCell>
								</TableRow>

								{threadRows(threads.filter(th => th.title.includes(keyword)))}
							</>
						))}
						{threadRows(threads.filter(th => th.title.includes(text)))}
					</>
				</TableBody>
			</Table>
		</Wrapper>
	)
}

export default Search
