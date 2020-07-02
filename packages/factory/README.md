# @gyraff/factory

Define and use composable factory functions with fun! 

This library promotes `Composable Factory Functions (CFF)` as an alternative pattern to use over `Class Hierarchies` 
and lets you combine multiple reusable factories together.

_Why should I use this library?_ 

* `ComposableFactory` focuses on simplicity and provides a clean API without thousands of options and possibilities 
 which create only confusion. (Keep it simple, stupid).

    You wanted a composable factory function - you got it! Nothing more!

* This library has a small footprint of about 48 SLOC. 

* Advanced TypeScript support. Types definitions not only cover `ComposabeFactory` API methods, but also validates 
properties and methods of the factory objects. 

## Table of content

1. [Installation](#installation)
2. [Usage](#usage)
    1. [Defining and using a CFF](#defining-and-using-a-cff)
        1. [CFF initializer](#cff-initializer)
        2. [Static properties](#static-properties)
    2. [Composing factory functions](#composing-factory-functions)
    3. [Extra](#extra)
3. [License](#license)
        
## Installation

```text
npm install @gyraff/factory --save
```
## Usage

The API for both JavaScript and TypeScript is almost the same. JavaScript users should ignore types parameters and 
remove angle brackets (<>). For this reason the examples will be demonstrated using TypeScript.

_TypeScript_

```typescript
import { ComposableFactory } from '@gyraff/factory';
```

_JavaScript_

```javascript
const { ComposableFactory } = require('@gyraff/factory');
```

### Defining and using a CFF

```text
ComposableFactory(objectDescriptor[, staticsDescriptor]) => ComposableFactoryFunction;
```

* _objectDescriptor_: `Required`. Properties and methods of the CFF objects.

* _staticsDescriptor_: `Optional`. Static properties/methods of the CFF itself.

_Example_

```typescript
interface EngineInterface {
    speed: number;
    maxSpeed: number;
    accelerate: (incr: number) => number;
    decelerate: (decr: number) => number;
}

const EngineFactory = ComposableFactory<EngineInterface>({
    speed: 0,
    maxSpeed: 180,
    accelerate(incr) {
        this.speed = this.speed + incr;
        return this.speed;
    },
    decelerate(decr) {
        this.speed = this.speed - decr;
        return this.speed;
    }
});

const engine = EngineFactory();
expect(engine.speed).toEqual(0);
expect(engine.maxSpeed).toEqual(180);

engine.accelerate(40);
expect(engine.speed).toEqual(40);
```

#### CFF initializer

A factory initializer, like a class constructor, is the method responsible for initializing the factory objects 
at the time of their creation. 

A factory can have many initializers, given that it is composed of one or many other CFF.

Factory initializers get called, in FIFO order, with the same arguments that were provided for the CFF.

_Example_

```typescript
interface EngineInterface {
    speed: number;
    maxSpeed: number;
    accelerate: (incr: number) => number;
    decelerate: (decr: number) => number;
    init(args: { speed?: number; maxSpeed?: number });
}

const EngineFactory = ComposableFactory<EngineInterface>({
    speed: 0,
    maxSpeed: 180,
    init({ speed, maxSpeed }) {
        if (speed) this.speed = speed;
        if (maxSpeed) this.maxSpeed = maxSpeed;
    }, 
    accelerate(incr) {
        this.speed = this.speed + incr;
        return this.speed;
    },
    decelerate(decr) {
        this.speed = this.speed - decr;
        return this.speed;
    }
});

const engine = EngineFactory({ maxSpeed: 300 });
expect(engine.maxSpeed).toEqual(300);
```

#### Static properties

In contrast to object properties, static properties as the name suggests are the properties of the CFF 
itself. Just like object properties and methods, static properties overwrite parent's properties with the same name.

_Example_

```typescript
interface EngineInterface {
    speed: number;
    maxSpeed: number;
    accelerate: (incr: number) => number;
    decelerate: (decr: number) => number;
    init(args: { speed?: number; maxSpeed?: number });
}
interface EngineFactoryInterface {
    model: string,
    manufacturer: string
}

const EngineFactory = ComposableFactory<EngineInterface, EngineFactoryInterface>({
    speed: 0,
    maxSpeed: 180,
    init({ speed, maxSpeed }) {
        if (speed) this.speed = speed;
        if (maxSpeed) this.maxSpeed = maxSpeed;
    }, 
    accelerate(incr) {
        this.speed = this.speed + incr;
        return this.speed;
    },
    decelerate(decr) {
        this.speed = this.speed - decr;
        return this.speed;
    }
}, {
    // default factory static properties
    model: '3ZR-FE',
    manufacturer: 'Toyota'  
});

expect(EngineFactory.model).toEqual('3ZR-FE');
expect(EngineFactory.manufacturer).toEqual('Toyota');
```

### Composing factory functions

```text
ComposableFactoryFunction.compose( (objectDescriptor [, staticsDescriptor]) | ComposableFactoryFunction  ) => ComposableFactoryFunction
```

A CFF can be composed with another CFF and giving birth to a new CFF.

By composing a CFF, we extend it. New properties or methods can be added, existing ones can be overwritten. 

Let's see how it works in the following examples:

_Example_

Creating `BodyFactory`:

```typescript
interface BodyInterface {
    colour: string;
    design: string;
    init(args: { colour?: string; design?: string }): void;
}

const BodyFactory = ComposableFactory<BodyInterface>({
    colour: 'yellow',
    design: 'suv',
    init({ colour, design }) {  
        if (colour) this.colour = colour;
        if (design) this.design = design; 
    }
});
```

Creating `EngineFactory`:

```typescript
interface EngineInterface {
    speed: number;
    maxSpeed: number;
    accelerate: (incr: number) => number;
    decelerate: (decr: number) => number;
    init(args: { speed?: number; maxSpeed?: number });
}

const EngineFactory = ComposableFactory<EngineInterface>({
    speed: 0,
    maxSpeed: 180,
    init({ speed, maxSpeed }) {
        if (speed) this.speed = speed;
        if (maxSpeed) this.maxSpeed = maxSpeed;
    }, 
    accelerate(incr) {
        this.speed = this.speed + incr;
        return this.speed;
    },
    decelerate(decr) {
        this.speed = this.speed - decr;
        return this.speed;
    }
});
```

Composing `EngineFactory` with `BodyFactory`:

_Please note_: When the argument for the `compose()` method is a CFF (not an object descriptor), both interfaces 
(compose<T,S>(), where T is the interface for CFF objects and S is the interface for CFF static properties) can be 
omitted. They will be implicitly inferred from the CFF.

```typescript
const EngineWithBodyFactory = EngineFactory.compose(BodyFactory);

const engineWithBody = EngineWithBodyFactory({ maxSpeed: 220, colour: 'red', design: 'sedan' });
expect(engineWithBody.speed).toEqual(0);
expect(engineWithBody.maxSpeed).toEqual(220);
expect(engineWithBody.colour).toEqual('red');
expect(engineWithBody.design).toEqual('sedan');
```

Composing `EngineWithBodyFactory` with `BreaksFactory`, but this time using an object descriptor:

```typescript
interface BreaksInterface {
    speed: number;
    stop(): number;
}

const CarFactory = EngineWithBodyFactory.compose<BreaksInterface>({
    speed: 0,
    stop() {
        while (this.speed > 0) {
            this.speed = this.speed - 1;
        }
        return 0;
    }
});

const car = CarFactory();
expect(car.speed).toEqual(0);
expect(car.maxSpeed).toEqual(180);
expect(car.colour).toEqual('yellow');
expect(car.design).toEqual('suv');

car.accelerate(110);
expect(car.speed).toEqual(110);

car.stop();
expect(car.speed).toEqual(0);
```

Overwriting property `maxSpeed` of `CarFactory` objects:

```typescript
// Overwriting maxSpeed property of the CarFactory objects
// "{}" used in CarFactory.compose() means "use the existing properties and methods" 
const AnotherCarFactory = CarFactory.compose<{}>({
    maxSpeed: 200
});
```

### Extra

`ComposableFactory` provides an extra method to compose CFF. 

```text
ComposableFactory.compose(...args: CFF[]) => ComposableFactoryFunction
```

This method is considered as an extra feature because in most cases the standard `ComposableFactoryFunction.compose()` is 
more convenient for composing factories.

_Example_

```typescript
interface CarInterface extends EngineInterface, BreaksInterface, BodyInterface {
    init(args: { speed?: number, maxSpeed?: number, colour?: string, design?: string }): void;
}
const Car = ComposableFactory.compose<CarInterface>(EngineFactory, BreaksFactory, BodyFactory);
const car = Car();
```

## License

[MIT](https://github.com/weyoss/composable-factory/blob/master/LICENSE)



