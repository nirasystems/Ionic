import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTPSerializer, HTTPResult } from './http-seralizer';
import { CZLogger } from '../../Utility/czlogger';
import { File as IonicFileService } from '@ionic-native/file';
import { IToken } from '../../models/token';
import { ILogin } from '../../models/login ';

@Injectable()
export class HttpProxiProvider {

  public serializer: HTTPSerializer;
  private static token = "";

  public static current: IToken = new IToken();

  constructor(
    public http: HttpClient) {

    this.serializer = new HTTPSerializer();
  }

  public className(): string {
    return "BrowserHTTP";
  }

  private _authHeader() {

    let token = HttpProxiProvider.current;
    if (token == undefined) { return null; }
    if (token == null) { return null; }

    if (!token.username) return null;
    if (token.username === null) return null;
    if (token.username.length < 2) return null;

    if (!token.password) return null;
    if (token.password === null) return null;
    if (token.password.length < 2) return null;

    return btoa(token.username + ":" + token.password)
  }


  public is(login: ILogin) {

    let token = HttpProxiProvider.current;
    if (token.username == undefined || token.password == undefined) return false
    if (token.username == null || token.password == null) return false

    if (token.username == login.username) return true
    if (token.password == login.password) return true

    return false
  }

  private _tokenizedHeaderOf(headers: {}) {

    if (headers === undefined || headers === null) { headers = {}; }

    let encode = this._authHeader();

    if (encode != null) {
      headers["Authorization"] = encode;
    }

    return headers;
  }

  public get(url: string, headers?: {}, params?: {}): Promise<HTTPResult> {

    return new Promise((resolve, reject) => {

      try {

        headers = this._tokenizedHeaderOf(headers);

        CZLogger.log("BrowserHTTP.post.get : " + url
          + " headers " + JSON.stringify(headers) +
          " body " + JSON.stringify(params));

        const httpOptions = { headers: new HttpHeaders(headers), params: new HttpParams(params) };

        this.http.get(url, httpOptions).subscribe(data => {

          resolve(this.serializer.resultWithData(data));
        }, err => {

          CZLogger.log("BrowserHTTP.get.err : " + JSON.stringify(err));
          reject(this.serializer.resultWithError(err));
        });
      } catch (error) {

        CZLogger.log("BrowserHTTP.get.catch : " + JSON.stringify(error));
        reject(this.serializer.resultWithError(error));
      }
    });
  }

  public post(url: string, headers?: {}, body?: Object): Promise<HTTPResult> {


    return new Promise((resolve, reject) => {

      try {

        headers = this._tokenizedHeaderOf(headers);
        CZLogger.log("BrowserHTTP.post.url : " + url + " headers " + JSON.stringify(headers) + " body " + JSON.stringify(body));
        const httpOptions = { headers: new HttpHeaders(headers) };

        this.http.post(url, body, httpOptions).subscribe(data => {

          resolve(this.serializer.resultWithData(data));
        }, err => {

          CZLogger.log("BrowserHTTP.post.err : " + JSON.stringify(err));
          reject(this.serializer.resultWithError(err));
        });

      } catch (error) {

        CZLogger.log("BrowserHTTP.post.catch : " + JSON.stringify(error));
        reject(this.serializer.resultWithError(error));
      }
    });
  }

  public put(url: string, headers?: {}, body?: Object): Promise<HTTPResult> {


    return new Promise((resolve, reject) => {

      try {

        headers = this._tokenizedHeaderOf(headers);
        CZLogger.log("BrowserHTTP.put.url : " + url + " headers " + JSON.stringify(headers) + " body " + JSON.stringify(body));
        const httpOptions = { headers: new HttpHeaders(headers) };

        this.http.put(url, body, httpOptions).subscribe(data => {

          resolve(this.serializer.resultWithData(data));
        }, err => {

          reject(this.serializer.resultWithError(err));
        });

      } catch (error) {
        reject(this.serializer.resultWithError(error));
      }
    });
  }

  public delete(url: string, headers?: {}, params?: Object): Promise<HTTPResult> {


    return new Promise((resolve, reject) => {

      try {

        headers = this._tokenizedHeaderOf(headers);
        CZLogger.log("BrowserHTTP.delete.url : " + url + " headers " + JSON.stringify(headers) + " params " + JSON.stringify(params));
        const httpOptions = { headers: new HttpHeaders(headers), params: new HttpParams(params) };

        this.http.delete(url, httpOptions).subscribe(data => {

          resolve(this.serializer.resultWithData(data));
        }, err => {

          reject(this.serializer.resultWithError(err));
        });

      } catch (error) {
        reject(this.serializer.resultWithError(error));
      }
    });
  }
}