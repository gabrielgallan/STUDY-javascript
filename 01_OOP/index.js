/**
 * 1. new
 * 2. prototypes
 * 3. constructor
 * 4. Object.getPrototypeOf()
 */

/**
 * 1. new
 * - Create an empty object
 * - Set the keyword this tb be that object
 * - Returns the object - returns this
 */

// Factory functions

class UserClass {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.isAdmin = false;
    }

    sayHi() {
        return console.log(`${this.name} says hi!`);
    }

    say(something) {
        return console.log(`${this.name} says ${something}`)
    }
}

function UserFunction(name, email) {
    console.log(this) // empty yet

    this.name = name;
    this.email = email;
    this.isAdmin = false;

    this.sayHi = () => {
        return console.log(`${this.name} says hi!`);
    }
    this.say = (something) => {
        return console.log(`${this.name} says ${something}`)
    }
}

const user1 = new UserFunction('gab', 'gab@email.com')

const user2 = new UserFunction('vic', 'vic@gmail.com')

console.log(user1.sayHi === user2.sayHi)

/**
 * 2. prototype
 */