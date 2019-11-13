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

const Wrapper = styled.div`
	padding: 12px;
`

const ThreadRow = ({ thread }: { thread: ThreadMin }) => (
	<TableRow>
		<TableCell>{thread.title}</TableCell>
		<TableCell>{thread.url}</TableCell>
	</TableRow>
)

function Search() {
	const [threads, setThreads] = useState<ThreadMin[]>([])
	const [text, setText] = useState<string>('')

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
						{threads
							.filter(th => th.title.includes(text))
							.map(thread => (
								<ThreadRow key={thread.id} thread={thread} />
							))}
						{threads.map(thread => (
							<ThreadRow key={thread.id} thread={thread} />
						))}
					</>
				</TableBody>
			</Table>
		</Wrapper>
	)
}

export default Search
