class Triangle {
    constructor(a, b) {
        if (!a || !b) {
            throw new Error('a and b must be passed as parameters')
        }

        this._a = a
        this._b = b
    }

    getArea() {
        return (this._a * this._b) / 2
    }
}

class TriangleRepository {
    constructor(initialItems) {
        this._items = initialItems ?? []
    }

    create(triangle) {
        this._items.push(triangle)
    }

    findAll() {
        return this._items
    }
}

class ColorTriangle extends Triangle {
    constructor(a, b, color) {
        super(a, b)
        this._color = color ?? 'transparent'
    }
}

class Book {
    constructor(title, author, year) {
        if (typeof title !== 'string') {
            throw new Error('title must be a string')
        }

        if (typeof author !== 'string') {
            throw new Error('title must be a string')
        }
        
        if (typeof year !== 'number') {
            throw new Error('year must be a number')
        }

        this.title = title
        this.author = author
        this.year = year
    }
}

class Ebook extends Book {
    constructor(title, author, year, fileSize) {
        super(title, author, year)

        if (typeof fileSize !== 'number') {
            throw new Error('year must be a number')
        }

        this.fileSize = fileSize
    }

    download() {
        return `Title: ${this.title} | File Size: ${this.fileSize}`
    }
}

class Circle {
    constructor(radius) {
        if(typeof radius !== 'number' || radius <= 0) {
            throw new Error(`Invalid radius: ${radius}`)
        }

        this._radius = radius
    }

    get radius() {
        return this._radius
    }

    get diameter() {
        return this._radius * 2
    }

    set radius(radius) {
        if(typeof radius !== 'number' || radius <= 0) {
            throw new Error(`Invalid radius: ${radius}`)
        }

        this._radius = radius
    }
}

class User {
    #role = 'admin'

    constructor(id, name) {
        if(typeof name !== 'string' || name.length <= 0) {
            throw new Error('name must be a string')
        }

        this._id = id
        this._name = name
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get role() {
        return this.#role
    }

    // get type() {
    //     return this.#type
    // }

    set name(name) {
        if(typeof name !== 'string' || name.length <= 0) {
            throw new Error('name must be a string')
        }

        this._name = name
    }

    #changeRole(role) {
        this.#role = role
    }
}

const cache = new Map()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Logger {
    #logger = console
    #name

    constructor(name) {
        this.#validateName(name)

        this.#name = name ?? 'MAIN'
    }

    #base() {
        return `[${new Date().toISOString()}][${this.#name}]`
    }

    log(msg) {
        this.#logger.log("\x1b[32m", `[LOG]${this.#base()} ${msg}`)
    }

    error(msg) {
        this.#logger.log("\x1b[31m", `[ERROR]${this.#base()} ${msg}`)
    }

    warn(msg) {
        this.#logger.log("\x1b[33m", `[WARN]${this.#base()} ${msg}`)
    }

    debug(msg) {
        this.#logger.log("\x1b[38;5;218m", `[DEBUG]${this.#base()} ${msg}`)
    }

    set name(name) {
        this.#validateName(name)

        this.#name = name ?? 'MAIN'
    }

    #validateName(name) {
        if (name) {
            if (typeof name !== 'string' || name.length <= 0) {
                throw new Error('Logger.name must be a valid string')
            }
        }

        return
    }
}

class DatabaseConnection {
    #logger = new Logger(DatabaseConnection.name)
    
    constructor() {
        this.#logger.log(`Database connection initialized!`)
        const start = Date.now()

        this.#connet().then(() => {
            const end = Date.now()
            this.#logger.log(`Database succesfully connected. Connection time: ${end - start}ms`)
        })
    }

    async #connet() {
        await sleep(2000)
    }
}

class Cat {
    name = 'Ringo'

    sayHi() {
        console.log(`${this.name} says hi!`)
    }
}

const cat1 = {
    name: 'Cat 1',
    speak: function (string) {
        console.log(`${this.name} says hello`)
    }
}

const cat2 = {
    name: 'Cat 2'
}

class Timer {
  constructor() {
    this.tick = 0;
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      console.log(this.tick + 1);
      this.tick++
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId)
  }
}

class Encrypter {
    #secret
    #version = 'v1'

    constructor(secret) {
        this.#secret = secret
    }

    get version() {
        return this.#version
    }

    set secret(secret) {
        this.#secret = secret
    }

    update(version) {
        this.#validateVersion(version)

        this.#version = version
    }

    #validateVersion(version) {
        if (typeof version !== 'string' || version.length <= 0 || !version.startsWith('v')) {
            throw new InvalidVersionError('Missing the v')
        }
    }
}

class InvalidVersionError extends Error {
    constructor(cause) {
        super(`Invalid encrypter version! Cause: ${cause ?? 'Unknown cause'}`)
    }
}