import { createContext } from 'react';
import { SettingsContextProps } from 'utils/props/other/settings-props';

export const SettingsContext = createContext<SettingsContextProps>(
    {
        settings: {
            darkMode: false
        },
        setSettings: () => {}
    }
);

export default SettingsContext;