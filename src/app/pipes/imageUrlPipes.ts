import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'imageurl'}) export class CompleteImageUrl implements PipeTransform
{ 
    transform(value:Array<any>): string
    {       let baseUrl="https://image.tmdb.org/t/p/w500"
            let posterurl=""
            for(let i=0;i<value.length;i++)
            {
                if(value[i].height>=300&&value[i].width>=300)
                {
                    posterurl=value[i].posterPath
                }
            }
            return `${baseUrl}${posterurl}`;
    }   
}
