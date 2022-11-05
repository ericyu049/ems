import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AppService } from "src/app/service/app.service";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
    name: string = '';
    addEmployeeForm !: FormGroup;

    constructor(private fb: FormBuilder, private appService: AppService, public dialog: MatDialogRef<AddEmployeeComponent>, private domSanitizer: DomSanitizer) { }
    get isValid() { return this.addEmployeeForm.valid; }
    fileName: string = '';
    url!: SafeResourceUrl;
    ngOnInit(): void {
        this.addEmployeeForm = this.fb.group({
            name: [null, [Validators.required]],
            level: [null, [Validators.required]],
            role: [null, [Validators.required]],
            department: [null, [Validators.required]],
        });
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/profile_default.jpeg');
    }
    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("thumbnail", file);
        }
    }

    addEmployee() {
        const employee = {
            ...this.addEmployeeForm.value,
            fff: 'ddd',
            id: uuidv4()
        }
        this.appService.addEmployee(employee).subscribe({
            next: (data: any) => {
                this.dialog.close(true);
            }
        })
    }
    cancel() {
        this.dialog.close(false);
    }
}