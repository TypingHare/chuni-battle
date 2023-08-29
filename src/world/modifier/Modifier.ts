import { Model } from '../util/Model.ts'

export interface ModifierProperties {
    // The name of the status
    readonly name: string

    // The description of this modifier
    readonly description: string

    // Whether it is a negative modifier; false if it is a positive modifier
    readonly isNegative: boolean
}

export abstract class Modifier extends Model<ModifierProperties> {
}