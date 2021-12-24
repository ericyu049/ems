import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { NzModalRef } from "ng-zorro-antd/modal";
import { Employee } from "src/app/model/employee.model";
import { AppService } from "src/app/service/app.service";
import { selectGetEmployeesResult } from "src/app/store/app.selector";
import { AppState } from "src/app/store/app.state";

@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html',
    styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
    @Input() target;
    employees: ReadonlyArray<Employee>;
    selectedValue;
    today;
    screen = 0;
    constructor(private store: Store<AppState>, private service: AppService, private modal: NzModalRef) {
    }
    ngOnInit(): void {
        this.store.pipe(select(selectGetEmployeesResult)).subscribe(
            (data: Employee[]) => {
                if (data) {
                    this.employees = data.filter(x => x.id !== this.target.id);
                }
            }
        )
        this.today = new Date();
    }
    submit() {
        const request = {
            targetId: this.target.id,
            assignedDate: this.today,
            completed: false,
            participants: this.selectedValue,
            feedbacks: []
        }
        this.service.addReview(request).subscribe(
            (result: any) => {
                if (result.rspCde === 0) {
                    this.screen = 1;
                }
                else this.screen = 2;
            },
            (error) => {
                console.log('Error adding review: ', error);
                this.screen = 2;
            }
        )
    }
    closeModal() {
        this.modal.destroy({ data: 0 });
    }
    back() {
        this.screen = 0;
    }
}