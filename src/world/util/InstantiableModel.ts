import { Model } from './Model.ts'
import { ModelInstance } from './ModelInstance.ts'

/**
 * Instantiable model abstract class.
 */
export abstract class InstantiableModel<
    P extends object,
    S extends object = {}
> extends Model<P> {
    /**
     * Creates a model instance.
     * @param options The instantiating options for creating an instance
     */
    public abstract createInstance(options?: S): ModelInstance<InstantiableModel<P, S>, P, S>
}