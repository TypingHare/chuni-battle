/**
 * Resource location.
 */
export class ResourceLocation {
    /**
     * The delimiter between the namespace and the path.
     */
    public static readonly DELIMITER = ':'

    /**
     * Creates a resource location.
     * @param namespace The namespace of this resource location.
     * @param path The path of this resource location.
     */
    public constructor(
        private readonly namespace: string,
        private readonly path: string
    ) {

    }

    /**
     * Returns the namespace of this resource location.
     */
    public getNamespace(): string {
        return this.namespace
    }

    /**
     * Returns the path of this resource location.
     */
    public getPath(): string {
        return this.path
    }

    /**
     * Returns the resource location string.
     */
    public toString(): string {
        return this.namespace + ResourceLocation.DELIMITER + this.path
    }
}