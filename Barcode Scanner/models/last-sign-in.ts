
import { IModel } from './imodel';

export class LastSignInRequest extends IModel {
   
    strikeId : string;
    memberId : string;
} 

export class SignInRequest extends IModel {
   
    strikeId : string;
    memberId : string;
    picketId :string;
    isForSignIn :boolean;
}  