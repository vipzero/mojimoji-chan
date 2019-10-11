import React from 'react'
import {
	Tabs,
	Tab,
	makeStyles,
	createStyles,
	Theme,
	withStyles,
} from '@material-ui/core'
import Home from './Home'
import Config from './Config'

type StyledTabsProps = {
	value: number
	onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const StyledTabs = withStyles({
	indicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > div': {
			maxWidth: 40,
			width: '100%',
			backgroundColor: '#635ee7',
		},
	},
})((props: StyledTabsProps) => (
	<Tabs {...props} TabIndicatorProps={{ children: <div /> }} />
))

type StyledTabProps = {
	label: string
}

const StyledTab = withStyles((theme: Theme) =>
	createStyles({
		root: {
			textTransform: 'none',
			color: '#fff',
			fontWeight: theme.typography.fontWeightRegular,
			fontSize: theme.typography.pxToRem(15),
			marginRight: theme.spacing(1),
			'&:focus': {
				opacity: 1,
			},
		},
	})
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: { flexGrow: 1 },
		padding: { padding: theme.spacing(3) },
		item: { backgroundColor: '#2e1534' },
	})
)

function App() {
	const classes = useStyles()
	const [activeTab, setActiveTab] = React.useState(0)

	return (
		<div>
			<div className={classes.item}>
				<StyledTabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
					<StyledTab label="Home" />
					<StyledTab label="Search" />
					<StyledTab label="Config" />
				</StyledTabs>
			</div>
			<div hidden={activeTab !== 0}>
				<Home />
			</div>
			<div hidden={activeTab !== 1}>検索(実装中)</div>
			<div hidden={activeTab !== 2}>
				<Config />
			</div>
		</div>
	)
}

export default App
