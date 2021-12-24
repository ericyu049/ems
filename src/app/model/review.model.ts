import { Employee } from "./employee.model";
import { FeedBack } from "./feedback.model";

export interface Review {
    rid: number,
    targetId: string,
    assignedDate: Date,
    completed: boolean,
    participants: Employee[]
}