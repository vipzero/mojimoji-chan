import React from 'react'
import styled from 'styled-components'
import { Typography, Slider } from '@material-ui/core'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import SpeedDown from '@material-ui/icons/Hotel'
import SpeedUp from '@material-ui/icons/Flight'
import { useSelector, useDispatch } from 'react-redux'
import { getSpeechConfig } from '../../store/Setting/selectors'
import { setVolume, setRate } from '../../store/Setting/actions'

const ConfigForm = styled.div`
	display: grid;
	grid-template-columns: 40px max-content 300px max-content;
	grid-gap: 8px;
	margin-top: 15px;
`

const Wrapper = styled.div`
	height: calc(100vh - 48px);
	padding: 12px;
`

function Config() {
	const speechConfig = useSelector(getSpeechConfig)
	const dispatch = useDispatch()

	return (
		<Wrapper>
			<ConfigForm>
				<Typography>音量</Typography>
				<VolumeDown />
				<Slider
					defaultValue={speechConfig.volume}
					getAriaValueText={v => String(v)}
					aria-labelledby="speech-config-volume"
					onChangeCommitted={(e, volume) => {
						if (typeof volume === 'number') {
							dispatch(setVolume(volume))
						}
					}}
					step={0.1}
					marks
					min={0}
					max={1.0}
					valueLabelDisplay="auto"
				/>
				<VolumeUp />
			</ConfigForm>
			<ConfigForm>
				<Typography>速度</Typography>
				<SpeedDown />
				<Slider
					defaultValue={speechConfig.rate}
					getAriaValueText={v => String(v)}
					aria-labelledby="speech-config-rate"
					onChangeCommitted={(e, rate) => {
						if (typeof rate === 'number') {
							dispatch(setRate(rate))
						}
					}}
					step={0.1}
					marks
					min={0.5}
					max={3.5}
					valueLabelDisplay="auto"
				/>
				<SpeedUp />
			</ConfigForm>
			<br />
			<Typography variant="caption">
				(対応確認済み: VIP,パー速VIP) (収集時間: 自動調整) (読み上げ省略:
				40文字以降)
			</Typography>
		</Wrapper>
	)
}

export default Config
