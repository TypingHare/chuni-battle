package chuni.core

import chuni.core.resource.ResourceLocationCreator

class Game {
    companion object {
        const val DEFAULT_NAMESPACE = "ChuniBattle"
        const val ROOT_LOCATION_PATH = "root"

        val RESOURCE_LOCATION_CREATOR =
            ResourceLocationCreator(DEFAULT_NAMESPACE)
        val ROOT_LOCATION =
            RESOURCE_LOCATION_CREATOR.create(ROOT_LOCATION_PATH)
    }
}