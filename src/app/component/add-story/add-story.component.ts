import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { map, Observable } from "rxjs";
import { Employee } from "src/app/model/employee.model";
import { Sprint } from "src/app/model/sprint.model";
import { Story } from "src/app/model/story.model";
import { AppService } from "src/app/service/app.service";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'add-story',
    templateUrl: './add-story.component.html',
    styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit {
    addStoryForm !: FormGroup;
    employees!: Employee[];
    employees$!: Observable<Employee[]>;
    sprints$!: Observable<Sprint[]>;

    constructor(private fb: FormBuilder, private serivce: AppService, public dialog: MatDialogRef<AddStoryComponent>) { }
    get isValid() { return this.addStoryForm.valid; }

    ngOnInit(): void {
        this.addStoryForm = this.fb.group({
            sprint: [null, [Validators.required]],
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            priority: [null, [Validators.required]],
            employee: [null, [Validators.required]]
        });
        this.employees$ = this.serivce.getEmployees().pipe( map((response:any) => response.employees));
        this.sprints$ = this.serivce.getSprints().pipe( map((response:any) => response.sprints));
        
    }
    addStory() {
        const request: Story = {
            sid: uuidv4(),
            status: 'open',
            sprint: this.addStoryForm.value.sprint,
            title: this.addStoryForm.value.title,
            description: this.addStoryForm.value.description,
            priority: +this.addStoryForm.value.priority,
            employee: this.addStoryForm.value.employee
        }
        this.serivce.addStory(request).subscribe({
            next: (data) => {
                this.dialog.close();
            }
        })
    }
}