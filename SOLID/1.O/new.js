var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(type, sound) {
        this._type = type;
        this._sound = sound;
    }
    Object.defineProperty(Animal.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "sound", {
        get: function () {
            return this._sound;
        },
        enumerable: false,
        configurable: true
    });
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(type, sound) {
        return _super.call(this, type, sound) || this;
    }
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(type, sound) {
        return _super.call(this, type, sound) || this;
    }
    return Cat;
}(Animal));
var Parrot = /** @class */ (function (_super) {
    __extends(Parrot, _super);
    function Parrot(type, sound) {
        return _super.call(this, type, sound) || this;
    }
    return Parrot;
}(Animal));
var Alligator = /** @class */ (function (_super) {
    __extends(Alligator, _super);
    function Alligator(type, sound) {
        return _super.call(this, type, sound) || this;
    }
    return Alligator;
}(Animal));
var Zoo = /** @class */ (function () {
    function Zoo() {
        this._animals = new Array();
    }
    Zoo.prototype.addAnimal = function (animal) {
        this._animals.push(animal);
    };
    Object.defineProperty(Zoo.prototype, "animals", {
        get: function () {
            return this._animals;
        },
        enumerable: false,
        configurable: true
    });
    return Zoo;
}());
var zoo = new Zoo;
zoo.addAnimal(new Dog('Dog', 'woof'));
zoo.addAnimal(new Cat('Cat', 'miauw'));
zoo.addAnimal(new Parrot('Parrot', "i'm a pirate"));
zoo.addAnimal(new Alligator('Alligator', 'See you later, Alligator'));
zoo.animals.forEach(function (animal) {
    document.querySelector('#target').innerHTML += (animal.type + ": " + animal.sound + "<br>");
});
