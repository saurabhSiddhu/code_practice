const Solution = require('./priority-queue');

const solution = new Solution();
solution.testCases = [
  // Basic Operations Test Cases
  {
    description: 'Basic insert and extractMin operations',
    input: {
      operations: [
        ['insert', 5],
        ['insert', 3],
        ['insert', 8],
        ['insert', 1],
        ['peek'],
        ['extractMin'],
        ['extractMin'],
        ['size']
      ]
    },
    expected: [undefined, undefined, undefined, undefined, 1, 1, 3, 2],
    category: 'basic'
  },
  {
    description: 'Sequential operations with duplicates',
    input: {
      operations: [
        ['insert', 4],
        ['insert', 4],
        ['insert', 2],
        ['insert', 4],
        ['extractMin'],
        ['extractMin'],
        ['extractMin'],
        ['extractMin'],
        ['isEmpty']
      ]
    },
    expected: [undefined, undefined, undefined, undefined, 2, 4, 4, 4, true],
    category: 'basic'
  },
  {
    description: 'Mixed operations with size tracking',
    input: {
      operations: [
        ['isEmpty'],
        ['insert', 10],
        ['size'],
        ['insert', 5],
        ['size'],
        ['peek'],
        ['insert', 15],
        ['extractMin'],
        ['size']
      ]
    },
    expected: [true, undefined, 1, undefined, 2, 5, undefined, 5, 2],
    category: 'basic'
  },

  // Edge Cases
  {
    description: 'Empty queue operations',
    input: {
      operations: [['isEmpty'], ['size'], ['peek'], ['extractMin']]
    },
    expected: [true, 0, null, null],
    category: 'edge'
  },
  {
    description: 'Single element operations',
    input: {
      operations: [
        ['insert', 42],
        ['peek'],
        ['size'],
        ['isEmpty'],
        ['extractMin'],
        ['isEmpty'],
        ['size']
      ]
    },
    expected: [undefined, 42, 1, false, 42, true, 0],
    category: 'edge'
  },
  {
    description: 'Negative numbers and zero',
    input: {
      operations: [
        ['insert', -5],
        ['insert', 0],
        ['insert', -10],
        ['insert', 3],
        ['extractMin'],
        ['extractMin'],
        ['extractMin'],
        ['extractMin']
      ]
    },
    expected: [undefined, undefined, undefined, undefined, -10, -5, 0, 3],
    category: 'edge'
  },
  {
    description: 'Extract from empty after operations',
    input: {
      operations: [['insert', 1], ['extractMin'], ['extractMin'], ['peek'], ['size']]
    },
    expected: [undefined, 1, null, null, 0],
    category: 'edge'
  },

  // Performance Test Cases
  {
    description: 'Large dataset - ascending order insertion',
    input: {
      operations: (() => {
        const ops = [];

        // Insert 50 elements in ascending order
        for (let i = 1; i <= 50; i++) {
          ops.push(['insert', i]);
        }

        // Extract all elements (should come out in ascending order)
        for (let i = 1; i <= 50; i++) {
          ops.push(['extractMin']);
        }

        return ops;
      })()
    },
    expected: (() => {
      const expected = [];

      // Insert results
      for (let i = 1; i <= 50; i++) {
        expected.push(undefined);
      }

      // Extract results
      for (let i = 1; i <= 50; i++) {
        expected.push(i);
      }

      return expected;
    })(),
    category: 'performance'
  },
  {
    description: 'Large dataset - descending order insertion',
    input: {
      operations: (() => {
        const ops = [];

        // Insert 50 elements in descending order
        for (let i = 50; i >= 1; i--) {
          ops.push(['insert', i]);
        }

        // Extract all elements (should come out in ascending order)
        for (let i = 1; i <= 50; i++) {
          ops.push(['extractMin']);
        }

        return ops;
      })()
    },
    expected: (() => {
      const expected = [];

      // Insert results
      for (let i = 1; i <= 50; i++) {
        expected.push(undefined);
      }

      // Extract results
      for (let i = 1; i <= 50; i++) {
        expected.push(i);
      }

      return expected;
    })(),
    category: 'performance'
  },
  {
    description: 'Interleaved insert and extract operations',
    input: {
      operations: [
        ['insert', 20],
        ['insert', 10],
        ['extractMin'], // Extract 10
        ['insert', 30],
        ['insert', 5],
        ['extractMin'], // Extract 5
        ['insert', 15],
        ['extractMin'],
        ['extractMin'], // Extract 15, 20
        ['insert', 25],
        ['extractMin'] // Extract 25
      ]
    },
    expected: [undefined, undefined, 10, undefined, undefined, 5, undefined, 15, 20, undefined, 25],
    category: 'performance'
  }
];

module.exports = solution;
