import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Employee } from "src/app/model/employee.model";
import { Review } from "src/app/model/review.model";
import { AppService } from "src/app/service/app.service";
import { AddReviewComponent } from "../add-review/add-review.component";
import { ReviewComponent } from "../review/review.component";

@Component({
    selector: 'employee-comp',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements AfterViewInit, OnChanges {
    @Input() employee!: Employee;
    columns: string[] = ['rid', 'assignedDate', 'completed'];
    selection = new SelectionModel<Review>(true, []);
    dataSource!: MatTableDataSource<Review>;
    doneLoading: boolean = false;
    showReview: boolean = false;
    selectedTab: number = 0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private service: AppService, public dialog: MatDialog) { }

    ngAfterViewInit(): void {
        
    }
    ngOnChanges() {
        this.doneLoading = false;
        this.selectedTab = 0;
        setTimeout(() => this.getReviews(), 1000);
    }
    getReviews(): void {
        this.service.getReviews(this.employee.id).subscribe({
            next: (data: any) => {
                this.dataSource = new MatTableDataSource(data.reviews);
                this.doneLoading = true;
                this.dataSource.paginator = this.paginator;
            }
        })
    }
    viewReview(review: Review): void {
        const dialogRef = this.dialog.open(ReviewComponent, {
            width: '900px',
            height: '80vh',
            data: review
        })
    }
    addReview() {
        const dialogRef = this.dialog.open(AddReviewComponent, {
            width: '450px',
            height: '400px',
            data: this.employee
        });
        dialogRef.afterClosed().subscribe({
            next: result => {
                if (result) this.getReviews();
            }
        })
    }
}