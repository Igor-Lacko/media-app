import CardDisplayable from "@shared/interface/card-displayable";
import DetailFillable from "@shared/interface/detail-fillable";
import { title } from "process";
import DetailProps from "utils/props/detail/detail-props";

/**
 * Returns detail props from a model.
 * @param model Model to extract detail props from.
 * @param submedia Optional submedia to display in the detail layout.
 * @note The submedia could have been a detailFillable property, but the queries would have to be rewritten. TODO?
 * @returns Detail properties for the detail layout.
 */
export default function useDetail<T extends DetailFillable>(model: T, submedia? : CardDisplayable[]) : DetailProps {
    return {
        model: model,
        submedia: submedia,
        title: model.title,
        hasT
    }
}