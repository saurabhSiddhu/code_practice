const Solution = require('./reconstruct-itinerary');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic test case - simple path',
    input: [
      ['MUC', 'LHR'],
      ['JFK', 'MUC'],
      ['SFO', 'SJC'],
      ['LHR', 'SFO']
    ],
    expected: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'],
    category: 'basic'
  },
  {
    description: 'Multiple valid paths - lexical order',
    input: [
      ['JFK', 'SFO'],
      ['JFK', 'ATL'],
      ['SFO', 'ATL'],
      ['ATL', 'JFK'],
      ['ATL', 'SFO']
    ],
    expected: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'],
    category: 'basic'
  },
  {
    description: 'Single ticket from JFK',
    input: [['JFK', 'KUL']],
    expected: ['JFK', 'KUL'],
    category: 'edge'
  },
  {
    description: 'Round trip ticket',
    input: [
      ['JFK', 'ATL'],
      ['ATL', 'JFK']
    ],
    expected: ['JFK', 'ATL', 'JFK'],
    category: 'basic'
  },
  {
    description: 'Complex case with cycles',
    input: [
      ['JFK', 'A'],
      ['A', 'C'],
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'A']
    ],
    expected: ['JFK', 'A', 'B', 'C', 'A', 'C'],
    category: 'basic'
  },
  {
    description: 'Multiple tickets to same destination',
    input: [
      ['JFK', 'SFO'],
      ['JFK', 'SFO'],
      ['SFO', 'JFK']
    ],
    expected: ['JFK', 'SFO', 'JFK', 'SFO'],
    category: 'edge'
  },
  {
    description: 'Lexical ordering priority',
    input: [
      ['JFK', 'D'],
      ['D', 'I'],
      ['D', 'A'],
      ['A', 'D'],
      ['I', 'JFK']
    ],
    expected: ['JFK', 'D', 'A', 'D', 'I', 'JFK'],
    category: 'basic'
  },
  {
    description: 'Large cycle with multiple paths',
    input: [
      ['EZE', 'AXA'],
      ['TIA', 'ANU'],
      ['ANU', 'JFK'],
      ['JFK', 'TIA'],
      ['ANU', 'EZE'],
      ['TIA', 'ANU'],
      ['AXA', 'TIA'],
      ['TIA', 'JFK'],
      ['ANU', 'TIA'],
      ['JFK', 'EZE']
    ],
    expected: ['JFK', 'EZE', 'AXA', 'TIA', 'ANU', 'EZE', 'ANU', 'JFK', 'TIA', 'ANU', 'TIA', 'JFK'],
    category: 'performance'
  },
  {
    description: 'All same destination from JFK',
    input: [
      ['JFK', 'AAA'],
      ['JFK', 'AAA'],
      ['JFK', 'AAA']
    ],
    expected: ['JFK', 'AAA', 'AAA', 'AAA'],
    category: 'edge'
  },
  {
    description: 'Linear chain',
    input: [
      ['JFK', 'A'],
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'D'],
      ['D', 'E']
    ],
    expected: ['JFK', 'A', 'B', 'C', 'D', 'E'],
    category: 'basic'
  }
];

module.exports = solution;
