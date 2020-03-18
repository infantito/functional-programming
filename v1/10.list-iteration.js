// * List Iteration (ForEach)
// - Function programmers typically avoid this method since most list iteration
//   use-cases include side effects.
// - It's different from map because forEach doesn't return a value

// Before
function logValue(v) {
  console.log(v);
}

function iterate(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

iterate([1, 2, 3, 4, 5], logValue);
// 1 2 3 4 5

// After
[1, 2, 3, 4, 5].forEach(logValue);
// 1 2 3 4 5
