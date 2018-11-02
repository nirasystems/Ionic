
import { IModel } from "../models/imodel"; 
 
export class MOCKPicketLineList extends IModel {
    
    public static getList() {
        
        let list = [
            {
                "ID": 6,
                "StrikeInfoId": 8,
                "PicketLineName": "Strike HQ",
                "Descr": "Strike HQ",
                "StrikeHouseId": 3
            },
            {
                "ID": 7,
                "StrikeInfoId": 8,
                "PicketLineName": "Quad",
                "Descr": "Quad",
                "StrikeHouseId": 3
            },
            {
                "ID": 8,
                "StrikeInfoId": 8,
                "PicketLineName": "Annenberg",
                "Descr": "Annenberg",
                "StrikeHouseId": 5
            },
            {
                "ID": 9,
                "StrikeInfoId": 8,
                "PicketLineName": "River House",
                "Descr": "River House",
                "StrikeHouseId": 3
            },
            {
                "ID": 10,
                "StrikeInfoId": 8,
                "PicketLineName": "Business School",
                "Descr": "Business School",
                "StrikeHouseId": 9
            },
            {
                "ID": 11,
                "StrikeInfoId": 8,
                "PicketLineName": "Med School",
                "Descr": "Med School",
                "StrikeHouseId": 6
            }
        ];

        return list;
    }
} 