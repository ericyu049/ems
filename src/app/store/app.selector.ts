import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const getAppState = (state: any) => state.ems;
export const selectGetEmployeesResult = createSelector(getAppState, (state: AppState) => state.getEmployeesResponse);
export const selectGetReviewResult = createSelector(getAppState, (state: AppState) => state.getReviewResponse);
export const selectGetFeedbackResult = createSelector(getAppState, (state: AppState) => state.getFeedbackResponse);
export const selectGetPendingReviewResult = createSelector(getAppState, (state: AppState) => state.getPendingReviewResponse);
