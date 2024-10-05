/**
 * Step One: write the recursive function.
 * 
 * Here, we create a function that calculates
 * the factorial of a number, n. A factorial
 * is the product of all positive integers
 * less than or equal to the number, n.
 */
const factorial = (n) => {
    if (n === 0) return 1; // The base case, to stop recursion
    return n * factorial(n - 1); // The recursive call
}

/**
 * If we were to call the above with a number as
 * high as, say, 50,000, it would result in a stack
 * overflow.
 */

/**
 * Step Two: modify the recursive function.
 * 
 * In order to trampoline the function, we must
 * return another function instead of calling
 * the recursive function itself. 
 * 
 * This prevents the function from being added 
 * directly to the call stack.
 */
const facto = (n, a = 1) => {
    if (n === 0) return a;
    return () => facto(n - 1, n * a);
}

/**
 * Step Three: create a trampoline function.
 * 
 * This function takes another function and a list
 * of arguments, and uses a linear loop rather than
 * traditional recursion to handle the function calls.
 * 
 * This prevents the stack overflow, while still
 * maintaining the declarative approach provided by
 * recursive functions.
 */
const trampoline = (f, ...args) => {
    let result = f(...args);
    while (typeof result === "function") {
        result = result();
    }
    return result;
}

/**
 * Now, we can call the factorial function with as high
 * a number as we would like (as long as we don't run into
 * other errors, like exceeding MAX_SAFE_INTEGER, or looping
 * too many times...).
 * 
 * Unfortunately, both of these are the case here, but
 * the principle of trampolining holds!
 */
// console.log(trampoline(facto(3)))


// part 1
// Write a recursive function that completely flattens an array of nested arrays, regardless of how deeply nested the arrays are.
// Once your recursive function is complete, trampoline it.

const example = [1, [2, 3], [4, [5, 6]], [7, 8], 9]
const flatten = (arr) => {
    let result = [];
    arr.forEach((el) => {
        if (Array.isArray(el)) {
            result = result.concat(flatten(el));
        } else {
            result.push(el);
        }
    });
    return result;
}

// console.log(flatten(example));

const flat = (arr, result = []) => {
    if (arr.length === 0) return result;

    const [first, ...rest] = arr;

    if (Array.isArray(first)) {

        return () => flat(first.concat(rest), result);
    } else {

        result.push(first);
        return () => flat(rest, result);
    }
}


console.log(trampoline(flat, example));


const primeContainer = document.getElementById('primeContainer');


const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};


const calculatePrimes = (n) => {
    primeContainer.innerHTML = '';
    let current = 1;

    const findNextPrime = () => {
        if (current > n) {
            alert('Prime calculation complete!');
            return;
        }

        if (isPrime(current)) {
            primeContainer.innerHTML += `${current}, `;
        }

        current++;
        setTimeout(findNextPrime, 0); // Recursively call the next prime calculation, allowing the browser to render
    };

    findNextPrime(); // Start the process
};
