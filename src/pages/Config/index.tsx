import React from 'react'
import { Typography } from '@material-ui/core'

export type SpeechConfig = {
	volume: number
	rate: number
}

function Config() {
	return (
		<div>
			<Typography>設定</Typography>
		</div>
	)
}

export default Config
