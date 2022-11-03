import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priority' })
export class PriorityPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 1) {
            return '#0F9D58';
        }
        else if (value === 2) {
            return '#FFDF00';
        }
        else if (value === 3) {
            return '#FFA91E'
        }
        else return '#DB4437'
    }
}