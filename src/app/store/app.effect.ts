import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppService } from "../service/app.service";
import { ActionTypes } from "./app.action";
@Injectable()
export class AppEffects {
    constructor(private actions: Actions, private service: AppService) {

    }
    getEmployees = createEffect(() =>
        this.actions.pipe(
            ofType(ActionTypes.getEmployees),
            switchMap(action =>
                this.service.getEmployees().pipe(
                    map((data: any) => {
                        if (data.rspCde === 0)
                            return ActionTypes.getEmployeesSuccess({ response: data.rspMsg });
                        else return ActionTypes.getEmployeesError({ response: data.rspMsg });
                    }),
                    catchError((error: Error) => {
                        return of(ActionTypes.getEmployeesError({ response: error }));
                    })
                )
            )
        )
    );
    getReviews = createEffect(() =>
        this.actions.pipe(
            ofType(ActionTypes.getReviews),
            switchMap(action =>
                this.service.getReviews(action.id).pipe(
                    map((data: any) => {
                        if (data.rspCde === 0) {
                            return ActionTypes.getReviewsSuccess({ response: data.rspMsg });
                        }
                        else return ActionTypes.getReviewsError({ response: data.rspMsg });
                    }),
                    catchError((error: Error) => {
                        return of(ActionTypes.getReviewsError({ response: error }));
                    })
                )
            )
        )
    );
    getFeedbacks = createEffect(() =>
        this.actions.pipe(
            ofType(ActionTypes.getFeedbacks),
            switchMap(action =>
                this.service.getFeedbacks(action.rid).pipe(
                    map((data: any) => {
                        if (data.rspCde === 0)
                            return ActionTypes.getFeedbacksSuccess({ response: data.rspMsg });
                        else return ActionTypes.getFeedbacksError({ response: data.rspMsg });
                    }),
                    catchError((error: Error) => {
                        return of(ActionTypes.getFeedbacksError({ response: error }));
                    })
                )
            )
        )
    );
    getPendingReviews = createEffect(() =>
        this.actions.pipe(
            ofType(ActionTypes.getPendingReviews),
            switchMap(action =>
                this.service.getPendingReviews(action.id).pipe(
                    map((data: any) => {
                        if (data.rspCde === 0)
                            return ActionTypes.getPendingReviewsSuccess({ response: data.rspMsg });
                        else return ActionTypes.getPendingReviewsError({ response: data.rspMsg });
                    }),
                    catchError((error: Error) => {
                        return of(ActionTypes.getPendingReviewsError({ response: error }));
                    })
                )
            )
        )
    );
}