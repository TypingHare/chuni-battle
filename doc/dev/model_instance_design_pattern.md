# Model Instance Design Pattern

## Model

In traditional object-oriented programming languages like C++ and Java, it's common to create numerous getters and
setters for class properties. However, in certain scenarios, we might prefer that all properties are read-only. To
achieve this, we often end up creating classes with a multitude of constructor parameters and their corresponding
getters. In fact, Some game development practices follow this approach. Nonetheless, TypeScript provides us with an
alternative method to streamline this cumbersome process - [object
types](https://www.typescriptlang.org/docs/handbook/2/objects.html).

Here is a comparison of the two approaches:

~~~typescript
class User {
    public constructor(
        private readonly name: string,
        private readonly sex: string,
        private readonly age: number,
        private readonly address: string,
    ) {
    }

    public getName(): string {
        return this.name
    }

    public getSex(): string {
        return this.sex
    }

    // ... (You know how hard is it)
}

interface UserProperties {
    readonly name: string
    readonly sex: string
    readonly age: number
    readonly address: string
}

class User {
    public constructor(
        private readonly properties: UserProperties,
    ) {
    }

    public getProperties(): UserProperties {
        return this.properties
    }
}
~~~

The second approach is considered good practice in TypeScript; however, it may not be as suitable in other programming
languages. This is because, in order to achieve a similar implementation, we would need to create a map to store the
values. What's more, determining the types of entries becomes challenging, especially when we lack the benefits of
object types.

Upon discovering this effective approach, we can identify the common repeating elements and abstract them into a new
class:

~~~typescript
abstract class Model<P> {
    public constructor(protected properties: P) {
    }

    public getProperties(): P {
        return this.properties
    }
}
~~~

## Model Instance

### Exploration

In game data management and some specific scenarios, we often apply type object design pattern.

Imagine a scenario in your game where there are numerous types of monsters, each possessing distinct properties such as
health points, attack strength, and defense capabilities. As the game progresses, you might need to create multiple
instances of the same type of monster. Let's first create a `Monster` class:

~~~typescript
class Monster {
    public constructor(
        private readonly healthPoint: number,
        private readonly attack: number,
        private readonly defense: number,
    ) {
    }

    public getHealthPoint(): number {
        return this.healthPoint
    }
}

const dragon1 = new Monster(100, 15, 10)
const dragon2 = new Monster(100, 15, 10)
~~~

In this example, we define a `Monster` with three properties and create two dragon instances. Assume that all dragons
have exactly the same "attack" and "defense", and only health point changes as the game proceeds. On closer inspection
of it, we find that we will create many unnecessary duplications of "attack" and "defense" if we instantiate a bunch of
dragons, which can take up much memory. To optimize memory usage and eliminate redundancy, we can extract the common
properties and encapsulate them within a `MonsterModel` class:

~~~typescript
class MonsterModel {
    public constructor(
        private readonly attack: number,
        private readonly defense: number,
    ) {
    }

    public getAttack(): number {
        return this.attack
    }

    public getDefense(): number {
        return this.defense
    }
}

class Monster {
    public constructor(
        private readonly monsterModel: MonsterModel,
        private healthPoint: number,
    ) {
    }

    public getMonsterModel(): MonsterModel {
        return this.monsterModel
    }
}
~~~

With the `MonsterModel` class in place, we can now create multiple dragon instances more efficiently while sharing the
same MonsterModel for their common properties:

~~~typescript
const dragonModel = new MonsterModel(15, 10)
const dragon1 = new Monster(dragonModel, 100)
const dragon2 = new Monster(dragonModel, 100)
~~~

So far, we've identified a pattern where MonsterModel and Monster classes are inherently connected. To streamline the
process of creating monster instances while maintaining consistency in their properties, we've introduced a convenient
`createMonster` method within the MonsterModel class.

~~~typescript
class MonsterModel {
    // ...

    public createMonster(healthPonit: number): Monster {
        return new Monster(this, healthPoint)
    }
}

const dragonModel = new MonsterModel(15, 10)
const dragon1 = dragonModel.createMonster(100)
const dragon2 = dragonModel.createMonster(100)
~~~

### Abstraction

The Type Object design pattern is a widely used technique, particularly in game programming. In TypeScript, it can
seamlessly complement the Model class mentioned earlier. Below is an example of how you can implement this pattern using
TypeScript:

~~~typescript
abstract class InstantiableModel<P, S> extends Model<P> {
    public createInstance(options?: S): ModelInstance<P, S> {
        return new ModelInstance<P, S>(this, options)
    }
}

abstract class ModelInstance<P, S> {
    public constructor(
        private readonly model: Model<P>,
        private readonly options: S = {},
    ) {
    }

    public getModel(): Model<P> {
        return this.model
    }
}
~~~

Leveraging TypeScript, we utilize generics and object types to enhance our code. An important aspect to note is that to
create an instance of the `ModelInstance` class, we first create an instance of the `InstantiableModel` class. This
design ensures that we adhere to a structured approach when dealing with object creation.

One noteworthy detail is that by employing the `createInstance` method, we eliminate the need to use the new keyword for
instantiating a `ModelInstance` object. In essence, `createInstance` serves a similar purpose to a constructor in
`ModelInstance`, which is why we chose to name it as such. This streamlined approach enhances code readability and
maintainability.

Now we can code up `MonsterModel` and `Monster` in an effective way:

~~~typescript
interface MonsterProperties {
    readonly attack: number
    readonly defense: number
}

interface MonsterOptions {
    readonly healthPoint: number
}

class MonsterModel extends Model<MonsterProperties, MonsterOptions> {
}

class Monster extends ModelInstance<MonsterProperties, MonsterOptions> {
    private healthPoint: number

    public constructor(
        private readonly model: Model<P>,
        private readonly options: S = {},
    ) {
        super(model, options)
        this.healthPoint = options.healthPoint
    }

    public getHealthPoint(): number {
        return this.healthPoint
    }
}

// Create a dragon model
const dragonModel = new MonsterModel({
    attack: 15,
    defense: 10,
})

// Create some dragons with the dragon model
const dragon1 = dragonModel.createInstance(100)
const dragon2 = dragonModel.createInstance(100)
~~~

In a broader context, model instances like the `dragonModel` mentioned in the code snippet are considered game
resources. They are typically organized and managed through registries or similar data structures. When the need arises
to create a dragon in the game, the process is streamlined - we retrieve the dragon model from the registry and
efficiently employ the createInstance method to instantiate it. This approach simplifies the management of game objects
and contributes to cleaner and more efficient code.

## Reference

* [Flyweight](https://refactoring.guru/design-patterns/flyweight)
* [Game Programming Patterns](https://gameprogrammingpatterns.com)