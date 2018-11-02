import { IModel } from './imodel';
import { CZLogger } from '../Utility/czlogger';

export class IStrike extends IModel {
   
    ID?:                              number;
    Title?:                           string;
    StartDate?:                       string;
    EndDate?:                         string;
    MinThresholdHours?:               number;
    MinThresholdDays?:                number;
    ParticipationBenefitAmt?:         number;
    HelperBenefitAmt?:                number;
    LastWeekMinThresholdHours?:       number;
    LastWeekMinThresholdDays?:        number;
    LastWeekParticipationBenefitAmt?: number;
    LastWeekHelperBenefitAmt?:        number;
    Comments?:                        string;
    RowVersion?:                      number;
    NumberOfStrikeMembers?:           number;
    weekNumber?:                      number;
    DayNumber?:                       number; 
} 