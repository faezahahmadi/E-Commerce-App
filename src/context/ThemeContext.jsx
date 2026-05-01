import { createContext, useContext, useMemo, useReducer } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";


const themeContext = createContext();

const initialState = {
    mode: "dark",
    view: "grid"
}
const appReducer = (state, action) => {
    switch (action.type) {
        case "ToggleMode":
            return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
        case "ToggleView":
            return { ...state, view: state.view === "grid" ? "list" : "grid" };
        default:
            return state;
    }
}

export const ThemeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: state.mode,
                ...(state.mode === "dark"
                    ? {
                        primary: {
                            main: "#0f3d2e",
                            light: "#298d6c",
                            dark: "#0a2a20",
                            contrastText: "#e8f5e9"
                        },
                        secondary: {
                            main: '#4CAF50',
                        },
                        background: {
                            default: '#0B0F0E',
                            paper: '#121917',
                        },
                        text: {
                            primary: '#E8F5E9',
                            secondary: '#A5D6A7',
                            disabled: '#5C6F68',
                        },
                        divider: 'rgba(76, 175, 80, 0.2)',

                    }
                    : {

                        //  LIGHT MODE
                        primary: {
                            main: '#2ECC71',
                            light: '#58D68D',
                            dark: '#1E8449',
                            contrastText: '#FFFFFF',
                        },
                        secondary: {
                            main: '#0F3D2E',
                        },
                        background: {
                            default: '#F6FBF8',
                            paper: '#FFFFFF',
                        },
                        text: {
                            primary: '#1B2B25',
                            secondary: '#4F6F65',
                            disabled: '#9BB3AA',
                        },
                        divider: 'rgba(0, 0, 0, 0.08)',
                    }),
                typography: {
                    fontFamily: `'Inter', 'Roboto', sans-serif`,
                    h1: { fontWeight: 700 },
                    h2: { fontWeight: 700 },
                    h3: { fontWeight: 600 },
                    h4: { fontWeight: 600 },
                    h5: { fontWeight: 500 },
                    h6: { fontWeight: 500 },
                    body1: { fontSize: '1rem' },
                    body2: { fontSize: '0.875rem' },
                    button: {
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                },
                shape: {
                    borderRadius: 12,
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                transition: 'all 0.3s ease',
                            },
                        },
                    },

                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                border:
                                    state.mode === 'dark'
                                        ? '1px solid rgba(76, 175, 80, 0.15)'
                                        : '1px solid rgba(0,0,0,0.06)',
                                boxShadow:
                                    state.mode === 'dark'
                                        ? '0 4px 20px rgba(0,0,0,0.5)'
                                        : '0 4px 12px rgba(0,0,0,0.05)',
                            },
                        },
                    },


                }
            }
        }, [state.mode])
    })

    return <themeContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </themeContext.Provider>


}
export function useThemeContext() {
    return useContext(themeContext);
}
