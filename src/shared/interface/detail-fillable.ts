export interface DetailFillable {
    identifier?: number;
    title: string;
    rating?: number;
    thumbnailUrl?: string;
    videoUrl?: string;
    length?: number;
    description?: string;
    continueAt?: number;
}

export default DetailFillable;