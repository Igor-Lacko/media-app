
/**
 * Settings interface for application configuration.
 */
export interface Settings {
    darkMode: boolean;

    // Don't actually store it in the FE
    hasApiKey: boolean;

    // E.g. 27/100 episodes vs 2/10 seasons
    tvShowProgressInEpisodes: boolean;

    // Show preview in markdown
    showMarkdownPreview: boolean;
}

export default Settings;