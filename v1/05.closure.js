// * Closure
// - It's the combination of a function bundled together (enclosed) with
//   references to its surrounding state (the lexical environment).
// - It's when a function "remembers" the variables around it
//   even when that function is executed elsewhere.
// - In other words, a closure gives you access to an outer function's
//   scope from an inner function.

// Example: 01
function foo() {
  var count = 0;

  return function() {
    return count++;
  };
}

var x = foo();

x(); // 0
x(); // 1
x(); // 2

// Example: 02
function sumX(x) {
  return function(y) {
    return x + y;
  };
}

var add10 = sumX(10);

add10(3); // 13
add10(14); // 24

// # Instructions
// 1. Define `foo(..)` so that it produces a function which remembers only
//    the first two arguments that were passed to `foo(..)`, and always adds
//    them together.
function foo(x, y) {
  return function() {
    return x + y;
  };
}

var x = foo(3, 4);

x(); // 7
x(); // 7
