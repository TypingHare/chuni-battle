/**
 * Property-driven abstract class.
 */
export abstract class PropertyDriven<P extends object> {
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