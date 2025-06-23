import SettingsContext from "context/settings-context";
import { useContext } from "react";

import ToggleOption from "components/options/toggle-option";
import InputOption from "components/options/input-option";

export default function SettingsPage() {
    const { settings, setSettings } = useContext(SettingsContext);
    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-start p-4 m-0 space-y-4"}
        >
            <ToggleOption
                title="Dark Mode"
                checked={settings.darkMode}
                onChange={(checked: boolean) => setSettings({ ...settings, darkMode: checked })}
            />
            <InputOption
                title={"sdaadsads"}
                placeholder={"Enter your name"}
                onChange={(value: string) => console.log(value)}
            />
        </div>
    );
}