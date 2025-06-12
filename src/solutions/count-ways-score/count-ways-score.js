class Solution {
  solve(n) {
    if (n <= 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    if (n === 2) {
      return 2;
    }
    if (n === 3) {
      return 3;
    }
    let prev4 = 1,
      prev3 = 1,
      prev2 = 2,
      prev1 = 3;
    for (let i = 4; i <= n; i++) {
      const current = prev1 + prev2 + prev4;
      [prev1, prev2, prev3, prev4] = [current, prev1, prev2, prev3];
    }

    return prev1;
  }
}

module.exports = Solution;
