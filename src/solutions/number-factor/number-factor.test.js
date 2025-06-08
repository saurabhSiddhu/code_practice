const Solution = require('./number-factor');

const solution = new Solution();
solution.testCases = [
  // Base case tests
  {
    description: 'Target 0 - base case',
    input: { numbers: [1, 3, 4], target: 0 },
    expected: 0, // Implementation returns 0 for target <= 0
    category: 'edge'
  },
  {
    description: 'Classic [1,3,4] array - Target 4',
    input: { numbers: [1, 3, 4], target: 4 },
    expected: 4, // Ways: [1,1,1,1], [1,3], [3,1], [4]
    category: 'basic'
  },
  {
    description: 'Classic [1,3,4] array - Target 7',
    input: { numbers: [1, 3, 4], target: 7 },
    expected: 15, // Corrected from manual calculation
    category: 'basic'
  },

  // Different number arrays - testing generalization
  {
    description: 'Single coin [5] - Target 10',
    input: { numbers: [5], target: 10 },
    expected: 1, // Only [5,5]
    category: 'edge'
  },
  {
    description: 'Single coin [5] - Target 7',
    input: { numbers: [5], target: 7 },
    expected: 0, // Impossible to make 7 with only 5s
    category: 'edge'
  },
  {
    description: 'Two coins [2,3] - Target 5',
    input: { numbers: [2, 3], target: 5 },
    expected: 2, // Ways: [2,3], [3,2]
    category: 'basic'
  },
  {
    description: 'Standard coins [1,2,5] - Target 5',
    input: { numbers: [1, 2, 5], target: 5 },
    expected: 9, // Multiple combinations with standard coins
    category: 'basic'
  },
  {
    description: 'Large coins [10,20,25] - Target 30',
    input: { numbers: [10, 20, 25], target: 30 },
    expected: 3, // Ways: [10,20], [20,10], [10,10,10]
    category: 'basic'
  },
  {
    description: 'Sequential [1,2,3] - Target 4',
    input: { numbers: [1, 2, 3], target: 4 },
    expected: 7, // Ways: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2], [1,3], [3,1]
    category: 'basic'
  },
  {
    description: 'Powers of 2 [1,2,4,8] - Target 8',
    input: { numbers: [1, 2, 4, 8], target: 8 },
    expected: 56, // Corrected: many more combinations than expected
    category: 'performance'
  }
];

module.exports = solution;
