import { useEffect, useState } from "react";

/**
 * Hook to determine if the application is online.
 * From https://react.dev/learn/reusing-logic-with-custom-hooks
 */
export default function useIsOnline() {
	const [isOnline, setIsOnline] = useState(true);
	useEffect(() => {
		function handleOnline() {
			setIsOnline(true);
		}
		function handleOffline() {
			setIsOnline(false);
		}
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);
	console.log(isOnline);
	return isOnline;
}
