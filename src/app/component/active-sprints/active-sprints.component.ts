import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Sprint } from "src/app/model/sprint.model";
import { Story } from "src/app/model/story.model";
import { AppService } from "src/app/service/app.service";
import { AddSprintComponent } from "../add-sprint/add-sprint.component";
import { AddStoryComponent } from "../add-story/add-story.component";

@Component({
	selector: 'active-sprints-comp',
	templateUrl: './active-sprints.component.html',
	styleUrls: ['./active-sprints.component.scss']
})
export class ActiveSprintsComponent {
	sprints !: Sprint[];
	doneLoading: boolean = false;
	selectedSprint!: Sprint;
	openStories!: Story[];
	inProgressStories!: Story[];
	readyForTestStories!: Story[];
	completedStories!: Story[];

	constructor(public dialog: MatDialog, private service: AppService) {

	}
	ngOnInit(): void {
		this.service.getSprints().subscribe({
			next: (data: any) => {
				this.sprints = data.sprints.filter((sprint: any) => sprint.name !== 'backlog');
				if (data.sprints.length > 0) {
					this.selectedSprint = data.sprints[0];
					this.getStories(this.selectedSprint.name);
				}
			}
		})
	}
	getSprints() {
		this.service.getSprints().subscribe({
			next: (data: any) => {
				this.sprints = data.sprints.filter((sprint: any) => sprint.name === 'backlog');
				console.log(this.sprints);
				if (data.sprints.length > 0) {
					this.selectedSprint = data.sprints[0];
				}
			}
		})
	}
	getStories(sprintName: string) {
		this.service.getStories({ sprint: sprintName }).subscribe({
			next: (data: any) => {
				const stories = data.stories;
				this.openStories = stories.filter((x: any) => x.status === 'open');
				this.inProgressStories = stories.filter((x: any) => x.status === 'in_progress');
				this.readyForTestStories = stories.filter((x: any) => x.status === 'test_ready');
				this.completedStories = stories.filter((x: any) => x.status === 'completed');
				this.doneLoading = true;
			}
		})
	}
	drop(event: CdkDragDrop<Story[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			console.log('moving: ', event);
			const request = {
				sid: event.previousContainer.data[event.previousIndex].sid,
				status: event.container.id
			}
			this.service.updateStory(request).subscribe({
				next: (data) => {
					transferArrayItem(
						event.previousContainer.data,
						event.container.data,
						event.previousIndex,
						event.currentIndex,
					);
				}
			});
		}
	}
	newStory() {
		const dialog = this.dialog.open(AddStoryComponent, {
			width: '500px',
			height: '600px'
		})
		dialog.afterClosed().subscribe({
			next: (data) => {
				this.getStories(this.selectedSprint.name);
			}
		})
	}
	newSprint() {
		const dialog = this.dialog.open(AddSprintComponent, {
			width: '500px',
			height: '600px'
		});
		dialog.afterClosed().subscribe({
			next: (data) => {
				this.getSprints();
			}
		})
	}
	changeSprint() {
		this.doneLoading = false;
		this.getStories(this.selectedSprint.name);
	}
}