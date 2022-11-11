import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'dashboard-comp',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
    today!: Date;
    ngOnInit():void {
        this.today = new Date();
        setInterval(() => {
            this.today = new Date();
        }, 1000);
    }
}