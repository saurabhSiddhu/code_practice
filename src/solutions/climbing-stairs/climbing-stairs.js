class Solution {
  solve(numberOfStairs) {
    // Input validation
    if (numberOfStairs < 0) return 0;
    if (numberOfStairs === 1) return 1;
    if (numberOfStairs === 2) return 2;
    if (numberOfStairs === 3) return 4;

    // Memoization for efficiency
    const memo = new Map();
    memo.set(1, 1);
    memo.set(2, 2);
    memo.set(3, 4);

    const getNumberOfWays = (remainingStairs) => {
      // Check if already calculated
      if (memo.has(remainingStairs)) {
        return memo.get(remainingStairs);
      }

      // Decision Tree Logic:
      // To reach stair N, I could have come from:
      // - Stair N-1 (take 1 step)
      // - Stair N-2 (take 2 steps)
      // - Stair N-3 (take 3 steps)

      const waysFromOneBehind = getNumberOfWays(remainingStairs - 1);
      const waysFromTwoBehind = getNumberOfWays(remainingStairs - 2);
      const waysFromThreeBehind = getNumberOfWays(remainingStairs - 3);

      const totalWays = waysFromOneBehind + waysFromTwoBehind + waysFromThreeBehind;

      // Cache the result
      memo.set(remainingStairs, totalWays);
      return totalWays;
    };

    return getNumberOfWays(numberOfStairs);
  }

  // Alternative: Bottom-up approach (iterative)
  solveIterative(numberOfStairs) {
    if (numberOfStairs < 0) return 0;
    if (numberOfStairs === 1) return 1;
    if (numberOfStairs === 2) return 2;
    if (numberOfStairs === 3) return 4;

    // Build up from base cases
    let prev3 = 1; // ways(1)
    let prev2 = 2; // ways(2)
    let prev1 = 4; // ways(3)

    for (let i = 4; i <= numberOfStairs; i++) {
      const current = prev1 + prev2 + prev3;
      prev3 = prev2;
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }
}

module.exports = Solution;
