TypeScript-Workshop
======================

You have a basic knowledge of ES6 and want to learn you a TypeScript for great good! Well, you've come to the right place!

This workshop is meant to help you, a seasoned JS-developer, to get up to speed with TypeScript in no time!

_This is an early version and there is quite some potential to improve the coding-parts in particular._

## Setup

```
yarn
yarn start
```

You also might want to install a TypeScript-plugin for your editor before starting!

## Getting started

To following Sections are supposed to be read/worked in order.

### Types

An example of expressing that color should always be a string:

```typescript
let color: string = "blue";
```

All the types:

* `boolean`
* `string`
* `number` - keep in mind that everything in JavaScript is a float.
* Arrays
  * `number[]`
  * `Array<number>`
* Tuples
  Basically fixed size arrays.
  * `[string, number | boolean]`
* Enum
  Maps readable identifiers to numbers. Starts to count at 0.
  * `enum Color {Red, Green, Blue}`
  * `enum Color {Red = 1, Green, Blue}` - starts the enumeration at 1
  * `enum Color {Red = 1, Green = 2, Blue = 4}` - you can set all the values by hand
* `any` - thing can be of any kind. this is equivalent to completely skipping type-checks. avoid this!
* `void` - `void` is a little like the opposite of `any`: the absence of having a type. you may commonly see this as the return type of functions that do not return a value.
* `null`, `undefined` - By default `null` and `undefined` are subtypes of all other types. That means you can assign `null` and `undefined` to something like `number`.
  However, when using the `--strictNullChecks` flag, `null` and `undefined` are only assignable to void and their respective types. This helps avoid many common errors. In cases where you want to pass in either a `string` or `null` or `undefined`, you can use a union type (you'll read about them later): `string | null | undefined`.
* `never` - represents the type of values that never occur. For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns:

  ```typescript
  function error(message: string): never {
    throw new Error(message);
    // We `never` get here :)
  }

  // Inferred return type is never
  function fail() {
    return error("Something failed");
  }

  function infiniteLoop(): never {
    while (true) {}
    // We `never` get here. And yes, the compiler is clever enough to know!
  }
  ```

If you should ever need more info, [click here](https://www.typescriptlang.org/docs/handbook/basic-types.html).

### Coding Time!

Our customer just reported a critical issue!

The App at `http://localhost:3333` falsely greets with `Hello, [object Object]`!
Fortunately Alice recently introduced TypeScript to the project. Unfortunately she was in a hurry and used `any`-annotations everywhere to make the compiler happy!

Narrow down the types in `app/app.ts` and afterwards let the compiler guide you to finding the bug! This has to happen ASAP (as always)!

### Type Assertions

Type assertions are a way to tell the compiler "trust me, I know what I’m doing". There are 2 ways to do this:

```typescript
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

### Interfaces

* For Objects

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
  description: string;
}
```

* For Functions

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

* Indexable Types

```typescript
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

This example is not complete and you don't need to know this by heart just yet.
If you remember that there's some magic needed to make `myVar[0]` work, you're good.
In case you remembered and came to look for more information, please [go somewhere else](https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types)!.

* Class Interfaces

```typescript
interface ClockInterface {
  private currentTime: Date;
  setTime(d: Date);
  new (hour: number, minute: number);
}

class Clock implements ClockInterface {
  private currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```

### Coding Time!

Add a `JJ`. A `JJ` is functionally equivalent to a `Greeter` except it always greets with `Yo, digga!`.

Remember! Work those bullets one after another!

- If your `JJ` swallows a superfluous string during instantiation, teach it to work without input!
- If your `JJ` contains a constructor, please remove it. You might need to tell the Greeter to just greet `you` by default.
- If somebody could obtain your default value using something like `(new Greeter())['myDefaultPropName']` make sure to protect your private parts!
- Note that `constructor(private greeting : string) {` will automatically create a private instance-variable called `greeting`. Can you golf your code with this?
- The customer decided that the greeting-prefix ("Hallo,") should be customizable! Extract an `Greeting`-Interface and adapt you code.

### Reuse

```typescript
class Shape {
  private position: any;
}

interface DrawableShape extends Shape {
  draw(): void;
}

class DrawableCircle implements DrawableShape {
  radius: number;
}
```

Yip, that's right! Classes can also extend interfaces and the other way around.

When an interface type extends a class type it inherits the members of the class but not their implementations. Interfaces inherit even the private and protected members of a base class.

### Classes

* accessors

```typescript
let passcode = "secret passcode";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

* Static Properties

```typescript
class JJ {
  static greeting: string;
}
```

* Abstract Classes

They may not be instantiated directly, but can contain implementation (which interfaces can not).

```typescript
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("roaming the earth...");
  }
}
```

### Functions

* inline-types have other syntax than their interface-pendant

```typescript
let myAdd: (baseValue:number, increment:number) => number = (x, y) => x + y;;
```

* Rest Params

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
```
### Generics

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

### Advanced Typings

* Intersection Types

`Person & Serializable & Loggable` is a `Person` and `Serializable` and `Loggable`.

* Union Types

`Person | JJ ` is either a `Person` or a `JJ`.

```typescript
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {}
```

### Implement Stuff!

You can safely assume that Bob is working for Customer.

Implement:

* `Eve`    can               `eatCookie`, `callCustomer`, `rantAboutBob`        , `manageDev`
* `Alice`  can `reviewCode`,              `callCustomer`, `rantAboutBob`, `code`
* `Bob`    can `reviewCode`, `eatCookie`, `callCustomer`, `rantAboutBob`, `code`
* `Carol`  can `reviewCode`,              `callCustomer`, `rantAboutBob`, `code`
* A function that lets someone review some code and then code (to fix that idiot's stuff of course!).
* A function that lets someone eat a cookie before calling the customer and rant about Bob.
* A function that lets someone eat a cookie.

Experiment:

* Feed different people to the functions look at the compiler messages.
* Have at least one intersection type
* Have at least one union type

### For the Interested Reader

Of course you followed along really vigilant and rightfully ask: "what if i destructure something and alias it so something named like a type?".
I knew you were the type of person that wants to make compilers mad... So let's see:

```typescript
let o = {a: "someString", b: "someNumber"}

// v1 (bad)
let { a: string, b: number } = o;
console.log(a)      // => compiler error: "Cannot find name 'a'"
console.log(string) // => "someString". WAIT? WHAT?

// v2 (good)
let { a: string, b: number }: { a: string, b: number } = o;
console.log(a)      // => "someString". YAY!
console.log(string) // =>  compiler error: "Cannot find name 'string"
```

As all valid Javascript is supposed to be valid TypeScript we **CAN** name variables `string` or `number`.
While thinking through the example above you hopefully saw that this is a rather bad idea when using TypeScript.

Here's an equivalent for arrays:

```typescript
function f([first, second]: [number, number]) {}
```

## Going Further

* Compile a `.ts`-file by hand. Hint: you'll need a TypeScript-project - which means a `tsconfig.json`.
* Learn about the configuration options in [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
* Learn about the [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).
* Learn about ["Declaration Files"](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).
* Search the interwebs for `tslint` for even more order.

## Feedback

* Rank the workshop from 1 (really bad) to 10 (really good).
* Think of at least 3 predicates that came on your mind while thinking of a rating.
* Write down each of the predicates and rank them separately.
  This might be something like:
    * The workshop started on time - 2
    * I don't like those powerpoint-slides - 0
    * The cat picture made my day - 10
    * I learned a little - 6
* Submit this along with any additional Feedback you might have.
