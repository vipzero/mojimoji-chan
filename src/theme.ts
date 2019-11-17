import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	props: {
		MuiTextField: {
			variant: 'outlined',
		},
		MuiButton: {
			variant: 'outlined',
		},
	},
})
