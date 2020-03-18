// * List Exclusion [Filter]
// - Each item in the list is passed to a function which returns a boolean
//   value representing whether that item should be included in the list or not.
// - A new list of these filtered items is returned, leaving the original
//   list unmodified.

// Before
// Predicate Function: It's a function that returns a boolean value
function isOdd(v) {
  return v % 2 === 1;
}

function exclude(arr, fn) {
  var list = [];

  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      list.push(arr[i]);
    }
  }

  return list;
}

exclude([1, 2, 3, 4, 5], isOdd);
// [1,3,5]

// After => filter receives a Predicate Function
[1, 2, 3, 4, 5].filter(isOdd);
// [1,3,5]
