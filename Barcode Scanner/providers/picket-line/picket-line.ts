 
import { Injectable } from '@angular/core';
import { HttpProxiProvider } from '../http-proxi/http-proxi';
import { URLProvider } from '../url/url';
import { MOCKPicketLineList } from '../../MOCK/mock-picket-line';
import { IPicketLine } from '../../models/picket-line';
import { CZLogger } from '../../Utility/czlogger';

/*
  Generated class for the PicketLineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PicketLineProvider {

  constructor(public http: HttpProxiProvider,
    private urlProvider :URLProvider) {

    console.log('Hello StrikeProvider Provider');
  }

  getList(strikeid) :Promise<[IPicketLine]> { 

    return this._getRemoteList(strikeid); 
  } 

  private _getMOCKList(strikeid) :Promise<[IPicketLine]> { 

    return new Promise((resolve, reject) => {

      try { 

         let data = MOCKPicketLineList.getList() 
         let list = <[IPicketLine]> data

          resolve(list) 

        } catch (error) {  
     
          reject(error); 
        } 
    });  
  } 

  private _getRemoteList(strikeid) :Promise<[IPicketLine]> { 

    return new Promise((resolve, reject) => {

      try { 

        this.http.get(this.urlProvider.picketLinesURL(strikeid)).then(data => {
 
           let picketList = <[IPicketLine]> data.data;
           let err = this._errorWithPicketLines(picketList);

           if (err == null) {

             CZLogger.log("PicketLineProvider._getRemoteList.strikeList " + JSON.stringify(picketList));
            resolve(picketList) 
           } else {

            CZLogger.log("PicketLineProvider._getRemoteList.err_1 " + JSON.stringify(err));
            reject(err); 
           }  
        });
      } catch (err) { 

        CZLogger.log("PicketLineProvider._getRemoteList.err_2 " + JSON.stringify(err));
        reject(this._errorWithError(err));  
      } 
    }); 
  } 

  private _errorWithError(error) :string { 
     
    return error;
  }

  private _errorWithPicketLines(strikes :[IPicketLine]) :string { 
     
    return null;
  }
}