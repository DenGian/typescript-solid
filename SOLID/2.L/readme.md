# Liskov substitution principle (soLid)

## MaTS

![Liskov meme](../../images/liskovSP.png)

---
## Chapter 1: What is the Liskov substitution principle?

Simply put, the Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

In other words, what we want is to have the objects of our subclasses behaving the same way as the objects of our superclass.

Remember in 5th grade when your maths teacher taught you the formula of squares for rectangles and squares?  
I always remembered square as the more “formula-friendly” rectangle. It is after all a rectangle with equal sides, isn’t it?

Now suppose you have a base class Rectangle and I tell you to create a new class Square and maximize reuse.  
Will you inherit the Rectangle class inside the Square class?

No matter how tempting it might sound or how well you intend to handle it, this small “reuse” will be totally **WRONG!**

### For example
````typescript
class Rectangle {
    public void setWidth(int width) {
        this.width= width;
}
public void setHeight(int height){
        this.height= height;
}
public void area(){
        return height * width;
}
...
}
````
````typescript
class Square extends Rectangle {
    public void setWidth(int width){
        super.setWidth(width);
        super.setHeight(width);
}
    public void setHeight(int height){
        super.setWidth(height);
        super.setHeight(height)
}
}
````

![img.png](../../images/square.png)



"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." See also [design by contract](https://en.wikipedia.org/wiki/Design_by_contract).

### Polymorphism
You might already be aware of Polymorphism, but just to remind you, here is the short summary:
If 2 different classes use **the same interface**, so they have the same function names: the code that uses this class does not care about which one class it receives.
In short: When two objects have the same interface, they are functionally interchangeable = polymorphism.

## Your mission
Look at the old.ts file and open the index.html file, refactor the Discount class in 3 different classes with the same interface "VariableDiscount" & "FixedDiscount" & "NoDiscount"

### Discuss
Do you understand what the use is of having the class NoDiscount? This prevents us from having to write extra if-statements inside product to check if we actually have a Discount dependency. It might look strange but these null or void classes are very common in a lot of popular libraries!
