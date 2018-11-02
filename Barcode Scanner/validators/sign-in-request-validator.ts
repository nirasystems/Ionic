import { SignInRequest } from "../models/last-sign-in";
 
export class SignInRequestValidator { 
     
    constructor(public request :SignInRequest) {
        
    }

    public getErrorMeaaage() { 
 
        let request = this.request;

        if (request === undefined) {
            return "Invalid request";
        }

        if (request === null) {
            return "Invalid request";
        }
 
        if (request.strikeId === undefined) {
            return "Invalid Strike Id";
        }
        if (request.strikeId === null) {
            return "Invalid Strike Id";
        }

        if (request.memberId === undefined) {
            return "Invalid Member Id";
        }
        if (request.memberId === null) {
            return "Invalid Member Id";
        }
  
        if (request.strikeId.length < 1) {
            return "Invalid Strike Id";
        }
 
        if (request.memberId.length < 1) {
            return "Invalid Member Id";
        } 
 
        return null;
    }
}