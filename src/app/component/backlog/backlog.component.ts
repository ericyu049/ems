import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { map, Observable } from "rxjs";
import { Story } from "src/app/model/story.model";
import { AppService } from "src/app/service/app.service";
import { AddSprintComponent } from "../add-sprint/add-sprint.component";
import { AddStoryComponent } from "../add-story/add-story.component";

@Component({
	selector: 'backlog-comp',
	templateUrl: './backlog.component.html',
	styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

	columns: string[] = ['priority', 'title', 'description'];
	dataSource!: MatTableDataSource<Story>;
	doneLoading: boolean = false;
	length: number = 0;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(public dialog: MatDialog, private service: AppService) {

	}
	ngOnInit(): void {
		this.service.getStories({ sprint: 'Backlog' }).subscribe({
			next: (data: any) => {
				this.dataSource = new MatTableDataSource(data.stories);
				this.length = data.stories.length; 
				this.doneLoading = true;
				this.dataSource.paginator = this.paginator;
			}
		})
	}
	newStory() {
		const dialog = this.dialog.open(AddStoryComponent, {
			width: '500px',
			height: '600px'
		})
		dialog.afterClosed().subscribe({
			next: (data) => {
			}
		})
	}
}