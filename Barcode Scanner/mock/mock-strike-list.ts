import { IModel } from "../models/imodel"; 
 
export class MOCKStrikeList extends IModel {
    
    public static getList() {
        
        let list = [
            {
                "ID": 16,
                "Title": "Raj Test",
                "StartDate": "2017-02-14T05:00:00",
                "EndDate": null,
                "MinThresholdHours": 20,
                "MinThresholdDays": 5,
                "ParticipationBenefitAmt": 100,
                "HelperBenefitAmt": 400,
                "LastWeekMinThresholdHours": 10,
                "LastWeekMinThresholdDays": 5,
                "LastWeekParticipationBenefitAmt": 50,
                "LastWeekHelperBenefitAmt": 200,
                "Comments": "Go ahead! \nMake My Day!!!",
                "RowVersion": 0,
                "NumberOfStrikeMembers": 0,
                "weekNumber": 84,
                "dayNumber": 2
            },
            {
                "ID": 8,
                "Title": "Strike at Harvard University",
                "StartDate": "2016-10-05T08:00:00",
                "EndDate": null,
                "MinThresholdHours": 20,
                "MinThresholdDays": 5,
                "ParticipationBenefitAmt": 100,
                "HelperBenefitAmt": 400,
                "LastWeekMinThresholdHours": 20,
                "LastWeekMinThresholdDays": 2,
                "LastWeekParticipationBenefitAmt": 100,
                "LastWeekHelperBenefitAmt": 400,
                "Comments": "One Day Longer",
                "RowVersion": 0,
                "NumberOfStrikeMembers": 0,
                "weekNumber": 102,
                "dayNumber": 7
            },
            {
                "ID": 13,
                "Title": "Strike at Ceasors",
                "StartDate": "2016-04-07T00:00:00",
                "EndDate": null,
                "MinThresholdHours": 20,
                "MinThresholdDays": 0,
                "ParticipationBenefitAmt": 100,
                "HelperBenefitAmt": 400,
                "LastWeekMinThresholdHours": 10,
                "LastWeekMinThresholdDays": 0,
                "LastWeekParticipationBenefitAmt": 50,
                "LastWeekHelperBenefitAmt": 200,
                "Comments": "One for All!!! All for one!!!",
                "RowVersion": 0,
                "NumberOfStrikeMembers": 0,
                "weekNumber": 128,
                "dayNumber": 7
            },
            {
                "ID": 14,
                "Title": "Strike at Trump",
                "StartDate": "2016-03-20T00:00:00",
                "EndDate": null,
                "MinThresholdHours": 20,
                "MinThresholdDays": 0,
                "ParticipationBenefitAmt": 100,
                "HelperBenefitAmt": 400,
                "LastWeekMinThresholdHours": 10,
                "LastWeekMinThresholdDays": 0,
                "LastWeekParticipationBenefitAmt": 50,
                "LastWeekHelperBenefitAmt": 200,
                "Comments": "We want Union!!!",
                "RowVersion": 0,
                "NumberOfStrikeMembers": 0,
                "weekNumber": 131,
                "dayNumber": 4
            },
            {
                "ID": 11,
                "Title": "Strike at Marriot",
                "StartDate": "2016-03-10T00:00:00",
                "EndDate": null,
                "MinThresholdHours": 20,
                "MinThresholdDays": 0,
                "ParticipationBenefitAmt": 100,
                "HelperBenefitAmt": 400,
                "LastWeekMinThresholdHours": 10,
                "LastWeekMinThresholdDays": 0,
                "LastWeekParticipationBenefitAmt": 50,
                "LastWeekHelperBenefitAmt": 200,
                "Comments": "We Win!!!",
                "RowVersion": 0,
                "NumberOfStrikeMembers": 0,
                "weekNumber": 132,
                "dayNumber": 7
            },
            {
                "ID": 10,
                "Title": "Strike at Hilton",
                "StartDate": "2016-02-01T00:00:00",
                "EndDate": null,
                "MinThresholdHours": 20,
                "MinThresholdDays": 0,
                "ParticipationBenefitAmt": 100,
                "HelperBenefitAmt": 400,
                "LastWeekMinThresholdHours": 10,
                "LastWeekMinThresholdDays": 0,
                "LastWeekParticipationBenefitAmt": 50,
                "LastWeekHelperBenefitAmt": 200,
                "Comments": "Together we stand!!!",
                "RowVersion": 0,
                "NumberOfStrikeMembers": 0,
                "weekNumber": 138,
                "dayNumber": 3
            }
        ];

        return list;
    }
} 