import { BoardingPointInputModel } from "./boarding-point-input-model";

export interface BusRouteInputModel {
    from:string;
    to:string;
    boardingPoints: BoardingPointInputModel[] ;
}
