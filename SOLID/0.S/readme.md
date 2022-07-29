# Single responsibility principle (Solid)

---
## MaTS

![img.png](../../images/singleRP.png)

---
## Chapter 1: What is the Single responsibility principle?

The idea behind the SRP is that every class, module, or function in a program should have one responsibility/purpose in a program.  
As a commonly used definition, "every class should have only one reason to change".

Consider the example below:


````javascript
public class Student {

     public void registerStudent() {
         // some logic
     }

     public void calculate_Student_Results() {
         // some logic
     }

     public void sendEmail() {
         // some logic
     }

}
````

The class above violates the single responsibility principle. Why?

This ````Student```` class has three responsibilities – registering students, calculating their results, and sending out emails to students.

The code above will work perfectly but will lead to some challenges. We cannot make this code reusable for other classes or objects. The class has a lot of logic interconnected that we would have a hard time fixing errors. And as the codebase grows, so does the logic, making it even harder to understand what is going on.

Imagine a new developer joining a team with this sort of logic with a codebase of about two thousand lines of code all congested into one class.

Now let's fix this!

````javascript
public class StudentRegister {
public void registerStudent() {
// some logic
}
}
````
````javascript
public class StudentResult {
public void calculate_Student_Result() {
// some logic
}
}
````
````javascript
public class StudentEmails {
public void sendEmail() {
// some logic
}
}
````

Now we've separated each functionality in our program. We can call the classes anywhere we want to use them in our code.

The examples showed each class having one method – this is mainly for simplicity. You can have as many methods as you want, but they should be linked to the responsibility of the class.

### Why should you use SRP?

1. Now that we have separated the logic, our code is easier to understand as each core functionality has its own class. We can test for errors more efficiently.

2. The code is now reusable. Before, we could only use these functionalities inside one class, but now they can be used in any class.

3. The code is also easily maintainable and scalable because instead of reading interconnected lines of code, we have separated concerns, so we can focus on the features we want to work on.

### Remember: A class should have one, and only one, reason to change.

## Chapter 2: A simple question to validate your design

Unfortunately, following the single responsibility principle sounds a lot easier than it often is.

If you build your software over a longer period and if you need to adapt it to changing requirements, it might seem like the easiest and fastest approach is adding a method or functionality to your existing code instead of writing a new class or component, but that often results in classes with more than responsibility and makes it more and more difficult to maintain the software.

You can avoid these problems by asking a simple question before you make any changes: **What is the responsibility of your class/component/microservice?**

If the answer includes the word “and”, you’re most likely breaking the single responsibility principle. Then it’s better to take a step back and rethink your current approach. There is most likely a better way to implement it.

---
## Chapter 3: Implementation 

### 3.1 The mission

Look at the old.ts file and open the index.html file, you can see the software has some options to handle fuel, music and the engine.  
However, these are really 3 separate domains making the current Car object really strange.  
Refactor the code, so we have at least a separate class for Car, Engine and MusicPlayer.

you can see the software has some options to handle fuel, music and the engine.
There are a couple of problems with this:

- The Car class is a classic example of a so-called “God object” — that is, an object that knows about and does everything. These types of objects are really hard to maintain, extend and test.
- We have to prefix every variable with the correct domain eg. "engineStatus". It would be nicer to just name it "Status" but we cannot do this in the car because you might confuse it with the status of the MusicPlayer.
- What if we want different types of engines with different ways of consuming fuel? We would have to put a lot of extra if-statements in our car class.

### Extra challenge
Make a new type of Engine that also consumes Fuel

### 3.2 Show me the code

````

````

---
## Chapter 4: Summary 

The Single Responsibility Principle applies to software components on all levels: methods, classes, modules, and distributed services.

The Single Responsibility Principle itself does not include guidance about how large or small a responsibility for a component should be. The optimal size depends on the specific component, the type of the application, the current development priorities, and other context.

We should analyze how making the responsibilities of components smaller or larger affects the qualities of the code and the system that we are developing.

---


---
### Sources
- Chapter 1:
  - https://stackify.com/solid-design-principles/
  - https://www.freecodecamp.org/news/solid-principles-single-responsibility-principle-explained/
- Chapter 2:
  - https://stackify.com/solid-design-principles/
- Chapter 4:
  - https://reflectoring.io/single-responsibility-principle/