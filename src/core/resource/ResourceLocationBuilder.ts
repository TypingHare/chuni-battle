import { ResourceLocation } from './ResourceLocation.ts'

/**
 * A builder class for generating resource locations.
 */
export class ResourceLocationBuilder {
    /**
     * Creates a resource location builder.
     * @param defaultNamespace The default namespace for created resource locations
     */
    public constructor(private readonly defaultNamespace: string) {
    }

    /**
     * Creates a resource location using the default namespace.
     * @param path The path of the resource location
     */
    public create(path: string): ResourceLocation;
    /**
     * Creates a resource location.
     * @param namespace The namespace of the resource location
     * @param path The path of the resource location
     */
    public create(namespace: string, path: string): ResourceLocation;
    public create(namespace: string, path?: string): ResourceLocation {
        return path === undefined ?
            this.create(this.defaultNamespace, namespace) :
            new ResourceLocation(namespace, path)
    }
}