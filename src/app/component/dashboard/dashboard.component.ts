import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { NzModalService } from "ng-zorro-antd/modal";
import { Employee } from "src/app/model/employee.model";
import { Review } from "src/app/model/review.model";
import { ActionTypes } from "src/app/store/app.action";
import { selectGetPendingReviewResult, selectGetReviewResult } from "src/app/store/app.selector";
import { AppState } from "src/app/store/app.state";
import { ReviewComponent } from "../review/review.component";

@Component({
    selector: 'dashboard-comp',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    myprofile: Employee = {
        id: "60a30cf7ff7a544d5c2c11d8",
        name: '金村美玖',
        role: 'UI/UX Designer',
        level: 2,
        department: 'H',
        avatar: '/assets/member_photos/miku.jpg'
    }
    today: Date;
    dateOfWeek: string;
    reviews: Review[];
    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef, private store: Store<AppState>, private router: Router) {

    }
    ngOnInit(): void {
        const currentUser = localStorage.getItem('user');
        if (!currentUser || currentUser !== 'demo') {
            this.router.navigateByUrl('/login');
        }
        this.today = new Date();
        setInterval(() => {
            this.today = new Date();
        }, 1000);
        this.store.dispatch(ActionTypes.getPendingReviews({ id: this.myprofile.id }));
        this.store.pipe(select(selectGetPendingReviewResult)).subscribe(
            (data) => {
                if (data) this.reviews = data;
            }
        )
    }
    logout() {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
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
            this.store.dispatch(ActionTypes.getPendingReviews({ id: this.myprofile.id }));
        });
    }
    ngOnDestroy() {
        clearInterval();
    }
}