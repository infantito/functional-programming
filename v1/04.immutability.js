// * Immutability
// - An immutable object is an object that can't be modified after it's created.

// * Mutable
// - A mutable object is any object which can be modified after it's created.

// Primitives values by definition are

//  mutable assignment
var x = 2;
x++; // allowed!

// immutable assignment, not immutable values
const y = 3;
y++; // not allowed!

// const keyword => not immutable array;
// it's immutable array called "Z" bound to that particular array by reference
// mutable binding
const z = [4, 5, 6];
z = 10; // not allowed!
z[0] = 10; // allowed!

// Object.freeze => It makes all of those properties assignments read-only
// shallow top level - shallow immutability
const w = Object.freeze([4, 5, 6]);
w = 10; // not allowed!
w[0] = 10; // not allowed!

// ---------------------------------------------------------------------------

// Mutable - Impure function
// 1. BAD
function doubleThemMutable(list) {
  // Side-Effect:
  // Not by lexical side effect,
  // but By reference side effect because we passed in a reference.
  for (var i = 0; i < list.length; i++) {
    list[i] = list[i] * 2;
  }

  // return list;
}

var arr = [3, 4, 5];
var arr2 = doubleThemMutable(arr);

arr; // [6,8,10]

// Immutable - Pure function
// 2. GOOD
function doubleThemImmutable(list) {
  var newList = [];
  for (var i = 0; i < list.length; i++) {
    newList[i] = list[i] * 2;
  }

  return newList;
}

var arr = [3, 4, 5];
var arr2 = doubleThemImmutable(arr);

arr; // [3,4,5]
arr2; // [6,8,10]
