#!/usr/bin/env node

const FileUtils = require('../src/utils/fileUtils');
const Logger = require('../src/utils/logger');
const PerformanceUtils = require('../src/utils/performanceUtils');
const config = require('../src/config');

class TestSolution {
    constructor() {
        this.args = process.argv.slice(2);
        this.solutionName = this.args[0];
        this.skipPerformance = this.args.includes('--skip-performance');
        this.detail = this.args.includes('--detail');
    }

    validateSolutionName() {
        if (!this.solutionName) {
            Logger.error('Please provide a solution name');
            process.exit(1);
        }

        if (!FileUtils.fileExists(FileUtils.getSolutionPath(this.solutionName))) {
            Logger.error(`Solution '${this.solutionName}' does not exist`);
            process.exit(1);
        }
    }

    async runTests() {
        try {
            const solution = require(FileUtils.getSolutionFilePath(this.solutionName));
            const testCases = require(FileUtils.getTestFilePath(this.solutionName)).testCases;

            let passed = 0;
            let failed = 0;
            let performancePassed = true;

            for (const testCase of testCases) {
                const { description, input, expected, category } = testCase;
                Logger.info(`\nRunning test: ${description} (${category})`);

                try {
                    const result = solution.solve(input);
                    const isEqual = JSON.stringify(result) === JSON.stringify(expected);

                    if (isEqual) {
                        Logger.success('Test passed');
                        passed++;
                    } else {
                        Logger.error('Test failed');
                        Logger.info(`Expected: ${JSON.stringify(expected)}`);
                        Logger.info(`Got: ${JSON.stringify(result)}`);
                        failed++;
                    }

                    if (this.detail) {
                        Logger.info(`Input: ${JSON.stringify(input)}`);
                        Logger.info(`Output: ${JSON.stringify(result)}`);
                    }
                } catch (error) {
                    Logger.error(`Error running test: ${error.message}`);
                    failed++;
                }

                if (category === 'performance' && !this.skipPerformance) {
                    performancePassed = await PerformanceUtils.runPerformanceTest(solution, testCase);
                }
            }

            Logger.info('\nTest Summary:');
            Logger.info(`Total Tests: ${passed + failed}`);
            Logger.info(`Passed: ${passed}`);
            Logger.info(`Failed: ${failed}`);

            if (!this.skipPerformance) {
                Logger.info(`Performance Tests: ${performancePassed ? 'Passed' : 'Failed'}`);
            }

            process.exit(failed > 0 || !performancePassed ? 1 : 0);
        } catch (error) {
            Logger.error(`Error running tests: ${error.message}`);
            process.exit(1);
        }
    }

    async run() {
        this.validateSolutionName();
        await this.runTests();
    }
}

// Run the script
new TestSolution().run(); 