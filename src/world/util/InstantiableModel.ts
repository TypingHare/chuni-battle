import { Model } from './Model.ts'
import { ModelInstance } from './ModelInstance.ts'

/**
 * Instantiable model abstract class.
 */
export abstract class InstantiableModel<T extends object, S extends object = {}> extends Model<T> {
    /**
     * Spawns an instance.
     */
    public abstract spawnInstance(options?: S): ModelInstance<InstantiableModel<T, S>>
}