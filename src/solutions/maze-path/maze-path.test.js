const Solution = require('./maze-path');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Simple triangle cycle',
    input: {
      corridors: [
        [1, 2],
        [2, 3],
        [3, 1]
      ],
      n: 3 // number of rooms
    },
    expected: 1,
    explanation: 'One triangle: 1-2-3-1',
    category: 'basic'
  },
  {
    description: 'Two separate triangles',
    input: {
      corridors: [
        [1, 2],
        [2, 3],
        [3, 1], // Triangle 1
        [4, 5],
        [5, 6],
        [6, 4] // Triangle 2
      ],
      n: 6
    },
    expected: 2,
    explanation: 'Two triangles: 1-2-3 and 4-5-6',
    category: 'basic'
  },
  {
    description: 'Complex graph with multiple cycles',
    input: {
      corridors: [
        [1, 2],
        [2, 3],
        [3, 1], // Triangle: 1-2-3
        [2, 4],
        [3, 4] // Triangle: 2-3-4
      ],
      n: 4
    },
    expected: 2,
    explanation: 'Two triangles: 1-2-3 and 2-3-4',
    category: 'basic'
  },
  {
    description: 'No cycles - linear path',
    input: {
      corridors: [
        [1, 2],
        [2, 3],
        [3, 4]
      ],
      n: 4
    },
    expected: 0,
    explanation: 'Linear path, no triangles possible',
    category: 'edge'
  },
  {
    description: 'Empty corridors',
    input: {
      corridors: [],
      n: 0
    },
    expected: 0,
    explanation: 'No rooms or connections',
    category: 'edge'
  },
  {
    description: 'Single connection',
    input: {
      corridors: [[1, 2]],
      n: 2
    },
    expected: 0,
    explanation: 'Need at least 3 rooms for a triangle',
    category: 'edge'
  },
  {
    description: 'Cycle of length 4 (should not count)',
    input: {
      corridors: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 1]
      ],
      n: 4
    },
    expected: 0,
    explanation: 'Only 4-cycles exist, no 3-cycles (triangles)',
    category: 'edge'
  },
  {
    description: 'Complete graph with 4 nodes',
    input: {
      corridors: [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4]
      ],
      n: 4
    },
    expected: 4,
    explanation: 'All possible triangles: 1-2-3, 1-2-4, 1-3-4, 2-3-4',
    category: 'basic'
  },
  {
    description: 'Large graph with many triangles',
    input: {
      corridors: [
        // Create a simpler predictable graph with known triangles
        [1, 2],
        [2, 3],
        [3, 1], // Triangle 1: 1-2-3
        [4, 5],
        [5, 6],
        [6, 4], // Triangle 2: 4-5-6
        [7, 8],
        [8, 9],
        [9, 7], // Triangle 3: 7-8-9
        [1, 4],
        [1, 7],
        [4, 7], // Triangle 4: 1-4-7 (connecting triangles)
        [10, 11],
        [11, 12],
        [12, 10] // Triangle 5: 10-11-12 (separate)
      ],
      n: 12
    },
    expected: 5, // 5 clearly identifiable triangles
    explanation: '5 triangles: 1-2-3, 4-5-6, 7-8-9, 1-4-7, 10-11-12',
    category: 'performance'
  }
];

module.exports = solution;
