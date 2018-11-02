import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProxiProvider } from '../http-proxi/http-proxi';
import { URLProvider } from '../url/url';
import { IStrike } from '../../models/strike';
import { MOCKStrikeList } from '../../MOCK/mock-strike-list';
import { CZLogger } from '../../Utility/czlogger';

/*
  Generated class for the StrikeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StrikeProvider {

  constructor(public http: HttpProxiProvider,
    private urlProvider :URLProvider) {
    console.log('Hello StrikeProvider Provider');
  }

  getList() :Promise<[IStrike]> { 

    return this._getRemoteList();   
  } 

  private _getMOCKList() :Promise<[IStrike]> { 

    return new Promise((resolve, reject) => {

      try { 

        let data = MOCKStrikeList.getList() 
        let strikeList = <[IStrike]> data

          resolve(strikeList) 

          } catch (error) {  
     
            reject(error); 
          } 
    });  
  } 

  private _getRemoteList() :Promise<[IStrike]> { 

    return new Promise((resolve, reject) => {

      try { 

        this.http.get(this.urlProvider.strikesURL()).then(data => {
 
           let strikeList = <[IStrike]> data.data;
           let err = this._errorWithStrikes(strikeList);

           if (err == null) {

             CZLogger.log("StrikeProvider.getList.strikeList " + JSON.stringify(strikeList));
            resolve(strikeList) 
           } else {

            CZLogger.log("StrikeProvider.getList.err_1 " + JSON.stringify(err));
            reject(err); 
           }  
        });
      } catch (err) { 

        CZLogger.log("StrikeProvider.getList.err_2 " + JSON.stringify(err));
        reject(this._errorWithError(err));  
      } 
    });  
  } 

  private _errorWithError(error) :string { 
     
    return error;
  }

  private _errorWithStrikes(strikes :[IStrike]) :string { 
     
    return null;
  }
}