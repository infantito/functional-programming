// * Pure function:
// It's a function which:
// - Given same inputs, always return the same output (deterministic).
// - Has no side-effects
// - It doesn't mean it doesn't access outside state, it means it doesn't change
//   the outside state.

// # Instructions
// 1. Make a pure function `bar(...)` to wrap around `foo(...)`.

// from a impure function
function foo(x) {
  y++;
  z = x * y;
}

var y = 5,
  z;

foo(20);
z; // 120

foo(25);
z; // 175

// to pure function
function bar(x, y) {
  var z;

  foo(x);
  // It's recommendable to return a container.
  // Prefer array instead of literal object.
  return [y, z];

  function foo(x) {
    y++;
    z = x * y;
  }
}

bar(20, 5); // [6, 120]
bar(20, 5); // [6, 120]

bar(25, 6); // [7, 175]
