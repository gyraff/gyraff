import { ComposableFactory } from '../src';

interface EngineFactoryInterface {
    model: string,
    manufacturer: string
}

interface BreaksInterface {
    speed: number,

    stop(): number
}

interface BreaksFactoryInterface {
    partNumber: string
}

interface BodyInterface {
    colour: string,
    design: string,

    init(args: { colour?: string, design?: string }): void
}

interface EngineInterface {
    speed: number,
    maxSpeed: number,
    accelerate: (incr: number) => number,
    decelerate: (decr: number) => number,

    init(args: { speed?: number, maxSpeed?: number }): void
}

/*
type EngineFactory<T extends EngineInterface = EngineInterface> = ComposableInterface<T>;

interface TurboEngineInterface extends EngineInterface {
    turbo(): void;
}

test('Test initializers execution order',() => {
    let e1: EngineFactory;
    let e2: EngineFactory<TurboEngineInterface> = null as any;

    e1 = e2;
});
 */

describe('@gyraff/factory tests', () => {
    test('Test initializers execution order', () => {
        let engineInitExecuted = false;
        const EngineFactory = ComposableFactory<EngineInterface>({
            speed: 0,
            maxSpeed: 180,
            init({ speed, maxSpeed }) {
                if (speed) this.speed = speed;
                if (maxSpeed) this.maxSpeed;
                engineInitExecuted = true;
            },
            accelerate(incr) {
                this.speed = this.speed + incr;
                return this.speed;
            },
            decelerate(decr) {
                this.speed = this.speed - decr;
                return this.speed;
            },
        });

        const engine = EngineFactory({ speed: 10 });
        expect(engine.speed).toEqual(10);

        let customEngineInitExecuted = false;
        const CustomEngineFactory = EngineFactory.compose<{}>({
            init({ speed }) {
                if (speed) this.speed = speed + 1;
                customEngineInitExecuted = true;
            },
        });

        const customEngine = CustomEngineFactory({ speed: 20 });
        expect(engineInitExecuted && customEngineInitExecuted).toEqual(true);
        expect(customEngine.speed).toEqual(21);
    });

    test('Test initializer parameters', () => {
        const EngineFactory = ComposableFactory<EngineInterface>({
            speed: 0,
            maxSpeed: 180,
            init({ maxSpeed }) {
                if (maxSpeed) this.maxSpeed = maxSpeed;
            },
            accelerate(incr) {
                this.speed = this.speed + incr;
                if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
                return this.speed;
            },
            decelerate(decr) {
                this.speed = this.speed - decr;
                return this.speed;
            },
        });

        const engine = EngineFactory({ maxSpeed: 60 });
        expect(engine.maxSpeed).toEqual(60);


        const EngineWithBodyFactory = EngineFactory.compose<BodyInterface>({
            colour: 'yellow',
            design: 'suv',
            init({ colour, design }) {
                if (colour) this.colour = colour;
                if (design) this.design = design;
            },
        });

        const engineWithBody = EngineWithBodyFactory({ maxSpeed: 320, colour: 'red', design: 'sport car' });
        expect(engineWithBody.speed).toEqual(0);
        expect(engineWithBody.maxSpeed).toEqual(320);
        expect(engineWithBody.colour).toEqual('red');
        expect(engineWithBody.design).toEqual('sport car');
    });

    test('Test methods overwriting', () => {
        const EngineFactory = ComposableFactory<EngineInterface>({
            speed: 0,
            maxSpeed: 180,
            init() {
            },
            accelerate(incr) {
                let speed = this.speed + incr;
                if (speed > this.maxSpeed) speed = this.maxSpeed;
                this.speed = speed;
                return this.speed;
            },
            decelerate(decr) {
                this.speed = this.speed - decr;
                return this.speed;
            },
        });

        const engine = EngineFactory();
        engine.accelerate(60);
        expect(engine.speed).toEqual(60);

        const FaultyEngineFactory = EngineFactory.compose<EngineInterface>({
            accelerate(incr: number): number {
                this.speed = this.maxSpeed;
                return this.speed;
            },
        });

        const faultyEngine = FaultyEngineFactory();
        faultyEngine.accelerate(60);
        expect(faultyEngine.speed).toEqual(180);
    });

    test('Test factory static properties', () => {
        const EngineFactory = ComposableFactory<EngineInterface, EngineFactoryInterface>({
            speed: 0,
            maxSpeed: 180,
            init() {
            },
            accelerate(incr: number): number {
                let speed = this.speed + incr;
                if (speed > this.maxSpeed) speed = this.maxSpeed;
                this.speed = speed;
                return this.speed;
            },
            decelerate(decr) {
                this.speed = this.speed - decr;
                return this.speed;
            },
        }, {
            model: '3ZR-FE',
            manufacturer: 'Toyota',
        });

        expect(EngineFactory.model).toEqual('3ZR-FE');
        expect(EngineFactory.manufacturer).toEqual('Toyota');

        const E = EngineFactory.compose({}, {
            manufacturer: 'BMW',
        });

        const D = E.compose<BreaksInterface, BreaksFactoryInterface>({
            speed: 0,
            stop() {
                return 0;
            },
        }, {
            partNumber: '12345667',
        });

        expect(D.manufacturer).toEqual('BMW');
        expect(D.partNumber).toEqual('12345667');
    });

    test('Test overall behavior: Create, compose and use many composable factories', () => {

        const EngineFactory = ComposableFactory<EngineInterface>({
            speed: 0,
            maxSpeed: 180,
            init() {
            },
            accelerate(incr) {
                this.speed = this.speed + incr;
                if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
                return this.speed;
            },
            decelerate(decr) {
                this.speed = this.speed - decr;
                return this.speed;
            },
        });

        const BreaksFactory = ComposableFactory<BreaksInterface>({
            speed: 0,
            stop() {
                while (this.speed > 0) {
                    this.speed = this.speed - 1;
                }
                return 0;
            },
        });

        const BodyFactory = ComposableFactory<BodyInterface>({
            colour: 'yellow',
            design: 'suv',
            init() {
            },
        });

        const Car = EngineFactory.compose(BreaksFactory).compose(BodyFactory);

        const car = Car();
        expect(car.speed).toEqual(0);
        expect(car.colour).toEqual('yellow');
        expect(car.design).toEqual('suv');
        expect(typeof car.decelerate).toEqual('function');
        expect(typeof car.accelerate).toEqual('function');
        expect(typeof car.stop).toEqual('function');

        car.accelerate(10);
        expect(car.speed).toEqual(10);

        car.stop();
        expect(car.speed).toEqual(0);

        car.accelerate(60);
        car.decelerate(10);
        expect(car.speed).toEqual(50);

        interface CarInterface extends EngineInterface, BreaksInterface, BodyInterface {
            init(args: { speed?: number, maxSpeed?: number, colour?: string, design?: string }): void;
        }

        const AnotherCarFactory = ComposableFactory.compose<CarInterface>(EngineFactory, BreaksFactory, BodyFactory);
        const anotherCar = AnotherCarFactory();
        anotherCar.accelerate(60);
        anotherCar.stop();
        expect(anotherCar.colour).toEqual('yellow');
    });
});
