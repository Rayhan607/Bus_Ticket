import { BusType } from "./enums";

export interface Bus {
    busId: number | undefined;
    busPlateNumber: string;
    busModel:string;
    busType: BusType | undefined;
    capacity: number | undefined;
    features: string;
    fare:number|undefined;
    companyId: number | undefined;

}
