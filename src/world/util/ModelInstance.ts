/**
 * Model instance abstract class.
 */
export abstract class ModelInstance<M, S extends object = {}> {
    /**
     * Creates a model instance.
     * @param model The model
     * @param options The spawning options
     */
    public constructor(protected model: M, protected options?: S) {
    }

    /**
     * Returns the model.
     */
    public getModel(): M {
        return this.model
    }

    /**
     * Returns the spawning options.
     */
    public getOptions(): S | undefined {
        return this.options
    }
}