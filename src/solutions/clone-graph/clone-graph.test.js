const Solution = require('./clone-graph');

// Node class definition for the graph
class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

// Helper function to create graph from adjacency list
function createGraph(adjList) {
  if (!adjList || adjList.length === 0) {
    return null;
  }

  const nodes = [];
  // Create all nodes first
  for (let i = 0; i < adjList.length; i++) {
    nodes[i] = new Node(i + 1);
  }

  // Connect neighbors
  for (let i = 0; i < adjList.length; i++) {
    for (const neighbor of adjList[i]) {
      nodes[i].neighbors.push(nodes[neighbor - 1]);
    }
  }

  return nodes[0];
}

// Helper function to verify graph structure (DFS traversal)
function verifyClone(original, clone, visited = new Set()) {
  if (!original && !clone) {
    return true;
  }
  if (!original || !clone) {
    return false;
  }
  if (original.val !== clone.val) {
    return false;
  }
  if (original === clone) {
    return false;
  } // Should be different objects
  if (original.neighbors.length !== clone.neighbors.length) {
    return false;
  }

  const key = original.val;
  if (visited.has(key)) {
    return true;
  }
  visited.add(key);

  for (let i = 0; i < original.neighbors.length; i++) {
    if (!verifyClone(original.neighbors[i], clone.neighbors[i], visited)) {
      return false;
    }
  }

  return true;
}

const solution = new Solution();
solution.testCases = [
  {
    description: 'Single node with no neighbors',
    input: createGraph([[]]),
    expected: (result) => {
      const original = createGraph([[]]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Two nodes connected to each other',
    input: createGraph([[2], [1]]),
    expected: (result) => {
      const original = createGraph([[2], [1]]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Four nodes in a square formation',
    input: createGraph([
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3]
    ]),
    expected: (result) => {
      const original = createGraph([
        [2, 4],
        [1, 3],
        [2, 4],
        [1, 3]
      ]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Linear chain of nodes',
    input: createGraph([[2], [1, 3], [2, 4], [3]]),
    expected: (result) => {
      const original = createGraph([[2], [1, 3], [2, 4], [3]]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Empty graph (null input)',
    input: null,
    expected: null,
    category: 'edge'
  },
  {
    description: 'Single node pointing to itself',
    input: (() => {
      const node = new Node(1);
      node.neighbors = [node];
      return node;
    })(),
    expected: (result) => {
      return (
        result &&
        result.val === 1 &&
        result.neighbors.length === 1 &&
        result.neighbors[0] === result
      ); // Self-reference in clone
    },
    category: 'edge'
  },
  {
    description: 'Triangle formation (3 nodes all connected)',
    input: createGraph([
      [2, 3],
      [1, 3],
      [1, 2]
    ]),
    expected: (result) => {
      const original = createGraph([
        [2, 3],
        [1, 3],
        [1, 2]
      ]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Star formation (center node connected to all others)',
    input: createGraph([[2, 3, 4, 5], [1], [1], [1], [1]]),
    expected: (result) => {
      const original = createGraph([[2, 3, 4, 5], [1], [1], [1], [1]]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Complex graph with multiple cycles',
    input: createGraph([
      [2, 3, 6],
      [1, 4],
      [1, 4, 5],
      [2, 3],
      [3, 6],
      [1, 5]
    ]),
    expected: (result) => {
      const original = createGraph([
        [2, 3, 6],
        [1, 4],
        [1, 4, 5],
        [2, 3],
        [3, 6],
        [1, 5]
      ]);
      return verifyClone(original, result);
    },
    category: 'basic'
  },
  {
    description: 'Large graph (performance test)',
    input: (() => {
      // Create a large connected graph (100 nodes)
      const adjList = [];
      for (let i = 0; i < 100; i++) {
        adjList[i] = [];
        // Connect each node to next few nodes (creating a dense graph)
        for (let j = 1; j <= 5; j++) {
          const neighbor = ((i + j) % 100) + 1;
          adjList[i].push(neighbor);
        }
      }
      return createGraph(adjList);
    })(),
    expected: (result) => {
      // For performance test, just verify basic structure
      if (!result || result.val !== 1) {
        return false;
      }

      // Do a BFS to count nodes
      const queue = [result];
      const visited = new Set();
      let nodeCount = 0;

      while (queue.length > 0) {
        const node = queue.shift();
        if (visited.has(node.val)) {
          continue;
        }
        visited.add(node.val);
        nodeCount++;

        for (const neighbor of node.neighbors) {
          if (!visited.has(neighbor.val)) {
            queue.push(neighbor);
          }
        }
      }

      return nodeCount === 100;
    },
    category: 'performance'
  },
  {
    description: 'Two nodes with multiple connections (multi-edge)',
    input: (() => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      // Multiple edges between same nodes
      node1.neighbors = [node2, node2];
      node2.neighbors = [node1, node1];
      return node1;
    })(),
    expected: (result) => {
      return (
        result &&
        result.val === 1 &&
        result.neighbors.length === 2 &&
        result.neighbors[0].val === 2 &&
        result.neighbors[1].val === 2 &&
        result.neighbors[0] === result.neighbors[1] && // Same clone node
        result.neighbors[0].neighbors.length === 2
      );
    },
    category: 'edge'
  },
  {
    description: 'Complex cycle with multiple entry points',
    input: createGraph([[2, 3], [1, 4], [1, 4], [2, 3, 5], [4]]),
    expected: (result) => {
      const original = createGraph([[2, 3], [1, 4], [1, 4], [2, 3, 5], [4]]);
      return verifyClone(original, result);
    },
    category: 'basic'
  }
];

module.exports = solution;
