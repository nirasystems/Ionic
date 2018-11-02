import { IToken } from "../models/token";
import { CZLogger } from "../Utility/czlogger";
 
export class TokenValidator { 
     
    constructor(public token :IToken) {
        
    }

    public getErrorMeaaage() { 
  
        CZLogger.log("TokenValidator.getErrorMeaaage.token" + JSON.stringify(this.token)); 
        if (this.token === undefined) {
            return "Invalid username";
        }

        if (this.token.success === undefined) {
            return "Invalid username";
        }

        if (this.token.success === false) {
            return "Invalid username";
        } 
 
        return null;
    }
}