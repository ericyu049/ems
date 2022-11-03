import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'delete-message',
    templateUrl: './delete-message.component.html',
    styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent{
    message: string = "Are you sure you want to delete ";
    constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

}