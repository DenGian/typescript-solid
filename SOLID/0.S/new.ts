class Car {

    private readonly _engine: Engine;
    private readonly _radio: Radio;

    constructor(MAXIMUM_FUEL_CAPACITY: number) {
        this._engine = new Engine(MAXIMUM_FUEL_CAPACITY);
        this._radio = new Radio();
    }


    public get engine():Engine{
        return this._engine;
    }


    public get radio(): Radio{
        return this._radio
    }



    drive() {
        if(this._engine.Status === false || this._engine.fuel <= 0) {
            //what I am doing here is a good principle called "failing early"
            // If you have some conditions you need to check, that will exclude most of the code in your function check that first
            // This prevents your "happy path" of code to be deeply indented.
            return;
        }

        this._engine.consumeFuel();
        this._engine.addMileage();

    }
}
class Radio {
    private _musicLevel : number = 0;
    private _oldMusicLevel : number = 50;

    //Take attention to these getters and setters
    get musicLevel(): number {
        return this._musicLevel;
    }

    set musicLevel(value: number) {
        this._musicLevel = value;
        this._oldMusicLevel = value;
    }

    turnMusicOn() {
        this._musicLevel = this._oldMusicLevel;
    }

    turnMusicOff() {
        this._musicLevel = 0;
    }
}

class Engine {
    private _fuel : number = 0;
    private _miles : number = 0;
    private _Status: boolean = false;

    //By changing this variable to readonly I have in essence created a property constant.
    // the only subtle difference is that you can write once to the variable inside the constructor
    private readonly MAXIMUM_FUEL_CAPACITY: number;
    private readonly FUEL_MILEAGE: number = 10;

    constructor(MAXIMUM_FUEL_CAPACITY: number) {
        this.MAXIMUM_FUEL_CAPACITY = MAXIMUM_FUEL_CAPACITY;
    }

    get miles(): number {
        return this._miles;
    }



    get fuel(): number {
        return this._fuel;
    }

    //When a value can only go one way (you add fuel, consuming fuel is handled by the car itself)
    // it is better to provide a specific method for this instead of a generic setter.
    // with a setter there is always the chance of somebody lowering the fuel amount by accident.
    addFuel(fuel : number) {
        this._fuel = Math.min(fuel + this._fuel, this.MAXIMUM_FUEL_CAPACITY);
    }

    get Status(): boolean {
        return this._Status;
    }

    turnEngineOn() {
        this._Status = true;
    }

    turnEngineOff() {
        this._Status = false;
    }


    consumeFuel(){
        this._fuel -= 1;
    }


    addMileage(){
        this._miles += this.FUEL_MILEAGE;
    }
}


// When you see <cast>variable this is a "cast" of a variable, explicitly telling the code what the type of this variable will be.
// This is sometimes needed when a default JS function does not return a precise enough Type.
// I need to cast this to HtmlElement because the default Element return type is not specific to the HTML context (because some versions of JS can also be used in the backend, see node.js)
// This makes it not having some properties like .innerText. Test it out yourself by removing the <HTMLElement>
const musicToggleElement = <HTMLElement>document.querySelector('#music-toggle');
const musicSliderElement = <HTMLInputElement>document.querySelector('#music-slider');
const engineToggleElement = <HTMLInputElement>document.querySelector('#engine-toggle');
const addFuelForm = document.querySelector('#add-fuel-form');
const addFuelInput = <HTMLFormElement>document.querySelector('#add-fuel-input');
const fuelLevelElement = <HTMLElement>document.querySelector('#fuel-level');
const milesElement = <HTMLElement>document.querySelector('#miles-value');
const audioElement = <HTMLAudioElement>document.querySelector('#car-music');

let car = new Car(100);


musicToggleElement.addEventListener('click', () => {
    if(car.radio.musicLevel === 0) {
        car.radio.turnMusicOn();
        musicSliderElement.value = car.radio.musicLevel.toString();
        musicToggleElement.innerText = 'Turn music off';
        return;
    }
    musicToggleElement.innerText = 'Turn music on';
    car.radio.turnMusicOff();
});


//I use input instead of change, because then the value changes when I move the mouse, not only on release
musicSliderElement.addEventListener('input', (event) => {
    let target = <HTMLFormElement>(event.target);

    car.radio.musicLevel = target.value;
    audioElement.volume = car.radio.musicLevel / 100;

    //@todo when you are repeating the same text over and over again maybe we should have made some constants for it? Can you do improve on this?
    musicToggleElement.innerText = car.radio.musicLevel ? 'Turn music off' : 'Turn music on';
});


engineToggleElement.addEventListener('click', () => {
    if(car.engine.Status) {
        car.engine.turnEngineOff();
        engineToggleElement.innerText = 'Turn engine on';
        return;
    }
    engineToggleElement.innerText = 'Turn engine off';
    car.engine.turnEngineOn();
});


addFuelForm.addEventListener('submit', (event) => {
    event.preventDefault();

    car.engine.addFuel(Number(addFuelInput.value));
    fuelLevelElement.innerText = car.engine.fuel.toString();
});


setInterval(() => {
    car.drive();

    //while it looks like both lines below are the same there is a subtle difference (you could put breakpoints here to see the difference):
    // this <cast> will only tell TypeScript that the value is a string, but the actual variable in JS is not changed in any way: it is in reality still a number
    milesElement.innerText = <string><unknown>(car.engine.miles);
    // This .toString() will actually convert the value in JavaScript from an integer to a string
    fuelLevelElement.innerText = car.engine.fuel.toString();

    if(car.radio.musicLevel === 0) {
        audioElement.pause();
    } else {
        audioElement.play();
    }

}, 1000);