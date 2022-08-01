class Animal {
    protected _type;
    protected _sound;

    constructor(type: string, sound: string) {
        this._type = type;
        this._sound = sound;
    }

    get type() {
        return this._type;
    }

    get sound() {
        return this._sound;
    }
}

class Dog extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}

class Cat extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}

class Parrot extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}

class Alligator extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}

class Zoo {
    private _animals: Array<Animal> = new Array<Animal>();

    public addAnimal(animal: Animal) {
        this._animals.push(animal);
    }

    get animals(): Array<Animal> {
        return this._animals;
    }

}

let zoo = new Zoo;
zoo.addAnimal(new Dog('Dog', 'woof'));
zoo.addAnimal(new Cat('Cat', 'miauw'));
zoo.addAnimal(new Parrot('Parrot', "i'm a pirate"));
zoo.addAnimal(new Alligator('Alligator', 'See you later, Alligator'));
zoo.animals.forEach((animal: Animal) => {
    document.querySelector('#target').innerHTML += (animal.type + ": " + animal.sound + "<br>");
});