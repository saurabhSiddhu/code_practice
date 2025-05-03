const config = require('../config');
const Helpers = require('./helpers');

class PerformanceTest {
    constructor(solution, testCases, options = {}) {
        this.validateInput(solution, testCases);
        this.initializeProperties(solution, testCases, options);
    }

    validateInput(solution, testCases) {
        if (!solution) {
            throw new Error('Solution is required');
        }
        if (!Array.isArray(testCases)) {
            throw new Error('Test cases must be an array');
        }
        Helpers.validateSolution(solution);
    }

    initializeProperties(solution, testCases, options) {
        this.solution = solution;
        this.testCases = testCases;
        this.options = {
            iterations: this.validateNumber(options.iterations, config.test.iterations),
            warmupRuns: this.validateNumber(options.warmupRuns, config.test.warmupRuns),
            verbose: Boolean(options.verbose)
        };
    }

    validateNumber(value, defaultValue) {
        const num = parseInt(value);
        return isNaN(num) ? defaultValue : num;
    }

    run() {
        return this.testCases.map(testCase => this.runTest(testCase));
    }

    runTest(testCase) {
        const { description, input, expected } = testCase;
        const { colors } = config;

        try {
            // Warmup runs
            for (let i = 0; i < this.options.warmupRuns; i++) {
                this.solution.solve(input);
            }

            // Actual test runs
            const times = [];
            for (let i = 0; i < this.options.iterations; i++) {
                const startTime = process.hrtime.bigint();
                const result = this.solution.solve(input);
                const endTime = process.hrtime.bigint();
                const executionTime = Number(endTime - startTime) / 1e6;
                times.push(executionTime);

                // Validate result
                if (!this.validateResult(result, expected, testCase.validator)) {
                    return {
                        description,
                        passed: false,
                        error: 'Incorrect result',
                        times: []
                    };
                }
            }

            const stats = this.calculateStats(times);
            return {
                description,
                passed: true,
                ...stats
            };
        } catch (error) {
            return {
                description,
                passed: false,
                error: error.message,
                times: []
            };
        }
    }

    validateResult(result, expected, validator) {
        return validator 
            ? validator(result, expected)
            : Helpers.compareValues(result, expected);
    }

    calculateStats(times) {
        if (times.length === 0) {
            return {
                min: 0,
                max: 0,
                avg: 0,
                stdDev: 0
            };
        }

        const min = Math.min(...times);
        const max = Math.max(...times);
        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        const stdDev = this.calculateStandardDeviation(times, avg);

        return {
            min,
            max,
            avg,
            stdDev,
            times
        };
    }

    calculateStandardDeviation(times, mean) {
        const squareDiffs = times.map(time => Math.pow(time - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / times.length;
        return Math.sqrt(avgSquareDiff);
    }

    printSummary() {
        const { colors } = config;
        Helpers.printHeader('Performance Summary');

        this.results.forEach(result => {
            console.log(`\n${colors.bright}${colors.blue}${result.description}:${colors.reset}`);
            if (result.passed) {
                console.log(`${colors.magenta}  Min:${colors.reset}      ${Helpers.formatTime(result.min)}`);
                console.log(`${colors.magenta}  Max:${colors.reset}      ${Helpers.formatTime(result.max)}`);
                console.log(`${colors.magenta}  Avg:${colors.reset}      ${Helpers.formatTime(result.avg)}`);
                console.log(`${colors.magenta}  Std Dev:${colors.reset}  ${Helpers.formatTime(result.stdDev)}`);
            } else {
                console.log(`${colors.red}  Failed:${colors.reset} ${result.error || 'Incorrect result'}`);
            }
        });
    }
}

module.exports = PerformanceTest; 