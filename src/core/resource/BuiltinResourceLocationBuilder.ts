import { ResourceLocationBuilder } from './ResourceLocationBuilder.ts'

/**
 * Builtin resource location builder.
 */
export class BuiltinResourceLocationBuilder extends ResourceLocationBuilder {
    /**
     * Builtin default namespace.
     */
    public static readonly DEFAULT_NAMESPACE = 'ChuniBattle'

    /**
     * Creates a builtin resource location builder.
     */
    public constructor() {
        super(BuiltinResourceLocationBuilder.DEFAULT_NAMESPACE)
    }
}