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
- 🧠 **Advanced Insight System** - Build stronger mental models and pattern recognition
- 📈 **Learning Analytics** - Track progress and identify knowledge gaps
- 🔗 **Pattern Connections** - Discover relationships between problems
- 🎯 **Constraint Intuition** - Develop better problem-solving instincts

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

## 🧠 Advanced Insight System

Transform every problem you solve into lasting knowledge with our systematic insight capture system.

### Why Build Mental Models?

> "The goal is not to solve problems, but to build the reasoning engine that can solve any problem."

This system helps you:

- 🎯 **Build Stronger Mental Models** - Understand the "why" behind solutions
- ⚡ **Develop Constraint Intuition** - Recognize patterns from problem constraints
- 🔍 **Master Pattern Understanding** - See how patterns evolve and connect
- 🚀 **Accelerate Learning** - Extract maximum value from every problem

### Quick Start with Insights

After solving any problem:

```bash
# 1. Test your solution
npm test two-sum

# 2. Capture insights (3-5 minutes)
npm run insights two-sum

# 3. Weekly analysis
npm run analyze
```

### Insight Categories

The system captures 5 key areas of learning:

#### 1. 🧠 Mental Models

- **Key Insight**: What was the breakthrough moment?
- **Problem Approach**: How do you think about this problem type?
- **Recognition Pattern**: How would you spot this pattern faster?

#### 2. ⚡ Constraint Intuition

- **Critical Constraints**: Which constraints shaped your approach?
- **Constraint Signals**: What do constraints tell you about the solution?
- **Optimization Hints**: How constraints guide optimization choices

#### 3. 🔍 Pattern Understanding

- **Pattern Family**: What broader pattern does this belong to?
- **Pattern Evolution**: How does this pattern manifest differently?
- **Implementation Variants**: Different ways to implement this pattern

#### 4. 🔗 Problem Connections

- **Related Problems**: What problems share similar patterns?
- **Knowledge Transfer**: How does this problem inform others?
- **Progression Path**: What's the learning sequence for this topic?

#### 5. 🚀 Future Application

- **Recognition Triggers**: How to identify this pattern quickly
- **Common Pitfalls**: What mistakes to avoid
- **Optimization Strategy**: How to approach optimization

### Insight Commands

#### Capture Insights

```bash
npm run insights <problem-name>     # Full insight capture
npm run insights:quick <problem>    # Quick insight capture
npm run insights:review             # Review recent insights
npm run insights:summary <days>     # Insights from last N days
```

#### Analysis & Reports

```bash
npm run analyze                     # Full analysis report
npm run analyze:patterns            # Pattern mastery progress
npm run analyze:constraints         # Constraint intuition development
npm run analyze:models              # Mental model strength
npm run analyze:connections         # Knowledge graph analysis
npm run analyze:velocity            # Learning velocity tracking
```

#### Markdown Reports

```bash
npm run insights:markdown           # Generate all Markdown reports
npm run insights:markdown -- --all # Generate Markdown for all insights
npm run insights:markdown -- --problem <name>    # Generate for specific problem
npm run insights:markdown -- --recent <days>     # Generate recent insights report
npm run insights:markdown -- --weekly            # Generate weekly summary
npm run insights:markdown -- --consolidate       # Update consolidated summary
```

### Sample Insight Workflow

```bash
# Day 1: Solve Dynamic Programming problems
npm test fibonacci
npm run insights fibonacci

npm test climbing-stairs
npm run insights climbing-stairs

npm test coin-change-1
npm run insights coin-change-1

# End of week: Analyze learning
npm run analyze:patterns
```

### Learning Analytics

The system provides detailed analytics:

#### Pattern Mastery Tracking

- Which patterns you've mastered vs. need practice
- Pattern recognition accuracy over time
- Implementation confidence levels

#### Constraint Intuition Development

- How well you read constraint signals
- Speed of constraint → approach mapping
- Constraint pattern recognition

#### Mental Model Strength

- Depth of understanding for each topic
- Ability to explain and teach concepts
- Problem-solving confidence

#### Knowledge Graph Analysis

- How well your knowledge connects
- Knowledge gaps and isolated concepts
- Learning path optimization

### Integration with Practice Schedule

Add insight capture to your daily routine:

```bash
# Your current practice session
npm test two-sum                    # ✅ Test solution
npm run insights two-sum            # 🧠 Capture insights (3-5 min)

# Weekly review
npm run analyze                     # 📊 See your progress
npm run insights:review             # 🔄 Review recent insights
```

### Data Storage

All insights are stored in structured JSON format:

```
insights/
├── mental-models/              # Mental model database
├── constraint-patterns/        # Constraint pattern library
├── pattern-evolution/          # Pattern understanding growth
├── problem-connections/        # Knowledge graph
├── INSIGHTS_SUMMARY.md         # Consolidated summary of all insights
├── WEEKLY_REPORT_*.md          # Weekly learning reports
└── {problem-name}-*.json       # Raw insight data

src/solutions/{problem-name}/
└── insights.md                 # Human-readable insights for each problem
```

#### Insight Organization

Insights are automatically organized for easy access:

- **Solution Folders**: Each problem's insights are saved in `src/solutions/{problem-name}/insights.md` alongside the code
- **Consolidated View**: Global summary available in `insights/INSIGHTS_SUMMARY.md` with links to individual insights
- **Automatic Generation**: When capturing insights, markdown files are automatically created in both locations
- **Fallback Support**: If solution folder doesn't exist, insights are saved in global `insights/` directory

**Example Structure:**

```
src/solutions/two-sum/
├── two-sum.js              # Your solution
├── two-sum.test.js         # Tests
├── insights.md            # 🧠 Your insights (auto-generated)
└── README.md              # Problem description
```

This keeps insights close to the code for easy reference during review and revision.

### Demo the System

See the insight system in action:

```bash
npm run demo:insights
```

This shows:

- Available problems for insight capture
- Sample insight capture flow
- Analysis report examples
- Integration with your practice

### Available Commands

#### Core Testing

- `npm run create "solution name"`: Create a new solution
- `npm test <solution-name>`: Run basic tests
- `npm run test:all`: Run all tests
- `npm run test:performance`: Run with performance tests
- `npm run test:verbose`: Run with verbose output
- `npm run test:detail`: Run with detailed output
- `npm run test:filter`: Run with filter
- `npm run test:category`: Run with category filter
- `npm run test:output`: Run with specific output format
- `npm run debug`: Run with debugger enabled

#### Insight System

- `npm run insights <problem>`: Capture full insights
- `npm run insights:quick <problem>`: Quick insight capture
- `npm run insights:review`: Review recent insights
- `npm run analyze`: Full learning analysis
- `npm run analyze:patterns`: Pattern mastery report
- `npm run analyze:constraints`: Constraint intuition report
- `npm run demo:insights`: Demonstration of insight system

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
