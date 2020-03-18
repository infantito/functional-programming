// # Instructions

// 1. Write two functions, each which return a different number value
//    when is called.
function foo() {
  return 10;
}

function bar() {
  return 42;
}

// 2. Write an `add(..)` function that takes two numbers and adds them
//    and returns the result. Call `add(..)` with the results of your
//    two functions from (1) and print the result to the console.
function add(x, y) {
  return x + y;
}

add(foo(), bar()); // 52

// 3. Write an `add2(..)` that takes two functions instead of two numbers,
//    and it calls those two functions and then sends those values to
//    `add(..)`, just like you did in (2) above.
function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

add2(foo, bar); // 52

// 4. Replace your two functions from (1) with a single function that
//    takes a value and returns a function back, where the returned
//    function will return the value when it's called.
function foo(v) {
  // thunk
  return function() {
    return v;
  };
}

add2(foo(10), foo(42)); // 52

// 5. Write an `addn(..)` that can take an array of 2 or more functions,
//    and using only `add2(..)`, adds them together. Try it with a loop.
//    Try it without a loop (recursion). Try it with built-in array
//    functional helpers (map/reduce).
function addn(arr) {
  // - try it with a loop
  // var sum = 0;
  // for (var i = 0; i < arr.length; i++) {
  //   sum = add2(foo(arr[i]), foo(sum));
  // }
  // return sum;
  // - try it without a loop (recursion)
  // if (arr.length <= 2) {
  //   return add2(foo(arr[0]), foo(arr[1]));
  // }
  // return addn([add2(foo(arr[0]), foo(arr[1]))].concat(arr.slice(2)));
  // - built-in array functional helper
  return arr
    .slice(1)
    .map(foo)
    .reduce(function(prev, cur) {
      return function() {
        return add2(prev, cur);
      };
    }, foo(arr[0]))();
}

addn([10, 42, 56, 73]); // 181

// 6. Start with an array of odd and even numbers (with some duplicates),
//    and trim it down to only have unique values.
var vals = [10, 100, 30, 100, 42, 10, 15];
vals = vals.reduce(function(a, v) {
  if (!~a.indexOf(v)) a.push(v);
  return a;
}, []); // [10, 100, 30, 42, 15]

// 7. Filter your array to only have even numbers in it.
function isEven(v) {
  return v % 2 === 0;
}
[10, 11, 31, 100, 42, 5, 52].filter(isEven); // [10, 100, 42, 52]

// 8. Map your values to functions, using (4), and pass the new list of
//    functions to the `addn(..)` from (5).
addn(vals.map(foo));
