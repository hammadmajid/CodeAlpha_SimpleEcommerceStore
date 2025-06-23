"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	cssVariables: true,
	palette: {
		primary: {
			main: "#FF6B35", // Bold orange
			dark: "#E55A2B",
			contrastText: "#000000",
		},
		secondary: {
			main: "#4ECDC4", // Vibrant teal
			dark: "#45B7AF",
			contrastText: "#000000",
		},
		error: {
			main: "#FF4757",
			contrastText: "#FFFFFF",
		},
		warning: {
			main: "#FFA502",
			contrastText: "#000000",
		},
		info: {
			main: "#3742FA",
			contrastText: "#FFFFFF",
		},
		success: {
			main: "#2ED573",
			contrastText: "#000000",
		},
		background: {
			default: "#FFFEF7", // Warm white
			paper: "#FFFFFF",
		},
		text: {
			primary: "#000000",
			secondary: "#333333",
		},
	},
	typography: {
		fontFamily: "var(--font-roboto)",
		h1: {
			fontWeight: 900,
			fontSize: "3rem",
			letterSpacing: "-0.02em",
			textTransform: "uppercase",
		},
		h2: {
			fontWeight: 800,
			fontSize: "2.5rem",
			letterSpacing: "-0.01em",
			textTransform: "uppercase",
		},
		h3: {
			fontWeight: 700,
			fontSize: "2rem",
			letterSpacing: "-0.01em",
		},
		h4: {
			fontWeight: 700,
			fontSize: "1.5rem",
		},
		h5: {
			fontWeight: 600,
			fontSize: "1.25rem",
		},
		h6: {
			fontWeight: 600,
			fontSize: "1rem",
		},
		button: {
			fontWeight: 700,
			textTransform: "uppercase",
			letterSpacing: "0.5px",
		},
		body1: {
			fontWeight: 500,
		},
		body2: {
			fontWeight: 400,
		},
	},
	shape: {
		borderRadius: 0, // Sharp corners for brutalist look
	},
	shadows: [
		"none",
		"4px 4px 0px #000000", // Thick, offset shadows
		"6px 6px 0px #000000",
		"8px 8px 0px #000000",
		"10px 10px 0px #000000",
		"12px 12px 0px #000000",
		"14px 14px 0px #000000",
		"16px 16px 0px #000000",
		"18px 18px 0px #000000",
		"20px 20px 0px #000000",
		"22px 22px 0px #000000",
		"24px 24px 0px #000000",
		"26px 26px 0px #000000",
		"28px 28px 0px #000000",
		"30px 30px 0px #000000",
		"32px 32px 0px #000000",
		"34px 34px 0px #000000",
		"36px 36px 0px #000000",
		"38px 38px 0px #000000",
		"40px 40px 0px #000000",
		"42px 42px 0px #000000",
		"44px 44px 0px #000000",
		"46px 46px 0px #000000",
		"48px 48px 0px #000000",
		"50px 50px 0px #000000",
	],
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					textTransform: "uppercase",
					fontWeight: 700,
					padding: "12px 24px",
					transition: "all 0.1s ease",
					"&:hover": {
						transform: "translate(-2px, -2px)",
						boxShadow: "6px 6px 0px #000000",
					},
					"&:active": {
						transform: "translate(0px, 0px)",
						boxShadow: "2px 2px 0px #000000",
					},
				},
				contained: {
					boxShadow: "4px 4px 0px #000000",
					"&:hover": {
						boxShadow: "6px 6px 0px #000000",
					},
				},
				outlined: {
					backgroundColor: "#FFFFFF",
					"&:hover": {
						backgroundColor: "#F5F5F5",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "8px 8px 0px #000000",
					transition: "all 0.2s ease",
					"&:hover": {
						transform: "translate(-2px, -2px)",
						boxShadow: "12px 12px 0px #000000",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					border: "2px solid #000000",
					borderRadius: 0,
					boxShadow: "4px 4px 0px #000000",
				},
				elevation1: {
					boxShadow: "4px 4px 0px #000000",
				},
				elevation2: {
					boxShadow: "6px 6px 0px #000000",
				},
				elevation3: {
					boxShadow: "8px 8px 0px #000000",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						border: "3px solid #000000",
						borderRadius: 0,
						backgroundColor: "#FFFFFF",
						"&:hover": {
							"& .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
						},
						"&.Mui-focused": {
							"& .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
							boxShadow: "4px 4px 0px #000000",
							transform: "translate(-1px, -1px)",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					border: "2px solid #000000",
					borderRadius: 0,
					fontWeight: 600,
					textTransform: "uppercase",
					fontSize: "0.75rem",
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "4px 4px 0px #000000",
					fontWeight: 600,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "0px 4px 0px #000000",
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					border: "4px solid #000000",
					borderRadius: 0,
					boxShadow: "12px 12px 0px #000000",
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "4px 4px 0px #000000",
					"&:before": {
						display: "none",
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					backgroundColor: "#FFFFFF",
					padding: "12px 16px",
					fontWeight: 500,
					transition: "all 0.1s ease",
					"&:hover": {
						transform: "translate(-1px, -1px)",
						boxShadow: "3px 3px 0px #000000",
					},
					"&.Mui-focused": {
						transform: "translate(-2px, -2px)",
						boxShadow: "4px 4px 0px #000000",
					},
				},
				input: {
					padding: "0 !important",
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					backgroundColor: "#FFFFFF",
					fontWeight: 600,
					"&:hover": {
						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
					},
					"&.Mui-focused": {
						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
						boxShadow: "4px 4px 0px #000000",
						transform: "translate(-1px, -1px)",
					},
					"& .MuiOutlinedInput-notchedOutline": {
						border: "none",
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					textTransform: "uppercase",
					padding: "12px 16px",
					"&:hover": {
						backgroundColor: "#FF6B35",
						color: "#000000",
						transform: "translate(-1px, -1px)",
					},
					"&.Mui-selected": {
						backgroundColor: "#4ECDC4",
						color: "#000000",
						"&:hover": {
							backgroundColor: "#45B7AF",
						},
					},
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "8px 8px 0px #000000",
					marginTop: "4px",
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "8px 8px 0px #000000",
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: "#000000",
					color: "#FFFFFF",
					border: "2px solid #FFFFFF",
					borderRadius: 0,
					fontSize: "0.875rem",
					fontWeight: 600,
					padding: "8px 12px",
					boxShadow: "4px 4px 0px #FFFFFF",
				},
				arrow: {
					color: "#000000",
					"&:before": {
						border: "1px solid #FFFFFF",
					},
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					width: 60,
					height: 40,
					padding: 0,
					"& .MuiSwitch-switchBase": {
						padding: 3,
						transform: "translateX(3px)",
						"&.Mui-checked": {
							transform: "translateX(23px)",
							"& + .MuiSwitch-track": {
								backgroundColor: "#4ECDC4",
								border: "3px solid #000000",
							},
							"& .MuiSwitch-thumb": {
								backgroundColor: "#000000",
							},
						},
					},
					"& .MuiSwitch-thumb": {
						backgroundColor: "#000000",
						width: 30,
						height: 30,
						border: "2px solid #FFFFFF",
						borderRadius: 0,
						boxShadow: "2px 2px 0px #666666",
					},
					"& .MuiSwitch-track": {
						backgroundColor: "#CCCCCC",
						border: "3px solid #000000",
						borderRadius: 0,
						opacity: 1,
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					border: "2px solid #000000",
					borderRadius: 0,
					backgroundColor: "#FFFFFF",
					color: "#000000",
					padding: "6px",
					"&:hover": {
						backgroundColor: "#F5F5F5",
						transform: "translate(-1px, -1px)",
						boxShadow: "2px 2px 0px #000000",
					},
					"&.Mui-checked": {
						backgroundColor: "#4ECDC4",
						color: "#000000",
						"&:hover": {
							backgroundColor: "#45B7AF",
						},
					},
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					border: "2px solid #000000",
					borderRadius: 0,
					backgroundColor: "#FFFFFF",
					color: "#000000",
					padding: "6px",
					"&:hover": {
						backgroundColor: "#F5F5F5",
						transform: "translate(-1px, -1px)",
						boxShadow: "2px 2px 0px #000000",
					},
					"&.Mui-checked": {
						backgroundColor: "#FF6B35",
						color: "#000000",
						"&:hover": {
							backgroundColor: "#E55A2B",
						},
					},
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color: "#FF6B35",
					height: 8,
					"& .MuiSlider-track": {
						border: "2px solid #000000",
						borderRadius: 0,
						backgroundColor: "#FF6B35",
						height: 8,
					},
					"& .MuiSlider-rail": {
						border: "2px solid #000000",
						borderRadius: 0,
						backgroundColor: "#CCCCCC",
						height: 8,
					},
					"& .MuiSlider-thumb": {
						height: 24,
						width: 24,
						borderRadius: 0,
						backgroundColor: "#000000",
						border: "3px solid #FFFFFF",
						boxShadow: "3px 3px 0px #666666",
						"&:hover": {
							boxShadow: "4px 4px 0px #666666",
							transform: "translate(-1px, -1px)",
						},
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					borderBottom: "3px solid #000000",
					"& .MuiTabs-indicator": {
						backgroundColor: "#FF6B35",
						height: 4,
						bottom: -3,
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: "uppercase",
					fontWeight: 700,
					fontSize: "1rem",
					padding: "16px 24px",
					color: "#666666",
					border: "3px solid transparent",
					borderBottom: "none",
					"&:hover": {
						backgroundColor: "#F5F5F5",
						color: "#000000",
						transform: "translateY(-2px)",
					},
					"&.Mui-selected": {
						color: "#000000",
						backgroundColor: "#FFFFFF",
						border: "3px solid #000000",
						borderBottom: "3px solid #FFFFFF",
						marginBottom: "-3px",
					},
				},
			},
		},
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					height: 12,
					borderRadius: 0,
					border: "2px solid #000000",
					backgroundColor: "#CCCCCC",
				},
				bar: {
					borderRadius: 0,
					backgroundColor: "#4ECDC4",
				},
			},
		},
		MuiCircularProgress: {
			styleOverrides: {
				root: {
					color: "#FF6B35",
				},
				circle: {
					strokeLinecap: "square",
				},
			},
		},
		MuiSnackbar: {
			styleOverrides: {
				root: {
					"& .MuiSnackbarContent-root": {
						border: "3px solid #000000",
						borderRadius: 0,
						boxShadow: "6px 6px 0px #000000",
						backgroundColor: "#000000",
						color: "#FFFFFF",
						fontWeight: 600,
						textTransform: "uppercase",
					},
				},
			},
		},
		MuiBadge: {
			styleOverrides: {
				badge: {
					border: "2px solid #000000",
					borderRadius: 0,
					backgroundColor: "#FF4757",
					color: "#FFFFFF",
					fontWeight: 700,
					textTransform: "uppercase",
					fontSize: "0.7rem",
					minWidth: "20px",
					height: "20px",
					boxShadow: "2px 2px 0px #000000",
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "4px 4px 0px #000000",
					fontWeight: 700,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					border: "2px solid #000000",
					borderRadius: 0,
					backgroundColor: "#FFFFFF",
					color: "#000000",
					padding: "8px",
					transition: "all 0.1s ease",
					"&:hover": {
						backgroundColor: "#F5F5F5",
						transform: "translate(-2px, -2px)",
						boxShadow: "4px 4px 0px #000000",
					},
					"&:active": {
						transform: "translate(0px, 0px)",
						boxShadow: "1px 1px 0px #000000",
					},
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "6px 6px 0px #000000",
					transition: "all 0.1s ease",
					"&:hover": {
						transform: "translate(-2px, -2px)",
						boxShadow: "8px 8px 0px #000000",
					},
					"&:active": {
						transform: "translate(0px, 0px)",
						boxShadow: "3px 3px 0px #000000",
					},
				},
			},
		},
		MuiTableContainer: {
			styleOverrides: {
				root: {
					border: "3px solid #000000",
					borderRadius: 0,
					boxShadow: "6px 6px 0px #000000",
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: "#4ECDC4",
					"& .MuiTableCell-head": {
						fontWeight: 800,
						textTransform: "uppercase",
						fontSize: "0.9rem",
						color: "#000000",
						borderBottom: "3px solid #000000",
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottom: "2px solid #000000",
					fontWeight: 600,
					padding: "16px",
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					"&:nth-of-type(even)": {
						backgroundColor: "#FFFEF7",
					},
					"&:hover": {
						backgroundColor: "#FF6B35",
						color: "#000000",
						transform: "translateX(2px)",
						transition: "all 0.1s ease",
					},
				},
			},
		},
	},
});

export default theme;
