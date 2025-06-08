#!/usr/bin/env node

/**
 * Insight Capture CLI
 * Run this after solving any problem to capture and build your mental models
 *
 * Usage:
 *   node scripts/capture-insights.js <problem-name>
 *   npm run insights <problem-name>
 */

const InsightTracker = require('../src/utils/insight-tracker');
const path = require('path');

class InsightCLI {
  constructor() {
    this.tracker = new InsightTracker();
    this.args = process.argv.slice(2);
  }

  showUsage() {
    console.log(`
🧠 INSIGHT TRACKER - Build Your Mental Models

Usage:
  node scripts/capture-insights.js <problem-name>    # Capture insights for a problem
  node scripts/capture-insights.js --review          # Review recent insights
  node scripts/capture-insights.js --summary <name>  # Show insight summary for problem

Examples:
  node scripts/capture-insights.js two-sum
  node scripts/capture-insights.js --review
  node scripts/capture-insights.js --summary climbing-stairs

The key to becoming an exceptional coder is extracting maximum learning
from every problem. This tool helps you build:

🎯 Stronger Mental Models - The "why" behind solutions
⚡ Better Constraint Intuition - Pattern recognition from constraints  
🔍 Deeper Pattern Understanding - How patterns evolve and connect
🔗 Problem Connections - Building your knowledge graph

Make this a habit after every problem!
        `);
  }

  async run() {
    if (this.args.length === 0 || this.args.includes('--help') || this.args.includes('-h')) {
      this.showUsage();
      return;
    }

    try {
      if (this.args.includes('--review')) {
        const days = this.args.includes('--days')
          ? parseInt(this.args[this.args.indexOf('--days') + 1]) || 7
          : 7;
        this.tracker.reviewRecentInsights(days);
        return;
      }

      if (this.args.includes('--summary')) {
        const problemName = this.args[this.args.indexOf('--summary') + 1];
        if (!problemName) {
          console.log('❌ Please provide a problem name after --summary');
          return;
        }
        this.tracker.generateInsightSummary(problemName);
        return;
      }

      // Default: capture insights for problem
      const problemName = this.args[0];
      if (!problemName) {
        console.log('❌ Please provide a problem name');
        this.showUsage();
        return;
      }

      // Validate problem exists
      const solutionPath = path.join(__dirname, '../src/solutions', problemName);
      const fs = require('fs');
      if (!fs.existsSync(solutionPath)) {
        console.log(`❌ Problem '${problemName}' not found in solutions directory`);
        console.log(`💡 Available problems:`);
        const solutions = fs
          .readdirSync(path.join(__dirname, '../src/solutions'))
          .filter((item) =>
            fs.statSync(path.join(__dirname, '../src/solutions', item)).isDirectory()
          );
        solutions.forEach((solution) => console.log(`   - ${solution}`));
        return;
      }

      console.log(`
🎉 Great job solving: ${problemName}!

Now let's extract the maximum learning from this problem.
This process will help you build stronger mental models and pattern recognition.

📝 This will take 3-5 minutes but will accelerate your growth significantly.
🧠 Focus on the insights that made the problem "click" for you.
            `);

      await this.tracker.captureInsights(problemName);
    } catch (error) {
      console.error('❌ Error capturing insights:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const cli = new InsightCLI();
  cli.run().catch(console.error);
}

module.exports = InsightCLI;
