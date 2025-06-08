const Solution = require('./count-ways-score');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Score 0 - base case',
    input: 0,
    expected: 1, // One way: don't score anything
    category: 'basic'
  },
  {
    description: 'Score 1 - single way',
    input: 1,
    expected: 1, // Only way: score 1 point
    category: 'basic'
  },
  {
    description: 'Score 2 - multiple ways',
    input: 2,
    expected: 2, // Ways: [2] or [1,1]
    category: 'basic'
  },
  {
    description: 'Score 3 - combination of moves',
    input: 3,
    expected: 3, // Ways: [2,1], [1,2], [1,1,1]
    category: 'basic'
  },
  {
    description: 'Score 4 - includes all move types',
    input: 4,
    expected: 6, // Ways: [4], [2,2], [2,1,1], [1,2,1], [1,1,2], [1,1,1,1]
    category: 'basic'
  },
  {
    description: 'Score 5 - medium complexity',
    input: 5,
    expected: 10, // Multiple combinations using 1, 2, 4 points
    category: 'basic'
  },
  {
    description: 'Score 6 - larger test case',
    input: 6,
    expected: 18, // More complex combinations
    category: 'basic'
  },
  {
    description: 'Score 10 - performance test',
    input: 10,
    expected: 169, // Large number of combinations
    category: 'performance'
  }
];

module.exports = solution;
