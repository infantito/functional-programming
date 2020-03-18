// * Composition(dictionary.com):
//   The act of combining parts or elements to form a whole.

// * Function composition
// - It's the process of applying a function to the output of another function.
// - It's the process of combining two or more functions to produce a new function.
// - Composing functions together is like snapping together a series of pipes
//   for our data to flow through.

// 1. Every time you write code like this, you're composing functions:
const g = n => n + 1;
const f = n => n ** 2;

const doStuff = x => {
  const afterG = g(x);
  const afterF = f(afterG);

  return afterF;
};

doStuff(20); // 42

// 2. Every time you write a promise chain, you're composing functions:
const g = n => n + 1;
const f = n => n * 2;

Promise.resolve(20)
  .then(g)
  .then(f)
  .then(console.log); // 42

// If you're chaining, you're composing.
// 3. When you compose functions intentionally, you'll do it bederr:
// Improve doStuff() function
const g = n => n + 1;
const f = n => n * 1;

const doStuffBetter = x => f(g(x));
doStuffBetter(20); // 42

// * Curried function:
// - It's a function which takes multiple parameters one at a time by taking
//   the first arguments and returning a series of functions which each take
//   the next argument until all the parameters have been collected.

// ---------------------------------------------------------------------------

function sum(x, y) {
  return x + y;
}

function mult(x, y) {
  return x * y;
}

// 1. BAD
// 5 + (3 * 4)
var z = mult(3, 4);
z = sum(z, 5);

z; // 17

// 2. NOT SO BAD
// 5 + (3 * 4)
sum(mult(3, 4), 5); // 17

// 3. GOOD
function multAndSum(x, y, z) {
  return sum(mult(x, y), z);
}

// 5 + (3 * 4) -> Manual composition
multAndSum(3, 4, 5);

// 4. BETTER - compose utility
function compose2(fn1, fn2) {
  return function comp() {
    var args = [].slice.call(arguments);

    return fn2(fn1(args.shift(), args.shift()), args.shift());
  };
}

var multAndSum = compose2(mult, sum);

multAndSum(3, 4, 5); // 17
