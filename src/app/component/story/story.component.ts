import { Component, Input } from "@angular/core";
import { Story } from "src/app/model/story.model";

@Component({
    selector: 'story-comp',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss']
})
export class StoryComponent{
    @Input() size!: string;
    @Input() story!: Story;
    
}