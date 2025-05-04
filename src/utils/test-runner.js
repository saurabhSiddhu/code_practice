const config = require('../config');
const Helpers = require('./helpers');
const PerformanceTest = require('./performance');

class TestRunner {
    constructor(solution, options = {}) {
        this.validateInput(solution);
        this.initializeProperties(solution, options);
    }

    validateInput(solution) {
        if (!solution) {
            throw new Error('Solution is required');
        }
        if (typeof solution.solve !== 'function') {
            throw new Error('Solution must implement a solve method');
        }
        if (!Array.isArray(solution.testCases)) {
            throw new Error('Solution must provide testCases array');
        }
        Helpers.validateSolution(solution);
    }

    initializeProperties(solution, options) {
        this.solution = solution;
        this.testCases = solution.testCases;
        this.options = {
            iterations: this.validateNumber(options.iterations, config.test.iterations),
            warmupRuns: this.validateNumber(options.warmupRuns, config.test.warmupRuns),
            skipPerformance: Boolean(options.skipPerformance),
            verbose: Boolean(options.verbose),
            detail: Boolean(options.detail),
            filter: this.validateString(options.filter),
            category: this.validateString(options.category),
            output: this.validateOutputFormat(options.output)
        };
        this.results = this.initializeResults();
        this.performanceTest = this.createPerformanceTest(options);
    }

    createPerformanceTest(options) {
        const performanceTests = this.testCases.filter(t => t.category === 'performance');
        return new PerformanceTest(this.solution, performanceTests, options);
    }

    validateNumber(value, defaultValue) {
        const num = parseInt(value);
        return isNaN(num) ? defaultValue : num;
    }

    validateString(value) {
        return typeof value === 'string' ? value : null;
    }

    validateOutputFormat(value) {
        const validFormats = ['console', 'json', 'html'];
        return validFormats.includes(value) ? value : 'console';
    }

    initializeResults() {
        return {
            passed: 0,
            failed: 0,
            errors: [],
            performance: [],
            categories: {
                basic: { passed: 0, failed: 0 },
                edge: { passed: 0, failed: 0 },
                performance: { passed: 0, failed: 0 }
            },
            timing: {
                total: 0,
                min: Infinity,
                max: -Infinity,
                avg: 0,
                stdDev: 0,
                times: []
            }
        };
    }

    filterTests() {
        if (!this.options.filter) {
            return this.options.skipPerformance
                ? this.testCases.filter(t => t.category !== 'performance')
                : this.testCases;
        }

        const filter = this.options.filter.toLowerCase();
        return this.testCases.filter(test => {
            const description = this.safeToLowerCase(test.description);
            const category = this.safeToLowerCase(test.category);
            return (description.includes(filter) || category.includes(filter)) &&
                (!this.options.skipPerformance || test.category !== 'performance');
        });
    }

    safeToLowerCase(str) {
        return str ? str.toLowerCase() : '';
    }

    runTest(testCase) {
        const { description, input, expected, category = 'basic' } = testCase;
        const { colors } = config;

        try {
            // Test main solution
            const { result, executionTime } = this.executeTest(input);
            this.updateTimingStats(executionTime);

            const isCorrect = this.validateResult(result, expected, testCase.validator);
            this.updateTestResults(isCorrect, description, category);

            this.logTestResult(isCorrect, description, result, expected, executionTime, 'Main');

            // Test alternative solution if available
            if (typeof this.solution.solveAlternative === 'function') {
                const { result: altResult, executionTime: altExecutionTime } = this.executeAlternativeTest(input);
                this.updateTimingStats(altExecutionTime);

                const isAltCorrect = this.validateResult(altResult, expected, testCase.validator);
                this.updateTestResults(isAltCorrect, description, category);

                this.logTestResult(isAltCorrect, description, altResult, expected, altExecutionTime, 'Alternative');
            }
        } catch (error) {
            this.handleTestError(error, description, category);
        }
    }

    executeTest(input) {
        const startTime = process.hrtime.bigint();
        const result = this.solution.solve(input);
        const endTime = process.hrtime.bigint();
        const executionTime = Number(endTime - startTime) / 1e6;

        return { result, executionTime };
    }

    executeAlternativeTest(input) {
        const startTime = process.hrtime.bigint();
        const result = this.solution.solveAlternative(input);
        const endTime = process.hrtime.bigint();
        const executionTime = Number(endTime - startTime) / 1e6;

        return { result, executionTime };
    }

    validateResult(result, expected, validator) {
        return validator
            ? validator(result, expected)
            : Helpers.compareValues(result, expected);
    }

    updateTestResults(isCorrect, description, category) {
        if (isCorrect) {
            this.results.passed++;
            this.results.categories[category].passed++;
        } else {
            this.results.failed++;
            this.results.categories[category].failed++;
        }
    }

    logTestResult(isCorrect, description, result, expected, executionTime, solutionType = '') {
        const { colors } = config;
        const status = isCorrect ? `${colors.green}✅` : `${colors.red}❌`;
        const typePrefix = solutionType ? `[${solutionType}] ` : '';
        console.log(`${status} ${typePrefix}${description}${colors.reset}`);

        if (!isCorrect || this.options.detail) {
            console.log(`${colors.gray}Expected:${colors.reset} ${expected?.toString()}`);
            console.log(`${colors.gray}Got:${colors.reset} ${result?.toString()}`);
        }
        if (this.options.detail) {
            console.log(`${colors.gray}Time: ${Helpers.formatTime(executionTime)}${colors.reset}\n`);
        }
    }

    handleTestError(error, description, category) {
        const { colors } = config;
        console.log(`${colors.red}❌ ${description}${colors.reset}`);
        console.log(`${colors.gray}Error:${colors.reset} ${error.message}`);
        if (error.stack) {
            console.log(`${colors.gray}Stack:${colors.reset} ${error.stack}\n`);
        }
        this.results.failed++;
        this.results.categories[category].failed++;
        this.results.errors.push({
            testCase: description,
            category,
            error: error.message,
            stack: error.stack
        });
    }

    updateTimingStats(executionTime) {
        this.results.timing.total += executionTime;
        this.results.timing.min = Math.min(this.results.timing.min, executionTime);
        this.results.timing.max = Math.max(this.results.timing.max, executionTime);
        this.results.timing.times.push(executionTime);
    }

    calculateStatistics() {
        const { times } = this.results.timing;
        if (times.length === 0) return;

        this.results.timing.avg = this.results.timing.total / times.length;
        this.results.timing.stdDev = this.calculateStandardDeviation(times);
    }

    calculateStandardDeviation(times) {
        const avg = this.results.timing.avg;
        const squareDiffs = times.map(time => Math.pow(time - avg, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / times.length;
        return Math.sqrt(avgSquareDiff);
    }

    runTests() {
        const filteredTests = this.filterTests();

        for (const testCase of filteredTests) {
            this.runTest(testCase);
        }

        this.calculateStatistics();
        this.printTestSummary();
        return { passed: this.results.passed, failed: this.results.failed };
    }

    printTestSummary() {
        const { colors } = config;
        console.log(`\n${colors.bright}Test Summary:${colors.reset}`);
        console.log(`Total Tests: ${this.results.passed + this.results.failed}`);
        console.log(`Passed: ${colors.green}${this.results.passed}${colors.reset}`);
        console.log(`Failed: ${colors.red}${this.results.failed}${colors.reset}`);
        console.log(`Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(2)}%`);

        if (this.options.detail && this.results.timing.times.length > 0) {
            console.log(`\n${colors.bright}Performance Summary:${colors.reset}`);
            console.log(`Min Time: ${Helpers.formatTime(this.results.timing.min)}`);
            console.log(`Max Time: ${Helpers.formatTime(this.results.timing.max)}`);
            console.log(`Avg Time: ${Helpers.formatTime(this.results.timing.avg)}`);
            console.log(`Std Dev: ${Helpers.formatTime(this.results.timing.stdDev)}`);
        }
    }

    runPerformanceTests() {
        if (this.options.skipPerformance) {
            return [];
        }

        const perfResults = this.performanceTest.run();
        this.results.performance = perfResults;

        perfResults.forEach(test => {
            if (test.passed) {
                this.results.categories.performance.passed++;
            } else {
                this.results.categories.performance.failed++;
            }
        });

        return perfResults;
    }

    getResults() {
        return this.results;
    }
}

module.exports = TestRunner; 