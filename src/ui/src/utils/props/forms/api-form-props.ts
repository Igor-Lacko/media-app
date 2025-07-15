/**
 * Props for a form page to insert data from an API (OMDb/TVMaze).
 */
export default interface ApiFormProps {
	title: string;
	onSubmit: (
		title?: string,
		imdbId?: string,
	) => Promise<{ success: boolean; errorMessage?: string }>;
	placeholders: { title: string; imdbId: string };

	// Modal messages
	successModalTitle: string;
	successModalMessage: string;
	errorModalTitle: string;

	// Attribution
	attributionComponent: React.ReactNode;
}
