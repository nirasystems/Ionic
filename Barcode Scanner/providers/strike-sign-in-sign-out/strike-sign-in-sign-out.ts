

import { Injectable } from '@angular/core';
import { HttpProxiProvider } from '../http-proxi/http-proxi';
import { URLProvider } from '../url/url';
import { LocalStorageProvider } from '../local-storage/local-storage';
import { SignInRequest } from '../../models/last-sign-in';
import { SignInDataSet, SignInData, LastSignInData } from '../../models/last-sign-in-result';
import { CZLogger } from '../../Utility/czlogger';
import { StrikeSignIn } from '../../models/strike-sign-in';

/*
  Generated class for the StrikeSignInSignOutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StrikeSignInSignOutProvider {

  constructor(public http: HttpProxiProvider,
    private urlProvider: URLProvider,
    private storage: LocalStorageProvider) {


    console.log('Hello StrikeSignInSignOutProvider Provider');
  }

  getSignInStatus(request: SignInRequest): Promise<SignInDataSet> {

    return new Promise((resolve, reject) => {

      try {

        this._getRemoteSignIn(request).then(dataSet => {

          this._recentStrikeSignInList(request).then(list => {

            dataSet.lastSignInList = list.reverse();
            resolve(dataSet);

          }).catch(err => {

            resolve(dataSet);
          });
        }).catch(err => {

          reject(err);
        });
      } catch (error) {

        reject(this._errorWithError(error));
      }
    });
  }

  strikeSignIn(signInRequest: SignInRequest, strikeSignIn: StrikeSignIn): Promise<LastSignInData> {

    return this._remoteStrikeSignIn(signInRequest, strikeSignIn);
  }

  strikeSignOut(signInRequest: SignInRequest, strikeSignOut: LastSignInData): Promise<LastSignInData> {

    return this._remoteStrikeSignOut(signInRequest, strikeSignOut);
  }

  resentSignInList(signInRequest: SignInRequest): Promise<Array<LastSignInData>> {

    return this._recentStrikeSignInList(signInRequest);
  }

  private _getMOCKSignIn(): Promise<SignInDataSet> {

    return new Promise((resolve, reject) => {

      try {

      } catch (error) {

      }
    });
  }

  private _getRemoteSignIn(request: SignInRequest): Promise<SignInDataSet> {

    return new Promise((resolve, reject) => {

      try {

        this._getSignInData(request).then(signInData => {

          this._getLastSignInData(request, signInData).then(lastSignInData => {

            let dataSet = new SignInDataSet();
            dataSet.signInData = signInData;
            dataSet.lastSignInData = lastSignInData;

            resolve(dataSet);
          }).catch(err => {

            let dataSet = new SignInDataSet();
            dataSet.signInData = signInData;
            dataSet.lastSignInData = null;

            resolve(dataSet);
          });
        }).catch(err => {

          reject(this._errorWithError(err));
        });
      } catch (error) {

        reject(this._errorWithError(error));
      }
    });
  }

  private _remoteStrikeSignIn(signInRequest: SignInRequest, request: StrikeSignIn): Promise<LastSignInData> {

    return new Promise((resolve, reject) => {

      try {

        this.http.post(this.urlProvider.strikeSignedIn(), {}, request).then(data => {

          let lastSignInData = <LastSignInData>data.data;
          let err = this._errorWithLastSignInData(lastSignInData);

          if (err == null) {

            CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignIn.lastSignInData " + JSON.stringify(lastSignInData));
            this._addStrikeSignIn(signInRequest, lastSignInData).then(r => {

              resolve(lastSignInData)
            }).catch(e => {

              resolve(lastSignInData)
            });
          } else {

            CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignIn.err_1 " + JSON.stringify(err));
            reject(err);
          }
        }).catch(err => {

          CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignIn.err " + JSON.stringify(err));
          reject(this._errorWithError(err));
        });
      } catch (error) {


        CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignIn.error" + JSON.stringify(error));
        reject(this._errorWithError(error));
      }
    });
  }

  private _getSignInData(request: SignInRequest): Promise<SignInData> {

    return new Promise((resolve, reject) => {

      try {

        this.http.get(this.urlProvider.signedIn(request.strikeId, request.memberId)).then(data => {

          let signInData = <SignInData>data.data;
          let err = this._errorWithSignInData(signInData);

          if (err == null) {

            CZLogger.log("StrikeSignInSignOutProvider._getSignInData.signInData " + JSON.stringify(signInData));
            resolve(signInData)
          } else {

            CZLogger.log("StrikeSignInSignOutProvider._getSignInData.err_1 " + JSON.stringify(err));
            reject(err);
          }
        }).catch(err => {

          CZLogger.log("StrikeSignInSignOutProvider._getSignInData.err " + JSON.stringify(err));
          reject(err);
        });
      } catch (error) {

        CZLogger.log("StrikeSignInSignOutProvider._getSignInData.error" + JSON.stringify(error));
        reject(error);
      }
    });
  }

  private _getLastSignOutData(request: SignInRequest, signInData: SignInData): Promise<LastSignInData> {

    return this._getLastSignInData(request, signInData);
  }

  private _getLastSignInData(request: SignInRequest, signInData: SignInData): Promise<LastSignInData> {

    return new Promise((resolve, reject) => {

      try {

        this.http.get(this.urlProvider.lastSignedIn(request.strikeId, signInData.ID)).then(data => {

          let lastSignInData = <LastSignInData>data.data;
          let err = this._errorWithLastSignInData(lastSignInData);

          if (err == null) {

            CZLogger.log("StrikeSignInSignOutProvider._getLastSignInData.lastSignInData " + JSON.stringify(lastSignInData));
            resolve(lastSignInData)
          } else {

            CZLogger.log("StrikeSignInSignOutProvider._getLastSignInData.err_1 " + JSON.stringify(err));
            reject(err);
          }
        }).catch(err => {

          CZLogger.log("StrikeSignInSignOutProvider._getLastSignInData.err " + JSON.stringify(err));
          reject(err);
        });
      } catch (error) {

        CZLogger.log("StrikeSignInSignOutProvider._getLastSignInData.error" + JSON.stringify(error));
        reject(error);
      }
    });
  }

  private _remoteStrikeSignOut(signInRequest: SignInRequest, strikeSignOut: LastSignInData): Promise<LastSignInData> {

    return new Promise((resolve, reject) => {

      try {

        this.http.post(this.urlProvider.strikeSignedOut(), {}, strikeSignOut).then(data => {

          let lastSignInData = <LastSignInData>data.data;
          let err = this._errorWithLastSignInData(lastSignInData);

          if (err == null) {

            CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignOut.lastSignInData " + JSON.stringify(lastSignInData));
            this._addStrikeSignOut(signInRequest, lastSignInData).then(r => {

              resolve(lastSignInData)
            }).catch(e => {

              resolve(lastSignInData)
            });
          } else {

            CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignOut.err_1 " + JSON.stringify(err));
            reject(err);
          }
        }).catch(err => {

          CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignOut.err " + JSON.stringify(err));
          reject(this._errorWithError(err));
        });
      } catch (error) {

        CZLogger.log("StrikeSignInSignOutProvider._remoteStrikeSignOut.error" + JSON.stringify(error));
        reject(this._errorWithError(error));
      }
    });
  }


  private _recentStrikeSignInList(request: SignInRequest): Promise<Array<LastSignInData>> {

    return new Promise((resolve, reject) => {

      try {

        let id = this._idOfSignIn(request);

        this.storage.get(id).then(result => {

          let err = this._errorWithLastSignInDatas(result);

          if (err == null) {

            resolve(result);
          } else {

            let array = new Array<LastSignInData>();
            resolve(array);
          }
        }).then(err => {

          CZLogger.log("StrikeSignInSignOutProvider._resentStrikeSignInList.err" + JSON.stringify(err));
          reject(this._errorWithError(err));
        });
      } catch (error) {

        CZLogger.log("StrikeSignInSignOutProvider._resentStrikeSignInList.error" + JSON.stringify(error));
        reject(this._errorWithError(error));
      }
    });
  }

  private _addStrikeSignOut(request: SignInRequest, lastSignInData: LastSignInData): Promise<boolean> {

    return this._addStrikeSignIn(request, lastSignInData);
  }

  private _addStrikeSignIn(request: SignInRequest, lastSignInData: LastSignInData): Promise<boolean> {

    return new Promise((resolve, reject) => {

      try {

        this._recentStrikeSignInList(request).then(result_ => {

          let result = result_;

          if (result_.length >= 4) {

            let array = new Array<LastSignInData>()

            array.push(result_[0]);
            array.push(result_[1]);
            array.push(result_[2]);
            array.push(result_[3]);

            result = array;
          }

          result.push(lastSignInData);

          let id = this._idOfSignIn(request);
          this.storage.set(id, result).then(r => {

            CZLogger.log("StrikeSignInSignOutProvider._addStrikeSignIn.id " + JSON.stringify(lastSignInData));
            resolve(true);
          }).catch(err => {

            CZLogger.log("StrikeSignInSignOutProvider._addStrikeSignIn.err_1" + JSON.stringify(err));
            reject(false);
          })

        }).catch(err => {

          CZLogger.log("StrikeSignInSignOutProvider._addStrikeSignIn.err" + JSON.stringify(err));
          reject(false);
        });
      } catch (error) {

        CZLogger.log("StrikeSignInSignOutProvider._addStrikeSignIn.error" + JSON.stringify(error));
        reject(false);
      }
    });
  }

  private _idOfSignIn(request: SignInRequest): string {

    let id = "";

    if (request.isForSignIn == true) {

      id = "forSignIn_";
    } else {

      id = "forSignOut_";
    }

    let temp = request.strikeId;
    if (temp != undefined || temp != null || temp != "") {
      id = id + "_" + temp;
    }

    temp = "" + request.picketId;
    if (temp != undefined || temp != null || temp != "") {
      id = id + "_" + temp;
    }

    temp = "" + request.memberId;
    if (temp != undefined || temp != null || temp != "") {
      id = id + "_" + temp;
    }

    CZLogger.log("_idOfSignIn : " + id);
    return id;
  }


  private _errorWithLastSignInDatas(list: [LastSignInData]): string {

    if (list === undefined) return "not found";
    if (list === null) return "not found";

    if (list instanceof Array) {

      if (list.length < 1) {
        return "not found";
      }

      return null;
    }

    return null;
  }

  private _errorWithSignInData(signInData: SignInData): string {

    if (signInData["error"] === undefined) return null;
    if (signInData["error"] === null) return null;

    return signInData["error"];
  }

  private _errorWithLastSignInData(lastSignInData: LastSignInData): string {

    if (lastSignInData["error"] === undefined) return null;
    if (lastSignInData["error"] === null) return null;

    return lastSignInData["error"];
  }

  private _errorWithError(error): string {

    CZLogger.log("StrikeSignInSignOutProvider._errorWithError.error.error " + error);

    if (error == undefined) return "error";
    if (error["error"] == undefined) return error;
    if (error["error"] == null) return error;

    return error.error;

  }
}