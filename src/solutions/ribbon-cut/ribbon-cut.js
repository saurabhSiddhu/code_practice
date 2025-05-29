// Ribbon Cut - Unbounded Knapsack maximization problem
class Solution {
  // Main solution: Top-down DP with memoization
  solve({ lengths, ribbonLength }) {
    // Edge cases
    if (ribbonLength === 0) return 0;
    if (!lengths || lengths.length === 0) return 0;

    // Filter valid cuts only
    const validCuts = lengths.filter((len) => len > 0);
    if (validCuts.length === 0) return 0;

    const memo = new Map();

    // Core DP function: try all combinations
    const maxPieces = (remaining) => {
      // Base cases
      if (remaining === 0) return 0; // Perfect fit
      if (remaining < 0) return -Infinity; // Invalid

      // Memoization check
      if (memo.has(remaining)) return memo.get(remaining);

      // Try each cut option
      let result = -Infinity;
      for (const cut of validCuts) {
        if (remaining >= cut) {
          result = Math.max(result, 1 + maxPieces(remaining - cut));
        }
      }

      memo.set(remaining, result);
      return result;
    };

    const result = maxPieces(ribbonLength);
    return result === -Infinity ? 0 : result;
  }

  // Alternative: Bottom-up DP
  solveAlternative({ lengths, ribbonLength }) {
    //Edge Cases
    if (!lengths || lengths.length === 0) {
      return 0;
    }
    if (ribbonLength === 0) {
      return 0;
    }
    const validLengths = lengths.filter((length) => length > 0);
    if (validLengths.length === 0) return 0;

    let n = validLengths.length; // Fixed: was validLengths.lengths
    let dp = Array.from({ length: n + 1 }, () =>
      Array.from({ length: ribbonLength + 1 }, () => -Infinity)
    );

    // Base case: 0 ribbon length needs 0 pieces
    for (let i = 0; i <= n; i++) {
      dp[i][0] = 0;
    }

    //Fill the array
    for (let i = 1; i <= n; i++) {
      const currentLength = validLengths[i - 1];
      for (let j = 1; j <= ribbonLength; j++) {
        // Don't take current cut
        dp[i][j] = dp[i - 1][j];

        // Take current cut if possible
        if (j >= currentLength && dp[i][j - currentLength] !== -Infinity) {
          dp[i][j] = Math.max(dp[i][j], dp[i][j - currentLength] + 1);
        }
      }
    }

    return dp[n][ribbonLength] === -Infinity ? 0 : dp[n][ribbonLength];
  }
}

module.exports = Solution;
