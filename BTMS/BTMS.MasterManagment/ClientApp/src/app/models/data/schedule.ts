import { Time } from "@angular/common";

export interface Schedule {
    scheduleId:number | undefined;
    journeyDate:Date | undefined;
    departureTime:Time |undefined;
    minTimeToReportBeforeDeparture:number |undefined;
    fareAmount:number|undefined;
    busId:number|undefined;
    busRouteId:number|undefined;

}
