// * List Composition [Reduce]
// - It iterates through a list performing a transformation on each value.
// - The difference is an initial value is also passed which the items are
//   composed onto creating a smaller, “reduced” list or even a single return
//   value.

// Before
function mult(x, y) {
  return x * y;
}

function compose(arr, fn, initial) {
  var total = initial;

  for (var i = 0; i < arr.length; i++) {
    total = fn(total, arr[i]);
  }

  return total;
}

compose([1, 2, 3, 4, 5], mult, 1);
// 120

// After
[1, 2, 3, 4, 5].reduce(mult, 1);
// 120
