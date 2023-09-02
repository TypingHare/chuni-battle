import { ResourceLocationBuilder } from './resource/ResourceLocationBuilder.ts'
import { BuiltinResourceLocationBuilder } from './resource/BuiltinResourceLocationBuilder.ts'
import { ResourceLocation } from './resource/ResourceLocation.ts'

/**
 * A utility class containing common constants and objects.
 */
export class Builtins {
    /**
     * The builtin resource location builder.
     */
    public static readonly RESOURCE_LOCATION_BUILDER: ResourceLocationBuilder = new BuiltinResourceLocationBuilder()

    /**
     * The path of root resource location.
     */
    public static readonly ROOT_LOCATION_PATH: string = 'root'

    /**
     * Root location.
     */
    public static readonly ROOT_LOCATION: ResourceLocation
        = Builtins.RESOURCE_LOCATION_BUILDER.create(Builtins.ROOT_LOCATION_PATH)
}