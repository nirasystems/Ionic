import { IModel } from './imodel';
import { CZLogger } from '../Utility/czlogger';

export class IPicketLine extends IModel {
   
    ID?:             number;
    StrikeInfoId?:   number;
    PicketLineName?: string;
    Description?:    string;
    StrikeHouseId?:  number;
} 