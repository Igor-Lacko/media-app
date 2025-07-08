import WatchStatus from "@shared/enum/watch-status";

export default function WatchStatusAdapter(watchStatus: WatchStatus): string {
    switch (watchStatus) {
        case WatchStatus.COMPLETED:
            return "Completed";
        case WatchStatus.NOT_WATCHED:
            return "Not watched yet";
        case WatchStatus.WATCHING:
            return "Currently watching";
        case WatchStatus.PLAN_TO_WATCH:
            return "Plan to watch";
    }
}
