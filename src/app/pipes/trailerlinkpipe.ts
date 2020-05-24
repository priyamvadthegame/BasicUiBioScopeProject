import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'trailer'}) export class CompleteTrailerUrl implements PipeTransform
{ 
    transform(value:Array<any>): string
    {       let baseUrl="https://www.youtube.com/embed/"
            let videoKey=""
            for(let i=0;i<value.length;i++)
            {
                if(value[i].videoType=="Trailer")
                {
                    videoKey=value[i].videoKey
                    break;
                }
            }
            console.log(`${baseUrl}${videoKey}`)
            return `${baseUrl}${videoKey}?autoplay=1`;
    }   
}
