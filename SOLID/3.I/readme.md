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

Violating the ISP also leads to violation of other principles like the **Single Responsibility Principle**.

## Chapter 2: Violating ISP

Whether working solo or in larger teams, it helps to identify problems in code early. So, let’s discuss some code smells which could indicate a violation of the ISP.

### Chapter 2.1: Polluting the interface with a new method

As we move ahead in time, and more features come in, there's a need to add new *methods*.

When we change the interface by implementing these new methods all the implementing classes now have to implement the new methods.  
**The problem is, implementing them is unwanted and could lead to many side effects.**

Since a class does not need them and has no logic for them, it's just throwing an ````UnsupportedOperationException````.  
This is where we start violating the principle.

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

### Chapter 2.4: Methods throwing exceptions

if you encounter an ````UnsupportedOperationException````, a ````NotImplementedException````, or similar exceptions(in Java), it smells like a design problem related to the ISP.  
It might be a good time to refactor these classes.

### Chapter 2.5: So, Should Interfaces Always Have a Single Method?

Applying the ISP to the extreme will result in single-method interfaces, also known as role interfaces.

This solution will solve the problem of ISP violation. Still, it can result in a violation of cohesion in interfaces, resulting in the scattered codebase that is hard to maintain.  

For example, the ````Collection```` interface in Java has many methods like ````size()```` and ````isEmpty()```` which are often used together, so it makes sense for them to be in a single interface.

---

## Chapter 3: Implementation

### Chapter 3.1 The mission

#### Exercise: step 1
Go into [old.ts](old.ts) and look at the 2 different users. They have a couple of authentication methods but like you can see, Admin users can only login with a password, not with facebook or google because of security reasons.
Refactor the current fat interface so each auth method has each own interface.
As an extra difficulty, there is a feature request for a google bot to be able to login on the site, he can only use the google option to log in. Can you make this extra class?

#### Exercise: Step 2 (Optional)
You might notice that both the Google and Facebook code is almost identical, could you maybe refactor this code to small, separate dependencies?

### Chapter 3.2: Show me the code

#### Chapter 3.3.1: The original code (bad)

1. The interface
````typescript
interface UserAuth {
    checkPassword(password: string) : boolean;
    resetPassword();
    setGoogleToken(token : string);
    checkGoogleLogin(token : string) : boolean;
    setFacebookToken(token : string);
    getFacebookLogin(token : string) : boolean;
}
````
2. class User that implements UserAuth
````typescript
class User implements UserAuth {
    private _password : string = 'user';
    private _facebookToken : string;
    private _googleToken : string;

    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    checkGoogleLogin(token) {
        // return "this will not work";
        return (token === this._googleToken);
    }

    setGoogleToken(token : string) {
        this._googleToken = token;
    }

    getFacebookLogin(token) {
        return (token === this._facebookToken);
    }

    setFacebookToken(token : string) {
        this._facebookToken = token;
    }

    checkPassword(password: string) : boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}
````
3. class Admin that implements UserAuth
````typescript
class Admin implements UserAuth {
    private _password : string = 'admin';

    checkGoogleLogin(token: string): boolean {
        return false;
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    getFacebookLogin(token: string): boolean {
        return false;
    }

    setFacebookToken() {
        throw new Error('Function not supported for admins');
    }

    setGoogleToken() {
        throw new Error('Function not supported for admins');
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}
````
4. new user and new admin
````typescript
let guest = new User;
let admin = new Admin;
````
5. Switch cases with the logic for logging in
````typescript
document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let user = loginAsAdminElement.checked ? admin : guest;

    if(!loginAsAdminElement.checked) {
        user.setGoogleToken('secret_token_google');
        user.setFacebookToken('secret_token_fb');
    }
    debugger;

    let auth = false;
    switch(true) {
        case typePasswordElement.checked:
            auth = user.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked:
            auth = user.checkGoogleLogin('secret_token_google');
            break;
        case typeFacebookElement.checked:
            debugger;
            auth = user.getFacebookLogin('secret_token_fb');
            break;
    }

    if(auth) {
        alert('login success');
    } else {
        alert('login failed');
    }
});
````
6. Logic for resting the password
````typescript
resetPasswordElement.addEventListener('click', (event) => {
   event.preventDefault();

   let user = loginAsAdminElement.checked ? admin : guest;
   user.resetPassword();
});
````

### Chapter 3.3.2: The improved code

1. The interface
````typescript
interface PasswordAuth {
    checkPassword(password: string): boolean;

    resetPassword();
}

interface GoogleAuth {
    setGoogleToken(token: string);

    checkGoogleLogin(token: string): boolean;
}

interface FacebookAuth {
    setFacebookToken(token: string);

    getFacebookLogin(token: string): boolean;
}
````
The interface was split up in 3 different interfaces
2. Class User that implements all the interfaces
````typescript
class User implements PasswordAuth, GoogleAuth, FacebookAuth {
    private _password: string = 'user';
    private _facebookToken: string;
    private _googleToken: string;

    checkGoogleLogin(token) {
        // return "this will not work";
        return (token === this._googleToken);
    }

    setGoogleToken(token: string) {
        this._googleToken = token;
    }

    getFacebookLogin(token) {
        return (token === this._facebookToken);
    }

    setFacebookToken(token: string) {
        this._facebookToken = token;
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}
````
3. Class Admin that **only** implements interface ````PasswordAuth````
````typescript
class Admin implements PasswordAuth {
    private _password: string = 'admin';

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}
````
4. Class GoogleBot
````typescript
class GoogleBot implements GoogleAuth {
    private googleToken: string = ''

    checkGoogleLogin(token: string): boolean {
        return (token === this.googleToken);
    }

    setGoogleToken(token: string) {
        this.googleToken = token;
    }
}
````
5. Switch cases with the logic for logging in
````typescript
document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let user;
    let auth = false;

    // debugger;

    switch (true) {
        case (typePasswordElement.checked && loginAsAdminElement.checked):
            user = new Admin();
            auth = user.checkPassword(passwordElement.value);
            console.log(user);
            break;
        case (loginAsAdminElement.checked && !typePasswordElement.checked):
            alert ('You no enter')
            break;
        case (!loginAsAdminElement.checked || passwordElement.value === 'user'):
            user = new User();
            switch (true){
                case typePasswordElement.checked:
                    auth = user.checkPassword(passwordElement.value)
                    break;
                case typeFacebookElement.checked:
                    user.setFacebookToken('secret_token_fb');
                    auth = user.getFacebookLogin('secret_token_fb')
                    break;
                case typeGoogleElement.checked:
                    user.setGoogleToken('secret_token_google');
                    auth = user.checkGoogleLogin('secret_token_google')
                    break;
            }
            console.log(user);
            // debugger;
            break;
    }

    if (typeGoogleElement.checked && !loginAsAdminElement.checked){
        let user = new GoogleBot();
        user.setGoogleToken('secret_token_google');
        auth = user.checkGoogleLogin('secret_token_google')
        console.log(user);
    }

    if (auth) {
        alert('login success');
    } else {
        alert('login failed');
    }
});
````
add text here
6. Logic for resting the password
````typescript
resetPasswordElement.addEventListener('click', (event) => {
    event.preventDefault();

    let user = loginAsAdminElement.checked ? new Admin : new User;
    user.resetPassword();
});
````
---

## Chapter 4: Summary

**Clients should not be forced to depend upon interfaces that they do not use.**

By following this principle, you prevent bloated interfaces that define methods for multiple responsibilities.  
As explained in the Single Responsibility Principle, you should avoid classes and interfaces with multiple responsibilities because they change often and make your software hard to maintain.

---
## Sources

- Chapter 1:
  - https://stackify.com/interface-segregation-principle/
- Chapter 2:
  - https://www.baeldung.com/java-interface-segregation
  - https://reflectoring.io/interface-segregation-principle/
  - https://stackify.com/interface-segregation-principle/
- Chapter 4:
  - https://stackify.com/interface-segregation-principle/