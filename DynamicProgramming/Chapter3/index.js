/**
 * Given a set of positive numbers,
 * find if we can partition it into two subsets such that the sum of elements in both the subsets is equal.
 */

function isEqualSubset(set) {
  let halfSum =
    set.reduce((acc, num) => {
      return acc + num;
    }, 0) / 2;
  let cache = {};
  getProfitReccursive(0, halfSum);
  function getProfitReccursive(i, target) {
    if (target === 0) {
      return true;
    }
    if (i === set.length) {
      return false;
    }
    if (!cache[`${i}-${target}`] && cache[`${i}-${target}`] !== false) {
      cache[`${i}-${target}`] =
        getProfitReccursive(i + 1, target) ||
        getProfitReccursive(i + 1, target - set[i]);
    }
    return cache[`${i}-${target}`];
  }
  return cache[`${0}-${halfSum}`];
}
function isEqualSubset2(set) {
  let cache = [[]];
  let result = false;
  let halfSum =
    set.reduce((acc, num) => {
      return acc + num;
    }, 0) / 2;
  if (!Number.isInteger(halfSum)) {
    return false;
  }
  for (let i = 0; i <= halfSum; i++) {
    cache[0][i] = 0;
  }
  for (let i = 1; i < set.length; i++) {
    cache[i] = [0];
    for (let j = 1; j <= halfSum; j++) {
      let currentNum = 0;
      if (set[i - 1] <= j) {
        currentNum = set[i - 1] + cache[i - 1][j - set[i - 1]];
      }

      cache[i][j] = Math.max(cache[i - 1][j], currentNum);
      if (cache[i][j] === halfSum) {
        result = true;
        break;
      }
    }
    if (result) {
      break;
    }
  }
  return result;
}

console.log(isEqualSubset([1, 2, 3, 4]) === true);
console.log(isEqualSubset([1, 1, 3, 4, 7]) === true);
console.log(isEqualSubset2([1, 2, 3, 4]) === true);
console.log(isEqualSubset2([1, 1, 3, 4, 7]) === true);
