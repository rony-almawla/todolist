import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#90caf9' },
		secondary: { main: '#ce93d8' },
		background: { default: '#1f2227', paper: '#24272d' },
	},
	typography: {
		fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
	},
	components: {
		MuiTextField: {
			defaultProps: { variant: 'filled' },
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					borderRadius: 10,
					backgroundColor: '#2a2f35',
					':hover': { backgroundColor: '#30353b' },
					'&.Mui-focused': { backgroundColor: '#30353b' },
					'&:before': { borderBottom: 'none' },
					'&:after': { borderBottom: 'none' },
					'&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
				},
			},
		},
		MuiButton: {
			styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } },
		},
	},
});


