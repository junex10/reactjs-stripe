export interface IStripeBLL{
    GetPayments(id?: string): Promise<Object | Object[]>;
}