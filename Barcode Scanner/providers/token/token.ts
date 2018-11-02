 
import { Injectable } from '@angular/core';
import { LocalStorageProvider } from '../local-storage/local-storage';
import { URLProvider } from '../url/url';
import { HttpProxiProvider } from '../http-proxi/http-proxi';
import { IToken } from '../../models/token';
import { ILogin } from '../../models/login ';
import { LoginValidator } from '../../validators/loginValidator';
import { TokenValidator } from '../../validators/tokenValidator';
import { CZLogger } from '../../Utility/czlogger';

/*
  Generated class for the TokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class TokenProvider {

  constructor(public http: HttpProxiProvider,
              private urlProvider :URLProvider,
              private storage :LocalStorageProvider) {

    console.log('Hello TokenProvider Provider');
  }

  public getToken(login :ILogin) :Promise<IToken>  {
 
    return this._getRemoteToken(login);  
  }

  private _getMOCKToken(login :ILogin) :Promise<IToken>  {
 
    return new Promise((resolve, reject) => {

      try {   
  
        let error = new LoginValidator(login).getErrorMeaaage()

        CZLogger.log("TokenProvider.getToken.2" + JSON.stringify(error));
        if (error) { reject(error); return; } 
 
        if (this.http.is(login)) { resolve(HttpProxiProvider.current); return; }
         
        if (login.username != "admin" || login.password != "strikeadmin") {
          reject("invalid username"); return;
        }

        let token = new IToken();
 
          token.username = login.username;
          token.password = login.password;
          HttpProxiProvider.current = token; 
          resolve(token); 
          } catch (error) {  
    
            CZLogger.log("TokenProvider.getToken.catch_1" + JSON.stringify(error)); 
            reject(error); 
          } 
    }); 
  }


  private _getRemoteToken(login :ILogin) :Promise<IToken>  {
 
    return new Promise((resolve, reject) => {

      try {   
 
        let error = new LoginValidator(login).getErrorMeaaage()

        CZLogger.log("TokenProvider.getToken.2" + JSON.stringify(error));
        if (error) { reject(error); return; } 
 
        if (this.http.is(login)) { resolve(HttpProxiProvider.current); return; }

        let body = {
          username : login.username,
          password : login.password
        }
        this.http.post(this.urlProvider.authURL(), {}, body).then(data => {
 
          CZLogger.log("TokenProvider.getToken.data" + JSON.stringify(data)); 

          let token = <IToken> data.data
 
          let tokenError = new TokenValidator(token).getErrorMeaaage(); 
          if (tokenError) { reject(tokenError); return; }

          token.Username = login.username;
          token.Password = login.password;
          HttpProxiProvider.current = token; 
          
          resolve(token); 
        }).catch(error => {

          let token = <IToken> error.data
          CZLogger.log("TokenProvider.getToken.catch" + JSON.stringify(error));
          reject(new TokenValidator(token).getErrorMeaaage()); 
        }) 
          } catch (error) {  
    
            CZLogger.log("TokenProvider.getToken.catch_1" + JSON.stringify(error)); 
            reject(error); 
          } 
    }); 
  }  
}
