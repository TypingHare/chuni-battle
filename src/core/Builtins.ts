import { ResourceLocationBuilder } from './resource/ResourceLocationBuilder.ts'
import { BuiltinResourceLocationBuilder } from './resource/BuiltinResourceLocationBuilder.ts'

/**
 * A utility class containing common constants and objects.
 */
export class Builtins {
    /**
     * The builtin resource location builder.
     */
    public static readonly RESOURCE_LOCATION_BUILDER: ResourceLocationBuilder = new BuiltinResourceLocationBuilder()
}