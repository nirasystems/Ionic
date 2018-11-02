import { ILogin } from "../models/login ";
 
export class LoginValidator { 
     
    constructor(public login :ILogin) {
        
    }

    public getErrorMeaaage() { 
 
        let username = this.login.username;

        if (this.login === undefined) {
            return "please enter the username and password";
        }
        if (this.login === null) {
            return "please enter the username and password";
        }
 
        if (username === undefined) {
            return "Invalid username name";
        }

        if (username === null) {
            return "Invalid username name";
        }

        if (username.length < 2) {
            return "Invalid username name";
        }

        let password = this.login.password;

        if (password === undefined) {
            return "Invalid password";
        }
        
        if (password === null) {
            return "Invalid password";
        }

        if (password.length < 2) {
            return "Invalid password";
        }
 
        return null;
    }
}