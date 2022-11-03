import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Employee } from "src/app/model/employee.model";
import { Review } from "src/app/model/review.model";
import { AppService } from "src/app/service/app.service";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html',
    styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
    name: string = '';
    addReviewForm!: FormGroup;
    date: Date = new Date();
    employees!: Employee[];
    doneLoading: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Employee, private fb: FormBuilder, private appService: AppService, public dialog: MatDialogRef<AddReviewComponent>) { }
    get isValid() { return this.addReviewForm.valid; }

    ngOnInit(): void {
        this.appService.getEmployees().subscribe({
            next: (data: any) => {
                this.employees = data.employees.filter((e: Employee) => e.id !== this.data.id);
                this.doneLoading = true;
            }
        })
        this.addReviewForm = this.fb.group({
            participants: [[], [Validators.required]],
        });
    }
    addReview() {
        const review: Review = {
            participants: this.addReviewForm.value.participants.join(),
            assignedDate: new Date(),
            targetId: this.data.id,
            completed: false,
            rid: uuidv4()
        }
        this.appService.addReview(review).subscribe({
            next: (data: any) => {
                this.dialog.close(true);
            }
        })
    }
}