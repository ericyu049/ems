import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AppService } from "src/app/service/app.service";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'add-sprint',
    templateUrl: './add-sprint.component.html',
    styleUrls: ['./add-sprint.component.scss']
})
export class AddSprintComponent implements OnInit {
    addSprintForm!: FormGroup;

    constructor(private fb: FormBuilder, private service: AppService, public dialog: MatDialogRef<AddSprintComponent>) { }
    get isValid() { return this.addSprintForm.valid }

    ngOnInit(): void {
        this.addSprintForm = this.fb.group({
            name: [null, [Validators.required]],
            start: [null, [Validators.required]],
            end: [null, [Validators.required]]
        });
    }
    addSprint() {
        const request = { 
            sid: uuidv4(),
            ...this.addSprintForm.value
        };

        this.service.addSprint(request).subscribe({
            next: (data) => {
                this.dialog.close();
            }
        })
    }
}