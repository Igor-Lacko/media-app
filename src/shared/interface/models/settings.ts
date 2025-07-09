
/**
 * Settings interface for application configuration.
 */
export interface Settings {
    darkMode: boolean;

    // Don't actually store it in the FE
    hasApiKey: boolean;
}

export default Settings;