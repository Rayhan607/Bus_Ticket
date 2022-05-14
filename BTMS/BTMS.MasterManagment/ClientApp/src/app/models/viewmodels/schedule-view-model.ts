export interface ScheduleViewModel {
    scheduleId:number | undefined;
    journeyDate:Date | undefined;
    departureTime:Date |undefined;
    minTimeToReportBeforeDeparture:number |undefined;
    fareAmount:number|undefined;
    busRoute:string;
    bus:string;
    busId:number|undefined;
    busRouteId:number|undefined;
}
