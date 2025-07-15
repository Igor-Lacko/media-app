import Note from "@shared/interface/models/note";

/**
 * Notebook properties interface.
 */
export default interface NotebookProps {
	// Current timestamp for the notes. Ref to reflect the video continuing when the notebook is open.
	timestamp: React.RefObject<number>;

	// Translate-Y
	isVisible: boolean;

	// Initial notes, used as state
	notes: Note[];

	// Functions to update notes
	onUpdateNotes(notes: Note[]): Promise<void>;
	onAddNote(note: Note): Promise<void>;

	// Function to handle clicking on a note (sets the video current time to the note's timestamp)
	onNoteClick(timestamp: number): void;

	// To close
	onClose(): void;
}
