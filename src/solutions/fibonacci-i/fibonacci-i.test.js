const Solution = require('./fibonacci-i');

const solution = new Solution();
solution.testCases = [
  // Basic Cases
  {
    description: 'F(0) - Base case zero',
    input: 0,
    expected: 0,
    category: 'basic'
  },
  {
    description: 'F(1) - Base case one',
    input: 1,
    expected: 1,
    category: 'basic'
  },
  {
    description: 'F(2) - First computed value',
    input: 2,
    expected: 1,
    category: 'basic'
  },
  {
    description: 'F(3) - Small positive case',
    input: 3,
    expected: 2,
    category: 'basic'
  },
  {
    description: 'F(4) - LeetCode example',
    input: 4,
    expected: 3,
    category: 'basic'
  },
  {
    description: 'F(5) - LeetCode example',
    input: 5,
    expected: 5,
    category: 'basic'
  },
  {
    description: 'F(10) - Medium value',
    input: 10,
    expected: 55,
    category: 'basic'
  },

  // Edge Cases
  {
    description: 'F(15) - Larger value test',
    input: 15,
    expected: 610,
    category: 'edge'
  },
  {
    description: 'F(20) - Testing DP efficiency',
    input: 20,
    expected: 6765,
    category: 'edge'
  },

  // Performance Cases
  {
    description: 'F(30) - Performance test (832040)',
    input: 30,
    expected: 832040,
    category: 'performance'
  },
  {
    description: 'F(40) - Large performance test',
    input: 40,
    expected: 102334155,
    category: 'performance'
  },
  {
    description: 'F(45) - Very large test case',
    input: 45,
    expected: 1134903170,
    category: 'performance'
  }
];

module.exports = solution;
