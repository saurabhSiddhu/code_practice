class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] >= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
      if (left < this.heap.length && this.heap[left][0] > this.heap[largest][0]) {
        largest = left;
      }
      if (right < this.heap.length && this.heap[right][0] > this.heap[largest][0]) {
        largest = right;
      }
      if (largest === i) break;
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
    return top;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

class Solution {
  /**
   * Find the path with maximum probability from start to end
   * @param {Object} input - Contains n, edges, succProb, start, end
   * @param {number} input.n - Number of nodes (0-indexed)
   * @param {number[][]} input.edges - Edge list [[a,b], ...]
   * @param {number[]} input.succProb - Success probabilities for each edge
   * @param {number} input.start - Start node
   * @param {number} input.end - End node
   * @return {number} Maximum probability of success
   */
  solve(input) {
    if (!input) return 0;

    const { n, edges, succProb, start, end } = input;
    let graph = {};
    for (let i = 0; i < n; i++) {
      graph[i] = [];
    }
    for (let i = 0; i < edges.length; i++) {
      const [node1, node2] = edges[i];
      const prob = succProb[i];
      graph[node1].push([prob, node2]);
      graph[node2].push([prob, node1]);
    }
    let visited = new Set([]);

    const pq = new MaxHeap();
    pq.push([1, start]);

    while (!pq.isEmpty()) {
      let [maxProb, currentNode] = pq.pop();
      if (currentNode === end) {
        return maxProb;
      }
      visited.add(currentNode);
      for (const edge of graph[currentNode]) {
        let [prob, node] = edge;
        if (!visited.has(node)) {
          pq.push([maxProb * prob, node]);
        }
      }
    }

    return 0;
  }
}

module.exports = Solution;
