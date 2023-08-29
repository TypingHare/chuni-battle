/**
 * Property-driven abstract class.
 */
export abstract class Model<P extends object> {
    /**
     * Creates the class by properties.
     * @param properties The properties
     */
    public constructor(protected properties: P) {
    }

    /**
     * Returns the properties.
     */
    public getProperties(): P {
        return this.properties
    }
}