import { Component, OnInit } from "@angular/core";
import { Sprint } from "src/app/model/sprint.model";
import { AppService } from "src/app/service/app.service";

@Component({
    selector: 'jira-comp',
    templateUrl: './jira.component.html',
    styleUrls: ['./jira.component.scss']
})
export class JiraComponent implements OnInit{
    
    selectedTab: number = 0;
    color = "primary";

    get selectedName() {
        if (this.selectedTab === 0) { return 'Active Sprints' }
        else if (this.selectedTab === 1) { return 'Backlogs' }
        else if (this.selectedTab === 2) { return 'Releases' }
        else if (this.selectedTab === 3) { return 'Project Details' }
        else if (this.selectedTab === 4) { return 'Project Settings' }
        return '';
    }
    constructor(private service: AppService){}

    ngOnInit(): void {
    }
    setSelected(num: number) {
        this.selectedTab = num;
    }
}