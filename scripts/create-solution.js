#!/usr/bin/env node

const readline = require('readline');
const FileUtils = require('../src/utils/fileUtils');
const StringUtils = require('../src/utils/stringUtils');
const Logger = require('../src/utils/logger');
const Validator = require('../src/utils/validator');
const config = require('../src/config/index');

class CreateSolution {
  constructor() {
    this.args = process.argv.slice(2);
    this.solutionName = this.args[0];
    // Default to creating insights unless --no-insights is specified
    this.createInsights = !this.args.includes('--no-insights');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.problemInfo = {
      name: '',
      difficulty: '',
      pattern: '',
      problemStatement: '',
      leetcodeLink: '',
      tags: []
    };
  }

  validateSolutionName() {
    try {
      Validator.validateSolutionName(this.solutionName);
      this.solutionName = StringUtils.toKebabCase(this.solutionName);
      this.problemInfo.name = this.solutionName;

      if (FileUtils.fileExists(FileUtils.getSolutionPath(this.solutionName))) {
        throw new Error(`Solution '${this.solutionName}' already exists`);
      }
    } catch (error) {
      Logger.error(error.message);
      process.exit(1);
    }
  }

  async prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async gatherProblemInfo() {
    Logger.info("Let's gather some information about the problem:");

    this.problemInfo.difficulty = await this.prompt('Difficulty (Easy/Medium/Hard): ');
    Validator.validateDifficulty(this.problemInfo.difficulty);

    this.problemInfo.pattern = await this.prompt('Pattern (e.g., Two Pointers, Sliding Window): ');
    Validator.validatePattern(this.problemInfo.pattern);

    this.problemInfo.leetcodeLink = await this.prompt('LeetCode Problem Link: ');
    Validator.validateLeetCodeLink(this.problemInfo.leetcodeLink);

    const tagsInput = await this.prompt('Tags (comma-separated, e.g., Array, Hash Table): ');
    this.problemInfo.tags = tagsInput.split(',').map((tag) => tag.trim());
    Validator.validateTags(this.problemInfo.tags);

    Logger.info('Problem Statement (press Enter twice to finish):');
    let lines = [];
    while (true) {
      const line = await this.prompt('');
      if (line === '') {
        const nextLine = await this.prompt('');
        if (nextLine === '') break;
        lines.push(line);
        lines.push(nextLine);
      } else {
        lines.push(line);
      }
    }
    this.problemInfo.problemStatement = lines.join('\n');
    Validator.validateProblemStatement(this.problemInfo.problemStatement);
  }

  createSolutionFiles() {
    const variables = {
      name: this.solutionName,
      title: StringUtils.toTitleCase(this.solutionName),
      difficulty: this.problemInfo.difficulty,
      pattern: this.problemInfo.pattern,
      leetcodeLink: this.problemInfo.leetcodeLink,
      problemStatement: this.problemInfo.problemStatement,
      tags: StringUtils.formatTags(this.problemInfo.tags),
      difficultyColor: StringUtils.getDifficultyColor(this.problemInfo.difficulty)
    };

    try {
      // Create solution file
      const solutionContent = FileUtils.replaceTemplateVariables(
        FileUtils.getTemplate('class'),
        variables
      );
      FileUtils.writeFile(FileUtils.getSolutionFilePath(this.solutionName), solutionContent);
      Logger.success(`Created solution file: ${FileUtils.getSolutionFilePath(this.solutionName)}`);

      // Create test file
      const testContent = FileUtils.replaceTemplateVariables(
        FileUtils.getTemplate('test'),
        variables
      );
      FileUtils.writeFile(FileUtils.getTestFilePath(this.solutionName), testContent);
      Logger.success(`Created test file: ${FileUtils.getTestFilePath(this.solutionName)}`);

      // Create README file
      const readmeContent = FileUtils.replaceTemplateVariables(
        FileUtils.getTemplate('readme'),
        variables
      );
      FileUtils.writeFile(FileUtils.getReadmeFilePath(this.solutionName), readmeContent);
      Logger.success(`Created README file: ${FileUtils.getReadmeFilePath(this.solutionName)}`);

      // Create INSIGHTS file if requested
      if (this.createInsights) {
        const insightsContent = FileUtils.replaceTemplateVariables(
          FileUtils.getTemplate('insights'),
          {
            ...variables,
            keyInsight: '[Add the key insight that makes this problem click - the "aha" moment]',
            intuition:
              "[Explain how you'd approach this problem naturally, before thinking about optimization]",
            commonMistakes: `- [Common mistake 1]
- [Common mistake 2]
- [Common mistake 3]`,
            templateSteps: `// 1. [Step 1]
// 2. [Step 2]
// 3. [Step 3]
// 4. [Step 4]`,
            approaches: `1. **Approach 1**: [Description] - [Time/Space complexity]
2. **Approach 2**: [Description] - [Time/Space complexity]
3. **Approach 3**: [Description] - [Time/Space complexity]`,
            analogies: `- **Analogy 1**: [Relatable real-world comparison]
- **Analogy 2**: [Another way to think about it]
- **Analogy 3**: [Different perspective]`,
            similarProblems: `- **Problem 1** - [Brief description of similarity]
- **Problem 2** - [Brief description of similarity]
- **Problem 3** - [Brief description of similarity]`,
            followUpQuestions: `- "What if [constraint change]?" → [Approach modification]
- "What if [data structure change]?" → [Different solution]
- "What if [requirement change]?" → [Alternative approach]
- "How would you [optimization question]?" → [Advanced technique]`
          }
        );
        FileUtils.writeFile(FileUtils.getInsightsFilePath(this.solutionName), insightsContent);
        Logger.success(
          `Created INSIGHTS file: ${FileUtils.getInsightsFilePath(this.solutionName)}`
        );
      }
    } catch (error) {
      Logger.error(`Error creating files: ${error.message}`);
      process.exit(1);
    }
  }

  async createAnkiCards() {
    try {
      Logger.info('Generating Anki cards for the new solution...');
      const fs = require('fs');
      const path = require('path');

      const title = StringUtils.toTitleCase(this.solutionName);
      const ankiFilePath = path.join(
        FileUtils.getSolutionPath(this.solutionName),
        `${this.solutionName}-anki.md`
      );

      const content = `# 🎯 Anki Cards for ${title}

*Generated on: ${new Date().toLocaleDateString()}*

---

## 📚 Quick Reference

**Problem:** ${title}  
**Pattern:** ${this.problemInfo.pattern}  
**Difficulty:** ${this.problemInfo.difficulty}  
**LeetCode:** ${this.problemInfo.leetcodeLink}

---

## 🔧 Questions

**Q1:** What pattern does "${title}" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "${title}"?

**Q3:** What are the different approaches for "${title}" and their trade-offs?

**Q4:** What is the optimal code template for "${title}" pattern?

**Q5:** What are the common mistakes in "${title}"?

**Q6:** What is the time and space complexity of "${title}"?

**Q7:** How should I approach "${title}" in an interview?

**Q8:** What are the key optimization techniques for "${title}"?

**Q9:** What follow-up questions might be asked for "${title}"?

**Q10:** What similar problems share the same pattern as "${title}"?

---

## 🔧 Answers

**A1:** What pattern does "${title}" follow and when should I recognize it?

\`\`\`
Pattern: ${this.problemInfo.pattern}

Recognition Signals:
✅ [Fill in specific signals for this pattern]
✅ [Common input/output characteristics]
✅ [Key constraint patterns]

When to use: [Describe scenarios where this pattern applies]
\`\`\`

**A2:** What are the key insights and intuition for "${title}"?

\`\`\`
🧠 Key Insights:
💡 [Core insight 1 - The "aha" moment]
💡 [Core insight 2 - Why this approach works]
💡 [Core insight 3 - What makes it efficient]

🎯 Intuition:
- Natural approach: [How you'd think about it naturally]
- Mathematical insight: [Any math/logic behind it]
- Visual understanding: [How to visualize the problem]
- Real-world analogy: [Relatable comparison]

🔑 Mental Model:
[Simple way to remember and apply this pattern]
\`\`\`

**A3:** What are the different approaches for "${title}" and their trade-offs?

\`\`\`
Approach 1: [Brute Force/Naive]
├── Description: [Simple approach description]
├── Time: O(?) | Space: O(?)
├── Pros: [Advantages]
└── Cons: [Disadvantages]

Approach 2: [Optimized]
├── Description: [Better approach description]
├── Time: O(?) | Space: O(?)
├── Pros: [Advantages]
└── Cons: [Disadvantages]

Approach 3: [Optimal - ${this.problemInfo.pattern}]
├── Description: [Best approach description]
├── Time: O(?) | Space: O(?)
├── Pros: [Advantages]
└── Cons: [Disadvantages]

💡 Progression: Brute Force → Optimization → Optimal
\`\`\`

**A4:** What is the universal code template for solving "${title}"?

\`\`\`javascript
// Universal Problem-Solving Template for ${title}

function solve${title.replace(/\s+/g, '')}(input) {
    // 1. Input validation and edge cases
    if (!input || input.length === 0) {
        return []; // or appropriate default
    }
    
    // 2. Initialize data structures (adapt based on needs)
    const result = [];
    const memo = new Map(); // for memoization if needed
    const visited = new Set(); // for tracking if needed
    const queue = []; // for BFS if needed
    const stack = []; // for DFS if needed
    
    // 3. Helper function (customize based on problem)
    function helper(params) {
        // Base case
        if (baseCondition) {
            return baseValue;
        }
        
        // Main logic - adapt to your pattern:
        // • DP: Check memo, compute, store result
        // • BFS: Process level by level with queue
        // • DFS: Explore depth-first with recursion/stack
        // • Two Pointers: Move pointers based on conditions
        // • Sliding Window: Expand/contract window
        // • Greedy: Make locally optimal choice
        
        return result;
    }
    
    // 4. Main algorithm
    // [Implement your specific algorithm here]
    
    // 5. Return result
    return result;
}

// Key Adaptations by Pattern:
// • Dynamic Programming: Use memo for caching
// • Graph Traversal: Use visited set + queue/stack
// • Two Pointers: Use left/right indices  
// • Sliding Window: Use start/end pointers
// • Divide & Conquer: Break into subproblems
\`\`\`

**A5:** What are the common mistakes in "${title}"?

\`\`\`
Common Mistakes:
❌ [Mistake 1 - Description]
❌ [Mistake 2 - Description]  
❌ [Mistake 3 - Description]

Prevention:
✅ [How to avoid mistake 1]
✅ [How to avoid mistake 2]
✅ [How to avoid mistake 3]
\`\`\`

**A6:** What is the time and space complexity of "${title}"?

\`\`\`
Time Complexity: O(?)
- [Analysis of dominant operations]

Space Complexity: O(?)
- [Analysis of auxiliary space used]

Trade-offs: [Any time vs space trade-offs available]
\`\`\`

**A7:** How should I approach "${title}" in an interview?

\`\`\`
Interview Strategy:

Phase 1: Clarification (2-3 min)
- Ask about [specific constraints for this problem type]
- Clarify [edge cases relevant to this pattern]

Phase 2: Approach (3-5 min)
- "I recognize this as a ${this.problemInfo.pattern} problem"
- Explain the [key insight/approach]
- Discuss complexity trade-offs

Phase 3: Implementation (15-20 min)
- Start with [basic structure]
- Handle [main algorithm]
- Add [edge case handling]

Phase 4: Testing & Optimization (5 min)
- Test with [specific test cases]
- Discuss [optimization opportunities]
\`\`\`

**A8:** What are the key optimization techniques for "${title}"?

\`\`\`
Optimization Techniques:
🔧 [Technique 1] - [Description and benefit]
🔧 [Technique 2] - [Description and benefit]
🔧 [Technique 3] - [Description and benefit]

Advanced: [Any advanced optimizations for this pattern]
\`\`\`

**A9:** What follow-up questions might be asked for "${title}"?

\`\`\`
Follow-up Questions:
- "What if [constraint change]?" → [How approach changes]
- "What if [input modification]?" → [Algorithm adaptation]
- "How would you [scale/optimize]?" → [System design considerations]
- "What if [edge case]?" → [Handling strategy]
\`\`\`

**A10:** What similar problems share the same pattern as "${title}"?

\`\`\`
Similar Problems (${this.problemInfo.pattern} pattern):
- [Problem 1] - [Brief description of similarity]
- [Problem 2] - [Brief description of similarity]
- [Problem 3] - [Brief description of similarity]

Pattern Template: [Generic approach for this pattern type]
\`\`\`

---

## 📊 Study Schedule

### Daily (Days 1-3):
- Q1: Pattern Recognition
- Q3: Common Mistakes  
- Q5: Interview Strategy

### Weekly (Days 4-14):
- Q2: Optimal Approach
- Q4: Complexity Analysis
- Q6: Optimization Techniques

### Monthly (Days 15+):
- Q7: Follow-up Questions
- Q8: Similar Problems
- Review and refine all answers

---

## 🎯 Success Metrics

Track your mastery:
- ✅ **Pattern Recognition**: Identify in <30 seconds
- ✅ **Approach**: Explain optimal solution clearly  
- ✅ **Implementation**: Code without major bugs
- ✅ **Complexity**: Analyze time/space correctly
- ✅ **Interview Ready**: Handle follow-ups confidently

*This Anki deck builds pattern recognition and interview confidence!* 🚀
`;

      FileUtils.writeFile(ankiFilePath, content);
      Logger.success(`Created Anki cards: ${ankiFilePath}`);
    } catch (error) {
      Logger.warn(`Could not generate Anki cards: ${error.message}`);
      // Don't fail the entire solution creation process
    }
  }

  async run() {
    try {
      this.validateSolutionName();
      await this.gatherProblemInfo();

      if (!Validator.validateAll(this.problemInfo)) {
        process.exit(1);
      }

      this.createSolutionFiles();

      // Auto-generate Anki cards for the new solution
      await this.createAnkiCards();

      Logger.success(`Solution '${this.solutionName}' created successfully`);
      Logger.info('\nNext steps:');
      Logger.info(
        `1. Implement your solution in src/solutions/${this.solutionName}/${this.solutionName}.js`
      );
      Logger.info(
        `2. Add test cases in src/solutions/${this.solutionName}/${this.solutionName}.test.js`
      );
      Logger.info('3. Update the README.md with solution approach and complexity analysis');
      if (this.createInsights) {
        Logger.info('4. Fill in the INSIGHTS.md with interview preparation notes');
        Logger.info(`5. Customize the Anki cards in ${this.solutionName}-anki.md`);
        Logger.info(`6. Run tests with npm test ${this.solutionName}`);
      } else {
        Logger.info(`4. Customize the Anki cards in ${this.solutionName}-anki.md`);
        Logger.info(`5. Run tests with npm test ${this.solutionName}`);
        Logger.info(
          `6. Create insights later with: node scripts/create-insights.js ${this.solutionName}`
        );
      }
    } catch (error) {
      Logger.error(`Error creating solution: ${error.message}`);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }
}

// Run the script
new CreateSolution().run();
