import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Employee } from "src/app/model/employee.model";
import { AppService } from "src/app/service/app.service";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { MatDialog } from '@angular/material/dialog';
import { DeleteMessageComponent } from "../delete-message/delete-message.component";

@Component({
    selector: 'emp-center',
    templateUrl: './emp-center.component.html',
    styleUrls: ['./emp-center.component.scss']
})
export class EmployeeCenterComponent implements AfterViewInit {
    columns: string[] = ['select', 'name', 'department', 'role', 'level', 'id'];
    selection = new SelectionModel<Employee>(true, []);
    dataSource!: MatTableDataSource<Employee>;
    selectedEmployee!: Employee;
    doneLoading: boolean = false;
    showEmployee: boolean = false;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private service: AppService, public dialog: MatDialog) { }

    ngAfterViewInit(): void {
        this.getEmployees();
    }
    getEmployees() {
        this.service.getEmployees().subscribe({
            next: (data: any) => {
                this.dataSource = new MatTableDataSource(data.employees.filter((employee: any) => employee.name !== 'Andrew'));
                this.doneLoading = true;
                this.dataSource.paginator = this.paginator;
            }
        });
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }
    viewEmployee(employee: Employee): void {
        this.selectedEmployee = employee;
        this.showEmployee = true;
    }
    addEmployee() {
        const dialog = this.dialog.open(AddEmployeeComponent, {
            width: '450px',
            height: '700px',
            disableClose: true
        });
        dialog.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getEmployees();
                }
            }
        })
    }
    removeEmployee() {
        const dialog = this.dialog.open(DeleteMessageComponent, {
            width: '400px',
            height: '200px',
            data: this.selection.selected.map(employee => employee.name).join(',')
        })
        dialog.afterClosed().subscribe({
            next: result => {
                if (result) {
                    this.service.deleteEmployees(this.selection.selected).subscribe({
                        next: () => {
                            
                            this.getEmployees();
                            this.selection.clear();
                        }
                    })
                }
            }
        })

    }
}