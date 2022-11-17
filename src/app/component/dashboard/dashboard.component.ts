import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { filter, map, Observable, Subscription } from "rxjs";
import { Employee } from "src/app/model/employee.model";
import { Review } from "src/app/model/review.model";
import { AppService } from "src/app/service/app.service";
import { ReviewComponent } from "../review/review.component";

@Component({
    selector: 'dashboard-comp',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    today!: Date;
    stories$!: Observable<any>;
    weather: any;
    doneLoadingWeather: boolean = false;
    doneLoadingReviews: boolean = false;
    doneLoadingInfo: boolean = false;
    columns: string[] = ['rid', 'assignedDate', 'completed'];
    dataSource!: MatTableDataSource<Review>;
    myInfo!: Employee;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private service: AppService, public dialog:MatDialog) {
    }
    ngOnInit() {
        this.stories$ = this.service.getStoriesByEmployee().pipe(
            map((response: any) => response.stories.filter((story:any) => story.status !== "completed"))
        );
        this.service.getMyInfo().subscribe({
            next: (response: any) => {
                this.myInfo = response.info;
                console.log(this.myInfo);
                this.doneLoadingInfo = true;
            }
        });
        this.today = new Date();
        setInterval(() => {
            this.today = new Date();
        }, 1000);
        this.getReviews();
        this.getWeather();
    }
    getReviews(): void {
        this.service.getAssignedReviews().subscribe({
            next: (data: any) => {
                this.dataSource = new MatTableDataSource(data.reviews);
                this.dataSource.paginator = this.paginator;
                this.doneLoadingReviews = true;
            }
        })
    }
    viewReview(review: Review): void {
        const dialogRef = this.dialog.open(ReviewComponent, {
            width: '900px',
            height: '80vh',
            data: review
        })
        dialogRef.afterClosed().subscribe({
            next: result => {
                if (result) this.getReviews();
            }
        })
    }
    getWeather() {
        this.service.getPosition().then((position) => {
            this.service.getWeather(position.lat, position.lng).subscribe({
                next: (data) => {
                    this.weather = data;
                    this.doneLoadingWeather= true;
                }
            })
        });
    }
}