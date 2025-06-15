const path = require('path');

const config = {
  // Project paths
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '..'),
    solutions: path.resolve(__dirname, '../solutions'),
    utils: path.resolve(__dirname, '../utils'),
    scripts: path.resolve(__dirname, '../../scripts')
  },

  // Test configuration
  test: {
    iterations: 1000,
    warmupRuns: 10,
    performanceThreshold: 100, // ms
    categories: {
      basic: 'Basic test cases',
      edge: 'Edge cases',
      performance: 'Performance test cases'
    }
  },

  // Output configuration
  output: {
    formats: ['console', 'json', 'html'],
    colors: {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      dim: '\x1b[2m',
      underscore: '\x1b[4m',
      blink: '\x1b[5m',
      reverse: '\x1b[7m',
      hidden: '\x1b[8m',
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m'
    }
  },

  // Solution template configuration
  solution: {
    template: {
      class: `class Solution {
    solve(input) {
        // TODO: Implement your solution
        return null;
    }
}

module.exports = Solution;`,
      test: `const Solution = require('./{name}');

const solution = new Solution();
solution.testCases = [
    {
        description: 'Basic test case',
        input: null, // TODO: Add your test input
        expected: null, // TODO: Add your expected output
        category: 'basic'
    },
    {
        description: 'Edge case',
        input: null, // TODO: Add your test input
        expected: null, // TODO: Add your expected output
        category: 'edge'
    },
    {
        description: 'Performance test case',
        input: null, // TODO: Add your test input
        expected: null, // TODO: Add your expected output
        category: 'performance'
    }
];

module.exports = solution;`,
      readme: `# {title}

<div align="center">
  <a href="{leetcodeLink}">
    <img src="https://img.shields.io/badge/LeetCode-{difficulty}-{difficultyColor}" alt="LeetCode Difficulty" />
  </a>
  <a href="{leetcodeLink}">
    <img src="https://img.shields.io/badge/Pattern-{pattern}-blue" alt="Problem Pattern" />
  </a>
</div>

## 📋 Problem Information

| Category | Details |
|----------|---------|
| **Difficulty** | {difficulty} |
| **Pattern** | {pattern} |
| **Tags** | {tags} |
| **LeetCode** | [View on LeetCode]({leetcodeLink}) |

## 📝 Problem Description

{problemStatement}

## 💡 Solution Approach

### Intuition
[Explain your initial thoughts and intuition about solving the problem]

### Approach
[Describe your approach step by step]

### Key Insights
- [Key insight 1]
- [Key insight 2]
- [Key insight 3]

## ⏱️ Complexity Analysis

### Time Complexity
\`\`\`
[Add time complexity analysis here]
\`\`\`

### Space Complexity
\`\`\`
[Add space complexity analysis here]
\`\`\`

## 🧪 Test Cases

### Basic Test Cases
\`\`\`javascript
// Example 1
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

// Example 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]
\`\`\`

### Edge Cases
\`\`\`javascript
// Edge Case 1
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]

// Edge Case 2
Input: [Add input]
Output: [Add expected output]
Explanation: [Add explanation]
\`\`\`

### Performance Test Cases
\`\`\`javascript
// Large Input
Input: [Add large input]
Output: [Add expected output]
\`\`\`

## 🚀 How to Run

\`\`\`bash
# Run basic tests
npm test {name}

# Run with performance tests
npm test {name} --skip-performance=false

# Run with detailed output
npm test {name} --detail
\`\`\`

## 📚 References

- [LeetCode Problem]({leetcodeLink})
- [Pattern Documentation](https://leetcode.com/explore/learn/card/patterns/)
- [Related Problems](#)`,
      insights: `# {title} - Interview Notes

## 🔧 Pattern/Category
{pattern}

## 🔑 Key Insight
{keyInsight}

## 🧠 Intuition 
{intuition}

## ⚠️ Common Mistake
{commonMistakes}

## 📋 Template/Pattern
\`\`\`javascript
// {pattern} Pattern:
{templateSteps}
\`\`\`

## 🔄 Different Ways to Solve
{approaches}

## 🌍 Real World Analogies
{analogies}

## 🔗 Similar Problems
{similarProblems}

## ❓ Follow-up Questions
{followUpQuestions}`
    }
  }
};

module.exports = config;
