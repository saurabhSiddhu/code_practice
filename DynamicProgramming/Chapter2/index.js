/**
 * Knapsack problems
 * There are different items. Each item have some weight and some profit.
 * We have to maximize profit based on capacity of the knapsack.
 */

function getProfit(weights, profits, capacity) {
  let cache = {};
  getProfitReccursive(0, capacity);
  function getProfitReccursive(i, capacity) {
    if (i === weights.length) {
      return 0;
    }
    if (!cache[`${i}-${capacity}`] && cache[`${i}-${capacity}`] !== 0) {
      let profit1 = getProfitReccursive(i + 1, capacity);
      let profit2 = 0;
      if (capacity >= weights[i]) {
        profit2 =
          profits[i] + getProfitReccursive(i + 1, capacity - weights[i]);
      }
      cache[`${i}-${capacity}`] = Math.max(profit1, profit2);
    }
    return cache[`${i}-${capacity}`];
  }
  return cache[`${0}-${capacity}`];
}
function getProfit2(weights, profits, capacity) {
  let cache = {};
  for (let i = 0; i <= capacity; i++) {
    cache[`${0}-${i}`] = 0;
  }
  for (let j = 0; j < weights.length; j++) {
    for (let i = 0; i <= capacity; i++) {
      const profit1 = cache[`${j}-${i}`];
      let profit2 = 0;
      if (i >= weights[j]) {
        profit2 = profits[j] + cache[`${j}-${i - weights[j]}`];
      }
      cache[`${j + 1}-${i}`] = Math.max(profit1, profit2);
    }
  }
  console.log(cache);
  return cache[`${weights.length}-${capacity}`];
}

console.log(getProfit([1, 8, 4, 2, 3], [2, 8, 6, 5, 6], 10) === 19);
console.log(getProfit([2, 3, 1, 4], [4, 5, 3, 7], 5) === 10);
console.log(getProfit2([1, 8, 4, 2, 3], [2, 8, 6, 5, 6], 10) === 19);
console.log(getProfit2([2, 3, 1, 4], [4, 5, 3, 7], 5) === 10);
