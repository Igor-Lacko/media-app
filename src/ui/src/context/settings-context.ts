import { createContext } from 'react';
import { SettingsContextProps } from 'utils/props/settings-props';

export const SettingsContext = createContext<SettingsContextProps>(
    {
        settings: {
            darkMode: false
        },
        setSettings: () => {}
    }
);

export default SettingsContext;