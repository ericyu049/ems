import { createAction, props } from "@ngrx/store";

const getEmployees = createAction('[Get Employees] Get Employees');
const getEmployeesSuccess = createAction('[Get Employees] Get Employees Success', props<{ response }>());
const getEmployeesError = createAction('[Get Employees] Get Employees Error', props<{ response }>());

const getReviews = createAction('[Get Reviews] Get Reviews', props<{ id }>());
const getReviewsSuccess = createAction('[Get Reviews] Get Reviews Success', props<{ response }>());
const getReviewsError = createAction('[Get Reviews] Get Reviews Error', props<{ response }>());

const getFeedbacks = createAction('[Get Feedbacks] Get Feedbacks', props<{ rid }>());
const getFeedbacksSuccess = createAction('[Get Feedbacks] Get Feedbacks Success', props<{ response }>());
const getFeedbacksError = createAction('[Get Feedbacks] Get Feedbacks Error', props<{ response }>());

const getPendingReviews = createAction('[Get PendingReviews] Get PendingReviews', props<{ id }>());
const getPendingReviewsSuccess = createAction('[Get PendingReviews] Get PendingReviews Success', props<{ response }>());
const getPendingReviewsError = createAction('[Get PendingReviews] Get PendingReviews Error', props<{ response }>());

export const ActionTypes = {
    getEmployees,
    getEmployeesSuccess,
    getEmployeesError,
    getReviews,
    getReviewsSuccess,
    getReviewsError,
    getFeedbacks,
    getFeedbacksSuccess,
    getFeedbacksError,
    getPendingReviews,
    getPendingReviewsSuccess,
    getPendingReviewsError
}