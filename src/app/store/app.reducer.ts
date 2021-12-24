import { Action, createReducer, on, State } from "@ngrx/store";
import { ActionTypes } from "./app.action";
import { AppState, initialAppState } from "./app.state";

export const reducer = createReducer(
    initialAppState,
    on(ActionTypes.getEmployees, (state, action) => ({
        ...state, getEmployeesResponse: null
    })),
    on(ActionTypes.getEmployeesSuccess, (state, action) => ({
        ...state, getEmployeesResponse: action.response
    })),
    on(ActionTypes.getEmployeesError, (state, action) => ({
        ...state, getEmployeesResponse: action.response
    })),

    on(ActionTypes.getReviews, (state, action) => ({
        ...state, getReviewResponse: null
    })),
    on(ActionTypes.getReviewsSuccess, (state, action) => ({
        ...state, getReviewResponse: action.response
    })),
    on(ActionTypes.getReviewsError, (state, action) => ({
        ...state, getReviewResponse: action.response
    })),

    on(ActionTypes.getFeedbacks, (state, action) => ({
        ...state, getFeedbackResponse: null
    })),
    on(ActionTypes.getFeedbacksSuccess, (state, action) => ({
        ...state, getFeedbackResponse: action.response
    })),
    on(ActionTypes.getFeedbacksError, (state, action) => ({
        ...state, getFeedbackResponse: action.response
    })),

    on(ActionTypes.getPendingReviews, (state, action) => ({
        ...state, getPendingReviewResponse: null
    })),
    on(ActionTypes.getPendingReviewsSuccess, (state, action) => ({
        ...state, getPendingReviewResponse: action.response
    })),
    on(ActionTypes.getPendingReviewsError, (state, action) => ({
        ...state, getPendingReviewResponse: action.response
    })),
);
export function AppReducer(state: AppState | undefined , action: Action) {
    return reducer(state, action);
}