# typescript-solid

---
## MaTS

![meme](images/meme.png)
---
## Introduction

Javascript is a great language, but it does not come **Type Safety** out of the box. This is the ability for the programmer to define input and output variables for a function (like in PHP) and so having more stability in their code.
This is why we are going to explore a new language called TypeScript, which builds on JavaScript, which adds static type definitions.

For example, trying to pass a String to function that expects a number will throw an error on compilation, even before testing it in the browser! This way you get very fast feedback in your editor when there are problems in your code.
In code this looks like this:

```javascript
function sum(a, b) {
    return a+b;
}
```

becomes

```typescript
function sum(a : number, b : number) : number {
    return a+b;
}
```

Trying to pass a string to this function will now immediately trigger an error in your console.

Start by reading [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

---
## Chapter 1: TypeScript

### Introduction to TypeScript

*TypeScript is a super set of JavaScript.*

TypeScript is Typed JavaScript.  
TypeScript adds types to JavaScript to help you speed up the development by catching errors before you even run the JavaScript code.

TypeScript builds on top of JavaScript. First, you write the TypeScript code. Then, you compile the TypeScript code into plain JavaScript code using a TypeScript compiler.

Once you have the plain JavaScript code, you can deploy it to any environments that JavaScript runs.

TypeScript files use the .ts extension rather than the .js extension of JavaScript files.

![how TypeScript works](images/TypeScript.png)

TypeScript uses the JavaScript syntax's and adds additional syntax's for supporting Types.

If you have a JavaScript program that does not have any syntax errors, it is also a TypeScript program. It means that all JavaScript programs are TypeScript programs. This is very helpful if you’re migrating an existing JavaScript codebase to TypeScript.

The following diagram shows the relationship between TypeScript and JavaScript:

![Relationship JavaScript-TypeScript](images/JS-TS.png)

#### Summary 

1. TypeScript adds additional syntax to JavaScript to support a **tighter integration with your editor.** Catch errors early in your editor.
2. TypeScript code converts to JavaScript, which **runs anywhere JavaScript runs:** In a browser, on Node.js ...
3. **TypeScript understands JavaScript** and uses **type inference to give you great tooling** without additional code.

*Remember, the power of something like TypeScript is not what it allows us to do, but what it forbids us from doing!*

### Why TypeScript?

#### TypeScript improves productivity while helping to avoid bugs

Types increase productivity by helping you avoid many mistakes. By using types, you can catch bugs at the compile-time instead of having them occurring at runtime.

The following function adds two numbers ````x```` and ````y````:

````javascript
function add(x, y) {
   return x + y;
}
````
If you get the values from HTML input elements and pass them into the function, you may get an unexpected result:

````javascript
let result = add(input1.value, input2.value);
console.log(result); // result of concatenating strings
````

For example, if users entered ````10```` and ````20````, the ````add()```` function would return ````1020````, instead of ````30````.

The reason is that the ````input1.value```` and ````input2.value```` are strings, not numbers. When you use the operator ````+```` to add two strings, it concatenates them into a single string.

When you use TypeScript to explicitly specify the type for the parameters like this:

````javascript
function add(x: number, y: number) {
   return x + y;
}
````

In this function, we added the number types to the parameters. The function ````add()```` will accept only numbers, not any other values.

When you invoke the function as follows:

````javascript
let result = add(input1.value, input2.value);
````

… the TypeScript compiler will issue an error if you compile the TypeScript code into JavaScript. Hence, you can prevent the error from happening at runtime.

---

## Chapter 2: The installation

## Sources
- Chapter 1:
  - https://www.typescripttutorial.net/typescript-tutorial/what-is-typescript/
  - https://www.typescriptlang.org/
  - 