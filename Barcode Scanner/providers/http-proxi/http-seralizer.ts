
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';  
 
 
@Injectable()
export class HTTPSerializer {
 
constructor( ) { } 
    
public resultWithData(data :any) :HTTPResult {

        let result = new HTTPResult(); 
        result.status =  data.status;
        result.headers =  data.headers;
        result.url =  data.url;
        result.data =  data.data;
        result.error =  data.error;
        
        if (result.data == null) {
            result.data =  data;
        }

        return result;
    }

    public resultWithError(error :any) :HTTPResult {

        let result = new HTTPResult();
        result.status =  error.status;
        result.headers =  error.headers;
        result.url =  error.url;
        result.data =  error.data;
        result.error =  error.error; 
        
        if (result.error == null) {
            result.error =  error;
        }
        return result;
    }
}

export class HTTPResult {

    status?: number; 
    headers?: any; 
    url?: string; 
    data?: any; 
    error?: string;
  } 
  
  export class HTTPHeaderField {
  
  constructor(public name: string, public value: string) { }
 
  }
  
  export class HTTPFormField {
      
    constructor(public name: string, public value: string) { }
  }