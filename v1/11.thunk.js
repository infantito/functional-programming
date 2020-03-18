// * Thunk Function
// - It is a function that takes no arguments and, when invoked, performs
//   a potentially expensive operation.
// - Past participle of "think". That is, a "thunk value" becomes available
//   after its calculation routine is thought through, or executed.
const hypot = (x, y) => Math.sqrt(x * x + y * y);
const thunk = () => hypot(3, 4);

// the thunk can then be passed around without being evaluated...
doSomethingWithThunk(thunk);

// ...or evaluated
thunk(); // 5
