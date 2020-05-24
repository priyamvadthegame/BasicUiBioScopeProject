import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'imageurlwr'}) export class CompleteImageUrlWr implements PipeTransform
{ 
    transform(value:Array<any>): string
    {       let baseUrl="https://image.tmdb.org/t/p/w500"
            return `${baseUrl}${value}`;
    }   
}
