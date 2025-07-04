import Note from "@shared/interface/models/note";

/**
 * Notebook properties interface.
 */
export default interface NotebookProps {
    timestamp: number;
    isVisible: boolean;
    onUpdateNotes(notes: Note[]): Promise<Boolean>;
    onClose(): void;
}