import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../config/constants';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 

@Injectable()
export class DemoServices {
    
    constructor(private http: HttpClient){}

    getObjects(url:string, id?:string){
        if(id === undefined || id === '')
            return this.http.get(`${Constants.api.url}${url}`);
        else 
            return this.http.get(`${Constants.api.url}${url}/${id}`);
    }

    postObjects(url:string, object:any){
        return this.http.post(`${Constants.api.url}${url}`, object, httpOptions);
    }


    deleteObject(url:string, id:any){
        return this.http.delete(`${Constants.api.url}${url}/${id}`);
    }

    updateObject(url:string, object:any){
        return this.http.put(`${Constants.api.url}${url}`,object, httpOptions);
    }
}