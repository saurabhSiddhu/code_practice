#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FileUtils = require('../src/utils/fileUtils');
const StringUtils = require('../src/utils/stringUtils');
const Logger = require('../src/utils/logger');

class AddInterviewNotes {
  constructor() {
    this.solutionsPath = path.resolve(__dirname, '../src/solutions');
  }

  extractInfoFromReadme(readmePath) {
    if (!fs.existsSync(readmePath)) {
      return {
        pattern: 'General',
        difficulty: 'Medium',
        title: ''
      };
    }

    const content = fs.readFileSync(readmePath, 'utf8');

    // Extract pattern from badge or content
    let pattern = 'General';
    const patternMatch = content.match(/Pattern-([^-]+)-/);
    if (patternMatch) {
      pattern = patternMatch[1].replace(/%20/g, ' ');
    }

    // Extract difficulty from badge or content
    let difficulty = 'Medium';
    const difficultyMatch = content.match(/LeetCode-(\w+)-/);
    if (difficultyMatch) {
      difficulty = difficultyMatch[1];
    }

    // Extract title
    let title = '';
    const titleMatch = content.match(/^# (.+)$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }

    return { pattern, difficulty, title };
  }

  createInterviewNotesFile(problemName, info) {
    const template = `# ${problemName} - Interview Notes

## 🔧 Pattern/Category
${info.pattern}

## 🔑 Key Insight
[Add the key insight that makes this problem click - the "aha" moment]

## 🧠 Intuition 
[Explain how you'd approach this problem naturally, before thinking about optimization]

## ⚠️ Common Mistake
- [Common mistake 1]
- [Common mistake 2]
- [Common mistake 3]

## 📋 Template/Pattern
\`\`\`javascript
// ${info.pattern} Pattern:
// 1. [Step 1]
// 2. [Step 2]
// 3. [Step 3]
// 4. [Step 4]
\`\`\`

## 🔄 Different Ways to Solve
1. **Approach 1**: [Description] - [Time/Space complexity]
2. **Approach 2**: [Description] - [Time/Space complexity]
3. **Approach 3**: [Description] - [Time/Space complexity]

## 🌍 Real World Analogies
- **Analogy 1**: [Relatable real-world comparison]
- **Analogy 2**: [Another way to think about it]
- **Analogy 3**: [Different perspective]

## 🔗 Similar Problems
- **Problem 1** - [Brief description of similarity]
- **Problem 2** - [Brief description of similarity]
- **Problem 3** - [Brief description of similarity]

## ❓ Follow-up Questions
- "What if [constraint change]?" → [Approach modification]
- "What if [data structure change]?" → [Different solution]
- "What if [requirement change]?" → [Alternative approach]
- "How would you [optimization question]?" → [Advanced technique]
`;

    return template;
  }

  run() {
    const problemDirs = fs
      .readdirSync(this.solutionsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    let created = 0;
    let skipped = 0;

    for (const problemName of problemDirs) {
      const problemPath = path.join(this.solutionsPath, problemName);
      const interviewNotesPath = path.join(problemPath, 'INTERVIEW_NOTES.md');
      const readmePath = path.join(problemPath, 'README.md');

      if (fs.existsSync(interviewNotesPath)) {
        Logger.info(`Skipping ${problemName} - INTERVIEW_NOTES.md already exists`);
        skipped++;
        continue;
      }

      // Extract info from README
      const info = this.extractInfoFromReadme(readmePath);

      // Create INTERVIEW_NOTES.md
      const content = this.createInterviewNotesFile(problemName, info);
      fs.writeFileSync(interviewNotesPath, content);

      Logger.success(`Created INTERVIEW_NOTES.md for ${problemName}`);
      created++;
    }

    Logger.info(`\nSummary:`);
    Logger.info(`- Created: ${created} files`);
    Logger.info(`- Skipped: ${skipped} files`);
    Logger.info(
      `\nNext steps: Fill out the template content for each problem's INTERVIEW_NOTES.md`
    );
  }
}

// Run the script
new AddInterviewNotes().run();
