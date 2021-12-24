import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { NzModalService } from "ng-zorro-antd/modal";
import { Employee } from "src/app/model/employee.model";
import { AppService } from "src/app/service/app.service";
import { ActionTypes } from "src/app/store/app.action";
import { selectGetEmployeesResult } from "src/app/store/app.selector";
import { AppState } from "src/app/store/app.state";
import { NewEmployeeComponent } from "../new-employee/new-employee.component";

@Component({
    selector: 'emp-center',
    templateUrl: './emp-center.component.html',
    styleUrls: ['./emp-center.component.scss']
})
export class EmpCenterComponent implements OnInit {
    employeeList: ReadonlyArray<Employee>;
    checked = false;
    loading = false;
    indeterminate = false;
    listOfCurrentPageData: ReadonlyArray<Employee> = [];
    setOfCheckedId = new Set<string>();
    selected: Employee;
    constructor(private store: Store<AppState>, private service: AppService,
        private modal: NzModalService, private viewContainerRef: ViewContainerRef, private router: Router) {

    }
    ngOnInit(): void {
        const currentUser = localStorage.getItem('user');
        if (!currentUser || currentUser !== 'admin') {
            this.router.navigateByUrl('/login');
        }
        this.store.dispatch(ActionTypes.getEmployees());
        this.store.pipe(select(selectGetEmployeesResult)).subscribe(
            (data) => {
                if (data) {
                    this.employeeList = data;
                    if (this.selected) {
                        this.selected = this.employeeList.find(x => x.id === this.selected.id);
                    }
                }
            }
        )
    }
    addEmployee(): void {
        const modal = this.modal.create({
            nzTitle: 'Add Employee',
            nzContent: NewEmployeeComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
                mode: 'add'
            },
            nzFooter: []
        });
        const instance = modal.getContentComponent();
        modal.afterClose.subscribe(result => {
            if (result && result.data === 0) {
                this.store.dispatch(ActionTypes.getEmployees());
            }
        });
    }
    deleteEmployees() {
        const list = Array.from(this.setOfCheckedId);
        this.modal.warning({
            nzTitle: 'Are you sure you want to delete?',
            nzOnOk: () => {
                this.service.deleteEmployees(list).subscribe(
                    (data: any) => {
                        if (data.rspCde === 0) {
                            this.modal.closeAll();
                            this.selected = undefined;
                            this.setOfCheckedId.clear();
                            this.store.dispatch(ActionTypes.getEmployees());
                        }
                        else console.log('Delete Employee failed: ' + data.rspMsg);
                    },
                    (error: Error) => {
                        console.log('Delete Employee: ', error);
                    }
                )
            },
            nzOnCancel: () => {
                this.modal.closeAll();
            }
        });

    }
    logout() {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
    }

    //Below are all table related functions

    updateCheckedSet(id: string, checked: boolean): void {
        checked ? this.setOfCheckedId.add(id) : this.setOfCheckedId.delete(id);
    }

    onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Employee>): void {
        this.listOfCurrentPageData = listOfCurrentPageData;
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        this.checked = this.listOfCurrentPageData.every(({ id }) => this.setOfCheckedId.has(id));
        this.indeterminate = this.listOfCurrentPageData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    }

    onItemChecked(id: string, checked: boolean): void {
        this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
    }

    onAllChecked(checked: boolean): void {
        this.listOfCurrentPageData.forEach(({ id }) => this.updateCheckedSet(id, checked));
        this.refreshCheckedStatus();
    }

    sendRequest(): void {
        this.loading = true;
        const requestData = this.employeeList.filter(data => this.setOfCheckedId.has(data.id));
        console.log(requestData);
        setTimeout(() => {
            this.setOfCheckedId.clear();
            this.refreshCheckedStatus();
            this.loading = false;
        }, 1000);
    }
    setSelected(employee: Employee): void {
        this.selected = employee;
    }
    idSort() {
        return (a: Employee, b: Employee) => a.id.localeCompare(b.id);
    }
    nameSort() {
        return (a: Employee, b: Employee) => a.name.localeCompare(b.name);
    }
    roleSort() {
        return (a: Employee, b: Employee) => a.role.localeCompare(b.role);
    }
    levelSort() {
        return (a: Employee, b: Employee) => a.level - b.level;
    }
    departmentSort() {
        return (a: Employee, b: Employee) => a.department.localeCompare(b.department);
    }
}