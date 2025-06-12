class Solution {
  solve(numberOfStairs) {
    // Input validation
    if (numberOfStairs < 0) {
      return 0;
    }
    if (numberOfStairs === 0) {
      return 0;
    } // No ways to climb 0 stairs

    const memo = new Map();

    const countWaysToClimb = (stairsRemaining) => {
      // Base cases: demonstrate the recurrence relation
      if (stairsRemaining === 0) {
        return 1;
      } // One way to stay at ground level
      if (stairsRemaining === 1) {
        return 1;
      } // Only one 1-step
      if (stairsRemaining === 2) {
        return 2;
      } // 1+1 or 2

      // Check memoization
      if (memo.has(stairsRemaining)) {
        return memo.get(stairsRemaining);
      }

      // Recurrence: f(n) = f(n-1) + f(n-2) + f(n-3)
      const ways =
        countWaysToClimb(stairsRemaining - 1) +
        countWaysToClimb(stairsRemaining - 2) +
        countWaysToClimb(stairsRemaining - 3);

      memo.set(stairsRemaining, ways);
      return ways;
    };

    return countWaysToClimb(numberOfStairs);
  }
  solveAlternative(numberOfStairs) {
    if (numberOfStairs < 0) {
      return 0;
    }
    if (numberOfStairs === 0) {
      return 0;
    } // No ways to climb 0 stairs
    if (numberOfStairs === 1) {
      return 1;
    }
    if (numberOfStairs === 2) {
      return 2;
    }
    if (numberOfStairs === 3) {
      return 4;
    }

    // Space-optimized tribonacci: store last 3 computed values
    let prev3 = 1; // f(1) = 1 way to reach stair 1
    let prev2 = 2; // f(2) = 2 ways to reach stair 2
    let prev1 = 4; // f(3) = 4 ways to reach stair 3

    for (let i = 4; i <= numberOfStairs; i++) {
      const current = prev1 + prev2 + prev3; // f(i) = f(i-1) + f(i-2) + f(i-3)
      [prev3, prev2, prev1] = [prev2, prev1, current]; // Slide the window
    }
    return prev1;
  }
}

module.exports = Solution;
