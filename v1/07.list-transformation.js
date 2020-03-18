// * List Transformation [Map]
// - Map is composition
// - It can create immutable list transformations.
// - Transformation is taking a value, doing something to it
//   so that you get a different value out.

// Before
function doubleIt(v) {
  return v * 2;
}

function transform(arr, fn) {
  var list = [];

  for (var i = 0; i < arr.length; i++) {
    list[i] = fn(arr[i]);
  }

  return list;
}

transform([1, 2, 3, 4, 5], doubleIt);
// [2,4,6,8,10]

// After
[1, 2, 3, 4, 5].map(doubleIt);
// [2,4,6,8,10]
