#!/usr/bin/env node

const readline = require('readline');
const FileUtils = require('../src/utils/fileUtils');
const StringUtils = require('../src/utils/stringUtils');
const Logger = require('../src/utils/logger');
const Validator = require('../src/utils/validator');
const config = require('../src/config/index');

class CreateInsights {
  constructor() {
    this.args = process.argv.slice(2);
    this.solutionName = this.args[0];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.insightsInfo = {
      pattern: '',
      keyInsight: '',
      intuition: '',
      commonMistakes: [],
      templateSteps: [],
      approaches: [],
      analogies: [],
      similarProblems: [],
      followUpQuestions: []
    };
  }

  validateSolutionName() {
    try {
      if (!this.solutionName) {
        Logger.error('Please provide a solution name');
        Logger.info('Usage: node scripts/create-insights.js <solution-name>');
        process.exit(1);
      }

      Validator.validateSolutionName(this.solutionName);
      this.solutionName = StringUtils.toKebabCase(this.solutionName);

      if (!FileUtils.fileExists(FileUtils.getSolutionPath(this.solutionName))) {
        throw new Error(
          `Solution '${this.solutionName}' does not exist. Create the solution first.`
        );
      }

      const insightsPath = FileUtils.getInsightsFilePath(this.solutionName);
      if (FileUtils.fileExists(insightsPath)) {
        const overwrite = this.args.includes('--overwrite');
        if (!overwrite) {
          throw new Error(
            `Insights file already exists for '${this.solutionName}'. Use --overwrite flag to replace it.`
          );
        }
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

  async gatherInsightsInfo() {
    Logger.info("Let's gather insights for this solution:");

    this.insightsInfo.pattern = await this.prompt(
      'Pattern/Category (e.g., Dynamic_Programming_Unbounded_Knapsack): '
    );

    this.insightsInfo.keyInsight = await this.prompt('Key Insight (the "aha" moment): ');

    this.insightsInfo.intuition = await this.prompt(
      'Intuition (natural approach before optimization): '
    );

    Logger.info('Common Mistakes (enter each mistake, empty line to finish):');
    let mistake;
    while ((mistake = await this.prompt('- ')) !== '') {
      this.insightsInfo.commonMistakes.push(mistake);
    }

    Logger.info('Template Steps (enter each step, empty line to finish):');
    let step;
    while ((step = await this.prompt('Step: ')) !== '') {
      this.insightsInfo.templateSteps.push(step);
    }

    Logger.info(
      'Different Approaches (format: "Name: Description - O(n) time, O(1) space", empty line to finish):'
    );
    let approach;
    while ((approach = await this.prompt('Approach: ')) !== '') {
      this.insightsInfo.approaches.push(approach);
    }

    Logger.info('Real World Analogies (enter each analogy, empty line to finish):');
    let analogy;
    while ((analogy = await this.prompt('Analogy: ')) !== '') {
      this.insightsInfo.analogies.push(analogy);
    }

    Logger.info(
      'Similar Problems (format: "Problem Name - Brief description", empty line to finish):'
    );
    let problem;
    while ((problem = await this.prompt('Problem: ')) !== '') {
      this.insightsInfo.similarProblems.push(problem);
    }

    Logger.info('Follow-up Questions (format: "What if X? → Approach Y", empty line to finish):');
    let question;
    while ((question = await this.prompt('Question: ')) !== '') {
      this.insightsInfo.followUpQuestions.push(question);
    }
  }

  createInsightsFile() {
    const variables = {
      name: this.solutionName,
      title: StringUtils.toTitleCase(this.solutionName),
      pattern: this.insightsInfo.pattern,
      keyInsight: this.insightsInfo.keyInsight,
      intuition: this.insightsInfo.intuition,
      commonMistakes: this.insightsInfo.commonMistakes.map((m) => `- ${m}`).join('\n'),
      templateSteps: this.insightsInfo.templateSteps.map((s, i) => `// ${i + 1}. ${s}`).join('\n'),
      approaches: this.insightsInfo.approaches
        .map(
          (a, i) => `${i + 1}. **${a.split(':')[0]}**: ${a.split(':').slice(1).join(':').trim()}`
        )
        .join('\n'),
      analogies: this.insightsInfo.analogies
        .map((a) => `- **${a.split(':')[0]}**: ${a.split(':').slice(1).join(':').trim()}`)
        .join('\n'),
      similarProblems: this.insightsInfo.similarProblems
        .map((p) => `- **${p.split(' - ')[0]}** - ${p.split(' - ').slice(1).join(' - ')}`)
        .join('\n'),
      followUpQuestions: this.insightsInfo.followUpQuestions
        .map((q) => `- "${q.split(' → ')[0]}" → ${q.split(' → ').slice(1).join(' → ')}`)
        .join('\n')
    };

    try {
      const insightsContent = FileUtils.replaceTemplateVariables(
        FileUtils.getTemplate('insights'),
        variables
      );
      FileUtils.writeFile(FileUtils.getInsightsFilePath(this.solutionName), insightsContent);
      Logger.success(`Created insights file: ${FileUtils.getInsightsFilePath(this.solutionName)}`);
    } catch (error) {
      Logger.error(`Error creating insights file: ${error.message}`);
      process.exit(1);
    }
  }

  async run() {
    try {
      this.validateSolutionName();
      await this.gatherInsightsInfo();
      this.createInsightsFile();

      // Auto-generate/update Anki cards after creating insights
      await this.updateAnkiCards();

      Logger.success(`Insights for '${this.solutionName}' created successfully`);
      Logger.info('\nNext steps:');
      Logger.info(
        `1. Review and edit the insights file: src/solutions/${this.solutionName}/INSIGHTS.md`
      );
      Logger.info('2. Add more specific details based on your solution implementation');
      Logger.info('3. Review the updated Anki cards in ANKI_CARDS.md');
    } catch (error) {
      Logger.error(`Error creating insights: ${error.message}`);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  async updateAnkiCards() {
    try {
      Logger.info('Updating Anki cards with new insights...');
      const { spawn } = require('child_process');

      return new Promise((resolve, reject) => {
        const ankiProcess = spawn('node', ['scripts/create-anki-cards.js', this.solutionName], {
          cwd: process.cwd(),
          stdio: 'inherit'
        });

        ankiProcess.on('close', (code) => {
          if (code === 0) {
            Logger.success('Anki cards updated successfully');
            resolve();
          } else {
            Logger.warn('Anki card update completed with warnings');
            resolve(); // Don't fail the entire process
          }
        });

        ankiProcess.on('error', (error) => {
          Logger.warn(`Anki card update failed: ${error.message}`);
          resolve(); // Don't fail the entire process
        });
      });
    } catch (error) {
      Logger.warn(`Could not update Anki cards: ${error.message}`);
      // Don't fail the entire insights creation process
    }
  }
}

// Run the script
new CreateInsights().run();
