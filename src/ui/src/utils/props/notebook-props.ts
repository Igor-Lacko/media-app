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

    // Function to update notes
    onUpdateNotes(notes: Note[]): Promise<Boolean>;

    // To close
    onClose(): void;
}