const Solution = require('./cycles-2d-grid');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic cycle exists - 2x2 square',
    input: [
      ['a', 'a', 'a', 'a'],
      ['a', 'b', 'b', 'a'],
      ['a', 'b', 'b', 'a'],
      ['a', 'a', 'a', 'a']
    ],
    expected: true,
    category: 'basic'
  },
  {
    description: 'No cycle - linear path',
    input: [
      ['c', 'c', 'c', 'a'],
      ['c', 'd', 'c', 'c'],
      ['c', 'c', 'e', 'c'],
      ['f', 'c', 'c', 'c']
    ],
    expected: true,
    category: 'basic'
  },
  {
    description: 'Simple 2x2 grid with cycle',
    input: [
      ['a', 'b'],
      ['b', 'a']
    ],
    expected: false,
    category: 'edge'
  },
  {
    description: 'Single character grid',
    input: [['a']],
    expected: false,
    category: 'edge'
  },
  {
    description: 'All same characters forming cycle',
    input: [
      ['a', 'a', 'a'],
      ['a', 'a', 'a'],
      ['a', 'a', 'a']
    ],
    expected: true,
    category: 'basic'
  },
  {
    description: 'No cycle - all different characters',
    input: [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i']
    ],
    expected: false,
    category: 'basic'
  },
  {
    description: 'L-shaped pattern, no cycle',
    input: [
      ['a', 'a', 'b'],
      ['a', 'b', 'b'],
      ['a', 'b', 'a']
    ],
    expected: false,
    category: 'edge'
  },
  {
    description: 'Complex grid with cycle',
    input: [
      ['a', 'a', 'b', 'b'],
      ['a', 'b', 'b', 'a'],
      ['a', 'b', 'a', 'a'],
      ['a', 'a', 'a', 'b']
    ],
    expected: true,
    category: 'basic'
  },
  {
    description: 'Large grid with cycle at edge',
    input: [
      ['f', 'f', 'f', 'f', 'f'],
      ['f', 'a', 'b', 'c', 'f'],
      ['f', 'd', 'e', 'c', 'f'],
      ['f', 'g', 'h', 'c', 'f'],
      ['f', 'f', 'f', 'f', 'f']
    ],
    expected: true,
    category: 'performance'
  },
  {
    description: 'Rectangle cycle in center',
    input: [
      ['x', 'x', 'x', 'x', 'x'],
      ['x', 'a', 'a', 'a', 'x'],
      ['x', 'a', 'b', 'a', 'x'],
      ['x', 'a', 'a', 'a', 'x'],
      ['x', 'x', 'x', 'x', 'x']
    ],
    expected: true,
    category: 'performance'
  }
];

module.exports = solution;
