/**
 * Converts a length (of a movie, video, etc.) in seconds to a formatted time string (1 hour 25 minutes, etc.) to be used in headers.
 * @param length Length of the playable media item in seconds.
 * @returns Formatted time string.
 */
export function LengthToTimeHeader(length: number): string {
    console.debug(`Converting length ${length} to time header.`);
    if (length <= 0) {
        return "Unknown length";
    }

    const hours = Math.floor(length / 3600);
    const minutes = Math.floor((length % 3600) / 60);

    const minutesString = minutes !== 0 ? `${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}` : "";
    const hoursString = hours !== 0 ? `${hours === 1 ? `${hours} hour` : `${hours} hours`}` : "";

    let result = "";

    // Append each component to the result with commas as needed
    if (hoursString) {
        result += hoursString;
    }

    if (minutesString) {
        if (result) {
            result += ", ";
        }
        result += minutesString;
    }

    return result;
}

/**
 * Converts a length (of a movie, video, etc.) in seconds to a formatted time string (1:25:30, etc.) to be used in video controls.
 * @param length Length of the playable media item in seconds.
 * @returns Formatted time string.
 */
export function LengthToTimeVideo(length: number): string {
    if (length <= 0) {
        return "NaN"; // Should straight up never happen?
    }

    const hours = Math.floor(length / 3600);
    const minutes = Math.floor((length % 3600) / 60);
    const seconds = Math.floor(length % 60);

    const hoursString = hours !== 0 ? `${hours}:` : "";
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${hoursString}${minutesString}:${secondsString}`;
}