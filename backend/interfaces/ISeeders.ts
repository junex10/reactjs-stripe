export interface ISeeders{
    config: ISeederConfig,
    seed: Array<any>
}
export interface ISeederConfig{
    collection: string,
    bcrypt?: string
}
