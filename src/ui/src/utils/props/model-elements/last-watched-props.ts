import LastWatched from "@shared/interface/last-watched";

/**
 * Props for a carousel component.
 */
export default interface LastWatchedProps {
    models: LastWatched[];
    extraClassNames?: string;
    childExtraClassNames?: string;
}