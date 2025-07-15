import DetailFillable from "@shared/interface/detail-fillable";

export interface DetailHeaderProps {
	model: DetailFillable;

	// Variables that can trigger a re-render
	rating?: number;
	description?: string;
	watchStatus?: string;
}
