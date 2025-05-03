const fs = require('fs');
const path = require('path');
const config = require('../src/config');
const TestRunner = require('../src/utils/test-runner');
const Helpers = require('../src/utils/helpers');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
    iterations: parseInt(args[0]) || config.test.iterations,
    warmupRuns: parseInt(args[1]) || config.test.warmupRuns,
    skipPerformance: args.includes('--skip-performance'),
    verbose: args.includes('--verbose')
};

// Get all solution directories
const solutionsDir = path.join(__dirname, '..', 'src', 'solutions');
const solutionDirs = fs.readdirSync(solutionsDir)
    .filter(dir => fs.statSync(path.join(solutionsDir, dir)).isDirectory());

let totalTests = 0;
let totalPassed = 0;
let totalFailed = 0;
const performanceResults = [];
const errors = [];

// Print header and options
Helpers.printHeader('Running All Tests');
const { colors } = config;
console.log(`${colors.bright}Options:${colors.reset}`);
console.log(`  Iterations: ${colors.cyan}${options.iterations}${colors.reset}`);
console.log(`  Warmup Runs: ${colors.cyan}${options.warmupRuns}${colors.reset}`);
console.log(`  Skip Performance: ${colors.cyan}${options.skipPerformance}${colors.reset}`);
console.log(`  Verbose: ${colors.cyan}${options.verbose}${colors.reset}\n`);

// Run tests for each solution
for (const dir of solutionDirs) {
    const solutionPath = path.join(solutionsDir, dir, `${dir}.js`);
    const testPath = path.join(solutionsDir, dir, `${dir}.test.js`);

    if (fs.existsSync(solutionPath) && fs.existsSync(testPath)) {
        try {
            if (options.verbose) {
                Helpers.printHeader(`Testing ${dir}`);
            } else {
                process.stdout.write(`${colors.cyan}Testing ${dir}...${colors.reset}`);
            }

            // Load solution and test cases
            const Solution = require(solutionPath);
            const solution = new Solution();
            
            // Create and run test runner with options
            const runner = new TestRunner(solution, options);
            
            // Run basic tests
            const { passed, failed } = runner.runTests();
            totalTests += (passed + failed);
            totalPassed += passed;
            totalFailed += failed;

            if (!options.verbose) {
                process.stdout.write(` ${passed + failed} tests, ${colors.green}${passed} passed${colors.reset}, ${colors.red}${failed} failed${colors.reset}\n`);
            }

            // Run performance tests if not skipped
            if (!options.skipPerformance) {
                if (options.verbose) {
                    Helpers.printHeader(`Performance Tests for ${dir}`);
                }
                const perfResults = runner.runPerformanceTests();
                performanceResults.push({
                    name: dir,
                    results: perfResults
                });
            }
        } catch (error) {
            errors.push({ solution: dir, error: error.message });
            console.error(`${colors.red}Error testing ${dir}:${colors.reset} ${error.message}`);
            totalFailed++;
        }
    } else {
        console.error(`${colors.yellow}Warning:${colors.reset} Solution files not found for ${dir}`);
    }
}

// Print overall summary
Helpers.printHeader('Overall Test Summary');

console.log(`${colors.bright}Test Results:${colors.reset}`);
console.log(`Total Solutions Tested: ${colors.cyan}${solutionDirs.length}${colors.reset}`);
console.log(`Total Tests: ${colors.cyan}${totalTests}${colors.reset}`);
console.log(`Passed: ${colors.green}${totalPassed}${colors.reset}`);
console.log(`Failed: ${colors.red}${totalFailed}${colors.reset}`);
const successRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) : '0.00';
console.log(`Success Rate: ${successRate === '100.00' ? colors.green : colors.yellow}${successRate}%${colors.reset}`);

// Print errors if any
if (errors.length > 0) {
    Helpers.printHeader('Errors');
    errors.forEach(({ solution, error }) => {
        console.log(`${colors.red}${solution}:${colors.reset} ${error}`);
    });
}

// Print performance summary if not skipped
if (!options.skipPerformance && performanceResults.length > 0) {
    Helpers.printHeader('Performance Summary');

    performanceResults.forEach(solution => {
        console.log(`\n${colors.bright}${colors.blue}${solution.name}:${colors.reset}`);
        solution.results.forEach(test => {
            console.log(`\n  ${colors.cyan}${test.description}:${colors.reset}`);
            console.log(`${colors.magenta}    Min:${colors.reset}      ${Helpers.formatTime(test.min)}`);
            console.log(`${colors.magenta}    Max:${colors.reset}      ${Helpers.formatTime(test.max)}`);
            console.log(`${colors.magenta}    Avg:${colors.reset}      ${Helpers.formatTime(test.avg)}`);
            console.log(`${colors.magenta}    Std Dev:${colors.reset}  ${Helpers.formatTime(test.stdDev)}`);
        });
    });
}

// Exit with appropriate code
process.exit(totalFailed > 0 ? 1 : 0); 