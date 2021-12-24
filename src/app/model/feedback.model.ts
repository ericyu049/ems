export interface FeedBack {
    fid: number,
    from: string,
    message?: string,
    rating?: number
    completed_date?: Date,
    avatar?: string
}