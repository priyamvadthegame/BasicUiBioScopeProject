import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'desc'}) export class MovieDescription implements PipeTransform
{ 
    transform(value: string): string
    {   if(value.length>150)
        {  
            let substr=String(value).substr(0,150);
            return `${substr}......`;
        }
        else
        {
            return value
        }
    }   
}
