import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { select } from "@ngrx/store";
import { NzModalRef } from "ng-zorro-antd/modal";
import { Employee } from "src/app/model/employee.model";
import { FeedBack } from "src/app/model/feedback.model";
import { Review } from "src/app/model/review.model";
import { AppService } from "src/app/service/app.service";
import { ActionTypes } from "src/app/store/app.action";
import { selectGetEmployeesResult, selectGetFeedbackResult } from "src/app/store/app.selector";
import { AppState } from "src/app/store/app.state";

@Component({
    selector: 'review-comp',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnChanges {
    @Input() review: Review;
    participants: string[];
    editMode: boolean = false;
    employees: ReadonlyArray<Employee>;
    selectedValue = [];
    feedbacks: FeedBack[] = [];
    inputRating = 0;
    inputValue: '';
    myDetail: Employee;
    isAdmin: boolean = false;
    target: Employee;
    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
    constructor(private service: AppService, private modal: NzModalRef, private store: Store<AppState>) {

    }
    ngOnInit(): void {
        const currentUser = localStorage.getItem('user');
        if (currentUser && currentUser === 'admin') {
            this.myDetail = {
                id: '60a43fe27af42773f1e9c12a',
                name: '佐々木久美',
                department: 'H',
                role: 'CEO',
                level: 1,
                avatar: '/assets/member_photos/kumi.jpg'
            }
            this.isAdmin = true;
        }
        else if (currentUser && currentUser === 'demo') {
            this.myDetail = {
                id: '60a30cf7ff7a544d5c2c11d8',
                name: '金村美玖',
                department: 'H',
                role: 'UI/UX Designer',
                level: 2,
                avatar: '/assets/member_photos/miku.jpg'
            }
            this.isAdmin = false;
        }
        this.init();
    }
    ngOnChanges(): void {
        this.init();
    }
    init() {
        this.participants = this.review.participants.map(p => p.name);
        this.store.dispatch(ActionTypes.getEmployees());
        this.store.pipe(select(selectGetEmployeesResult)).subscribe(
            (data: Employee[]) => {
                if (data) {
                    this.target = data.find(x => x.id === this.review.targetId);
                    this.employees = data.filter(x => x.id !== this.review.targetId);
                }
            }
        );
        this.review.participants.forEach(x => {
            this.selectedValue.push(x);
        });
        this.store.dispatch(ActionTypes.getFeedbacks({ rid: this.review.rid }));
        this.store.pipe(select(selectGetFeedbackResult)).subscribe(
            (data: FeedBack[]) => {
                if (data) {
                    this.feedbacks = data;
                }
            }
        )
    }
    confirm() {
        this.service.closeReview(this.review.rid).subscribe(
            (data: any) => {
                if (data.rspCde === 0) {
                    console.log('Closed review success');
                    this.modal.destroy({ data: 0 });
                }
                else console.log('Close review failed: ', data.rspMsg);
            },
            (error: Error) => {
                console.log('Error: ', error);
            }

        )
    }
    cancel() {

    }
    switchUpdate() {
        this.editMode = true;
    }
    saveParticipants() {
        this.service.updateParticipants(this.review.rid, this.selectedValue).subscribe(
            (data: any) => {
                if (data.rspCde === 0) {
                    this.participants = this.selectedValue.map(p => p.name);
                    this.editMode = false;
                }
                else console.log('Update participants failed: ', data.rspMsg);
            },
            (error: Error) => {
                console.log('Error: ', error);
            }
        )
    }
    saveFeedback() {
        const request = {
            rid: this.review.rid,
            message: this.inputValue,
            rating: this.inputRating,
            from: this.myDetail,
            completed_date: new Date()
        }
        this.service.saveFeedback(request).subscribe(
            (data: any) => {
                if (data.rspCde === 0){
                    this.inputRating = undefined;
                    this.inputValue = '';
                    this.store.dispatch(ActionTypes.getFeedbacks({ rid: this.review.rid }));
                }
                else console.log('Error: ', data.rspMsg);
            },
            (error: Error) => {
                console.log('Error: ', error);
            }
        )
    }
}