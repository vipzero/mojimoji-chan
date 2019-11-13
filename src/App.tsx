import React from 'react'
import {
	Tabs,
	Tab,
	makeStyles,
	createStyles,
	Theme,
	withStyles,
	CssBaseline,
	createMuiTheme,
} from '@material-ui/core'

import styled from 'styled-components'
import { ThemeProvider } from '@material-ui/styles'
import Home from './pages/Home'
import Config from './pages/Config'
import Search from './pages/Search'

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

type StyledTabsProps = {
	value: number
	onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const HeadTabs = withStyles({
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

const StyledTab = styled(Tab)`
	text-transform: none;
	margin-right: 4px;
	color: #fff !important;
	font-size: 15px;
	&:focus {
		opacity: 1;
	}
`

const HeadTab = (props: { label: string }) => (
	<StyledTab disableRipple {...props} />
)

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: { flexGrow: 1 },
		padding: { padding: theme.spacing(3) },
		item: { backgroundColor: '#2e1534' },
	})
)

const MainGrid = styled.div`
	display: grid;
`

function App() {
	const classes = useStyles()
	const [activeTab, setActiveTab] = React.useState(0)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<MainGrid>
				<div className={classes.item}>
					<HeadTabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
						<HeadTab label="Home" />
						<HeadTab label="Search" />
						<HeadTab label="Config" />
					</HeadTabs>
				</div>
				<div>
					<div hidden={activeTab !== 0}>
						<Home />
					</div>
					<div hidden={activeTab !== 1}>
						<Search />
					</div>
					<div hidden={activeTab !== 2}>
						<Config />
					</div>
				</div>
			</MainGrid>
		</ThemeProvider>
	)
}

export default App
