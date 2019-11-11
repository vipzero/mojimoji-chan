import React from 'react'
import { Post } from 'chch/dist/types'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { FormGroup } from '@material-ui/core'
import styled from 'styled-components'
import _ from 'lodash'
import randomColor from 'randomcolor'
import color from 'color'
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
			const c = color(randomColor({ luminosity: 'dark', seed: userId }))

			users[userId] = {
				id: userId,
				name: post.name.base,
				color: c.darken(c.isDark ? 0.6 : 0.9).hex(),
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
	width: 100%;
	justify-content: space-evenly;
`

const Stripe = styled.div`
	padding-bottom: 100px;
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
			<Stripe>
				{_.chunk(posts, 4).map((posts4, ri) => (
					<WrapTable key={ri} col={4}>
						{posts4.map(post => (
							<PostCard
								key={post.number}
								post={post}
								user={users[post.userId]}
							/>
						))}
					</WrapTable>
				))}
			</Stripe>
			<FormGroup row style={{ marginLeft: '12px' }} />
		</Paper>
	)
}

export default ColTable
