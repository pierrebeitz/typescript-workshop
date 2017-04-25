// A Greeter
// Initialize it with a string and it will be able to `greet()`!
class Greeter {

  greeting : any;

  constructor(greeting : any) {
    this.greeting = greeting;
  }

  greet() {
    return `Hallo, ${this.greeting}`
  }
}

class App {
  // The entrypoint that makes the magic happen!
  constructor() {
    let greeter = new Greeter({msg: "Welt!"});

    document.querySelector('#content').innerHTML = greeter.greet()
  }
}

export = new App
