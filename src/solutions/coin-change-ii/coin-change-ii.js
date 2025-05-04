class Solution {
  solve(input) {
    const { amount, coins } = input;
    const memo = new Map();
    function coinChangeWays(amount, index) {
      if (amount === 0) return 1;
      if (index >= coins.length || amount < 0) return 0;
      const key = `${amount}-${index}`;
      if (memo.has(key)) return memo.get(key);

      let result1 = coinChangeWays(amount - coins[index], index);
      let result2 = coinChangeWays(amount, index + 1);
      memo.set(key, result1 + result2);
      return result1 + result2;
    }
    return coinChangeWays(amount, 0);
  }
  solveAlternative(input) {
    const { amount, coins } = input;
    let dp = [];
    for (let i = 0; i <= coins.length; i++) {
      dp[i] = [];
      dp[i][0] = 1;
      for (let j = 0; j <= amount; j++) {
        dp[i][j] = 0;
      }
    }
    dp[0][0] = 1;
    for (let i = 1; i <= coins.length; i++) {
      for (let j = 0; j <= amount; j++) {
        if (j - coins[i - 1] >= 0) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    return dp[coins.length][amount];
  }
}

module.exports = Solution;
