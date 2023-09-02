/**
 * Model.
 */
export abstract class Model<P extends object> {
    /**
     * Creates the class by properties.
     * @param properties The properties
     */
    public constructor(protected properties: P) {
    }

    /**
     * Returns the properties of this model.
     */
    public getProperties(): P {
        return this.properties
    }

    /**
     * Returns the value of a property by name.
     * @param name The name of the property
     */
    public getProperty<K extends keyof P>(name: K): P[K] {
        return this.properties[name]
    }
}