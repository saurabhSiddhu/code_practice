/**
 * Write a program for for fibonacci series
 */

/**
 * 0 1 1 2 3 5 8 13 21 ...
 * f(n) = f(n-1) + f(n-2)
 */
let fibCache = {};
function getFibonacci(num) {
  if (num === 0 || num === 1) {
    return num;
  } else {
    if (!fibCache[num]) {
      fibCache[num] = getFibonacci(num - 1) + getFibonacci(num - 2);
    }
    return fibCache[num];
  }
}

// Bottom up approach
function getFibonacci2(num) {
  let i = 2;
  let cache = [0, 1];
  while (i <= num) {
    cache[i] = cache[i - 1] + cache[i - 2];
    i++;
  }
  return cache[num];
}

console.log(getFibonacci(10) === 55);
console.log(getFibonacci(20) === 6765);
console.log(getFibonacci(30) === 832040);
console.log(getFibonacci(50) === 12586269025);
// console.log(getFibonacci(10000));

console.log(getFibonacci2(10) === 55);
console.log(getFibonacci2(20) === 6765);
console.log(getFibonacci2(30) === 832040);
console.log(getFibonacci2(50) === 12586269025);
console.log(getFibonacci2(1000));
