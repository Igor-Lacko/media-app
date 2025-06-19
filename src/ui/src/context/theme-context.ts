import { createContext } from 'react';
import Theme from 'utils/enum/theme';

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
    {
        theme: Theme.Light,
        setTheme: () => {}
    }
);

export default ThemeContext;