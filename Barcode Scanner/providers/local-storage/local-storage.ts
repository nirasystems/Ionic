 
import { Injectable } from '@angular/core'; 
import { Storage } from '@ionic/storage';  

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {
LocalStorageProvider
  constructor(public storage: Storage) {
    console.log('Hello LocalStorageProvider Provider');
  }

  public driver() {
    return this.storage.driver;
  }

  public ready(): Promise<any> {
    return this.storage.ready();
  } 

  public get(key :string): Promise<any> {
    return this.storage.get(key);
  }

  public set(key :string, value :any): Promise<any> {
    return this.storage.set(key, value);
  }

  public remove(key :string): Promise<any> {
    return this.storage.remove(key);
  }

  public clear(): Promise<any> {
    return this.storage.clear();
  }

  public length(): Promise<any> {
    return this.storage.length();
  }

  public keys(): Promise<any> {
    return this.storage.keys();
  }
}