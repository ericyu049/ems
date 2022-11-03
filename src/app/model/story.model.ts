import { Employee } from "./employee.model";

export interface Story {
    sid: string,
    status: string,
    sprint: string,
    title: string,
    description: string,
    priority: number,
    employee: Employee,
}