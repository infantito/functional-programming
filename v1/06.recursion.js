// * Recursion
// - It's a function that calls itself N times.
// - It occurs when a function calls itself to perform an operation.
// - Recursive functions are slower than a loop version.

function power(base, exponent) {
  return !exponent ? 1 : base * power(base, exponent, -1); // TCO === false
}

power(2, 3); // 8

// * Tail Call Optimization (TCO)
// - It's when the interpreter realizes that the last thing a function
//   needs to do before it's returned is evaluate a function invocation
//   inside of it.
// - You can make some function calls without growing the call stack.
function pow(base, power) {
  if (power <= 0) return 1;

  return helper(base, power, base);
}

function helper(base, power, num) {
  if (power === 1) return num;
  else return helper(base, power - 1, base * num);
}

pow(2, 3); // 8

// ----------------------------------------------------------------------------

// from non-recursive function
function sumIter() {
  var sum = 0;

  for (var i = 0; i < arguments.length; i++) {
    sum = sum + arguments[i];
  }

  return sum;
}

sumIter(3, 4, 5); // 12

// to recursive function ES5
function sumRecur() {
  var args = [].slice.call(arguments);

  if (args.length <= 2) {
    return args[0] + (args[1] || 0);
  }

  return args[0] + sumRecur.apply(null, args.slice(1));
}

sumRecur(3, 4, 5); // 12

// to recursive function ES6+
function sumRecur(...args) {
  if (args.length <= 2) {
    return args[0] + (args[1] ?? 0);
  }

  return args[0] + sumRecur(...args.slice(1));
}

sumRecur(3, 4, 5); // 12

// # Instructions
// 1. turn `mult(..)` into a recursive function that can work on as many
//    arguments as necessary.
function mult(...args) {
  if (!args[0]) {
    return 0;
  }

  if (args.length <= 2) {
    return args[0] * (args[1] ?? 0);
  }

  return args[0] * mult(...args.slice(1));
}

mult(3, 4, 5); // 60

// 2. from Recursive Function [BAD]
('use strict');

function foo(x) {
  return x * 2;
}

function bar(x) {
  // not a tail call
  return 1 + foo(x);
}

bar(10); // 21

// `1 + ..` has to be performed after the `foo(x)` call completes,
// so the state of that `bar(..)` invocation needs ti be preserved.

// 2. To Recursive Function win TCO [BAD]
// This snippet demonstrates calls to `foo(..)` and `bar(..)`
// where both are in tail position, as they're the last thing to happen in
// their code path (other than the `return`)
('use strict');

function foo(x) {
  return x * 2;
}

function bar(x) {
  x = x + 1;
  // Proper tail calls (PTC): So that the extra stack frame allocation is
  // unnecessary. Instead of creating a new stack frame for the next function
  // call, the engine just reuses the existing stack frame. That works because
  // a function doesn't need to preserve any of the current state, as nothing
  // happens with that state after the PTC.

  if (x > 10) return foo(x);
  else return bar(x + 1);
}

bar(5); // 24
bar(15); // 32
// In this program, `bar(..)` is clearly recursive, but `foo(..)` is just a
// regular function call. In both cases, the functions calls are in
// `proper tail position`. The `x + 1` is evaluated before the `bar(..)` call,
// and whenever that call finishes, all that happens is the `return`. :c

// 3. Tail Call Rewrite - from [GOOD]
('use strict');

function foo(x) {
  if (x <= 1) return 1;
  return x / 2 + foo(x - 1);
}

foo(123456); // RangeError

// 3. to re-written (PTC)
('use strict');

var foo = (function() {
  function _foo(acc, x) {
    if (x <= 1) return acc;
    return _foo(x / 2 + acc, x - 1);
  }

  return function(x) {
    return _foo(1, x);
  };
})();

// ES6 engine that implements TCO: 3810376848.5
// non-TCO engines: RangeError
foo(123456);

// If you run the previous snippet in an ES6 engine that implements TCO,
// you'll get the 3810376848.5 answer as shown. However, it'll still
// fail with a RangeError in non-TCO engines.

// 3. Non-TCO Optimizations
// There are other techniques to rewrite the code so that the call stack isn't
// growing with each call.
// One such technique is called `trampolining`, which amounts to having each
// partial result represented as a function that either returns another partial
// result function or the final result. Then you can simply loop until you
// stop getting a function, and you will have the result.

// 3.A Trampolining: It doesn't suffer the call stack limitation. [BETTER]
('use strict');

function trampoline(res) {
  while (typeof res === 'function') {
    res = res();
  }

  return res;
}

var foo = (function() {
  function _foo(acc, x) {
    if (x <= 1) return acc;

    return function partial() {
      return _foo(x / 2 + acc, x - 1);
    };
  }

  return function(x) {
    return trampoline(_foo(1, x));
  };
})();

foo(123456); // 3810376848.5

// 3.B Recursion Unrolling [THE BEST-strictly speaking]
('use strict');

function foo(x) {
  var acc = 1;
  while (x > 1) {
    acc = x / 2 + acc;
    x = x - 1;
  }

  return acc;
}

foo(123456); // 3810376848.5

// * CHALLENGE
// - RECURSION IS EQUAL DEEP OBJECT
const obj = {a: 1, b: 4, c: {d: 'abc'}, e: {f: {ghi: {j: {k: 10n}}}}};

function isObject(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
}

function isMatchObj(source, liken, key) {
  const isSameValue = source[key] === liken[key];
  const hasProperty = source.hasOwnProperty(key) && liken.hasOwnProperty(key);

  return isSameValue && hasProperty;
}

function isEqual(source, liken, status = true) {
  status = isObject(source) && isObject(liken);

  if (source === liken) return true;

  if (status) {
    const keys = Object.keys(source);

    if (Object.keys(liken).length !== keys.length) return false;

    for (const key of keys) {
      status = isObject(source[key])
        ? isEqual(source[key], liken[key], true)
        : isMatchObj(source, liken, key);

      if (!status) return false;
    }
  }

  return status;
}
