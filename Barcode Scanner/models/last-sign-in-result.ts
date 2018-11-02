import { IModel } from './imodel';

export class LastSignInData extends IModel {
   
    ID?:                 number;
    StrikeInfoId?:       number;
    StrikeMemberId?:     number;
    StrikePicketlineId?: number;
    WalkDate?:           string;
    SignInTime?:         string;
    SignOutTime?:        null;
    SignInMethod?:       string;
    SignOutMethod?:      null;
    DurationInMinutes?:  number;
    Comments?:           null;
    KickedOff?:          null;
    KickedOffReason?:    null;
    MemberId?:           string;
    LastName?:           string;
    MiddleName?:         string;
    FirstName?:          string;
    ImageExists?:        boolean;
    StrikeHouseId?:      number;
    HouseId?:            string;
    HouseName?:          string;
    SignInHour?:         number;
    SignInMinute?:       number;
    SignOutHour?:        number;
    SignOutMinute?:      number;
    Hours?:              number;
    Minutes?:            number;
    SignInLocalTime?:    null;
    SignOutLocalTime?:   null;
} 


export class SignInData extends IModel {
   
    ID?:             number;
    StrikeInfoId?:   number;
    MemberId?:       string;
    MemberName?:     string;
    LastName?:       string;
    MiddleName?:     string;
    FirstName?:      string;
    MemberStatus?:   string;
    Ssn?:            string;
    BirthDate?:      string;
    Address_1?:      string;
    Address_2?:      string;
    City?:           string;
    State?:          string;
    Zip?:            string;
    Phone?:          string;
    StrikeLine?:     string;
    StrikeShift?:    string;
    DebitCard?:      string;
    OldDebitCard?:   string;
    DebitCardInfo?:  string;
    AddressUpdated?: boolean;
    ImageExists?:    boolean;
    StrikeHouseId?:  number;
    HouseId?:        string;
    HouseName?:      string;
    Craft?:          string;
    MondayFlag?:     null;
    TuesdayFlag?:    null;
    WednesdayFlag?:  null;
    ThursdayFlag?:   null;
    FridayFlag?:     null;
    SaturdayFlag?:   null;
    SundayFlag?:     null;
    DobString?:      string;
} 

export class SignInDataSet extends IModel {
 
    signInData? :SignInData = null;
    lastSignInData? :LastSignInData = null;
    lastSignInList? :LastSignInData[] = null;
}

export class SignOutDataSet extends IModel {
 
    signOutData? :SignInData = null;
    lastSignOutData? :LastSignInData = null;
    lastSignOutList? :LastSignInData[] = null;
}