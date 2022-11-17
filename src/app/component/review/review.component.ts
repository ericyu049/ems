import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Employee } from "src/app/model/employee.model";
import { Feedback } from "src/app/model/feedback.model";
import { Review } from "src/app/model/review.model";
import { AppService } from "src/app/service/app.service";
import { v4 as uuidv4 } from 'uuid';
import { AddReviewComponent } from "../add-review/add-review.component";

@Component({
    selector: 'review-comp',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    feedbackForm !: FormGroup;
    feedbacks !: Feedback[];
    doneLoading: boolean = false;
    employee!: Employee;
    get isValid() { return this.feedbackForm.valid; }
    constructor(@Inject(MAT_DIALOG_DATA) public data: Review, private fb: FormBuilder, private service: AppService, public dialog: MatDialogRef<ReviewComponent>) {

    }
    ngOnInit(): void {
        console.log(this.data);
        this.service.getEmployee(this.data.targetId).subscribe({
            next: (data: any) => {
                this.employee = data.employee[0];
                console.log('data: ', this.employee);
                this.getFeedbacks();
            }
        })
        this.feedbackForm = this.fb.group({
            feedback: [null, [Validators.required]],
        });

    }
    getFeedbacks() {
        this.service.getFeedbacks(this.data.rid).subscribe({
            next: (data: any) => {
                this.doneLoading = true;
                this.feedbacks = data.feedbacks;
            }
        })
    }
    submitFeedback() {
        const feedback: Feedback = {
            from: '',
            to: this.data.targetId,
            rating: 5,
            fid: uuidv4(),
            rid: this.data.rid,
            comment: this.feedbackForm.value.feedback
        }
        this.doneLoading = false;
        this.service.addFeedback(feedback).subscribe({
            next: (data: any) => {
                this.doneLoading = true;
                this.getFeedbacks();
                this.feedbackForm.markAsUntouched();
                this.feedbackForm.reset();
            }
        })
    }
    markComplete() {
        this.service.closeReview(this.data).subscribe({
            next: (data) => {
                this.dialog.close(true);
            }
        })
    }
}