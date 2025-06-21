import { createContext } from 'react';
import { SettingsContextProps } from 'utils/interface/props/settings-props';

export const SettingsContext = createContext<SettingsContextProps>(
    {
        settings: {
            darkMode: false
        },
        setSettings: () => {}
    }
);

export default SettingsContext;