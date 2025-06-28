class Solution {
  solve(matrix) {
    let minimumlist = [];
    for (let i = 0; i < matrix.length; i++) {
      let minimum = Infinity;
      let minimumIndex = -1;
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] < minimum) {
          minimum = matrix[i][j];
          minimumIndex = j;
        }
      }
      minimumlist.push(minimumIndex);
    }
    for (let i = 0; i < minimumlist.length; i++) {
      let column = minimumlist[i];
      let number = matrix[i][column];
      for (let j = 0; j < matrix.length; j++) {
        if (number < matrix[j][column]) {
          break;
        }
        if (j === matrix.length - 1) {
          return [number];
        }
      }
    }
    return [];
  }
  solveAlternative(matrix) {
    let minRowList = [];
    const R = matrix.length;
    const C = matrix[0].length;
    for (let i = 0; i < R; i++) {
      let minimum = Infinity;
      for (let j = 0; j < C; j++) {
        if (matrix[i][j] < minimum) {
          minimum = matrix[i][j];
        }
      }
      minRowList.push(minimum);
    }
    let maxColList = [];
    for (let i = 0; i < C; i++) {
      let maximum = -Infinity;
      for (let j = 0; j < R; j++) {
        if (matrix[j][i] > maximum) {
          maximum = matrix[j][i];
        }
      }
      maxColList.push(maximum);
    }
    const maxMinRowList = Math.max(...minRowList);
    const minMaxColList = Math.min(...maxColList);
    return minMaxColList === maxMinRowList ? [maxMinRowList] : [];
  }
}

module.exports = Solution;
