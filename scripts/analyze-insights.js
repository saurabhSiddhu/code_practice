#!/usr/bin/env node

/**
 * Insight Analysis CLI
 * Analyze your learning patterns and mental model development
 *
 * Usage:
 *   node scripts/analyze-insights.js [options]
 *   npm run analyze-insights [options]
 */

const InsightAnalyzer = require('../src/utils/insight-analyzer');

class AnalysisCLI {
  constructor() {
    this.analyzer = new InsightAnalyzer();
    this.args = process.argv.slice(2);
  }

  showUsage() {
    console.log(`
📊 INSIGHT ANALYZER - Understand Your Learning Patterns

Usage:
  node scripts/analyze-insights.js [option]

Options:
  --patterns      Analyze pattern mastery progression
  --constraints   Analyze constraint intuition development  
  --models        Analyze mental model strength
  --connections   Analyze knowledge graph and problem connections
  --velocity      Analyze learning velocity and trends
  --full          Generate comprehensive analysis report (default)

Examples:
  node scripts/analyze-insights.js --patterns
  node scripts/analyze-insights.js --full
  node scripts/analyze-insights.js --velocity

This tool helps you understand:
🧠 How your mental models are strengthening
⚡ Which constraint patterns you're mastering
🔍 Your pattern recognition evolution
🔗 How well you're connecting problems
🚀 Your learning velocity and trends
        `);
  }

  async run() {
    try {
      if (this.args.length === 0 || this.args.includes('--help') || this.args.includes('-h')) {
        this.showUsage();
        return;
      }

      if (this.args.includes('--patterns')) {
        this.analyzer.analyzePatternMastery();
        return;
      }

      if (this.args.includes('--constraints')) {
        this.analyzer.analyzeConstraintIntuition();
        return;
      }

      if (this.args.includes('--models')) {
        this.analyzer.analyzeMentalModels();
        return;
      }

      if (this.args.includes('--connections')) {
        this.analyzer.analyzeKnowledgeGraph();
        return;
      }

      if (this.args.includes('--velocity')) {
        this.analyzer.analyzeLearningVelocity();
        return;
      }

      if (this.args.includes('--full') || this.args.length === 0) {
        this.analyzer.generateFullReport();
        return;
      }

      // If we get here, unrecognized option
      console.log('❌ Unrecognized option. Use --help to see available options.');
      this.showUsage();
    } catch (error) {
      console.error('❌ Error analyzing insights:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const cli = new AnalysisCLI();
  cli.run().catch(console.error);
}

module.exports = AnalysisCLI;
