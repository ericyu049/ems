import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
    get isValid() { return this.feedbackForm.valid; }
    constructor(@Inject(MAT_DIALOG_DATA) public data: Review, private fb: FormBuilder, private service: AppService, public dialog: MatDialog) {

    }
    ngOnInit(): void {
        this.feedbackForm = this.fb.group({
            feedback: [null, [Validators.required]],
        });
        this.getFeedbacks();
    }
    getFeedbacks() {
        this.service.getFeedbacks(this.data.rid).subscribe({
            next: (data: any) => {
                console.log(data);
                this.doneLoading = true;
                this.feedbacks = data.feedbacks;
            }
        })
    }
    submitFeedback() {
        const feedback: Feedback = {
            from: '831ffbd4-980c-46ea-85a8-c4632ecc8366',
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

    }
}