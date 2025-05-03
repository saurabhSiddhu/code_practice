const fs = require('fs');
const path = require('path');
const config = require('./src/config');
const TestRunner = require('./src/utils/test-runner');
const Helpers = require('./src/utils/helpers');

// Parse command line arguments
const args = process.argv.slice(2);
const solutionName = args[0];
const options = {
    iterations: parseInt(args[1]) || config.test.iterations,
    warmupRuns: parseInt(args[2]) || config.test.warmupRuns
};

// Show help if no solution name provided
if (!solutionName) {
    const { colors } = config;
    console.error(`${colors.bright}${colors.yellow}Please provide a solution name as an argument${colors.reset}`);
    console.error(`Usage: node test.js <solution-name> [iterations] [warmup-runs]`);
    console.error(`\n${colors.bright}Available solutions:${colors.reset}`);
    
    // List available solutions
    const solutionsDir = path.join(__dirname, 'src', 'solutions');
    const solutions = fs.readdirSync(solutionsDir)
        .filter(dir => fs.statSync(path.join(solutionsDir, dir)).isDirectory());
    
    solutions.forEach(sol => console.error(`  ${colors.cyan}•${colors.reset} ${sol}`));
    process.exit(1);
}

// Construct paths
const solutionDir = path.join(__dirname, 'src', 'solutions', solutionName);
const solutionPath = path.join(solutionDir, `${solutionName}.js`);
const testPath = path.join(solutionDir, `${solutionName}.test.js`);

// Check if solution exists
if (!fs.existsSync(solutionPath) || !fs.existsSync(testPath)) {
    const { colors } = config;
    console.error(`${colors.red}Solution '${solutionName}' not found${colors.reset}`);
    process.exit(1);
}

try {
    // Load and run tests
    Helpers.printHeader(`Testing ${solutionName}`);

    const Solution = require(solutionPath);
    const solution = new Solution();
    
    // Create and run test runner
    const runner = new TestRunner(solution, options);
    
    // Run basic tests
    const { passed, failed } = runner.runTests();

    // Run performance tests
    Helpers.printHeader('Running Performance Tests');
    const perfResults = runner.runPerformanceTests();

    // Print final summary
    Helpers.printHeader('Final Summary');

    // Test Results
    const { colors } = config;
    console.log(`${colors.bright}Test Results:${colors.reset}`);
    console.log(`Total Tests: ${passed + failed}`);
    console.log(`Passed: ${colors.green}${passed}${colors.reset}`);
    console.log(`Failed: ${colors.red}${failed}${colors.reset}`);
    const successRate = ((passed / (passed + failed)) * 100).toFixed(2);
    console.log(`Success Rate: ${successRate === '100.00' ? colors.green : colors.yellow}${successRate}%${colors.reset}`);

    // Performance Results
    console.log(`\n${colors.bright}Performance Results:${colors.reset}`);
    perfResults.forEach(test => {
        console.log(`\n${colors.bright}${colors.blue}${test.description}:${colors.reset}`);
        console.log(`${colors.magenta}  Min:${colors.reset}      ${Helpers.formatTime(test.min)}`);
        console.log(`${colors.magenta}  Max:${colors.reset}      ${Helpers.formatTime(test.max)}`);
        console.log(`${colors.magenta}  Avg:${colors.reset}      ${Helpers.formatTime(test.avg)}`);
        console.log(`${colors.magenta}  Std Dev:${colors.reset}  ${Helpers.formatTime(test.stdDev)}`);
    });
} catch (error) {
    const { colors } = config;
    console.error(`${colors.red}Error running tests:${colors.reset} ${error.message}`);
    process.exit(1);
} 