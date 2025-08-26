/**
 * Type indicating success, mandatorily having a error message if !success.
 */
export type SuccessOrError = { success: boolean; errorMessage?: string };
