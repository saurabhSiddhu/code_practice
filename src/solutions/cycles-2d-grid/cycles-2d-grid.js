class Solution {
  solve(matrix) {
    const visited = new Set();
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const char = matrix[i][j];
        const key = `${i}-${j}`;
        if (!visited.has(key)) {
          if (dfs(char, i, j, -1, -1)) return true;
        }
      }
    }
    function dfs(char, i, j, parentI, parentJ) {
      const key = `${i}-${j}`;
      if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[i].length) {
        return false;
      }
      if (matrix[i][j] !== char) return false;

      if (visited.has(key)) {
        return true; // Found cycle - we reached a visited cell that's not our parent
      }

      visited.add(key);

      const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
      ];
      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        // Skip parent cell to avoid immediate backtracking
        if (ni === parentI && nj === parentJ) continue;

        if (dfs(char, ni, nj, i, j)) return true;
      }

      return false;
    }

    return false;
  }
}

module.exports = Solution;
