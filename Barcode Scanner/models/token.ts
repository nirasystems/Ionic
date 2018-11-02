import { IModel } from './imodel';
import { ILogin } from './login ';

export class IToken extends IModel {
     
    Success     : boolean;
    IsSuperusername : boolean;
    Username : string;
    Password : string;

} 