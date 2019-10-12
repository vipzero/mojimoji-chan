import React from 'react'
import { Post } from 'chch/dist/types'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { FormGroup } from '@material-ui/core'
import styled from 'styled-components'
import { User } from '../../types'
import PostCard from './PostCard'

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

function postToUserId(post: Post): string {
	// TODO: ﾜｯﾁｮｲ, 名前
	// const wachois = post.name
	// 	.split('-')
	// 	.pop()
	// 	.substr(0, 4)
	// const name = post.name.split(' (').shift()
	// console.log(post.name.split('-'))

	return post.userId
}

function groupByUser(posts: Post[]): Record<string, User> {
	const users: Record<string, User> = {}

	posts.forEach(post => {
		const userId = postToUserId(post)

		if (!(userId in users)) {
			users[userId] = {
				id: userId,
				name: post.name,
				// posts: [],
			}
		}
		// users[userId].posts.push(post)
	})
	return users
}

const WrapTable = styled.div<{ col: number }>`
	display: grid;
	grid-template-columns: repeat(${p => p.col}, 1fr);
	grid-gap: 4px 2px;
	background: #888;
	width: 100%;
	justify-content: space-evenly;
`

type Props = {
	posts: Post[]
}

function ColTable({ posts }: Props) {
	const users = groupByUser(posts)
	// console.log(groupByUser(posts))
	const classes = useStyles({})

	return (
		<Paper className={classes.root}>
			<WrapTable col={4}>
				{posts.map(post => (
					<PostCard key={post.number} post={post} user={users[post.userId]} />
				))}
			</WrapTable>
			<FormGroup row style={{ marginLeft: '12px' }} />
		</Paper>
	)
}

export default ColTable
