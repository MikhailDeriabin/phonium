import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import {createContext, useContext, useState, ReactNode} from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
    mode: ThemeMode;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#008C78',
            },
            background: {default: '#ffffff'},
            text: {primary: '#0C0C0C'},
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#B6DE9F'
            },
            background: {
                default: '#121212'
            },
            text: {
                primary: '#FDFFFC'
            },
        },
    });

    return (
        <ThemeContext.Provider value={{mode, toggleTheme}}>
            <MuiThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
