import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { Story } from "src/app/model/story.model";
import { AppService } from "src/app/service/app.service";

@Component({
    selector: 'project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
    totalStories$ !: Observable<any>;
    project$ !: Observable<any>;
    constructor(private service: AppService) { }

    ngOnInit(): void {
        this.project$ = this.service.getProject().pipe(map((response: any) => response.project));
        this.totalStories$ = this.service.getStories({}).pipe(map((response: any) => response.stories.length));
    }
}