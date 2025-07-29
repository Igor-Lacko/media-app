import prisma from "db/db";
import Settings from "@shared/interface/models/settings";
import axios, { AxiosError } from "axios";

/**
 * Deletes the entire database.
 * @returns A promise that resolves to true if the database was successfully deleted, false otherwise.
 */
export async function NukeDatabase(): Promise<boolean> {
	try {
		await prisma.$transaction([
			prisma.movie.deleteMany(),
			prisma.show.deleteMany(),
			prisma.course.deleteMany(),
		]);

		// Reset OMDB key
		await prisma.settings.updateMany({
			data: {
				omdbApiKey: null,
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Verifies the provided OMDB API key by making a mock request to the OMDB API.
 * @param omdbKey The OMDB API key to verify.
 * @returns A promise that resolves to true if the key is valid, false otherwise.
 */
async function VerifyApiKey(
	omdbKey: string,
): Promise<{ success: boolean; errorMessage?: string }> {
	try {
		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=${omdbKey}&t=${encodeURIComponent(
				"Interstellar",
			)}`,
		);

		return {
			success: response.data.Response === "True",
			errorMessage: response.data.Error || undefined,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as { Error?: string };
			return {
				success: false,
				errorMessage:
					(errorResponse && errorResponse.Error) || error.message,
			};
		}

		return {
			success: false,
			errorMessage:
				"An unexpected error occurred while verifying the API key",
		};
	}
}

/**
 * Fetches the current settings from the database, or creates default settings if none exist.
 * @returns A promise that resolves to the current settings.
 */
export async function GetSettings(): Promise<Settings> {
	try {
		const settings = await prisma.settings.findFirst();
		if (settings) {
			return {
				darkMode: settings.darkMode,
				hasApiKey:
					settings.omdbApiKey !== null &&
					settings.omdbApiKey !== undefined,
				tvShowProgressInEpisodes: settings.episodeProgressInEpisodes,
				showMarkdownPreview: settings.showPreviewInMarkdown,
				showExternalImages: settings.allowExternalImages,
			};
		}

		// Create default
		await prisma.settings.create({
			data: {
				omdbApiKey: null,
			},
		});

		return {
			darkMode: true,
			hasApiKey: false,
			tvShowProgressInEpisodes: false,
			showMarkdownPreview: false,
			showExternalImages: false,
		};
	} catch (error) {
		throw new Error("Could not fetch settings");
	}
}

/**
 * Toggles the dark mode setting in the database.
 * @param darkMode The desired state of dark mode (true for enabled, false for disabled).
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateDarkMode(darkMode: boolean): Promise<boolean> {
	try {
		// UpdateMany is fine, there is only one row
		await prisma.settings.updateMany({
			data: {
				darkMode: darkMode,
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Updates the OMDB key in the database and validates it with the OMDB API.
 * @param omdbKey Key to be set in the database.
 * @returns An object indicating success or failure, with an optional error message (api key invalid, internet connection error, etc).
 */
export async function UpdateOMDBKey(
	omdbKey: string,
): Promise<{ success: boolean; errorMessage?: string }> {
	// Verify the key first
	const keyVerifyStatus = await VerifyApiKey(omdbKey);
	if (!keyVerifyStatus.success) {
		return { success: false, errorMessage: keyVerifyStatus.errorMessage };
	}

	try {
		await prisma.settings.updateMany({
			data: {
				omdbApiKey: omdbKey,
			},
		});
		return { success: true };
	} catch (error) {
		return { success: false, errorMessage: error instanceof Error ? error.message : "Unknown error" };
	}
}

/**
 * Deletes the OMDB key from the database.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteOMDBKey(): Promise<boolean> {
	return await prisma.settings
		.updateMany({
			data: {
				omdbApiKey: null,
			},
		})
		.then(() => true)
		.catch(() => false);
}

/**
 * Updates the display of TV show progress in episodes or seasons.
 * @param inEpisodes True if the progress should be displayed in episodes, false for seasons.
 * @returns A promise that resolves to true if the update was successful, false otherwise.
 */
export async function UpdateProgressDisplay(
	inEpisodes: boolean,
): Promise<boolean> {
	return await prisma.settings
		.updateMany({
			data: {
				episodeProgressInEpisodes: inEpisodes,
			},
		})
		.then(() => true)
		.catch(() => false);
}

/**
 * Updates the markdown preview setting in the database.
 * @param showPreview True if the markdown preview should be shown, false otherwise.
 * @returns A promise that resolves to true if the update was successful, false otherwise.
 */
export async function UpdateMarkdownPreview(
	showPreview: boolean,
): Promise<boolean> {
	return await prisma.settings
		.updateMany({
			data: {
				showPreviewInMarkdown: showPreview,
			},
		})
		.then(() => true)
		.catch(() => false);
}

/**
 * Allows showing external images as thumbnails instead of local files.
 * @param allowExternalImages True if external images should be allowed, false otherwise.
 * @returns A promise that resolves to true if the update was successful, false otherwise.
 */
export async function UpdateExternalImages(
	allowExternalImages: boolean,
): Promise<boolean> {
	return await prisma.settings
		.updateMany({
			data: {
				allowExternalImages: allowExternalImages,
			},
		})
		.then(() => true)
		.catch(() => false);
}