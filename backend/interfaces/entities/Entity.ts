export interface Entity{
    createdBy: number,
    createDate?: Date,
    updatedBy?: number,
    updateDate?: Date,
    deleteDate?: Date,
    deletedBy?: number,
    deleted?: boolean
}