class Solution {
  solve(n) {
    if (n < 0) {
      return 0;
    }
    if (n <= 1) {
      return n;
    }
    let prev1 = 1;
    let prev2 = 0;
    let result = 0;

    for (let i = 2; i <= n; i++) {
      result = prev1 + prev2;
      prev2 = prev1;
      prev1 = result;
    }
    return result;
  }

  solveAlternative(n) {
    const memo = new Map();

    function getFibonacci(n) {
      if (n <= 1) {
        return n;
      }
      if (memo.has(n)) {
        return memo.get(n);
      }
      const result = getFibonacci(n - 1) + getFibonacci(n - 2);
      memo.set(n, result);
      return result;
    }
    return getFibonacci(n);
  }
}

module.exports = Solution;

/**
 *   solve(n) {
    // Base cases
    if (n <= 1) return n;

    // Dynamic programming approach - bottom-up
    let prev2 = 0; // F(0)
    let prev1 = 1; // F(1)

    for (let i = 2; i <= n; i++) {
      let current = prev1 + prev2;
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }

  // Alternative: Top-down with memoization
  solveRecursive(n, memo = new Map()) {
    if (n <= 1) return n;

    if (memo.has(n)) {
      return memo.get(n);
    }

    const result = this.solveRecursive(n - 1, memo) + this.solveRecursive(n - 2, memo);
    memo.set(n, result);
    return result;
  }
 */
