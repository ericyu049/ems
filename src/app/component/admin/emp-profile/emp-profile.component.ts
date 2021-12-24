import { Component, Input, OnChanges, OnInit, ViewContainerRef } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { NzModalService } from "ng-zorro-antd/modal";
import { Employee } from "src/app/model/employee.model";
import { Review } from "src/app/model/review.model";
import { ActionTypes } from "src/app/store/app.action";
import { selectGetReviewResult } from "src/app/store/app.selector";
import { AppState } from "src/app/store/app.state";
import { ReviewComponent } from "../../review/review.component";
import { AddReviewComponent } from "../add-review/add-review.component";
import { NewEmployeeComponent } from "../new-employee/new-employee.component";

@Component({
    selector: 'emp-profile',
    templateUrl: './emp-profile.component.html',
    styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit, OnChanges {
    @Input() selected: Employee;
    reviews: Review[];
    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef, private store: Store<AppState>) { }
    ngOnInit(): void {
        this.store.pipe(select(selectGetReviewResult)).subscribe(
            (data) => {
                if (data) {
                    this.reviews = data;
                }
            }
        )
    }
    ngOnChanges(): void {
        // refreshes reviews table when selected employee is changed from emp-center
        this.store.dispatch(ActionTypes.getReviews({ id: this.selected.id }));
    }
    updateEmployee(): void {
        const modal = this.modal.create({
            nzTitle: 'Update Employee Information',
            nzContent: NewEmployeeComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                mode: 'edit',
                data: this.selected
            },
            nzFooter: []
        });
        const instance = modal.getContentComponent();
        modal.afterClose.subscribe(result => {
            if (result && result.data === 0) {
                this.store.dispatch(ActionTypes.getEmployees());
            }
        });
    }
    openReview(data): void {
        const modal = this.modal.create({
            nzTitle: 'Performance Review',
            nzContent: ReviewComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                review: data
            },
            nzFooter: []
        });
        const instance = modal.getContentComponent();
        modal.afterClose.subscribe(result => {
            this.store.dispatch(ActionTypes.getReviews({ id: this.selected.id }));
        });
    }
    addReview() {
        const modal = this.modal.create({
            nzTitle: 'Add a Review',
            nzContent: AddReviewComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                target: this.selected
            },
            nzFooter: []
        });
        const instance = modal.getContentComponent();
        modal.afterClose.subscribe(result => {
            if (result && result.data === 0) {
                this.store.dispatch(ActionTypes.getReviews({ id: this.selected.id }));
            }
        });
    }
}