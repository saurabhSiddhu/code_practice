#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const config = require('../src/config');
const TestRunner = require('../src/utils/test-runner');
const Helpers = require('../src/utils/helpers');

class TestScript {
    constructor() {
        this.args = process.argv.slice(2);
        this.solutionName = this.args[0];
        this.options = this.parseOptions();
        this.solutionsDir = path.join(__dirname, '..', 'src', 'solutions');
    }

    parseOptions() {
        return {
            iterations: this.parseNumber(this.args[1], config.test.iterations),
            warmupRuns: this.parseNumber(this.args[2], config.test.warmupRuns),
            skipPerformance: this.parseBoolean('--skip-performance'),
            verbose: this.parseBoolean('--verbose'),
            detail: this.parseBoolean('--detail'),
            filter: this.parseString('--filter'),
            category: this.parseString('--category'),
            output: this.parseOutputFormat('--output')
        };
    }

    parseNumber(value, defaultValue) {
        const num = parseInt(value);
        return isNaN(num) ? defaultValue : num;
    }

    parseBoolean(flag) {
        return this.args.includes(flag);
    }

    parseString(flag) {
        const arg = this.args.find(a => a.startsWith(`${flag}=`));
        return arg ? arg.split('=')[1] : null;
    }

    parseOutputFormat(flag) {
        const validFormats = ['console', 'json', 'html'];
        const format = this.parseString(flag);
        return validFormats.includes(format) ? format : 'console';
    }

    showHelp() {
        const { colors } = config;
        console.log(`${colors.bright}${colors.yellow}Please provide a solution name as an argument${colors.reset}`);
        console.log(`Usage: node test.js <solution-name> [iterations] [warmup-runs] [options]`);
        console.log(`\n${colors.bright}Options:${colors.reset}`);
        console.log(`  --skip-performance  Skip performance tests`);
        console.log(`  --verbose          Show detailed test output`);
        console.log(`  --detail           Show detailed test information`);
        console.log(`  --filter=<text>    Filter tests by description or category`);
        console.log(`  --category=<name>  Filter tests by specific category`);
        console.log(`  --output=<format>  Output format (console|json|html)`);
        console.log(`\n${colors.bright}Available solutions:${colors.reset}`);
        
        this.listAvailableSolutions();
        process.exit(1);
    }

    listAvailableSolutions() {
        const { colors } = config;
        const solutions = this.getAvailableSolutions();
        solutions.forEach(sol => console.log(`  ${colors.cyan}•${colors.reset} ${sol}`));
    }

    getAvailableSolutions() {
        return fs.readdirSync(this.solutionsDir)
            .filter(dir => this.isValidSolutionDir(dir));
    }

    isValidSolutionDir(dir) {
        const dirPath = path.join(this.solutionsDir, dir);
        return fs.statSync(dirPath).isDirectory() &&
               fs.existsSync(path.join(dirPath, `${dir}.js`)) &&
               fs.existsSync(path.join(dirPath, `${dir}.test.js`));
    }

    findSolutionDir() {
        const solutions = this.getAvailableSolutions();
        return solutions.find(dir => 
            dir.toLowerCase() === this.solutionName.toLowerCase() || 
            dir.toLowerCase().replace(/-/g, '') === this.solutionName.toLowerCase()
        );
    }

    validateSolutionFiles(solutionDir) {
        const solutionPath = path.join(this.solutionsDir, solutionDir, `${solutionDir}.js`);
        const testPath = path.join(this.solutionsDir, solutionDir, `${solutionDir}.test.js`);

        if (!fs.existsSync(solutionPath) || !fs.existsSync(testPath)) {
            const { colors } = config;
            console.log(`${colors.red}Solution files not found in '${solutionDir}'${colors.reset}`);
            process.exit(1);
        }

        return { solutionPath, testPath };
    }

    async run() {
        if (!this.solutionName) {
            this.showHelp();
        }

        // Handle running all solutions
        if (this.solutionName.toLowerCase() === 'all') {
            const solutions = this.getAvailableSolutions();
            let totalPassed = 0;
            let totalFailed = 0;

            for (const solution of solutions) {
                const { colors } = config;
                console.log(`\n${colors.bright}Running tests for ${solution}:${colors.reset}`);
                
                this.solutionName = solution;
                const { solutionPath } = this.validateSolutionFiles(solution);
                
                try {
                    const Solution = require(solutionPath);
                    const solutionInstance = new Solution();
                    const runner = new TestRunner(solutionInstance, this.options);
                    
                    const testResults = runner.runTests();
                    totalPassed += testResults.passed;
                    totalFailed += testResults.failed;

                    if (!this.options.skipPerformance) {
                        runner.runPerformanceTests();
                    }
                } catch (error) {
                    console.log(`${colors.red}Error running tests for ${solution}:${colors.reset} ${error.message}`);
                    totalFailed++;
                }
            }

            const { colors } = config;
            console.log(`\n${colors.bright}Overall Test Summary:${colors.reset}`);
            console.log(`Total Solutions: ${solutions.length}`);
            console.log(`Total Tests Passed: ${colors.green}${totalPassed}${colors.reset}`);
            console.log(`Total Tests Failed: ${colors.red}${totalFailed}${colors.reset}`);
            console.log(`Overall Success Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(2)}%`);
            
            process.exit(totalFailed > 0 ? 1 : 0);
        }

        // Handle single solution
        const solutionDir = this.findSolutionDir();
        if (!solutionDir) {
            const { colors } = config;
            console.log(`${colors.red}Solution '${this.solutionName}' not found${colors.reset}`);
            this.listAvailableSolutions();
            process.exit(1);
        }

        const { solutionPath } = this.validateSolutionFiles(solutionDir);

        try {
            const Solution = require(solutionPath);
            const solution = new Solution();
            const runner = new TestRunner(solution, this.options);
            
            const testResults = runner.runTests();

            if (!this.options.skipPerformance) {
                runner.runPerformanceTests();
            }

            const results = runner.getResults();
            this.outputResults(solutionDir, results);

            process.exit(testResults.failed > 0 ? 1 : 0);
        } catch (error) {
            this.handleError(error);
        }
    }

    outputResults(solutionName, results) {
        switch (this.options.output) {
            case 'json':
                console.log(JSON.stringify(results, null, 2));
                break;
            case 'html':
                this.generateHtmlReport(solutionName, results);
                break;
            default:
                // Console output is handled by TestRunner
                break;
        }
    }

    handleError(error) {
        const { colors } = config;
        console.log(`${colors.red}Error running tests:${colors.reset} ${error.message}`);
        if (this.options.verbose) {
            console.log(error.stack);
        }
        process.exit(1);
    }

    generateHtmlReport(solutionName, results) {
        const { colors } = config;
        console.log(`${colors.yellow}HTML report generation not implemented yet${colors.reset}`);
        // TODO: Implement HTML report generation
    }
}

// Run the script
new TestScript().run(); 