import React from 'react'
import { Post } from 'chch/dist/types'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { FormGroup } from '@material-ui/core'
import styled from 'styled-components'
import _ from 'lodash'
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

type User = {
	name: string
	// wachois: string
	// ids: string[]
	posts: Post[]
}

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
				name: post.name,
				posts: [],
			}
		}
		users[userId].posts.push(post)
	})
	return users
}

const WrapTable = styled.div`
	display: flex;
	margin-left: 2px;
	background: blue;
	width: 100vw;
	height: 100vh;
`

const UserColumn = styled.div`
	position: relative;
	width: 330px;
	min-width: 330px;
	max-width: 330px;
`

type Props = {
	posts: Post[]
}

function ColTable(props: Props) {
	const users = groupByUser(props.posts)
	// console.log(groupByUser(posts))
	const classes = useStyles({})

	return (
		<Paper className={classes.root}>
			<WrapTable>
				{_.map(users, (user, userId) => (
					<div>
						<UserColumn key={userId}>
							{user.posts.map(post => (
								<PostCard key={post.number} post={post} />
							))}
						</UserColumn>
					</div>
				))}
			</WrapTable>
			<FormGroup row style={{ marginLeft: '12px' }} />
		</Paper>
	)
}

export default ColTable
