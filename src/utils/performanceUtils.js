const Logger = require('./logger');
const config = require('../config');

class PerformanceUtils {
    static async measurePerformance(fn, input, iterations = config.test.iterations) {
        const results = {
            totalTime: 0,
            minTime: Infinity,
            maxTime: 0,
            averageTime: 0,
            iterations: iterations
        };

        // Warmup runs
        for (let i = 0; i < config.test.warmupRuns; i++) {
            fn(input);
        }

        // Actual measurement
        for (let i = 0; i < iterations; i++) {
            const start = process.hrtime();
            fn(input);
            const [seconds, nanoseconds] = process.hrtime(start);
            const time = seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds

            results.totalTime += time;
            results.minTime = Math.min(results.minTime, time);
            results.maxTime = Math.max(results.maxTime, time);

            if (i % 100 === 0) {
                Logger.progress('Running performance tests', i, iterations);
            }
        }

        results.averageTime = results.totalTime / iterations;
        Logger.progress('Running performance tests', iterations, iterations);

        return results;
    }

    static formatPerformanceResults(results) {
        const { colors } = config.output;
        return {
            summary: `${colors.bright}Performance Results:${colors.reset}
${colors.cyan}Iterations:${colors.reset} ${results.iterations}
${colors.cyan}Total Time:${colors.reset} ${results.totalTime.toFixed(2)}ms
${colors.cyan}Average Time:${colors.reset} ${results.averageTime.toFixed(2)}ms
${colors.cyan}Min Time:${colors.reset} ${results.minTime.toFixed(2)}ms
${colors.cyan}Max Time:${colors.reset} ${results.maxTime.toFixed(2)}ms`,
            passed: results.averageTime <= config.test.performanceThreshold
        };
    }

    static async runPerformanceTest(solution, testCase) {
        try {
            const results = await PerformanceUtils.measurePerformance(
                solution.solve.bind(solution),
                testCase.input
            );
            const formattedResults = PerformanceUtils.formatPerformanceResults(results);
            
            if (formattedResults.passed) {
                Logger.success('Performance test passed');
            } else {
                Logger.warn('Performance test failed - solution is too slow');
            }
            
            Logger.info(formattedResults.summary);
            return formattedResults.passed;
        } catch (error) {
            Logger.error(`Error running performance test: ${error.message}`);
            return false;
        }
    }
}

module.exports = PerformanceUtils; 