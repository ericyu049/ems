import { Component, Input, OnInit } from "@angular/core";
import { Employee } from "src/app/model/employee.model";
import { Feedback } from "src/app/model/feedback.model";
import { AppService } from "src/app/service/app.service";

@Component({
    selector: 'feedback-comp',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
    @Input() feedback!: Feedback;
    employee!: Employee;
    doneLoading: boolean = false;
    avatarStyle: any = {};
    constructor(private service: AppService) {
        
    }
    ngOnInit(): void {
        this.service.getEmployee(this.feedback.from).subscribe({
            next: (data: any) => {
                this.employee = data.employee[0];
                this.avatarStyle = {
                    'width': '40px',
                    'height': '40px',
                    'background-image' : 'url(\'' + this.employee.avatar + '\')',
                    'background-position': 'center',
                    'background-size': 'contain',
                    'border-radius': '100%',
                    'margin': '10px 15px',

                }
                this.doneLoading = true;
            }
        })
    }

}