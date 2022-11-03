export interface Review {
    rid: string,
    assignedDate: Date,
    completed: boolean,
    targetId: string,
    participants: string[]
}