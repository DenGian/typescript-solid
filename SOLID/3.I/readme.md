# Interface segregation principle (solId)

## MaTS

![img.png](../../images/isp.png)

---

## Chapter 1: What is the Interface segregation principle?

### *“Clients should not be forced to depend upon interfaces that they do not use.”*

Sounds obvious, doesn’t it? Well, it’s pretty easy to violate this interface, especially if your software evolves, and you have to add more and more features. But more about that later.

Similar to the Single Responsibility Principle, the goal of the Interface Segregation Principle is to reduce the side effects and frequency of required changes by splitting the software into multiple, independent parts.

### Chapter 1.1: What is an interface?

An Interface is a set of abstractions that an implementing class must follow. We define the behavior but don’t implement it:

````typescript
interface Dog {
  void bark();
}
````

Taking the interface as a template, we can then implement the behavior:

````typescript
class Poodle implements Dog {
  public void bark(){
    // poodle-specific implementation    
  }
}
````

### Chapter 1.2: Why should you use ISP?

Let’s look at an example to understand why the Interface Segregation Principle is helpful.

We’ll create some code for a burger place where a customer can order a burger, fries or a combo of both:

````typescript
interface OrderService {
  void orderBurger(int quantity);
  void orderFries(int fries);
  void orderCombo(int quantity, int fries);
}
````

Since a customer can order fries, or a burger, or both, we decided to put all order methods in a single interface.

Now, to implement a burger-only order, we are forced to throw an ````exception```` in the ````orderFries()```` method:

````typescript
class BurgerOrderService implements OrderService {
  @Override
  public void orderBurger(int quantity) {
  System.out.println("Received order of "+quantity+" burgers");
}

@Override
public void orderFries(int fries) {
  throw new UnsupportedOperationException("No fries in burger only order");
}

@Override
public void orderCombo(int quantity, int fries) {
  throw new UnsupportedOperationException("No combo in burger only order");
}
}
````
````@Override```` is a ````Java```` annotation, no need to know what it is right now, but if you want to read up on it:
do it [here](https://www.tutorialspoint.com/importance-of-override-annotation-in-java)

Similarly, for a ````fries-only```` order, we’d also need to **throw an exception** in ````orderBurger()```` method.

This is not the only downside of this design. The ````BurgerOrderService```` and ````FriesOrderService```` classes will also have unwanted side effects whenever we make changes to our abstraction.

Let’s say we decided to accept an order of fries in units such as pounds or grams. In that case, we most likely have to add a unit parameter in ````orderFries()````.  
This change will also affect ````BurgerOrderService```` even though it’s not implementing this method!

By violating the ISP, we face the following problems in our code:

1. Client developers are confused by the methods they don’t need.
2. Maintenance becomes harder because of side effects: a change in an interface forces us to change classes that don’t implement the interface.

Violating the ISP also leads to violation of other principles like the Single Responsibility Principle.

## Chapter 2: Violating ISP

Whether working solo or in larger teams, it helps to identify problems in code early. So, let’s discuss some code smells which could indicate a violation of the ISP.

### Chapter 2.1: Polluting the interface with a new method



### Chapter 2.2: A bulky interface

In bulky interfaces, there are too many operations, but for most objects, these operations are not used.  
The ISP tells us that we should need most or all methods of an interface, and in a bulky interface, we most commonly only need a few of them in each case.  
Also, when testing a bulky interface, we have to identify which dependencies to mock and potentially have a giant test setup.

### Chapter 2.3: Unused dependencies

Another indication of an ISP violation is when we have to pass null or equivalent value into a method. 

#### For example:

In a fast-food restaurant  
We can use ````orderCombo()```` to place a burger-only order by passing ````zero```` as the fries' parameter.  
This client does not require the fries' dependency, so we should have a separate method in a different interface to order fries.

### Chapter 2.3: Methods throwing exceptions

if you encounter an ````UnsupportedOperationException````, a ````NotImplementedException````, or similar exceptions(in Java), it smells like a design problem related to the ISP.  
It might be a good time to refactor these classes.

### Chapter 2.4: So, Should Interfaces Always Have a Single Method?

Applying the ISP to the extreme will result in single-method interfaces, also known as role interfaces.

This solution will solve the problem of ISP violation. Still, it can result in a violation of cohesion in interfaces, resulting in the scattered codebase that is hard to maintain.  

For example, the ````Collection```` interface in Java has many methods like ````size()```` and ````isEmpty()```` which are often used together, so it makes sense for them to be in a single interface.

---





"Many client-specific interfaces are better than one general-purpose interface."

Interfaces are really good, but like with everything that is good you can go overboard. It is really important that when we create interfaces that are precise and modular. 
Almost all languages support adding multiple interfaces to the same class, this in contrast to extending a class, where only a few languages (eg. c++) allow multiple inheritance.
This allows us to create a lot of small, granular interfaces that then allows us to reuse interfaces to multiple different classes.

As a rule of thumb, her is an easy rule: **If at any point you are writing 'this function is not supported' in a class to adhere to an interface, your interface is to big.**

The problem of these big interfaces is sometimes called a **Fat Interface*. A fat interface violates Single Responsibility Principle too as it’s handling more than one responsibilities at a time.

Let us think of an example, for example, let us think back of an animal example, look at the following code:

```typescript
interface BirdInterface {
    laysEgg();
    makeSound();
    fly();
    getFlySpeed();
}
class Parrot implements BirdInterface {}
```

This works great, but what happens when we want to make a penguin? Those cute creatures cannot fly! So let us move the *fly()* to a separate interface:

```typescript
interface BirdInterface {
    laysEgg();
    makeSound();
}
interface CanFly {
    fly();
    getFlySpeed();
}
```

### Exercise: step 1
Go into [old.ts](old.ts) and look at the 2 different users. They have a couple of authentication methods but like you can see, Admin users can only login with a password, not with facebook or google because of security reasons.
Refactor the current fat interface so each auth method has each own interface.
As an extra difficulty, there is a feature request for a google bot to be able to login on the site, he can only use the google option to log in. Can you make this extra class?

### Exercise: Step 2 (Optional)
You might notice that both the Google and Facebook code is almost identical, could you maybe refactor this code to small, separate dependencies?

## Sources

- Chapter 1:
  - https://stackify.com/interface-segregation-principle/
- Chapter 2:
  - https://www.baeldung.com/java-interface-segregation