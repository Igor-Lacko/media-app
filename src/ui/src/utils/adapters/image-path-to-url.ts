/**
 * Returns a URL to use in <img> tags from a file path or external URL.
 * @param fileUrl The file URL or path to convert.
 * @returns An object containing `isLocal` boolean and the `path` string.
 */
export default function ImagePathToURL(fileUrl?: string): { isLocal: boolean, path?: string,  } {
	if (!fileUrl) {
		return { isLocal: true, path: undefined };
	}

	// Could also test for file:// but DB insertion would have to be updated
	if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
		return { isLocal: false, path: fileUrl};
	}
	return { isLocal: true, path: `file://${fileUrl}` };
}