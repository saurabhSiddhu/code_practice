const Solution = require('./lucky-numbers-in-a-matrix');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic case: One lucky number',
    input: [
      [3, 7, 8],
      [9, 11, 13],
      [15, 16, 17]
    ],
    expected: [15],
    category: 'basic'
  },
  {
    description: 'Basic case: Multiple lucky numbers',
    input: [
      [1, 10, 4, 2],
      [9, 3, 8, 7],
      [15, 16, 17, 12]
    ],
    expected: [12],
    category: 'basic'
  },
  {
    description: 'Basic case: One lucky number (7)',
    input: [
      [7, 8],
      [1, 2]
    ],
    expected: [7],
    category: 'basic'
  },
  {
    description: 'Edge case: Single element matrix',
    input: [[7]],
    expected: [7],
    category: 'edge'
  },
  {
    description: 'Edge case: Single row matrix',
    input: [[1, 2, 3, 4, 5]],
    expected: [1],
    category: 'edge'
  },
  {
    description: 'Edge case: Single column matrix',
    input: [[1], [2], [3], [4], [5]],
    expected: [5],
    category: 'edge'
  },
  {
    description: 'Edge case: 2x2 matrix with lucky number',
    input: [
      [1, 4],
      [2, 3]
    ],
    expected: [2],
    category: 'edge'
  },
  {
    description: 'Edge case: Matrix where element is lucky',
    input: [
      [3, 6],
      [1, 4]
    ],
    expected: [3],
    category: 'edge'
  },
  {
    description: 'Edge case: Matrix with lucky number 7',
    input: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    expected: [7],
    category: 'edge'
  },
  {
    description: 'Edge case: No lucky numbers exist',
    input: [
      [3, 1, 2],
      [6, 4, 5],
      [9, 7, 8]
    ],
    expected: [7],
    category: 'edge'
  },
  {
    description: 'Complex case: Larger matrix with one lucky number',
    input: [
      [3, 6, 7, 9],
      [2, 5, 8, 13],
      [1, 4, 12, 14],
      [10, 11, 15, 16]
    ],
    expected: [10],
    category: 'basic'
  },
  {
    description: 'Performance case: Large matrix',
    input: (() => {
      // Create a 50x50 matrix with one guaranteed lucky number
      const matrix = [];
      for (let i = 0; i < 50; i++) {
        const row = [];
        for (let j = 0; j < 50; j++) {
          if (i === 49 && j === 0) {
            row.push(1); // This will be min in row 49 and max in column 0
          } else if (i === 49) {
            row.push(j + 2); // Ensure other elements in row 49 are larger
          } else if (j === 0) {
            row.push(-j - i - 1); // Ensure other elements in column 0 are smaller
          } else {
            row.push(i * 50 + j + 100); // Other elements are large
          }
        }
        matrix.push(row);
      }
      return matrix;
    })(),
    expected: [1],
    category: 'performance'
  }
];

module.exports = solution;
