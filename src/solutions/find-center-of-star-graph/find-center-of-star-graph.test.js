const Solution = require('./find-center-of-star-graph');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic case: 4 nodes, center is 2',
    input: [
      [1, 2],
      [2, 3],
      [4, 2]
    ],
    expected: 2,
    category: 'basic'
  },
  {
    description: 'Basic case: 3 nodes, center is 1',
    input: [
      [1, 2],
      [1, 3]
    ],
    expected: 1,
    category: 'basic'
  },
  {
    description: 'Larger star: 5 nodes, center is 3',
    input: [
      [3, 1],
      [3, 2],
      [3, 4],
      [3, 5]
    ],
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Edge case: Minimum star graph (3 nodes)',
    input: [
      [1, 2],
      [2, 3]
    ],
    expected: 2,
    category: 'edge'
  },
  {
    description: 'Edge case: Different node ordering',
    input: [
      [5, 1],
      [1, 3],
      [1, 4],
      [1, 2]
    ],
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Edge case: High numbered center node',
    input: [
      [100, 1],
      [100, 2],
      [100, 3]
    ],
    expected: 100,
    category: 'edge'
  },
  {
    description: 'Performance: Large star graph (1000 nodes)',
    input: (() => {
      const edges = [];
      for (let i = 2; i <= 1000; i++) {
        edges.push([1, i]);
      }
      return edges;
    })(),
    expected: 1,
    category: 'performance'
  },
  {
    description: 'Performance: Large star with high center node',
    input: (() => {
      const edges = [];
      const center = 500;
      for (let i = 1; i < center; i++) {
        edges.push([center, i]);
      }
      for (let i = center + 1; i <= 1000; i++) {
        edges.push([center, i]);
      }
      return edges;
    })(),
    expected: 500,
    category: 'performance'
  }
];

module.exports = solution;
