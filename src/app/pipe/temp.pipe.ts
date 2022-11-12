import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'temp' })
export class TempPipe implements PipeTransform {
    transform(value: number, unit: string): string {
        if (unit === 'F') {
            return Math.round(1.8 * (value - 273) + 32) + 'F' ;
        }
        else if (unit === 'C') {
            return Math.round(value - 273.15) + 'C';
        }
        else return '';
    }
}