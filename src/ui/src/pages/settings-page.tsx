import SettingsContext from "context/settings-context";
import { useContext } from "react";

import SettingOption from "components/setting-option";
import Toggle from "components/toggle";

export default function SettingsPage() {
    const { settings, setSettings } = useContext(SettingsContext);
    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-start p-4 m-0 space-y-4"}
        >
            <SettingOption
                title={"Dark Mode"}
                component={
                    <Toggle
                        checked={settings.darkMode}
                        onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                    />
                }
            />
            <SettingOption
                title={"Other Settings"}
                component={<span className="text-gray-500">Coming soon...</span>}
            />
        </div>
    );
}