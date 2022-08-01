# Open–closed principle (sOlid)

## MaTS

![meme](../../images/openCP.png)

---
## Chapter 1: What is the Open-closed principle?

the Open-Closed Principle states that a class/object should be open to extension but close for modification.

It means that if it is necessary to change a specific class because of new requirements, it is better to create new code for the changes or new functionality instead of affecting the existing one in the cases where it is possible.

Imagine a scenario where there is a project that consists in an online store that allows the users to subscribe in order to get e-books.  
At the first moment, the conditions are the same for all customers, with access to all content.  
However, we received a request to change the system stating that the company will start using Plan Account with different conditions per customer based on what they are paying monthly, as it follows:

1. **Basic:** it allows the user to have access to only one book category and limited access to book monthly.
2. **Intermediate:** it allows the user to have access to only five book categories and max 20 books monthly.
3. **Premium:** unlimited access to all content.

Each plan contains a different price and has their specific characters beyond that ones given in this post.  
The most important is that we have a scenario to demonstrate the Open-Closed Principle now.  
In terms of implementation, let's start with the implementation of **not** following the good practices, which would consist in changing an existing class ````Plan Account```` having an if statement in the Customer class to differentiate the type of accounts, as it follows:

````typescript
  public enum AccountType
        {
            Basic = 1,
            Intermediate = 2,
            Premium = 3
        }
        
        public class User
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public AccountType AccountType { get; set; }
        }

        public class Customer
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public Customer Generate(User user)
            {
                Customer customer = new Customer();
                customer.FullName = user.FullName;
                customer.Email = user.Email;

                switch(user.AccountType)
                {
                    case AccountType.Basic: GenerateBasicAccount(customer);
                        break;
                    case AccountType.Intermediate:
                        GenerateIntermediateAccount(customer);
                        break;
                    case AccountType.Premium:
                        GeneratePremiumAccount(customer);
                        break;

                }
               
                return customer;
            }

            private void GenerateBasicAccount(Customer customer)
            {
                //Custom implementation for premium account
            }

            private void GenerateIntermediateAccount(Customer customer)
            {
                //Custom implementation for premium account
            }
            private void GeneratePremiumAccount(Customer customer)
            {
                //Custom implementation for premium account
            }
             
        }
````

In this simple example, we have three main classes: User, Customer and Platform account.  
All of them already existed, but class customer was changed in order to contain the necessary routine to create a specific plan based in what the user chooses when subscribed.  
What is the problem with that implementation? It violates the Open-Closed principle once the Plan Account class was modified instead of the code be extended to new classes in order to support the new requirements.  
It now contains a “switch-case” statement in case the customer has a premium account, and it’s calling a different method.  
There are a couple of limitations and risks using this approach:

1. All the methods that have to call the create method must set the property **AccountType** correctly. It is easy to make mistakes in coding and forget to set the property value to true. It is not so “visible” in the code.

2. In the case of this class would have a complex implementation, adding code to the method could easily affect the behavior for other types of accounts.

3. If in the future new account types will be included, such as bronze, silver, and gold, it would add extra conditions on the platform account class, and the complexity would get higher and higher, being pretty risky.

### Applying Open-Closed Principle

A good alternative to the previous implementation would be following the recommendations stated by the Open-Closed principle, which means extend the functionality to provide the custom implementation for each account type instead of changing the existing customer, user and platform account class.  
If each plan has a completely different implementation, it would be better to create separated classes in order to separate the risks and increase the aspects of testability and flexibility.  
To achieve this objective, it is possible to use interfaces for the User and Plan Account classes, as seen in the following code:

````typescript
 public class BasicUser : IUser
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public IPlanAccount PlanAccount { get; set; } = new BasicAccount();
        }

        public class IntermediateUser : IUser
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public IPlanAccount PlanAccount { get; set; } = new IntermediateAccount();
        }

        public class PremiumUser : IUser
        {
            public int Id { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public IPlanAccount PlanAccount { get; set; } = new PremiumAccount();
        }
````
### Why should you use OCP?

In this case:

1. Instead of one user class we have one for each type of account, sharing the same IUser interface.  
2. Each specific class initializes different concrete classes related to the Plan Account once all of them implement the same IPlanAccount interface.
3. The second code is more clear and easier to test and extend in the future.  
4. It explicitly expresses the intention of the code.  
5. The excessive use of if and switch-case statement normally indicates that something should be refactored and improved.


### Remember: This principle tells you to write your code so that you will be able to add new functionality without changing the existing code.

## Chapter 2: Extra examples

It is much better to work with **dependencies**, meaning passing an object to another object as a parameter.

#### Dependencies?



Ideal code should be written with the **Blackbox** principle in mind, you should be able to guess what a function does just by looking at its signature.

#### Blackbox principle? 



Consider how the coupling of two entities affects their respective maintainability. The more a given entity knows about how another one is implemented, the more we can say that they are coupled. Therefore, if one of the two entities is changed, then the other must be changed too.

### Arrays with meaning
Other examples of bad code practices not listing to the Open Closed Principle is having objects return Associative Arrays with meaning (the labels are used later on outside the class)

````typescript
function getProducts() {
    return [{'name': 'chair', 'price': 5}, {'name': 'table', 'price': 15}, {'name': 'bed', 'price': 20}];
}
//the zero at the end refers to the default value when no total has been calculated yet (first value of total)
// This is needed in case the getProducts() returns an empty array
let totalPrice = getProducts().reduce((total, product) => total + product.price, 0);
````

You can improve on this in 2 ways in TypeScript, you can create a Product class or create a literal:
````typescript
    type Product = {'name': string, 'price': number};
    type ProductCollection = Product[];
````


---

## Chapter 3: Implementation
## Chapter 3.1: The mission

Look at the old.ts file, and you see a bunch of animals in a zoo, all making the sounds.
Now add another animal (you can choose your favorite animal), and make sure it makes a sound.

Did you notice you needed to alter the Zoo object even when all you did was add a new Animal class? Would it not be much better to move the `makeSound` function to each Animal class, so each animal can decide for himself what sound he makes instead of the Zoo class?

Create a `makeSound` function to each Animal class and remove the giant switch from the Zoo class. Now you can easily add new animals without altering an existing class!

## Chapter 3.2: Show me the code

### Chapter 3.2.1: The original code (bad)

1. Class Dog
````typescript
class Dog {
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'dog';
    }
}
````
2. Class Cat
````typescript
class Cat {
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'cat';
    }
}
````
3. Class Parrot
````typescript
class Parrot {
    private _name;

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get type() {
        return 'parrot';
    }
}
````
4. Class Zoo
````typescript
class Zoo {
    private _animals : Array<Object> = new Array<Object>();

    public addAnimal(animal: object) {
        this._animals.push(animal);
    }

    get animals(): Array<Object> {
        return this._animals;
    }

    public makeSound(animal: object) : string {
        switch(animal.type) {
            case 'cat':
                return 'Miauw';
            case 'dog':
                return 'Woef';
            case 'parrot':
                return 'I am a pirate';
            default:
                throw new Error('Unknown type: '+ animal.type);
        }
    }
}
````
6. Creating new object Zoo + adding animals in this zoo
````typescript
let zoo = new Zoo;
zoo.addAnimal(new Cat);
zoo.addAnimal(new Dog);
zoo.addAnimal(new Parrot);
````
7. Foreach to show animals on page
````typescript
zoo.animals.forEach((animal) => {
    document.querySelector('#target').innerHTML += (animal.type + ": " + zoo.makeSound(animal) + "<br>");
});
````

### Chapter 3.2.2: The improved code 

1. Class Animal 
````typescript
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
````
add text here

2. Class Dog
````typescript
class Dog extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}
````
3. Class Cat
````typescript
class Cat extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}
````
4. Class Parrot
````typescript
class Parrot extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}
````
5. Class Alligator
````typescript
class Alligator extends Animal {

    constructor(type: string, sound: string) {
        super(type, sound);
    }

}
````
add text here

6. Class Zoo
````typescript
class Zoo {
    private _animals: Array<Animal> = new Array<Animal>();

    public addAnimal(animal: Animal) {
        this._animals.push(animal);
    }

    get animals(): Array<Animal> { 
        return this._animals;
    }

}
````
add text here

7. Creating new object Zoo + adding animals in this zoo
````typescript
let zoo = new Zoo;
zoo.addAnimal(new Dog('Dog', 'woof'));
zoo.addAnimal(new Cat('Cat', 'miauw'));
zoo.addAnimal(new Parrot('Parrot', "i'm a pirate"));
zoo.addAnimal(new Alligator('Alligator', 'See you later, Alligator'));
````
add text here 

8. Foreach to show animals on page
````typescript
zoo.animals.forEach((animal: Animal) => {
    document.querySelector('#target').innerHTML += (animal.type + ": " + animal.sound + "<br>");
});
````
add text here 

---

## Chapter 4: Summary

The Open-Closed Principle is one of the five SOLID principles.  
It requires that a software artifact should be open for extension, but closed for modification.

To fulfil this requirement, we could apply inheritance or better yet, introduce a layer of abstraction with different implementations in our design to avoid tight coupling between particular classes.

But the Open-Closed Principle has two limitations:

1. we still need some kind of toggle mechanism to switch between the original and extended behaviour, which could require modification of the present code
2. The design needs to support the particular extension that we want to make - we cannot design our code in a way that ANY modification is possible without touching it.

*Nevertheless, it is worthwhile to follow the Open-Closed Principle as far as possible, as it encourages us to develop cohesive, loosely coupled components.*


---
## Sources:
- Chapter 1:
  - https://medium.com/@alexandre.malavasi/why-is-the-open-closed-principle-so-important-bed2f2a0d4c7
  - https://stackify.com/solid-design-open-closed-principle/
  - https://reflectoring.io/open-closed-principle-explained/
- Chapter 2:
  - 
- Chapter 3:
  - 
- Chapter 4:
  - 