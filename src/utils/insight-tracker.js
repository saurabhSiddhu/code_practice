/**
 * Insight Tracker - Capture and build mental models after each problem
 *
 * This system helps you extract maximum learning from every coding problem
 * by systematically capturing insights about mental models, constraints, and patterns.
 */

const fs = require('fs');
const path = require('path');

class InsightTracker {
  constructor() {
    this.insightsDir = path.join(__dirname, '../../insights');
    this.ensureInsightsDirectory();
  }

  ensureInsightsDirectory() {
    if (!fs.existsSync(this.insightsDir)) {
      fs.mkdirSync(this.insightsDir, { recursive: true });
    }

    // Create subdirectories for different types of insights
    const subdirs = [
      'mental-models',
      'constraint-patterns',
      'pattern-evolution',
      'problem-connections'
    ];
    subdirs.forEach((dir) => {
      const dirPath = path.join(this.insightsDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
  }

  /**
   * Capture insights after solving a problem
   */
  async captureInsights(problemName) {
    console.log(`\n🧠 Time to extract insights from: ${problemName}`);
    console.log('='.repeat(60));

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

    try {
      const insights = {
        problemName,
        date: new Date().toISOString().split('T')[0],
        mentalModel: {},
        constraintIntuition: {},
        patternUnderstanding: {},
        connections: {},
        futureApplication: {}
      };

      // 1. Mental Model Capture
      console.log('\n🎯 MENTAL MODEL EXTRACTION');
      console.log('Think about the core reasoning that made this problem "click"');

      insights.mentalModel.coreInsight = await prompt(
        '\n1. What was the KEY INSIGHT that unlocked this problem? (1 sentence): '
      );
      insights.mentalModel.intuition = await prompt(
        "2. How would you explain the intuition to someone who's never seen this? "
      );
      insights.mentalModel.analogyOrVisualization = await prompt(
        '3. What real-world analogy or mental picture helps you remember this? '
      );
      insights.mentalModel.commonMistake = await prompt(
        "4. What's the most common mistake someone would make on this problem? "
      );

      // 2. Constraint Analysis
      console.log('\n⚡ CONSTRAINT INTUITION BUILDING');
      console.log('Focus on how constraints shaped your solution choice');

      insights.constraintIntuition.criticalConstraint = await prompt(
        '\n1. Which constraint was MOST important in choosing your approach? '
      );
      insights.constraintIntuition.scalabilityBreakpoint = await prompt(
        '2. At what input size would your solution start to struggle? '
      );
      insights.constraintIntuition.alternativeApproach = await prompt(
        '3. If the constraint changed, what different approach would you use? '
      );
      insights.constraintIntuition.constraintPattern = await prompt(
        '4. What general constraint pattern does this represent? (e.g., "tight memory", "huge input") '
      );

      // 3. Pattern Understanding
      console.log('\n🔍 PATTERN EVOLUTION');
      console.log('How does this deepen your understanding of the pattern family?');

      insights.patternUnderstanding.patternName = await prompt(
        '\n1. What pattern family does this belong to? '
      );
      insights.patternUnderstanding.patternVariation = await prompt(
        '2. How is this a variation of the standard pattern? '
      );
      insights.patternUnderstanding.recognitionTrigger = await prompt(
        '3. What would make you recognize this pattern faster next time? '
      );
      insights.patternUnderstanding.patternEvolution = await prompt(
        '4. How has your understanding of this pattern evolved? '
      );

      // 4. Problem Connections
      console.log('\n🔗 BUILDING CONNECTIONS');
      console.log('Connect this to your existing knowledge web');

      insights.connections.similarProblems = await prompt(
        '\n1. What 2-3 problems does this remind you of? '
      );
      insights.connections.keyDifference = await prompt(
        "2. What's the key difference that makes this unique? "
      );
      insights.connections.sharedPrinciple = await prompt(
        '3. What underlying principle connects all these problems? '
      );

      // 5. Future Application
      console.log('\n🚀 FUTURE APPLICATION');
      console.log('How will this help you in future problems?');

      insights.futureApplication.recognitionSignal = await prompt(
        '\n1. What signal would make you think "this is like that problem I solved"? '
      );
      insights.futureApplication.applicableScenarios = await prompt(
        '2. What types of problems could you apply this insight to? '
      );
      insights.futureApplication.teaching = await prompt(
        '3. How would you teach this insight to someone else? '
      );

      // Save the insights
      await this.saveInsights(insights);
      await this.updateKnowledgeGraphs(insights);

      console.log(`\n✅ Insights captured! Check /insights/ folder for your knowledge building.`);
    } finally {
      rl.close();
    }
  }

  /**
   * Save insights to structured files
   */
  async saveInsights(insights) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Save detailed insights (JSON)
    const insightFile = path.join(this.insightsDir, `${insights.problemName}-${timestamp}.json`);
    fs.writeFileSync(insightFile, JSON.stringify(insights, null, 2));

    // Generate human-readable Markdown summary
    await this.generateMarkdownSummary(insights, timestamp);

    // Update mental models database
    await this.updateMentalModelsDB(insights);

    // Update constraint patterns database
    await this.updateConstraintPatternsDB(insights);

    // Update pattern evolution tracker
    await this.updatePatternEvolutionDB(insights);
  }

  /**
   * Update mental models database
   */
  async updateMentalModelsDB(insights) {
    const modelsFile = path.join(this.insightsDir, 'mental-models', 'models-database.json');

    let modelsDB = {};
    if (fs.existsSync(modelsFile)) {
      modelsDB = JSON.parse(fs.readFileSync(modelsFile, 'utf8'));
    }

    const modelKey = insights.mentalModel.coreInsight.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (!modelsDB[modelKey]) {
      modelsDB[modelKey] = {
        coreInsight: insights.mentalModel.coreInsight,
        problems: [],
        analogies: [],
        commonMistakes: []
      };
    }

    modelsDB[modelKey].problems.push({
      name: insights.problemName,
      date: insights.date,
      intuition: insights.mentalModel.intuition
    });

    if (insights.mentalModel.analogyOrVisualization) {
      modelsDB[modelKey].analogies.push(insights.mentalModel.analogyOrVisualization);
    }

    if (insights.mentalModel.commonMistake) {
      modelsDB[modelKey].commonMistakes.push(insights.mentalModel.commonMistake);
    }

    fs.writeFileSync(modelsFile, JSON.stringify(modelsDB, null, 2));
  }

  /**
   * Update constraint patterns database
   */
  async updateConstraintPatternsDB(insights) {
    const constraintsFile = path.join(
      this.insightsDir,
      'constraint-patterns',
      'constraints-database.json'
    );

    let constraintsDB = {};
    if (fs.existsSync(constraintsFile)) {
      constraintsDB = JSON.parse(fs.readFileSync(constraintsFile, 'utf8'));
    }

    const patternKey = insights.constraintIntuition.constraintPattern
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');

    if (!constraintsDB[patternKey]) {
      constraintsDB[patternKey] = {
        pattern: insights.constraintIntuition.constraintPattern,
        problems: [],
        solutions: []
      };
    }

    constraintsDB[patternKey].problems.push({
      name: insights.problemName,
      date: insights.date,
      criticalConstraint: insights.constraintIntuition.criticalConstraint,
      breakpoint: insights.constraintIntuition.scalabilityBreakpoint,
      alternative: insights.constraintIntuition.alternativeApproach
    });

    fs.writeFileSync(constraintsFile, JSON.stringify(constraintsDB, null, 2));
  }

  /**
   * Update pattern evolution tracker
   */
  async updatePatternEvolutionDB(insights) {
    const evolutionFile = path.join(
      this.insightsDir,
      'pattern-evolution',
      'evolution-tracker.json'
    );

    let evolutionDB = {};
    if (fs.existsSync(evolutionFile)) {
      evolutionDB = JSON.parse(fs.readFileSync(evolutionFile, 'utf8'));
    }

    const patternName = insights.patternUnderstanding.patternName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');

    if (!evolutionDB[patternName]) {
      evolutionDB[patternName] = {
        patternName: insights.patternUnderstanding.patternName,
        timeline: [],
        variations: [],
        recognitionTriggers: []
      };
    }

    evolutionDB[patternName].timeline.push({
      date: insights.date,
      problem: insights.problemName,
      variation: insights.patternUnderstanding.patternVariation,
      evolution: insights.patternUnderstanding.patternEvolution,
      trigger: insights.patternUnderstanding.recognitionTrigger
    });

    // Add to arrays if not already present
    if (
      !evolutionDB[patternName].variations.includes(insights.patternUnderstanding.patternVariation)
    ) {
      evolutionDB[patternName].variations.push(insights.patternUnderstanding.patternVariation);
    }
    if (
      !evolutionDB[patternName].recognitionTriggers.includes(
        insights.patternUnderstanding.recognitionTrigger
      )
    ) {
      evolutionDB[patternName].recognitionTriggers.push(
        insights.patternUnderstanding.recognitionTrigger
      );
    }

    fs.writeFileSync(evolutionFile, JSON.stringify(evolutionDB, null, 2));
  }

  /**
   * Update knowledge graphs and connections
   */
  async updateKnowledgeGraphs(insights) {
    const connectionsFile = path.join(
      this.insightsDir,
      'problem-connections',
      'knowledge-graph.json'
    );

    let graph = { nodes: {}, edges: [] };
    if (fs.existsSync(connectionsFile)) {
      graph = JSON.parse(fs.readFileSync(connectionsFile, 'utf8'));
    }

    // Add current problem as node
    graph.nodes[insights.problemName] = {
      name: insights.problemName,
      date: insights.date,
      pattern: insights.patternUnderstanding.patternName,
      coreInsight: insights.mentalModel.coreInsight,
      constraintPattern: insights.constraintIntuition.constraintPattern
    };

    // Add connections to similar problems
    if (insights.connections.similarProblems) {
      const similarProblems = insights.connections.similarProblems.split(',').map((p) => p.trim());
      similarProblems.forEach((similarProblem) => {
        if (similarProblem) {
          graph.edges.push({
            from: insights.problemName,
            to: similarProblem,
            relationship: 'similar',
            sharedPrinciple: insights.connections.sharedPrinciple,
            keyDifference: insights.connections.keyDifference
          });
        }
      });
    }

    fs.writeFileSync(connectionsFile, JSON.stringify(graph, null, 2));
  }

  /**
   * Generate insight summary for a problem
   */
  generateInsightSummary(problemName) {
    const insightFiles = fs
      .readdirSync(this.insightsDir)
      .filter((file) => file.startsWith(problemName) && file.endsWith('.json'));

    if (insightFiles.length === 0) {
      console.log(`No insights found for ${problemName}`);
      return;
    }

    const latestInsight = insightFiles.sort().reverse()[0];
    const insightPath = path.join(this.insightsDir, latestInsight);
    const insights = JSON.parse(fs.readFileSync(insightPath, 'utf8'));

    console.log(`\n🧠 INSIGHT SUMMARY: ${problemName}`);
    console.log('='.repeat(50));
    console.log(`🎯 Core Insight: ${insights.mentalModel.coreInsight}`);
    console.log(`⚡ Key Constraint: ${insights.constraintIntuition.criticalConstraint}`);
    console.log(`🔍 Pattern: ${insights.patternUnderstanding.patternName}`);
    console.log(`🔗 Recognition Trigger: ${insights.futureApplication.recognitionSignal}`);
  }

  /**
   * Quick review of recent insights
   */
  reviewRecentInsights(days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentInsights = fs
      .readdirSync(this.insightsDir)
      .filter(
        (file) =>
          file.endsWith('.json') &&
          !file.includes('database') &&
          !file.includes('tracker') &&
          !file.includes('graph')
      )
      .map((file) => {
        const filePath = path.join(this.insightsDir, file);
        const insight = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return { file, insight, date: new Date(insight.date) };
      })
      .filter((item) => item.date >= cutoffDate)
      .sort((a, b) => b.date - a.date);

    console.log(`\n📚 RECENT INSIGHTS (Last ${days} days)`);
    console.log('='.repeat(50));

    recentInsights.forEach(({ insight }) => {
      console.log(`\n🧩 ${insight.problemName} (${insight.date})`);
      console.log(`   💡 ${insight.mentalModel.coreInsight}`);
      console.log(
        `   🎯 ${insight.patternUnderstanding.patternName}: ${insight.patternUnderstanding.patternVariation}`
      );
    });

    if (recentInsights.length === 0) {
      console.log('No recent insights found. Time to solve some problems! 🚀');
    }
  }

  /**
   * Generate human-readable Markdown summary
   */
  async generateMarkdownSummary(insights, timestamp) {
    const markdownContent = this.createMarkdownContent(insights);

    // Save in solution folder for easy access
    const solutionDir = path.join(__dirname, '..', 'solutions', insights.problemName);
    const solutionMdFile = path.join(solutionDir, 'insights.md');

    // Create solution directory if it doesn't exist
    if (fs.existsSync(solutionDir)) {
      fs.writeFileSync(solutionMdFile, markdownContent);
      console.log(`📝 Generated insights: src/solutions/${insights.problemName}/insights.md`);
    } else {
      console.log(`⚠️  Solution directory not found: ${solutionDir}`);
      // Fallback to insights directory
      const fallbackFile = path.join(this.insightsDir, `${insights.problemName}-insights.md`);
      fs.writeFileSync(fallbackFile, markdownContent);
      console.log(`📝 Generated insights (fallback): insights/${insights.problemName}-insights.md`);
    }

    // Update consolidated insights summary
    await this.updateConsolidatedMarkdown(insights);
  }

  /**
   * Create formatted Markdown content for insights
   */
  createMarkdownContent(insights) {
    // Handle both old and new date formats
    let date;
    if (insights.date) {
      date = new Date(insights.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else if (insights.timestamp) {
      date = new Date(insights.timestamp).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      date = 'Date not available';
    }

    // Handle different insight structures (old vs new format)
    const getPatternName = () => {
      if (insights.patternUnderstanding?.patternName) {
        return insights.patternUnderstanding.patternName;
      } else if (insights.patternEvolution?.patternFamily) {
        return insights.patternEvolution.patternFamily;
      }
      return 'Not categorized';
    };

    const getCoreInsight = () => {
      if (insights.mentalModel?.coreInsight) {
        return insights.mentalModel.coreInsight;
      } else if (insights.mentalModel?.keyInsight) {
        return insights.mentalModel.keyInsight;
      }
      return 'Not provided';
    };

    const getConstraintPattern = () => {
      if (insights.constraintIntuition?.constraintPattern) {
        return insights.constraintIntuition.constraintPattern;
      }
      return 'Not categorized';
    };

    const getSimilarProblems = () => {
      if (insights.connections?.similarProblems) {
        return insights.connections.similarProblems;
      } else if (insights.problemConnections?.similarProblems) {
        return Array.isArray(insights.problemConnections.similarProblems)
          ? insights.problemConnections.similarProblems.join(', ')
          : insights.problemConnections.similarProblems;
      }
      return 'None identified';
    };

    const getRecognitionSignal = () => {
      if (insights.futureApplication?.recognitionSignal) {
        return insights.futureApplication.recognitionSignal;
      }
      return 'Not defined';
    };

    return `# 🧠 ${insights.problemName.toUpperCase()} - Insights

> **Solved on:** ${date}

## 🎯 Mental Model

### Core Breakthrough
**${getCoreInsight()}**

### Intuitive Explanation
${insights.mentalModel?.intuition || insights.mentalModel?.analogy || 'Not provided'}

### Mental Picture/Analogy
${insights.mentalModel?.analogyOrVisualization || insights.mentalModel?.analogy || 'Not provided'}

### Common Pitfall to Avoid
${insights.mentalModel?.commonMistake || 'Not provided'}

---

## ⚡ Constraint Analysis

### Critical Constraint
**${insights.constraintIntuition?.criticalConstraint || 'Not specified'}**

### Scalability Considerations
- **Breaking point:** ${insights.constraintIntuition?.scalabilityBreakpoint || insights.constraintIntuition?.scalingLimit || 'Not analyzed'}
- **Alternative approach:** ${insights.constraintIntuition?.alternativeApproach || 'Not provided'}
- **Pattern:** ${getConstraintPattern()}

---

## 🔍 Pattern Understanding

### Pattern Family
**${getPatternName()}**

### This Variation
${insights.patternUnderstanding?.patternVariation || insights.patternEvolution?.variation || 'Not specified'}

### Recognition Trigger
${insights.patternUnderstanding?.recognitionTrigger || insights.patternEvolution?.recognitionSignals || 'Not defined'}

### Understanding Evolution
${insights.patternUnderstanding?.patternEvolution || insights.patternEvolution?.evolutionInsight || 'Not documented'}

---

## 🔗 Problem Connections

### Similar Problems
${getSimilarProblems()}

### Key Differentiator
${insights.connections?.keyDifference || insights.problemConnections?.uniqueDifference || 'Not specified'}

### Underlying Principle
${insights.connections?.sharedPrinciple || insights.problemConnections?.underlyingPrinciple || 'Not identified'}

---

## 🚀 Future Application

### Recognition Signal
**${getRecognitionSignal()}**

### Applicable Scenarios
${insights.futureApplication?.applicableScenarios || insights.futureApplication?.applicableTo || 'Not specified'}

### Teaching Strategy
${insights.futureApplication?.teaching || insights.futureApplication?.teachingMethod || 'Not provided'}

---

## 📊 Metadata

- **Date Captured:** ${insights.date || insights.timestamp || 'Not available'}
- **Problem:** ${insights.problemName}
- **Pattern:** ${getPatternName()}
- **Difficulty Level:** [Add manually if needed]

---

*Generated by Mental Model Building System 🧠*
`;
  }

  /**
   * Update consolidated insights summary
   */
  async updateConsolidatedMarkdown(insights) {
    const summaryFile = path.join(this.insightsDir, 'INSIGHTS_SUMMARY.md');

    let existingContent = '';
    if (fs.existsSync(summaryFile)) {
      existingContent = fs.readFileSync(summaryFile, 'utf8');
    }

    // Create header if file doesn't exist
    if (!existingContent) {
      existingContent = `# 🧠 Coding Insights Summary

This document contains a chronological summary of all problem insights captured.

## 📚 Recent Insights

`;
    }

    // Handle different date formats
    let date;
    if (insights.date) {
      date = new Date(insights.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else if (insights.timestamp) {
      date = new Date(insights.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else {
      date = 'Invalid Date';
    }

    // Handle different insight structures
    const getCoreInsight = () => {
      if (insights.mentalModel?.coreInsight) {
        return insights.mentalModel.coreInsight;
      } else if (insights.mentalModel?.keyInsight) {
        return insights.mentalModel.keyInsight;
      }
      return 'Not provided';
    };

    const getPatternName = () => {
      if (insights.patternUnderstanding?.patternName) {
        return insights.patternUnderstanding.patternName;
      } else if (insights.patternEvolution?.patternFamily) {
        return insights.patternEvolution.patternFamily;
      }
      return 'Uncategorized';
    };

    const getRecognitionSignal = () => {
      if (insights.futureApplication?.recognitionSignal) {
        return insights.futureApplication.recognitionSignal;
      }
      return 'Not defined';
    };

    const newEntry = `
### ${insights.problemName} (${date})
- **🎯 Core Insight:** ${getCoreInsight()}
- **⚡ Key Constraint:** ${insights.constraintIntuition?.criticalConstraint || 'Not specified'}
- **🔍 Pattern:** ${getPatternName()}
- **🔗 Recognition:** ${getRecognitionSignal()}
- **📄 Details:** [src/solutions/${insights.problemName}/insights.md](../src/solutions/${insights.problemName}/insights.md)

`;

    // Insert new entry after the "Recent Insights" header
    const insertPoint =
      existingContent.indexOf('## 📚 Recent Insights') + '## 📚 Recent Insights'.length + 1;
    const updatedContent =
      existingContent.slice(0, insertPoint) + newEntry + existingContent.slice(insertPoint);

    fs.writeFileSync(summaryFile, updatedContent);
  }
}

module.exports = InsightTracker;
