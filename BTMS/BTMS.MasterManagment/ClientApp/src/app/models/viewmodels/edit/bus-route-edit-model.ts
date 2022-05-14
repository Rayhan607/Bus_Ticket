import { BoardingPointEditModel } from "./boarding-point-edit-model";

export interface BusRouteEditModel {
    busRouteId:number|undefined;
    from:string;
    to:string;
    boardingPoints: BoardingPointEditModel[] ;
}
