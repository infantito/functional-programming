// Side Effects
// - It's any application state change that is observable outside the
//   called function other than its return value.
// - It's something that occurs that's indirect as a relationship of an action
//   that you took.

// 01-impure function
function foo(x) {
  y = x * 2;
  z = x * 3;
}

var y, z;

foo(5);

y; // 10
z; // 15

// 02-impure function
function foo(x) {
  y = y * x;
  z = y * x;
}

var y = 2,
  z = 3;

foo(5);

y; // 10
z; // 50

// 03-impure function
function bar(x, y, z) {
  foo(x);

  return [y, z];

  function foo(x) {
    y = y * x;
    z = y * x;
  }
}

bar(5, 2, 3); // [10, 50]

bar(5, 10, 15); // [50, 250]
