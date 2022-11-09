import { Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/service/auth.service";

@Component({
    selector: 'top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit{
    isLoggedin: boolean = false;
    isAdmin: boolean = false;
    currentRoute = '';
    constructor(private router: Router, private authService: AuthService) {
        
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.authService.isAdmin().subscribe({
                    next: (data: any) => this.isAdmin = (data.rspCde === 0),
                    error: (error) => { this.isAdmin = false } 
                })
                this.currentRoute = event.url;          
            }
        });
    }
    logout() {
    }
}