
import { IModel } from './imodel'; 

export class StrikeSignIn extends IModel {
   
    StrikeInfoId?:       string;
    StrikeMemberId?:     number;
    StrikePicketlineId?: string;
    WalkDate?:           string;
    SignInTime?:         string; 
    SignInMethod?:       string;
    SignInLocalTime?:    string;
}  