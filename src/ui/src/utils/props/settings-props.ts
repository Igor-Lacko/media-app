import Settings from "@shared/interface/models/settings";

export interface SettingsContextProps {
    settings: Settings;
    setSettings: (settings: Settings) => void;
}