import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'login-comp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        const currentUser = localStorage.getItem('user');

        if (currentUser && currentUser === 'admin') {
            this.router.navigateByUrl('/admin/empcenter');
        }
        else if (currentUser && currentUser === 'demo') {
            this.router.navigateByUrl('/user/dashboard');
        }
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });


    }

    submitForm(value): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (value.userName === 'admin' && value.password === '1234') {
            localStorage.setItem('user', value.userName);
            this.router.navigateByUrl('/admin/empcenter');
        }
        else if (value.userName === 'demo' && value.password === '9999') {
            localStorage.setItem('user', value.userName);
            this.router.navigateByUrl('/user/dashboard');
        }
    }
}