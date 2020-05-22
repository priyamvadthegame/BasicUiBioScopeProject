import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'imageurl'}) export class CompleteImageUrl implements PipeTransform
{ 
    transform(value: string): string
    {       let baseUrl="https://image.tmdb.org/t/p/w500"
            return `${baseUrl}${value}`;
    }   
}
