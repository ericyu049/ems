export interface AppState {
    getEmployeesResponse: any,
    getReviewResponse: any,
    getFeedbackResponse: any
    getPendingReviewResponse: any;
}
export const initialAppState: AppState = {
    getEmployeesResponse: null,
    getReviewResponse: null,
    getFeedbackResponse: null,
    getPendingReviewResponse: null

}