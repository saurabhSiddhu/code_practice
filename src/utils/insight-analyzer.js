/**
 * Insight Analyzer - Analyze and visualize your learning patterns
 *
 * This tool helps you understand how your mental models and pattern recognition
 * are evolving over time.
 */

const fs = require('fs');
const path = require('path');

class InsightAnalyzer {
  constructor() {
    this.insightsDir = path.join(__dirname, '../../insights');
  }

  /**
   * Analyze pattern mastery progression
   */
  analyzePatternMastery() {
    const evolutionFile = path.join(
      this.insightsDir,
      'pattern-evolution',
      'evolution-tracker.json'
    );

    if (!fs.existsSync(evolutionFile)) {
      console.log('No pattern evolution data found. Solve some problems first!');
      return;
    }

    const evolutionDB = JSON.parse(fs.readFileSync(evolutionFile, 'utf8'));

    console.log('\n📈 PATTERN MASTERY ANALYSIS');
    console.log('='.repeat(60));

    Object.entries(evolutionDB).forEach(([patternKey, data]) => {
      console.log(`\n🔍 ${data.patternName.toUpperCase()}`);
      console.log(`   Problems solved: ${data.timeline.length}`);
      console.log(`   Variations encountered: ${data.variations.length}`);
      console.log(`   Recognition triggers: ${data.recognitionTriggers.length}`);

      if (data.timeline.length > 1) {
        const firstSolve = data.timeline[0].date;
        const lastSolve = data.timeline[data.timeline.length - 1].date;
        const daysBetween = Math.floor(
          (new Date(lastSolve) - new Date(firstSolve)) / (1000 * 60 * 60 * 24)
        );
        console.log(`   Learning span: ${daysBetween} days`);

        // Show evolution of understanding
        console.log(`   📚 Learning progression:`);
        data.timeline.slice(-3).forEach((entry, idx) => {
          console.log(
            `     ${idx + 1}. ${entry.problem}: ${entry.evolution || 'Initial understanding'}`
          );
        });
      }
    });
  }

  /**
   * Analyze constraint pattern recognition
   */
  analyzeConstraintIntuition() {
    const constraintsFile = path.join(
      this.insightsDir,
      'constraint-patterns',
      'constraints-database.json'
    );

    if (!fs.existsSync(constraintsFile)) {
      console.log('No constraint pattern data found.');
      return;
    }

    const constraintsDB = JSON.parse(fs.readFileSync(constraintsFile, 'utf8'));

    console.log('\n⚡ CONSTRAINT INTUITION ANALYSIS');
    console.log('='.repeat(60));

    // Identify most common constraint patterns
    const patternFrequency = {};
    Object.entries(constraintsDB).forEach(([key, data]) => {
      patternFrequency[data.pattern] = data.problems.length;
    });

    const sortedPatterns = Object.entries(patternFrequency).sort(([, a], [, b]) => b - a);

    console.log('\n🎯 Most encountered constraint patterns:');
    sortedPatterns.slice(0, 5).forEach(([pattern, count], idx) => {
      console.log(`   ${idx + 1}. ${pattern}: ${count} problems`);
    });

    // Show constraint evolution for top patterns
    console.log('\n📊 Constraint handling evolution:');
    sortedPatterns.slice(0, 3).forEach(([pattern]) => {
      const key = pattern.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const data = constraintsDB[key];
      if (data && data.problems.length > 1) {
        console.log(`\n   🔧 ${pattern}:`);
        data.problems.slice(-2).forEach((problem, idx) => {
          console.log(`     ${problem.name}: ${problem.criticalConstraint}`);
        });
      }
    });
  }

  /**
   * Analyze mental model strength
   */
  analyzeMentalModels() {
    const modelsFile = path.join(this.insightsDir, 'mental-models', 'models-database.json');

    if (!fs.existsSync(modelsFile)) {
      console.log('No mental models data found.');
      return;
    }

    const modelsDB = JSON.parse(fs.readFileSync(modelsFile, 'utf8'));

    console.log('\n🧠 MENTAL MODEL STRENGTH ANALYSIS');
    console.log('='.repeat(60));

    // Find strongest mental models (most problems)
    const modelStrength = Object.entries(modelsDB)
      .map(([key, data]) => ({
        insight: data.coreInsight,
        strength: data.problems.length,
        analogies: data.analogies.length,
        mistakes: data.commonMistakes.length
      }))
      .sort((a, b) => b.strength - a.strength);

    console.log('\n💪 Strongest mental models:');
    modelStrength.slice(0, 5).forEach((model, idx) => {
      console.log(`   ${idx + 1}. "${model.insight}"`);
      console.log(`      Applied to: ${model.strength} problems`);
      console.log(`      Analogies: ${model.analogies}`);
      console.log(`      Common mistakes identified: ${model.mistakes}`);
      console.log('');
    });
  }

  /**
   * Analyze problem connections and knowledge graph
   */
  analyzeKnowledgeGraph() {
    const graphFile = path.join(this.insightsDir, 'problem-connections', 'knowledge-graph.json');

    if (!fs.existsSync(graphFile)) {
      console.log('No knowledge graph data found.');
      return;
    }

    const graph = JSON.parse(fs.readFileSync(graphFile, 'utf8'));

    console.log('\n🔗 KNOWLEDGE GRAPH ANALYSIS');
    console.log('='.repeat(60));

    const nodeCount = Object.keys(graph.nodes).length;
    const edgeCount = graph.edges.length;
    const connectivityRatio = edgeCount / nodeCount;

    console.log(`\n📊 Graph Statistics:`);
    console.log(`   Problems in graph: ${nodeCount}`);
    console.log(`   Connections identified: ${edgeCount}`);
    console.log(
      `   Connectivity ratio: ${connectivityRatio.toFixed(2)} (higher = better pattern recognition)`
    );

    // Find most connected problems (hub problems)
    const connectionCounts = {};
    graph.edges.forEach((edge) => {
      connectionCounts[edge.from] = (connectionCounts[edge.from] || 0) + 1;
      connectionCounts[edge.to] = (connectionCounts[edge.to] || 0) + 1;
    });

    const hubs = Object.entries(connectionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    if (hubs.length > 0) {
      console.log(`\n🌟 Most connected problems (knowledge hubs):`);
      hubs.forEach(([problem, connections], idx) => {
        console.log(`   ${idx + 1}. ${problem}: ${connections} connections`);
      });
    }

    // Show recent connections
    const recentEdges = graph.edges
      .filter((edge) => graph.nodes[edge.from])
      .sort((a, b) => new Date(graph.nodes[b.from].date) - new Date(graph.nodes[a.from].date))
      .slice(0, 3);

    if (recentEdges.length > 0) {
      console.log(`\n🆕 Recent connections discovered:`);
      recentEdges.forEach((edge) => {
        console.log(`   ${edge.from} ↔ ${edge.to}`);
        console.log(`   Shared principle: ${edge.sharedPrinciple}`);
        console.log(`   Key difference: ${edge.keyDifference}\n`);
      });
    }
  }

  /**
   * Generate learning velocity report
   */
  analyzeLearningVelocity() {
    const insightFiles = fs
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
        return { ...insight, file };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (insightFiles.length < 2) {
      console.log('Need at least 2 problems with insights to analyze learning velocity.');
      return;
    }

    console.log('\n🚀 LEARNING VELOCITY ANALYSIS');
    console.log('='.repeat(60));

    const firstDate = new Date(insightFiles[0].date);
    const lastDate = new Date(insightFiles[insightFiles.length - 1].date);
    const totalDays = Math.floor((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;
    const problemsPerDay = insightFiles.length / totalDays;

    console.log(`\n📈 Velocity Metrics:`);
    console.log(
      `   Period: ${insightFiles[0].date} to ${insightFiles[insightFiles.length - 1].date} (${totalDays} days)`
    );
    console.log(`   Problems with insights: ${insightFiles.length}`);
    console.log(`   Average: ${problemsPerDay.toFixed(2)} insights per day`);

    // Weekly breakdown
    const weeklyBreakdown = {};
    insightFiles.forEach((insight) => {
      const week = this.getWeekStart(new Date(insight.date));
      weeklyBreakdown[week] = (weeklyBreakdown[week] || 0) + 1;
    });

    if (Object.keys(weeklyBreakdown).length > 1) {
      console.log(`\n📅 Weekly breakdown:`);
      Object.entries(weeklyBreakdown)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .forEach(([week, count]) => {
          console.log(`   Week of ${week}: ${count} insights`);
        });
    }
  }

  /**
   * Helper to get week start date
   */
  getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
  }

  /**
   * Generate comprehensive analysis report
   */
  generateFullReport() {
    console.log('\n🧠 COMPREHENSIVE INSIGHT ANALYSIS REPORT');
    console.log('='.repeat(80));
    console.log(`Generated: ${new Date().toISOString().split('T')[0]}`);

    this.analyzeLearningVelocity();
    this.analyzePatternMastery();
    this.analyzeConstraintIntuition();
    this.analyzeMentalModels();
    this.analyzeKnowledgeGraph();

    console.log('\n🎯 RECOMMENDATIONS:');
    console.log('='.repeat(40));

    // Basic recommendations based on data
    const evolutionFile = path.join(
      this.insightsDir,
      'pattern-evolution',
      'evolution-tracker.json'
    );
    if (fs.existsSync(evolutionFile)) {
      const evolutionDB = JSON.parse(fs.readFileSync(evolutionFile, 'utf8'));
      const patternCount = Object.keys(evolutionDB).length;

      if (patternCount < 5) {
        console.log('📚 Focus on diversifying patterns - aim for 8-10 core patterns');
      } else if (patternCount > 10) {
        console.log('🎯 Consider deepening existing patterns rather than learning new ones');
      }
    }

    const graphFile = path.join(this.insightsDir, 'problem-connections', 'knowledge-graph.json');
    if (fs.existsSync(graphFile)) {
      const graph = JSON.parse(fs.readFileSync(graphFile, 'utf8'));
      const connectivityRatio = graph.edges.length / Object.keys(graph.nodes).length;

      if (connectivityRatio < 0.5) {
        console.log('🔗 Work on connecting problems - look for similarities between solutions');
      } else if (connectivityRatio > 1.5) {
        console.log('🌟 Excellent pattern recognition! Focus on edge case mastery');
      }
    }

    console.log('\n✨ Keep building those mental models! Every insight makes you stronger.');
  }
}

module.exports = InsightAnalyzer;
