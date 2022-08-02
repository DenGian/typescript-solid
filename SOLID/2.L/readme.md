# Liskov substitution principle (soLid)

## MaTS

![Liskov meme](../../images/liskovSP.png)

---
## Chapter 1: What is the Liskov substitution principle?

Simply put, the Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

In other words, what we want is to have the objects of our subclasses behaving the same way as the objects of our superclass. 

It extends the Open/Closed Principle by focusing on the behavior of a superclass and its subtypes.

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

By looking at the above scenario you might still argue that it looks pretty consistent.  
That is true for the language you are coding in and also for Mathematics but a Square might not always satisfy the behavior of a Rectangle.

**For example**

````typescript
void clientMethod(Rectangle rec){
    rec.setWidth(5);
    rec.setHeight(4);
    assert (rec.area() === 20);
}
````

The ````ClientMethod()```` expects a Rectangle and asserts a value of the area.  
All was well up to this point but now when we do ````rec.setHeight(4)````, the Square will set both its sides as 4, and that will totally mess up the assert statement.

We were expecting a Rectangle of sides 5 and 4 to have an area of 20, but we got a Square with sides 4 and 4 and area 16.

**Hence, using Square’s object in place of the Rectangle’s object totally breaks LSP!**

![img.png](../../images/square.png)

---

## Chapter 2: Some real-life examples

There is still some confusion around Liskov substitution principle for me, so here are some real-life examples for clarification.

1. Your landlord wanted you to fix the main gate’s light bulb but you gave him Diwali vibes instead! (He won’t be happy!)

![LSP](../../images/lsp1.png)

2. You fed your neighbor’s pet duck expired Bread and now it’s dead. You decided to replace it with a toy duck. (He won’t be happy!)

![LSP](../../images/lsp2.png)

## Chapter 3: 


"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." See also [design by contract](https://en.wikipedia.org/wiki/Design_by_contract).

## Chapter 4: Implementation

### Chapter 4.1: The mission

Look at the old.ts file and open the index.html file, refactor the Discount class in 3 different classes with the same interface "VariableDiscount" & "FixedDiscount" & "NoDiscount"

#### Discuss
Do you understand what the use is of having the class NoDiscount? This prevents us from having to write extra if-statements inside product to check if we actually have a Discount dependency. It might look strange but these null or void classes are very common in a lot of popular libraries!

#### Polymorphism
You might already be aware of Polymorphism, but just to remind you, here is the short summary:
If 2 different classes use **the same interface**, so they have the same function names: the code that uses this class does not care about which one class it receives.
In short: When two objects have the same interface, they are functionally interchangeable = polymorphism.

### Chapter 4.2: Show me the code

#### Chapter 4.2.1: The original code (bad)

1. 
````typescript
//This is called a Union, the discountType can only contain the following 3 values:
type discountType = "variable" | "fixed" | "none";
````
2. class Discount
````typescript
class Discount {
    private _type: discountType;
    private _value: number;

    constructor(type : discountType, value : number = 0) {
        this._type = type;
        this._value = value;

        if(this._type != 'none' && value <= 0) {
            throw new Error('You cannot create a '+ this._type + ' discount with a negative value');
        }
    }

    apply(price : number) : number {
        //@todo: instead of using magic values as string in this, it would be a lot better to change them into constant. This would protect us from misspellings. Can you improve this?
        if(this._type === "none")  {
            return price;
        }
        else if(this._type === "variable")  {
            return (price - (price * this._value / 100));
        } else if(this._type === "fixed") {
            return Math.max(0, price - this._value);
        }
        else {
            throw new Error('Invalid type of discount');
        }
    }

    showCalculation(price : number) : string {
        if(this._type === "none")  {
            return "No discount";
        }
        else if(this._type === "variable")  {
            return price + " € -  "+ this._value +"%";
        } else if(this._type === "fixed") {
            return price + "€ -  "+ this._value +"€ (min 0 €)";
        }
        else {
            throw new Error('Invalid type of discount');
        }
    }
}

````
3. class Product
````typescript
class Product {
    private _name : string;
    private _price : number;
    private _discount : Discount;

    constructor(name: string, price: number, discount: Discount) {
        this._name = name;
        this._price = price;
        this._discount = discount;
    }

    get name(): string {
        return this._name;
    }

    get discount(): Discount {
        return this._discount;
    }

    get originalPrice(): number {
        return this._price;
    }

    //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
    //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
    calculatePrice() : number {
        return this._discount.apply(this._price);
    }

    showCalculation() : string {
        return this._discount.showCalculation(this._price);
    }
}
````
4. class shoppingBasket
````typescript
class shoppingBasket {
    //this array only accepts Product objects, nothing else
    private _products: Product[] = [];

    get products(): Product[] {
        return this._products;
    }

    addProduct(product: Product) {
        this._products.push(product);
    }
}
````
5. 
````typescript
let cart = new shoppingBasket();
cart.addProduct(new Product('Chair', 25, new Discount("fixed", 10)));
//cart.addProduct(new Product('Chair', 25, new Discount("fixed", -10)));
cart.addProduct(new Product('Table', 50, new Discount("variable", 25)));
cart.addProduct(new Product('Bed', 100, new Discount("none")));
````
6. 
````typescript
const tableElement = document.querySelector('#cart tbody');
cart.products.forEach((product) => {
    let tr = document.createElement('tr');

    let td = document.createElement('td');
    td.innerText = product.name;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = product.originalPrice.toFixed(2) + " €";
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = product.calculatePrice().toFixed(2) + " €";
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = product.showCalculation();
    tr.appendChild(td);

    tableElement.appendChild(tr);
});
````

#### Chapter 4.1.2: The improved code

1. Interface
````typescript
interface Discount {
    apply(price: number) : number;
    showCalculation(price: number) : string;
}
````

---
## Sources
- Chapter 1:
  - https://blog.knoldus.com/what-is-liskov-substitution-principle-lsp-with-real-world-examples/
  - https://stackify.com/solid-design-liskov-substitution-principle/
- Chapter 2:
  -  https://blog.knoldus.com/what-is-liskov-substitution-principle-lsp-with-real-world-examples/
- Chapter 3: https://stackify.com/solid-design-liskov-substitution-principle/