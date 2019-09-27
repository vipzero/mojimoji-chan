import React from 'react'
import { Post } from 'chch/dist/types/index'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { FormControlLabel, Checkbox, FormGroup } from '@material-ui/core'
import _ from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			marginTop: theme.spacing(3),
			overflowX: 'auto',
		},
		table: {
			minWidth: 650,
		},
	})
)

type Props = {
	posts: Post[]
}
function PostTable({ posts }: Props) {
	const [visible, setVisible] = useLocalStorage<
		Record<'number' | 'time' | 'name' | 'id', boolean>
	>('talbe-visible-column', {
		number: true,
		time: false,
		name: false,
		id: true,
	})
	const classes = useStyles({})
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{visible['number'] && <TableCell align="right">#</TableCell>}
						{visible['time'] && <TableCell>time</TableCell>}
						{visible['name'] && <TableCell>name</TableCell>}
						{visible['id'] && <TableCell>id</TableCell>}
						<TableCell>text</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{posts.map(post => (
						<TableRow key={post.number}>
							{visible['number'] && (
								<TableCell
									size="small"
									align="right"
									scope="post"
									component="th"
								>
									{post.number}
								</TableCell>
							)}
							{visible['time'] && (
								<TableCell size="small">
									{dayjs(post.timestamp).format('MM/DD HH:mm:ss')}
								</TableCell>
							)}
							{visible['name'] && (
								<TableCell size="small">{post.name.substr(0, 6)}</TableCell>
							)}
							{visible['id'] && <TableCell>{post.userId}</TableCell>}
							<TableCell align="left">{post.message}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<FormGroup row style={{ marginLeft: '12px' }}>
				{_.map(visible, (b, key) => (
					<FormControlLabel
						key={key}
						control={
							<Checkbox
								checked={b}
								onChange={(e, newb) => setVisible({ ...visible, [key]: newb })}
								value={key}
							/>
						}
						label={key}
					/>
				))}
			</FormGroup>
		</Paper>
	)
}

export default PostTable
