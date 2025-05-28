class Solution {
  solve([lengths, prices, total]) {
    // Input validation
    if (!lengths || !prices || lengths.length !== prices.length || total < 0) {
      return 0;
    }

    // Use a more efficient Map for memoization
    const memo = new Map();

    const getMaximumProfit = (index, remainingLength) => {
      // Base cases
      if (remainingLength === 0) return 0;
      if (index >= lengths.length) return 0;

      // Check memoization cache
      const key = `${index}-${remainingLength}`;
      if (memo.has(key)) {
        return memo.get(key);
      }

      // Option 1: Skip current piece type
      let maxProfit = getMaximumProfit(index + 1, remainingLength);

      // Option 2: Take current piece type (if it fits)
      if (lengths[index] <= remainingLength) {
        const profitWithCurrentPiece =
          prices[index] + getMaximumProfit(index, remainingLength - lengths[index]);
        maxProfit = Math.max(maxProfit, profitWithCurrentPiece);
      }

      // Store result in cache and return
      memo.set(key, maxProfit);
      return maxProfit;
    };

    return getMaximumProfit(0, total);
  }
  solveAlternative([lengths, prices, total]) {
    // Enhanced input validation
    if (!lengths || !prices || total < 0 || lengths.length !== prices.length) {
      return 0;
    }

    // Handle edge cases
    if (lengths.length === 0 || total === 0) return 0;

    const n = lengths.length;

    // Create 2D DP array - dp[i][j] = max profit using first i pieces with rod length j
    // Using Array.from for better performance and readability
    const dp = Array.from({ length: n + 1 }, () => Array.from({ length: total + 1 }, () => 0));

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
      const currentLength = lengths[i - 1];
      const currentPrice = prices[i - 1];

      for (let j = 0; j <= total; j++) {
        // Option 1: Don't use current piece type
        dp[i][j] = dp[i - 1][j];

        // Option 2: Use current piece type (if it fits)
        if (j >= currentLength) {
          const profitWithCurrentPiece = currentPrice + dp[i][j - currentLength];
          dp[i][j] = Math.max(dp[i][j], profitWithCurrentPiece);
        }
      }
    }

    return dp[n][total];
  }
}

module.exports = Solution;
