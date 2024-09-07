import { IRequisition } from "./IRequisition";

export interface IInspection {
    inspectionId: number;
    requistionId: number;
    requisition?: IRequisition;
    inspectionDate: Date;
    inspectionNote?: string;
    insepectionStatus?: InsepectionStatus;
}

export enum InsepectionStatus {
    Pending,
    Completed,
    Rejected,
    
}