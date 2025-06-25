import WatchStatus from "@shared/enum/watch-status";

export default function watchStatusAdapter(watchStatus: WatchStatus): string {
    switch (watchStatus) {
        case WatchStatus.WATCHED:
            return "Finished";
        case WatchStatus.UNWATCHED:
            return "Not watched yet";
        case WatchStatus.WATCHING:
            return "Currently watching";
    }
}
