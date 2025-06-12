class Solution {
  solve({ n, corridors }) {
    const graph = new Set();
    for (let i = 0; i < corridors.length; i++) {
      const [node1, node2] = corridors[i];
      graph.add(`${node1}_${node2}`);
      graph.add(`${node2}_${node1}`);
    }
    let count = 0;
    for (let i = 1; i <= n; i++) {
      for (let j = i + 1; j <= n; j++) {
        for (let k = j + 1; k <= n; k++) {
          if (graph.has(`${i}_${j}`) && graph.has(`${j}_${k}`) && graph.has(`${k}_${i}`)) {
            count++;
          }
        }
      }
    }
    return count;
  }
  solveAlternative({ n, corridors }) {
    const graph = [];
    for (let i = 1; i <= n; i++) {
      graph[i] = new Set();
    }
    for (let i = 0; i < corridors.length; i++) {
      const [node1, node2] = corridors[i];
      graph[node1].add(node2);
      graph[node2].add(node1);
    }
    let count = 0;
    for (let i = 0; i < corridors.length; i++) {
      const [node1, node2] = corridors[i];
      count += intersection(graph[node1], graph[node2]).size;
    }
    function intersection(setA, setB) {
      return new Set([...setA].filter((item) => setB.has(item)));
    }
    return count / 3;
  }

  solveDFS({ n, corridors }) {
    // Build adjacency list
    const graph = {};
    for (let i = 1; i <= n; i++) {
      graph[i] = [];
    }

    for (const [u, v] of corridors) {
      graph[u].push(v);
      graph[v].push(u);
    }

    let triangleCount = 0;

    // DFS to find triangles: start -> middle -> end -> start
    function findTriangles(start) {
      for (const middle of graph[start]) {
        if (middle > start) {
          // Only consider middle > start to avoid duplicates
          for (const end of graph[middle]) {
            if (end > middle && graph[end].includes(start)) {
              // end > middle, and end connects back to start
              triangleCount++;
              // console.log(`Found triangle: ${start}-${middle}-${end}`); // Debug
            }
          }
        }
      }
    }

    // Start DFS from each node
    for (let start = 1; start <= n; start++) {
      if (graph[start] && graph[start].length >= 2) {
        findTriangles(start);
      }
    }

    return triangleCount;
  }
}

module.exports = Solution;
