import { InstantiableModel } from './InstantiableModel.ts'

/**
 * Model instance.
 */
export abstract class ModelInstance<
    M extends InstantiableModel<P, S>,
    P extends object,
    S extends object = {}
> {
    /**
     * Creates a model instance.
     * @param model The model
     * @param options The instantiating options
     */
    public constructor(protected model: M, protected options?: S) {
    }

    /**
     * Returns the model.
     */
    public getModel(): M {
        return this.model
    }
}