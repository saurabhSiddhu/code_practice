# Priority Queue

<div align="center">
  <a href="">
    <img src="https://img.shields.io/badge/Difficulty-Medium-yellow" alt="Difficulty" />
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Pattern-Data_Structure-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                 |
| -------------- | --------------------------------------- |
| **Difficulty** | Medium                                  |
| **Pattern**    | Data Structure                          |
| **Tags**       | `heap`, `priority-queue`, `binary-heap` |
| **Type**       | Implementation                          |

## 📝 Problem Description

Implement a Priority Queue (Min-Heap) data structure with the following operations:

- `insert(val)`: Insert an element into the priority queue
- `extractMin()`: Remove and return the minimum element
- `peek()`: Return the minimum element without removing it
- `size()`: Return the number of elements in the queue
- `isEmpty()`: Check if the queue is empty

The priority queue should maintain the heap property where the parent is always smaller than its children (min-heap).

## 💡 Solution Approach

### Intuition

A Priority Queue is essentially a heap data structure where we can efficiently access and remove the element with the highest (or lowest) priority. For a min-heap implementation:

- The smallest element is always at the root (index 0)
- Each parent node is smaller than its children
- We use an array to represent the binary heap

### Approach

1. **Array-based Binary Heap**: Use array where for element at index `i`:

   - Left child at `2*i + 1`
   - Right child at `2*i + 2`
   - Parent at `Math.floor((i-1)/2)`

2. **Insert Operation**:

   - Add element to end of array
   - "Bubble up" by swapping with parent until heap property is satisfied

3. **Extract Min Operation**:

   - Remove root (min element)
   - Move last element to root
   - "Bubble down" by swapping with smaller child until heap property is satisfied

4. **Heapify Operations**:
   - `heapifyUp()`: Restore heap property going upward
   - `heapifyDown()`: Restore heap property going downward

### Key Insights

- **Heap Property**: Parent ≤ children for min-heap
- **Complete Binary Tree**: Fill levels left-to-right, no gaps
- **Array Representation**: Efficient space usage, O(1) parent/child access
- **Time Complexity**: O(log n) for insert/extract, O(1) for peek

## ⏱️ Complexity Analysis

### Time Complexity

```
- Insert: O(log n) - heapify up to maintain heap property
- Extract Min: O(log n) - heapify down after removing root
- Peek: O(1) - direct access to root element
- Size: O(1) - track size with counter
- isEmpty: O(1) - check if size is 0
```

### Space Complexity

```
O(n) - where n is the number of elements stored in the heap
Additional space for array storage only
```

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Basic operations
const pq = new PriorityQueue();
pq.insert(5);
pq.insert(3);
pq.insert(8);
pq.insert(1);

console.log(pq.peek()); // 1 (minimum element)
console.log(pq.extractMin()); // 1
console.log(pq.extractMin()); // 3
console.log(pq.size()); // 2

// Example 2: Duplicate elements
const pq2 = new PriorityQueue();
pq2.insert(4);
pq2.insert(4);
pq2.insert(2);

console.log(pq2.extractMin()); // 2
console.log(pq2.extractMin()); // 4
console.log(pq2.extractMin()); // 4
```

### Edge Cases

```javascript
// Edge Case 1: Empty queue operations
const pq = new PriorityQueue();
console.log(pq.isEmpty()); // true
console.log(pq.peek()); // null or throw error
console.log(pq.extractMin()); // null or throw error

// Edge Case 2: Single element
const pq2 = new PriorityQueue();
pq2.insert(42);
console.log(pq2.peek()); // 42
console.log(pq2.extractMin()); // 42
console.log(pq2.isEmpty()); // true

// Edge Case 3: Negative numbers
const pq3 = new PriorityQueue();
pq3.insert(-5);
pq3.insert(-1);
pq3.insert(-10);
console.log(pq3.extractMin()); // -10
```

### Performance Test Cases

```javascript
// Large Input: 1000 random elements
const pq = new PriorityQueue();
const nums = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

// Insert all elements
nums.forEach((num) => pq.insert(num));

// Extract all elements (should be in sorted order)
const sorted = [];
while (!pq.isEmpty()) {
  sorted.push(pq.extractMin());
}

// Verify sorted order
console.log(sorted.every((val, i) => i === 0 || val >= sorted[i - 1])); // true
```

## 🚀 How to Run

```bash
# Run basic tests
npm test priority-queue

# Run with performance tests
npm test priority-queue --skip-performance=false

# Run with detailed output
npm test priority-queue --detail
```

## 📚 References

- [Heap Data Structure - Wikipedia](<https://en.wikipedia.org/wiki/Heap_(data_structure)>)
- [Priority Queue - GeeksforGeeks](https://www.geeksforgeeks.org/priority-queue-data-structure/)
- [Binary Heap Implementation](https://www.programiz.com/dsa/heap-data-structure)
- [Heap Operations Visualization](https://visualgo.net/en/heap)
