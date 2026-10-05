/**
 * 1. Examine callbacks in context of asynchronicity
 * 2. Understand role of promises
 * 3. Understand role of async / await
 * 4. See common patterns and how to solve with async / await
 */

/**
 * CALLBACK
 * 
 * - A function passed to another function, for it to call. Used for:
 * 
 * Functional Programming
 * 
 * - Useful for separating processing patterns from business logic
 * 
 * Event-Driven Programming
 * 
 * - Register a function to be called when an event happens
 */

const BASE_URL = 'https://api-publica.datajud.cnj.jus.br'
const url = `${BASE_URL}/api_publica_tst/_search`

function makeRequest(url) {
    return fetch(url)
}

function processData(request) {
    return request.json()
}

makeRequest().then((req) => {
    processData(req).then(console.log)
})

/**
 * PROMISES
 * 
 * - Promises i JS are objects
 * - They are native to the language as of ES2015
 * - A promise can be in one of three states (pending|resolved|reject)
 * - The only method to access the value returned from Promises is using .then or .catch (or await it)
 * 
 * PROMISE CHAINING
 * 
 * - When calling .then on a Promise, can return new Promise in callback
 * - Can chain asynchronous operation together with .then calls
 * - Onle need one .catch in the end
 */