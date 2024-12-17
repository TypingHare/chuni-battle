package chuni.core

import chuni.core.gameplay.ability.AbilityTemplate
import chuni.core.gameplay.statuseffect.StatusEffectTemplate
import chuni.core.gameplay.unit.UnitTemplate
import chuni.core.resource.BuiltinRegistry
import chuni.core.resource.Registry
import chuni.core.resource.ResourceKey

object Registries {
    // Root registry
    val ROOT: Registry<Registry<*>> =
        BuiltinRegistry(createRegistryKey(Game.ROOT_LOCATION_PATH))

    // Templates
    val UNIT_TEMPLATE = createRegistry<UnitTemplate>("template/unit")
    val ABILITY_TEMPLATE =
        createRegistry<AbilityTemplate>("template/ability")
    val EFFECT_TEMPLATE =
        createRegistry<StatusEffectTemplate>("template/status_effect")

    private fun createRegistryKey(path: String) = ResourceKey(
        Game.ROOT_LOCATION,
        Game.RESOURCE_LOCATION_CREATOR.create(path)
    )

    private fun <T> createRegistry(path: String): Registry<*> =
        createRegistryKey(path).let {
            ROOT.register(it.location, BuiltinRegistry<T>(it))
        }
}