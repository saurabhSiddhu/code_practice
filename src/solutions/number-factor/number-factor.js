class Solution {
  solve({ numbers, target }) {
    if (target <= 0) {
      return 0;
    }

    const memo = new Map();
    const getNumberOfWays = (num) => {
      if (num === 0) {
        return 1;
      }
      if (num < -1) {
        return 0;
      }
      if (memo.has(num)) {
        return memo.get(num);
      }
      let sum = 0;
      for (let i = 0; i < numbers.length; i++) {
        sum = sum + getNumberOfWays(num - numbers[i]);
      }
      memo.set(num, sum);
      return sum;
    };

    return getNumberOfWays(target);
  }
}

module.exports = Solution;
