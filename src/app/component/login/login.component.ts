import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
    selector: 'login-comp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm !: FormGroup;
    returnUrl: string | null | undefined;

    constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private authService:AuthService) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
        this.activatedRoute.queryParamMap
            .subscribe(params => {
                this.returnUrl = params.get('returnUrl');
                console.log('LoginComponent/ngOnInit ' + this.returnUrl);
            });
    }
    login(): void {
        this.authService.login(this.loginForm.value).subscribe({
            next: (data: any) => {
                if (data.rspCde === 0) {
                    if (this.returnUrl != null) {
                        this.router.navigate([this.returnUrl]);
                    }
                    else {
                        this.router.navigate(['dashboard']);
                    }
                }
            },
            error: (error: HttpErrorResponse) => console.log('error: ', error),
            complete: () => console.log('request completed')
        })
    }
}