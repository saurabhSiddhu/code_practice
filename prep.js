#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AlgorithmPracticeCenter {
  constructor() {
    this.baseDir = process.cwd();
    this.args = process.argv.slice(2);
    this.command = this.args[0];
    this.paths = {
      solutions: path.join(this.baseDir, 'src', 'solutions')
    };
  }

  showHelp() {
    console.log(`
🧮 ALGORITHM PRACTICE
====================

🚀 CORE COMMANDS:
  solve <problem>     - Create & solve problem
  test <problem>      - Test your solution  
  notes <problem>     - Interview insights (pattern, similar problems, follow-ups)
  dashboard          - Track progress

💡 EXAMPLES:
  node prep.js solve two-sum         # Setup problem
  node prep.js test two-sum          # Run tests
  node prep.js notes two-sum         # Capture insights & patterns
  node prep.js dashboard             # Check progress
`);
  }

  async executeCommand() {
    try {
      switch (this.command) {
        case 'solve':
          await this.solveProblem();
          break;
        case 'test':
          await this.testProblem();
          break;
        case 'dashboard':
          await this.showDashboard();
          break;
        case 'notes':
          await this.captureNotes();
          break;
        default:
          this.showHelp();
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      process.exit(1);
    }
  }

  async solveProblem() {
    const problemName = this.args[1];
    if (!problemName) {
      console.log('❌ Please specify a problem name');
      console.log('💡 Example: node prep.js solve two-sum');
      return;
    }

    console.log(`🚀 Setting up problem: ${problemName}`);
    const problemDir = path.join(this.paths.solutions, problemName);

    // Create problem if it doesn't exist
    if (!fs.existsSync(problemDir)) {
      console.log(`📝 Creating new problem: ${problemName}`);
      this._createProblemStructure(problemDir, problemName);
    }

    // Open in VS Code
    console.log('🎯 Opening in VS Code...');
    this._openInEditor(problemDir);

    console.log('\n✅ Ready to code! Next steps:');
    console.log(`   🧪 Test: node prep.js test ${problemName}`);
    console.log(`   📊 Check progress: node prep.js dashboard`);
  }

  _createProblemStructure(problemDir, problemName) {
    fs.mkdirSync(problemDir, { recursive: true });

    const solution = `/**
 * Problem: ${problemName}
 * 
 * @param {any} input - Problem input
 * @return {any} - Solution output
 */
function solve(input) {
    // TODO: Implement your solution here
    return null;
}

module.exports = { solve };
`;

    const test = `const { solve } = require('./${problemName}');

const testCases = [
    {
        input: null,
        expected: null,
        description: "Basic test case"
    }
];

function runTests() {
    console.log('🧪 Testing ${problemName}...');
    
    testCases.forEach((testCase, index) => {
        const result = solve(testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        console.log(\`Test \${index + 1}: \${passed ? '✅' : '❌'} \${testCase.description}\`);
        if (!passed) {
            console.log(\`  Expected: \${testCase.expected}\`);
            console.log(\`  Got: \${result}\`);
        }
    });
}

if (require.main === module) {
    runTests();
}

module.exports = { testCases, runTests };
`;

    const readme = `# ${problemName}

## Problem Description
TODO: Add problem description here

## Approach
TODO: Describe your approach

## Complexity
- Time: O(?)
- Space: O(?)
`;

    fs.writeFileSync(path.join(problemDir, `${problemName}.js`), solution);
    fs.writeFileSync(path.join(problemDir, `${problemName}.test.js`), test);
    fs.writeFileSync(path.join(problemDir, 'README.md'), readme);
  }

  _openInEditor(problemDir) {
    try {
      execSync(`code "${problemDir}" --new-window`, { stdio: 'inherit' });
      console.log('✅ VS Code opened successfully!');
      return true;
    } catch (error) {
      console.log('⚠️  VS Code CLI not available. Trying Finder...');
      try {
        execSync(`open "${problemDir}"`, { stdio: 'inherit' });
        console.log('✅ Directory opened in Finder');
        console.log('💡 Install VS Code CLI: Cmd+Shift+P → "Shell Command: Install code"');
        return true;
      } catch (finderError) {
        console.log(`📁 Problem files at: ${problemDir}`);
        console.log('💡 Please open this directory in your preferred editor');
        return false;
      }
    }
  }

  async testProblem() {
    const problemName = this.args[1];
    if (!problemName) {
      console.log('❌ Please specify a problem name');
      console.log('💡 Example: node prep.js test two-sum');
      return;
    }

    const problemDir = path.join(this.paths.solutions, problemName);
    if (!fs.existsSync(problemDir)) {
      console.log(`❌ Problem '${problemName}' not found`);
      console.log(`💡 Create it first: node prep.js solve ${problemName}`);
      return;
    }

    console.log(`🧪 Testing ${problemName}...`);

    try {
      execSync(`npm test ${problemName}`, { stdio: 'inherit' });
      console.log('\n✅ Tests passed!');
      console.log(`💡 Capture insights: node prep.js notes ${problemName}`);
    } catch (error) {
      console.log('\n💡 Fix the issues and test again.');
    }
  }

  async showDashboard() {
    console.log('📊 ALGORITHM PRACTICE DASHBOARD');
    console.log('===============================');

    const stats = this._getStats();

    console.log(`📝 Problems Solved: ${stats.problemCount}`);
    console.log(`📅 Recent Problems: ${stats.recentProblems.slice(0, 3).join(', ') || 'None yet'}`);

    console.log('\n💡 RECOMMENDATIONS:');
    if (stats.problemCount < 5) {
      console.log('  🎯 Focus: Master the fundamentals');
      console.log('  📚 Try: two-sum, valid-parentheses, merge-two-lists');
    } else if (stats.problemCount < 20) {
      console.log('  🎯 Focus: Build pattern recognition');
      console.log('  📚 Try: longest-substring, container-water, binary-search');
    } else {
      console.log('  🎯 Focus: Hard problems and optimization');
      console.log('  📚 Try: trapping-rain-water, merge-k-lists, word-ladder');
    }

    console.log('\n🚀 NEXT ACTIONS:');
    console.log('   • Solve new problems: node prep.js solve <problem>');
    console.log('   • Review solved problems');
  }

  _getStats() {
    const problemDirs = fs.existsSync(this.paths.solutions)
      ? fs
          .readdirSync(this.paths.solutions)
          .filter((dir) => fs.statSync(path.join(this.paths.solutions, dir)).isDirectory())
      : [];

    return {
      problemCount: problemDirs.length,
      recentProblems: problemDirs.slice(-5).reverse()
    };
  }

  async captureNotes() {
    const problemName = this.args[1];
    if (!problemName) {
      console.log('❌ Please specify a problem name');
      console.log('💡 Example: node prep.js notes two-sum');
      return;
    }

    const problemDir = path.join(this.paths.solutions, problemName);
    if (!fs.existsSync(problemDir)) {
      console.log(`❌ Problem '${problemName}' not found`);
      return;
    }

    console.log(`📝 Interview-focused insights for: ${problemName}`);
    console.log('🎯 Focus on what will help you in future interviews!\n');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = (question) =>
      new Promise((resolve) => {
        rl.question(question, resolve);
      });

    try {
      console.log('📚 INTERVIEW INSIGHTS (press ENTER to skip any):');

      const pattern = await prompt(
        '\n🔧 PATTERN - What pattern/category is this? (e.g., Two Pointers, Sliding Window): '
      );
      const keyInsight = await prompt('🔑 KEY INSIGHT - What made this problem click? ');
      const intuition = await prompt('🧠 INTUITION - How do you think about this problem type? ');
      const commonMistake = await prompt('⚠️  COMMON MISTAKE - What do people mess up here? ');
      const template = await prompt("📋 TEMPLATE - What's the reusable pattern/approach? ");
      const differentWays = await prompt(
        '🔄 DIFFERENT WAYS - List other approaches to solve this: '
      );
      const analogies = await prompt('🌍 REAL WORLD ANALOGIES - Concrete examples to remember: ');
      const similarProblems = await prompt(
        '🔗 SIMILAR PROBLEMS - Related problems that use same pattern: '
      );
      const followUps = await prompt(
        '❓ FOLLOW-UP QUESTIONS - What variations might interviewer ask: '
      );
      const timeSpace = await prompt('📊 COMPLEXITY - Time/Space (O(?) format): ');

      // Create comprehensive notes file
      const notesPath = path.join(problemDir, 'INTERVIEW_NOTES.md');
      const notes = `# ${problemName} - Interview Notes

## 🔧 Pattern/Category
${pattern || 'Identify the algorithmic pattern (e.g., Two Pointers, Sliding Window, DP, etc.)'}

## 🔑 Key Insight
${keyInsight || 'Think about what made this problem suddenly make sense. What was the breakthrough?'}

## 🧠 Intuition 
${intuition || 'How should you think about problems like this? What mental model works?'}

## ⚠️ Common Mistake
${commonMistake || 'What do most people get wrong? What should you watch out for?'}

## 📋 Template/Pattern
${template || "What's the reusable approach for similar problems?"}
\`\`\`
// Template structure:
// 1. 
// 2. 
// 3. 
\`\`\`

## 🔄 Different Ways to Solve
${differentWays || 'List alternative approaches: brute force, optimized, different algorithms, etc.'}

## 🌍 Real World Analogies
${analogies || 'Concrete real-world examples that help remember the pattern (e.g., "like finding parking spots")'}

## 🔗 Similar Problems
${similarProblems || 'List related problems that use the same pattern or technique'}

## ❓ Follow-up Questions
${followUps || 'What variations or extensions might the interviewer ask?'}

## 📊 Complexity
- **Time**: ${timeSpace ? timeSpace.split(',')[0] || timeSpace : 'O(?)'}
- **Space**: ${timeSpace ? timeSpace.split(',')[1] || 'O(?)' : 'O(?)'}

## 🎯 Interview Tips
- Key things to mention when explaining this solution
- Edge cases to discuss  
- Follow-up questions interviewer might ask

## 📅 Solved On
${new Date().toLocaleDateString()}

---
*These notes will help you recognize and solve similar problems in interviews*
`;

      fs.writeFileSync(notesPath, notes);
      console.log('\n✅ Interview insights captured!');
      console.log(`📁 Saved to: ${notesPath}`);
      console.log(
        '\n🎯 Pro tip: Review these notes before interviews to strengthen pattern recognition!'
      );
    } catch (error) {
      console.log('\n❌ Note capture cancelled');
    } finally {
      rl.close();
    }
  }
}

// Run the command center
if (require.main === module) {
  const center = new AlgorithmPracticeCenter();
  center.executeCommand();
}

module.exports = AlgorithmPracticeCenter;
