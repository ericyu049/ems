import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { Employee } from "src/app/model/employee.model";
import { AppService } from "src/app/service/app.service";

// Can be used as both add new or edit exisiting employee

@Component({
    selector: 'new-employee',
    templateUrl: './new-employee.component.html',
    styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
    @Input() mode: string;
    @Input() data: Employee;
    validateForm!: FormGroup;
    screen: number = 0;
    constructor(private fb: FormBuilder, private service: AppService, private modal: NzModalRef) { }
    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            role: [null, [Validators.required]],
            level: [null, [Validators.required]],
            department: [null, [Validators.required]],
            avatar: [null, [Validators.required]],
        });
        if (this.data && this.mode === 'edit') {
            Object.keys(this.data).forEach(x => {
                if (x !== 'id') this.validateForm.controls[x].setValue(this.data[x]);
            });
        }
    }
    submitForm(value): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.mode === 'add') {
            this.service.addEmployee(value).subscribe(
                (result: any) => {
                    if (result.rspCde === 0) {
                        this.screen = 1;
                    }
                    else this.screen = 2;
                },
                (error: Error) => {
                    this.screen = 2;
                    console.log('Add employee error: ', error);
                }
            )
        }
        else if (this.mode === 'edit') {
            value.id = this.data.id;
            this.service.updateEmployee(this.data.id, value).subscribe(
                (result: any) => {
                    if (result.rspCde === 0) {
                        this.screen = 1;
                    }
                    else this.screen = 2;
                },
                (error: Error) => {
                    this.screen = 2;
                    console.log('Edit employee error: ', error);

                }
            )
        }
    }
    closeModal() {
        this.modal.destroy({ data: 0 });
    }
    back() {
        this.screen = 0;
    }
}