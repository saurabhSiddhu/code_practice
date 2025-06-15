# LeetCode Solutions

A comprehensive collection of LeetCode problem solutions with detailed test cases and performance analysis.

## Features

- 🧪 Comprehensive test coverage
- ⚡ Performance benchmarking
- 📊 Detailed test reports
- 🔍 Multiple test categories (basic, edge, performance)
- 🎨 Colorful console output
- 📝 Multiple output formats (console, JSON, HTML)
- 🔧 Easy to extend and maintain
- 🚀 Quick solution creation
- 🔍 Built-in debugging support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- VS Code (for debugging)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/leetcode-solutions.git
cd leetcode-solutions
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

```
leetcode-solutions/
├── src/
│   ├── solutions/          # Solution implementations
│   │   ├── problem-name/
│   │   │   ├── index.js    # Solution implementation
│   │   │   └── test.js     # Test cases
│   ├── utils/             # Utility functions
│   │   ├── helpers.js     # Helper functions
│   │   ├── performance.js # Performance testing
│   │   └── test-runner.js # Test runner
│   └── config.js          # Configuration
├── scripts/               # Utility scripts
│   ├── test.js           # Test runner script
│   └── create-solution.js # Solution creation script
├── .vscode/              # VS Code configuration
│   └── launch.json       # Debug configuration
└── package.json          # Project configuration
```

## Usage

### Creating a New Solution

Create a new solution with:

```bash
npm run create "solution name"
```

Example:

```bash
npm run create "valid parentheses"
```

This will:

1. Create a new directory in `src/solutions/valid-parentheses`
2. Create a solution file with a template
3. Create a test file with example test cases
4. Show next steps

The created files will have:

1. Solution file (`valid-parentheses.js`):

```javascript
class Solution {
  solve(input) {
    // TODO: Implement your solution
    return null;
  }
}

module.exports = Solution;
```

2. Test file (`valid-parentheses.test.js`):

```javascript
const Solution = require('./valid-parentheses');

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

module.exports = solution;
```

### Creating Interview Insights

Add interview preparation notes to any solution:

```bash
npm run insights <solution-name>
```

Example:

```bash
npm run insights ribbon-cut
```

This creates an `INSIGHTS.md` file with:

- **Pattern/Category**: Problem classification
- **Key Insight**: The "aha" moment that makes the problem click
- **Intuition**: Natural approach before optimization
- **Common Mistakes**: Pitfalls to avoid in interviews
- **Template/Pattern**: Step-by-step approach
- **Different Approaches**: Multiple solution strategies
- **Real World Analogies**: Relatable comparisons
- **Similar Problems**: Related problems for practice
- **Follow-up Questions**: Expected interview variations

You can also create insights during solution creation:

```bash
npm run create "solution name" --with-insights
```

### Running Tests

Run tests for a specific solution:

```bash
npm test <solution-name>
```

Example:

```bash
npm test two-sum
```

### Test Options

- `--skip-performance`: Skip performance tests
- `--verbose`: Show detailed test output
- `--detail`: Show detailed test information (expected/got values and timing)
- `--filter=<text>`: Filter tests by description
- `--category=<name>`: Filter tests by category
- `--output=<format>`: Output format (console|json|html)

Example:

```bash
npm test two-sum --skip-performance --filter="edge case"
```

### Debugging Solutions

The project supports debugging through VS Code. To debug a solution:

1. Open your solution file in VS Code (e.g., `src/solutions/coin-change-ii/coin-change-ii.js`)
2. Set breakpoints by clicking on the line numbers where you want to pause execution
3. Press F5 or click the "Run and Debug" icon in the sidebar
4. Select "Debug Solution" from the dropdown menu
5. The debugger will start and pause at your breakpoints

Debugging Features:

- Step through code (F10 for step over, F11 for step into)
- Inspect variables in the Variables panel
- Use the Debug Console to evaluate expressions
- See the call stack
- Use the Watch panel to monitor specific expressions

Example:

```javascript
class Solution {
  solve(input) {
    const { amount, coins } = input;
    // Set breakpoint here to inspect input values
    const memo = new Map();
    // ... rest of the code
  }
}
```

### Test Categories

- `basic`: Standard test cases
- `edge`: Edge cases and boundary conditions
- `performance`: Performance test cases

## Test Output Formats

### Basic Output (Default)

```
✅ Test Case 1
❌ Test Case 2

Test Summary:
Total Tests: 2
Passed: 1
Failed: 1
Success Rate: 50.00%
```

### Detailed Output (with --detail flag)

```
✅ Test Case 1
Expected: [0, 1]
Got: [0, 1]
Time: 0.12ms

❌ Test Case 2
Expected: [1, 2, 3]
Got: [1, 2, 4]
Time: 0.15ms

Test Summary:
Total Tests: 2
Passed: 1
Failed: 1
Success Rate: 50.00%

Performance Summary:
Min Time: 0.12ms
Max Time: 0.15ms
Avg Time: 0.14ms
Std Dev: 0.02ms
```

### Available Commands

- `npm run create "solution name"`: Create a new solution
- `npm run insights <solution-name>`: Create interview insights for existing solution
- `npm test <solution-name>`: Run basic tests
- `npm run test:all`: Run all tests
- `npm run test:performance`: Run with performance tests
- `npm run test:verbose`: Run with verbose output
- `npm run test:detail`: Run with detailed output
- `npm run test:filter`: Run with filter
- `npm run test:category`: Run with category filter
- `npm run test:output`: Run with specific output format
- `npm run debug`: Run with debugger enabled

## Configuration

The project can be configured through `src/config.js`:

- Test settings (iterations, warmup runs)
- Output formats
- Performance thresholds
- Validation rules
- Color schemes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
