 
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class URLProvider {

  private BASE_URL = "http://54.70.159.0:8080/StrikeTEST/"

  constructor() {
    console.log('Hello UrlProvider Provider');
  }

  
  public authURL() {

    return this.buildWithPath("api/account/authenticate") 
  }

  public strikesURL() {

    return this.buildWithPath("api/strikes/current") 
  }

  public picketLinesURL(id) {

    return this.buildWithPath("api/strikepicketlines/strike/"+id) 
  }

  public lastSignedIn(strikeId, memberId) {

    return this.buildWithPath("api/strikewalk/strike/"+strikeId+"/memberid/"+memberId+"/latestsignin") 
  }
 
  public signedIn(strikeId, memberId) {

    return this.buildWithPath("api/strikemembers/strike/"+strikeId+"/memberid/"+memberId) 
  }

  public strikeSignedIn() {

    return this.buildWithPath("api/strikewalk/add") 
  }

  public strikeSignedOut() {

    return this.buildWithPath("api/strikewalk/update") 
  }

  private buildWithPath(endPoint :string) {

    return this.BASE_URL + endPoint
  }
}