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

Each resource within the game possesses an exclusive identifier known as a **resource key**, which is composed of two
distinct resource locations: the **parent** and the **location**. In the context of regular resources, the parent
resource location corresponds to the location of its specific registry, while the location pertains to the resource's
designated name.

Registries constitute a distinctive class of resources within the game's framework. The resource key attributed to a
registry is designated as a **registry key**. Within this category, a prominent inclusion of that is the root registry,
responsible for the registration of other registries. Uniquely, the parent of a registry key is the **root location**.
For a more comprehensive grasp of these concepts, specific examples are provided in the dedicated Registry chapter.

## Registry

Registries represent a distinct class of special resources within the game, serving as managers for the registration and
retrieval of various resources. To establish a new registry, the process begins by creating a concrete class that
extends the typed abstract class Registry. Alternatively, you can directly utilize the BuiltinRegistry class. Once the
appropriate class is chosen, a registry key is then created, incorporating the root location as the parent and a
user-defined location. It's important to ensure that the custom location does not clash with any existing registries.
All builtin registries are collected in the `Regitries` class.

Here's a practical example that demonstrates the creation of a registry:

~~~typescript
// Create a registry key; in this example, the builtin resource location builder is used to create the location
const registryKey = new ResourceKey(Builtins.ROOT_LOCATION, Builtins.RESOURCE_LOCATION_BUILDER.create(path))

// Create a registry; <T> is the type of resources
const registry: Registry<T> = new BuiltinRegistry<T>(registryKey)

// Regsiter the registry in the root registry
Registries.ROOT.register(registryKey.getLocation(), registry)
~~~

### Registering Resources

Upon successfully creating a registry, the next step involves the registration of resources within it. This process
prompts the registry to generate a unique resource key for each registered item. The parent of this resource key
corresponds to the location of the associated registry key, while the path is supplied as an additional identifier. In
this context, a reference is generated to encapsulate the resource, along with pertinent information such as its ID and
any relevant tags.

To access resources, one can utilize either their resource location or resource key. Conversely, resources are also
equipped with the capability to retrieve their corresponding resource key. As resources are registered, they are
sequentially added to a list, with the associated index in the list serving as the resource's ID.

It's essential to note that once a resource is registered, it becomes a permanent part of the registry and cannot be
removed or deleted subsequently. This ensures the stability and consistency of the game's resources throughout its
runtime.

## Tag

Tag is a significant tool in the game.



















