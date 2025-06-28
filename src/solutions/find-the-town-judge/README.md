# Find The Town Judge

<div align="center">
  <a href="https://leetcode.com/problems/find-the-town-judge/description/">
    <img src="https://img.shields.io/badge/LeetCode-Easy-green" alt="LeetCode Difficulty" />
  </a>
  <a href="https://leetcode.com/problems/find-the-town-judge/description/">
    <img src="https://img.shields.io/badge/Pattern-Counting-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category       | Details                                                                            |
| -------------- | ---------------------------------------------------------------------------------- |
| **Difficulty** | Easy                                                                               |
| **Pattern**    | Graph → Counting Optimization                                                      |
| **Tags**       | `Graph`, `Array`, `In-degree`, `Out-degree`                                        |
| **LeetCode**   | [View on LeetCode](https://leetcode.com/problems/find-the-town-judge/description/) |

## 📝 Problem Description

In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:

1. The town judge trusts nobody.
2. Everybody (except for the town judge) trusts the town judge.
3. There is exactly one person that satisfies properties 1 and 2.

You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi. If a trust relationship does not exist in trust array, then such a trust relationship does not exist.

Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

## 💡 Solution Approach

### Intuition

**Natural thinking**: Build a graph to track who trusts whom, then find someone trusted by all but trusts nobody.

**Key insight**: Instead of building separate in-degree and out-degree structures, use a "net trust score" where:

- Judge gets +1 for each person who trusts them
- Judge gets -1 for each person they trust
- Judge's final score = n-1 (trusted by all n-1 others, trusts nobody)

### Approach

1. **Graph Approach** (Original): Build two hashmaps for trust relationships
2. **Net Trust Score** (Optimized): Single array tracking trust difference

### Key Insights

- **Pattern Evolution**: Recognize when graph problems can become counting problems
- **Mathematical Property**: Judge has unique signature of net trust = n-1
- **Constraint Analysis**: Understanding why edge cases are impossible with valid input
- **Space Optimization**: Arrays vs hashmaps for indexed data (1 to n)

## ⏱️ Complexity Analysis

### Graph Approach (Original)

```
Time: O(n + trust.length) - build graphs + check each person
Space: O(n) - two hashmaps for trust relationships
```

### Net Trust Score (Optimized)

```
Time: O(n + trust.length) - single pass + findIndex
Space: O(n) - single array for net trust scores
```

**Note**: Same complexity but optimized approach has better constants and cleaner code.

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Simple judge case
Input: [2, [[1, 2]]]
Output: 2
Explanation: Person 1 trusts person 2, person 2 trusts nobody

// Example 2: No judge exists
Input: [3, [[1, 3], [2, 3], [3, 1]]]
Output: -1
Explanation: Person 3 trusts person 1, so can't be judge
```

### Edge Cases

```javascript
// Edge Case 1: Single person
Input: [1, []]
Output: 1
Explanation: Only one person, they must be the judge

// Edge Case 2: No trust relationships
Input: [2, []]
Output: -1
Explanation: With 2+ people, judge must be trusted by others
```

### Performance Test Cases

```javascript
// Large Input: Judge at end
Input: [1000, [[1,1000], [2,1000], ..., [999,1000]]]
Output: 1000
Explanation: Person 1000 trusted by all others, trusts nobody
```

## 🔄 Alternative Solutions

### Solution 1: Graph with Hashmaps

- **Pros**: Intuitive, clear separation of concerns
- **Cons**: More memory overhead, complex logic

### Solution 2: Net Trust Score ⭐

- **Pros**: Clean, mathematical elegance, single array
- **Cons**: Less obvious algorithm choice initially

### Solution 3: Two Arrays (In/Out degree)

- **Pros**: Clear in-degree/out-degree separation
- **Cons**: More memory than net trust approach

## 🚀 How to Run

```bash
# Run basic tests
npm test find-the-town-judge

# Run with performance tests
npm test find-the-town-judge --skip-performance=false

# Run with detailed output
npm test find-the-town-judge --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/find-the-town-judge/description/)
- [Celebrity Problem Pattern](https://leetcode.com/problems/find-the-celebrity/)
- [Graph Theory: In-degree vs Out-degree](https://en.wikipedia.org/wiki/Directed_graph)

## 🧪 Test Cases

### Basic Test Cases

```javascript
// Example 1: Simple judge case
Input: [2, [[1, 2]]]
Output: 2
Explanation: Person 1 trusts person 2, person 2 trusts nobody

// Example 2: No judge exists
Input: [3, [[1, 3], [2, 3], [3, 1]]]
Output: -1
Explanation: Person 3 trusts person 1, so can't be judge
```

### Edge Cases

```javascript
// Edge Case 1: Single person
Input: [1, []]
Output: 1
Explanation: Only one person, they must be the judge

// Edge Case 2: No trust relationships
Input: [2, []]
Output: -1
Explanation: With 2+ people, judge must be trusted by others
```

### Performance Test Cases

```javascript
// Large Input: Judge at end
Input: [1000, [[1,1000], [2,1000], ..., [999,1000]]]
Output: 1000
Explanation: Person 1000 trusted by all others, trusts nobody
```

## 🔄 Alternative Solutions

### Solution 1: Graph with Hashmaps

- **Pros**: Intuitive, clear separation of concerns
- **Cons**: More memory overhead, complex logic

### Solution 2: Net Trust Score ⭐

- **Pros**: Clean, mathematical elegance, single array
- **Cons**: Less obvious algorithm choice initially

### Solution 3: Two Arrays (In/Out degree)

- **Pros**: Clear in-degree/out-degree separation
- **Cons**: More memory than net trust approach

## 🚀 How to Run

```bash
# Run basic tests
npm test find-the-town-judge

# Run with performance tests
npm test find-the-town-judge --skip-performance=false

# Run with detailed output
npm test find-the-town-judge --detail
```

## 📚 References

- [LeetCode Problem](https://leetcode.com/problems/find-the-town-judge/description/)
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)
