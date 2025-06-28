const Solution = require('./find-the-town-judge');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic case: Person 2 is the judge',
    input: [2, [[1, 2]]],
    expected: 2,
    category: 'basic'
  },
  {
    description: 'No judge exists: Person 1 trusts person 3, but person 3 trusts person 1',
    input: [
      3,
      [
        [1, 3],
        [2, 3],
        [3, 1]
      ]
    ],
    expected: -1,
    category: 'basic'
  },
  {
    description: 'Larger case: Person 3 is the judge',
    input: [
      4,
      [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [4, 3]
      ]
    ],
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Edge case: Only one person (should be the judge)',
    input: [1, []],
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Edge case: No trust relationships in group of 2',
    input: [2, []],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case: Self-trust should not happen, but handle gracefully',
    input: [
      3,
      [
        [1, 2],
        [2, 3],
        [1, 3]
      ]
    ],
    expected: 3,
    category: 'edge'
  },
  {
    description: 'Performance test case: Large graph with judge at end',
    input: [1000, Array.from({ length: 999 }, (_, i) => [i + 1, 1000])],
    expected: 1000,
    category: 'performance'
  }
];

module.exports = solution;
