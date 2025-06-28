const Solution = require('./reorder-routes-to-make-all-paths-lead-to-the-city-zero');

const solution = new Solution();
solution.testCases = [
  // ==== BASIC TEST CASES ====
  {
    description: 'Example 1: Simple tree requiring 3 changes',
    input: {
      n: 6,
      connections: [
        [0, 1],
        [1, 3],
        [2, 3],
        [4, 0],
        [4, 5]
      ]
    },
    expected: 3,
    category: 'basic',
    explanation: 'Need to reverse edges: 0->1 to 1->0, 1->3 to 3->1, and 4->0 to 0->4'
  },
  {
    description: 'Example 2: Linear path requiring 2 changes',
    input: {
      n: 5,
      connections: [
        [1, 0],
        [1, 2],
        [3, 2],
        [3, 4]
      ]
    },
    expected: 2,
    category: 'basic',
    explanation: 'Need to reverse edges: 3->2 to 2->3 and 3->4 to 4->3'
  },
  {
    description: 'Basic: Small tree with mixed directions',
    input: {
      n: 4,
      connections: [
        [0, 2],
        [1, 2],
        [3, 2]
      ]
    },
    expected: 1,
    category: 'basic',
    explanation: 'Only need to reverse 0->2 to 2->0 since others already point toward 0'
  },
  {
    description: 'Basic: Star pattern with center as 0',
    input: {
      n: 4,
      connections: [
        [1, 0],
        [2, 0],
        [3, 0]
      ]
    },
    expected: 0,
    category: 'basic',
    explanation: 'All edges already point to city 0'
  },

  // ==== EDGE CASES ====
  {
    description: 'Edge: Two cities only',
    input: {
      n: 2,
      connections: [[0, 1]]
    },
    expected: 1,
    category: 'edge',
    explanation: 'Need to reverse the single edge 0->1 to 1->0'
  },
  {
    description: 'Edge: Two cities, correct direction',
    input: {
      n: 2,
      connections: [[1, 0]]
    },
    expected: 0,
    category: 'edge',
    explanation: 'Edge already points to city 0'
  },
  {
    description: 'Edge: All edges pointing away from 0',
    input: {
      n: 5,
      connections: [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4]
      ]
    },
    expected: 4,
    category: 'edge',
    explanation: 'All edges point away from 0, need to reverse all'
  },
  {
    description: 'Edge: All edges pointing toward 0',
    input: {
      n: 5,
      connections: [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0]
      ]
    },
    expected: 0,
    category: 'edge',
    explanation: 'All edges already point to city 0'
  },

  // ==== COMPLEX STRUCTURES ====
  {
    description: 'Complex: Deep linear chain',
    input: {
      n: 6,
      connections: [
        [5, 4],
        [4, 3],
        [3, 2],
        [2, 1],
        [1, 0]
      ]
    },
    expected: 0,
    category: 'complex',
    explanation: 'Linear chain already flows toward city 0'
  },
  {
    description: 'Complex: Deep linear chain reversed',
    input: {
      n: 6,
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5]
      ]
    },
    expected: 5,
    category: 'complex',
    explanation: 'Need to reverse entire chain flowing away from 0'
  },
  {
    description: 'Complex: Balanced binary tree structure',
    input: {
      n: 7,
      connections: [
        [1, 0],
        [2, 0],
        [3, 1],
        [4, 1],
        [5, 2],
        [6, 2]
      ]
    },
    expected: 0,
    category: 'complex',
    explanation: 'Tree structure with all paths leading to root (city 0)'
  },
  {
    description: 'Complex: Mixed tree with multiple reversals needed',
    input: {
      n: 8,
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [4, 0],
        [5, 4],
        [6, 5],
        [7, 6]
      ]
    },
    expected: 3,
    category: 'complex',
    explanation:
      'Need to reverse 0->1, 1->2, 2->3. The 4->0 branch already flows correctly toward 0'
  },

  // ==== PERFORMANCE TEST CASES ====
  {
    description: 'Performance: Large star pattern (worst case for naive approaches)',
    input: {
      n: 1000,
      connections: Array.from({ length: 999 }, (_, i) => [0, i + 1])
    },
    expected: 999,
    category: 'performance',
    explanation: 'Large star with all edges pointing away from center'
  },
  {
    description: 'Performance: Large linear chain',
    input: {
      n: 1000,
      connections: Array.from({ length: 999 }, (_, i) => [i, i + 1])
    },
    expected: 999,
    category: 'performance',
    explanation: 'Linear chain of 1000 nodes all pointing away from 0'
  },

  // ==== SPECIAL PATTERNS ====
  {
    description: 'Pattern: Complete binary tree structure',
    input: {
      n: 15,
      connections: [
        [1, 0],
        [2, 0],
        [3, 1],
        [4, 1],
        [5, 2],
        [6, 2],
        [7, 3],
        [8, 3],
        [9, 4],
        [10, 4],
        [11, 5],
        [12, 5],
        [13, 6],
        [14, 6]
      ]
    },
    expected: 0,
    category: 'pattern',
    explanation: 'Perfect binary tree with all edges pointing toward root'
  },
  {
    description: 'Pattern: Zig-zag alternating directions',
    input: {
      n: 7,
      connections: [
        [1, 0],
        [1, 2],
        [3, 2],
        [3, 4],
        [5, 4],
        [5, 6]
      ]
    },
    expected: 3,
    category: 'pattern',
    explanation: 'Alternating pattern requiring selective reversals'
  }
];

module.exports = solution;
