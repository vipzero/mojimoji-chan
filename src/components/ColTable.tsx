import React from 'react'
import { Post } from 'chch/dist/types'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { FormGroup } from '@material-ui/core'

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

type User = {
	name: string
	wachois: string
	ids: string[]
	posts: Post[]
}

type Props = {
	posts: Post[]
}

// function groupByUser(posts: Post[]): User[] {
// 	const users = []
// 	posts.forEach(post => {
// 		const wachois = post.name
// 			.split('-')
// 			.pop()
// 			.substr(0, 4)
// 		const name = post.name.split(' (').shift()
// 		console.log(post.name.split('-'))
// 	})
// 	return users
// }

function ColTable() {
	// console.log(groupByUser(posts))
	const classes = useStyles({})

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>text</TableCell>
					</TableRow>
				</TableHead>
				<TableBody />
			</Table>
			<FormGroup row style={{ marginLeft: '12px' }} />
		</Paper>
	)
}

export default ColTable
