# Resource And Registry

## Resource

In Chuni Battle, game resources (or simply resources) refer to any contents that are loaded when the game starts.
Resources includes instances, texts, pictures, and so on. All resources are registered to registries during the loading
phase of the game.

### Resource Location

A resource location comprises both a namespace and a location. The namespace is a string that serves to differentiate
between two resources sharing the same location. Meanwhile, the location represents the relative path to resources that
correspond to specific assets, or alternatively, an arbitrary string. The namespace is composed of capital letters,
lowercase letters, digits, and underscores, whereas the location can include capital letters, lowercase letters, digits,
and certain special characters (./_-).

A resource location string is a fusion of the namespace and location, delineated by a colon. To illustrate, consider the
instance where the namespace is "ChuniBattle" and the location is "stone." In this scenario, the resulting resource
location string would be "ChuniBattle:stone." In essence, a resource location can be viewed as a string; however, it is
encapsulated within a "ResourceLocation" class within the game.

In the game, it is possible to create a resource location instance using the "new" keyword; however, this approach is
not recommended. Instead, a preferable method for creating a resource location involves first generating a concrete
instance of the "ResourceLocationBuilder" class, and subsequently crafting it through that instance. Notably, there
exists a built-in resource location builder called "BuiltinResourceLocationBuilder," with its default namespace set as "
ChuniBattle."

Here's an illustrative example of how to create a resource location:

~~~typescript
const stone = Builtins.RESOURCE_LOCATION_BUILDER.create('stone')
console.log(stone.toString())   // "ChuniBattle:stone"
~~~

### Resource Key

Each resource within the game possesses an exclusive identifier known as a "resource key," which is composed of two
distinct resource locations: the parent and the location. In the context of regular resources, the parent resource
location corresponds to the location of its specific registry, while the location pertains to the resource's designated
name.

Registries constitute a distinctive class of resources within the game's framework. The resource key attributed to a
registry is designated as a "registry key". Within this category, a prominent inclusion is that of the root registry,
responsible for the registration of other registries. Uniquely, the parent of a registry key is the "root location". For
a more comprehensive grasp of these concepts, specific examples are provided in the dedicated Registry chapter.

## Registry
























