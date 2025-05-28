class Solution {
  solve({ coins, amount }) {
    // Input validation
    if (!coins || amount < 0 || coins.length === 0) {
      return -1;
    }
    if (amount === 0) {
      return 0;
    }
    // Sort coins in descending order for potential early pruning
    const sortedCoins = coins.sort((a, b) => b - a);

    // Memoization cache: key format "coinIndex,remainingAmount"
    const memo = new Map();

    const getMinNumberOfCoins = (i, remainingAmount) => {
      // Base case: Successfully made the amount with 0 coins needed
      if (remainingAmount === 0) {
        return 0;
      }

      // Base case: No more coins available or amount became negative
      if (i >= sortedCoins.length || remainingAmount < 0) {
        return Infinity;
      }

      // Check memoization cache
      const key = `${i},${remainingAmount}`;
      if (memo.has(key)) {
        return memo.get(key);
      }

      // Combination exploration 1: Skip current coin denomination
      let minCoins = getMinNumberOfCoins(i + 1, remainingAmount);

      // Combination exploration 2: Take current coin (if amount allows)
      if (remainingAmount >= sortedCoins[i]) {
        const takeResult = 1 + getMinNumberOfCoins(i, remainingAmount - sortedCoins[i]);
        minCoins = Math.min(minCoins, takeResult);
      }

      // Cache the result for future use
      memo.set(key, minCoins);
      return minCoins;
    };

    // Get result and convert Infinity to -1 for impossible cases
    const result = getMinNumberOfCoins(0, amount);
    return result === Infinity ? -1 : result;
  }
  solveAlternative({ coins, amount }) {
    // input validation
    if (!coins || amount < 0 || coins.length === 0) {
      return -1;
    }
    if (amount === 0) {
      return 0;
    }
    const n = coins.length;
    // Initialize DP table - dp[i][j] = min coins using first i coins to make amount j
    let dp = Array.from({ length: n + 1 }, () =>
      Array.from({ length: amount + 1 }, () => Infinity)
    );
    
    // Base case: 0 coins needed to make amount 0
    for (let i = 0; i <= n; i++) {
      dp[i][0] = 0;
    }
    
    // Iterate over coins
    for (let i = 1; i <= n; i++) {
      const currentIndex = i - 1;
      const currentCoin = coins[i - 1];
      for (let j = 0; j <= amount; j++) {
        // Option 1: Skip current coin
        dp[i][j] = dp[i - 1][j];
        
        // Option 2: Take current coin (if amount allows)
        if (j >= currentCoin) {
          dp[i][j] = Math.min(dp[i][j], 1 + dp[i][j - currentCoin]);
        }
      }
    }
    return dp[n][amount] === Infinity ? -1 : dp[n][amount];
  }
}

module.exports = Solution;
