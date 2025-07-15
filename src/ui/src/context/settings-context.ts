import Settings from "@shared/interface/models/settings";
import { createContext } from "react";
import { SettingsContextProps } from "utils/props/other/settings-props";

export const SettingsContext = createContext<SettingsContextProps>({
	settings: {
		darkMode: true,
		hasApiKey: false,
		tvShowProgressInEpisodes: false,
		showMarkdownPreview: false,
	},
	setSettings: async (settings: Settings) => {},
});

export default SettingsContext;
