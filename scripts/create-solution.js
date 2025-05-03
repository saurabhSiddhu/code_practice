#!/usr/bin/env node

const readline = require('readline');
const FileUtils = require('../src/utils/fileUtils');
const StringUtils = require('../src/utils/stringUtils');
const Logger = require('../src/utils/logger');
const Validator = require('../src/utils/validator');
const config = require('../src/config');

class CreateSolution {
    constructor() {
        this.args = process.argv.slice(2);
        this.solutionName = this.args[0];
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
        Logger.info('Let\'s gather some information about the problem:');
        
        this.problemInfo.difficulty = await this.prompt('Difficulty (Easy/Medium/Hard): ');
        Validator.validateDifficulty(this.problemInfo.difficulty);

        this.problemInfo.pattern = await this.prompt('Pattern (e.g., Two Pointers, Sliding Window): ');
        Validator.validatePattern(this.problemInfo.pattern);

        this.problemInfo.leetcodeLink = await this.prompt('LeetCode Problem Link: ');
        Validator.validateLeetCodeLink(this.problemInfo.leetcodeLink);

        const tagsInput = await this.prompt('Tags (comma-separated, e.g., Array, Hash Table): ');
        this.problemInfo.tags = tagsInput.split(',').map(tag => tag.trim());
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
            FileUtils.writeFile(
                FileUtils.getSolutionFilePath(this.solutionName),
                solutionContent
            );
            Logger.success(`Created solution file: ${FileUtils.getSolutionFilePath(this.solutionName)}`);

            // Create test file
            const testContent = FileUtils.replaceTemplateVariables(
                FileUtils.getTemplate('test'),
                variables
            );
            FileUtils.writeFile(
                FileUtils.getTestFilePath(this.solutionName),
                testContent
            );
            Logger.success(`Created test file: ${FileUtils.getTestFilePath(this.solutionName)}`);

            // Create README file
            const readmeContent = FileUtils.replaceTemplateVariables(
                FileUtils.getTemplate('readme'),
                variables
            );
            FileUtils.writeFile(
                FileUtils.getReadmeFilePath(this.solutionName),
                readmeContent
            );
            Logger.success(`Created README file: ${FileUtils.getReadmeFilePath(this.solutionName)}`);
        } catch (error) {
            Logger.error(`Error creating files: ${error.message}`);
            process.exit(1);
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

            Logger.success(`Solution '${this.solutionName}' created successfully`);
            Logger.info('\nNext steps:');
            Logger.info(`1. Implement your solution in src/solutions/${this.solutionName}/${this.solutionName}.js`);
            Logger.info(`2. Add test cases in src/solutions/${this.solutionName}/${this.solutionName}.test.js`);
            Logger.info('3. Update the README.md with solution approach and complexity analysis');
            Logger.info(`4. Run tests with npm test ${this.solutionName}`);
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