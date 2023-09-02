import { Registries } from '../../core/Registries.ts'
import { Builtins } from '../../core/Builtins.ts'
import { Site } from '../site/Site.ts'
import { DarkForestSite } from '../site/DarkForestSite.ts'


/**
 * Builtin sites.
 */
export class Sites {
    public static readonly DARK_FOREST = Sites.register('dark_forest', new DarkForestSite())

    /**
     * Registers a site.
     * @param path The path of the site
     * @param site The site to register
     * @private
     */
    private static register(path: string, site: Site): Site {
        return Registries.SITE.register(Builtins.RESOURCE_LOCATION_BUILDER.create(path), site)
    }
}