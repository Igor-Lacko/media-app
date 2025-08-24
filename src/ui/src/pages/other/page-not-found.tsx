/**
 * Shows a 404 Not Found page. Might be unused?
 * @param param0 Error message to display
 * @returns A 404 Not Found page
 */
export default function NotFoundPage({ message }: { message: string }) {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full p-4">
			<h1 className="text-2xl font-bold">404 - Not Found</h1>
			<p className="mt-2 text-lg">{message}</p>
		</div>
	);
}
