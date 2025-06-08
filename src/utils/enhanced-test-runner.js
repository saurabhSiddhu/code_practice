/**
 * Enhanced Test Runner Integration with Insight Capture
 *
 * Automatically prompts for insight capture after successful test runs
 */

const TestRunner = require('./test-runner');
const InsightTracker = require('./insight-tracker');

class EnhancedTestRunner extends TestRunner {
  constructor(solution, options = {}) {
    super(solution, options);
    this.insightTracker = new InsightTracker();
    this.autoInsights = options.autoInsights || false;
    this.problemName = options.problemName;
  }

  async runTests() {
    // Run original tests
    const results = super.runTests();

    // If tests passed and auto-insights is enabled
    if (results.passed > 0 && results.failed === 0 && this.autoInsights && this.problemName) {
      await this.promptForInsights();
    }

    return results;
  }

  async promptForInsights() {
    console.log('\n🎉 All tests passed! 🎉');
    console.log('💡 Would you like to capture insights to strengthen your mental models?');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

    try {
      const response = await prompt('\nCapture insights now? (y/n): ');

      if (response.toLowerCase() === 'y' || response.toLowerCase() === 'yes') {
        console.log("\n🧠 Great! Let's build those mental models...\n");
        await this.insightTracker.captureInsights(this.problemName);
      } else {
        console.log('\n💭 No problem! Remember to capture insights later with:');
        console.log(`   npm run insights ${this.problemName}`);
        console.log('\n🎯 Building mental models accelerates your growth significantly!');
      }
    } finally {
      rl.close();
    }
  }

  /**
   * Quick insight capture for those who want to build mental models immediately
   */
  async quickInsightCapture() {
    if (!this.problemName) {
      console.log('❌ Problem name required for insight capture');
      return;
    }

    console.log('\n🧠 QUICK INSIGHT CAPTURE');
    console.log('='.repeat(40));
    console.log('Building mental models in rapid-fire mode...\n');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

    try {
      const quickInsights = {
        problemName: this.problemName,
        date: new Date().toISOString().split('T')[0],
        coreInsight: '',
        pattern: '',
        constraintKey: '',
        futureRecognition: ''
      };

      quickInsights.coreInsight = await prompt('🎯 Core insight (1 sentence): ');
      quickInsights.pattern = await prompt('🔍 Pattern family: ');
      quickInsights.constraintKey = await prompt('⚡ Key constraint: ');
      quickInsights.futureRecognition = await prompt('🚀 Recognition trigger: ');

      // Save quick insights
      const fs = require('fs');
      const path = require('path');
      const quickInsightsFile = path.join(__dirname, '../../insights', 'quick-insights.jsonl');

      // Ensure directory exists
      const insightsDir = path.dirname(quickInsightsFile);
      if (!fs.existsSync(insightsDir)) {
        fs.mkdirSync(insightsDir, { recursive: true });
      }

      // Append to JSONL file (one JSON object per line)
      fs.appendFileSync(quickInsightsFile, JSON.stringify(quickInsights) + '\n');

      console.log('\n✅ Quick insights captured!');
      console.log('💡 For deeper insight capture, run: npm run insights ' + this.problemName);
    } finally {
      rl.close();
    }
  }
}

module.exports = EnhancedTestRunner;
