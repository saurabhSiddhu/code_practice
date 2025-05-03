const config = require('../config');

class Helpers {
    static validateSolution(solution) {
        if (!solution) {
            throw new Error('Solution is required');
        }
        if (typeof solution.solve !== 'function') {
            throw new Error('Solution must implement a solve method');
        }
        if (!Array.isArray(solution.testCases)) {
            throw new Error('Solution must provide testCases array');
        }
        this.validateTestCases(solution.testCases);
    }

    static validateTestCases(testCases) {
        if (!Array.isArray(testCases)) {
            throw new Error('testCases must be an array');
        }
        testCases.forEach((testCase, index) => {
            if (!testCase.description) {
                throw new Error(`Test case at index ${index} must have a description`);
            }
            if (testCase.input === undefined) {
                throw new Error(`Test case '${testCase.description}' must have an input`);
            }
            if (testCase.expected === undefined) {
                throw new Error(`Test case '${testCase.description}' must have an expected value`);
            }
        });
    }

    static compareValues(actual, expected) {
        if (actual === expected) return true;
        if (actual === null || expected === null) return false;
        if (typeof actual !== typeof expected) return false;

        if (Array.isArray(actual) && Array.isArray(expected)) {
            return this.compareArrays(actual, expected);
        }

        if (typeof actual === 'object' && typeof expected === 'object') {
            return this.compareObjects(actual, expected);
        }

        return false;
    }

    static compareArrays(actual, expected) {
        if (actual.length !== expected.length) return false;
        return actual.every((value, index) => this.compareValues(value, expected[index]));
    }

    static compareObjects(actual, expected) {
        const actualKeys = Object.keys(actual).sort();
        const expectedKeys = Object.keys(expected).sort();
        
        if (actualKeys.length !== expectedKeys.length) return false;
        if (!actualKeys.every((key, index) => key === expectedKeys[index])) return false;
        
        return actualKeys.every(key => this.compareValues(actual[key], expected[key]));
    }

    static formatTime(milliseconds) {
        if (milliseconds < 1) {
            return `${(milliseconds * 1000).toFixed(2)}µs`;
        }
        if (milliseconds < 1000) {
            return `${milliseconds.toFixed(2)}ms`;
        }
        return `${(milliseconds / 1000).toFixed(2)}s`;
    }

    static printHeader(text) {
        const { colors } = config;
        const line = '='.repeat(text.length + 4);
        console.log(`\n${colors.bright}${line}${colors.reset}`);
        console.log(`${colors.bright}  ${text}  ${colors.reset}`);
        console.log(`${colors.bright}${line}${colors.reset}\n`);
    }

    static formatError(error) {
        if (!error) return 'Unknown error';
        if (typeof error === 'string') return error;
        if (error.message) return error.message;
        return error.toString();
    }

    static validateNumber(value, name) {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error(`${name} must be a valid number`);
        }
        return value;
    }

    static validateString(value, name) {
        if (typeof value !== 'string' || !value.trim()) {
            throw new Error(`${name} must be a non-empty string`);
        }
        return value.trim();
    }

    static validateArray(value, name) {
        if (!Array.isArray(value)) {
            throw new Error(`${name} must be an array`);
        }
        return value;
    }

    static validateFunction(value, name) {
        if (typeof value !== 'function') {
            throw new Error(`${name} must be a function`);
        }
        return value;
    }

    static validateObject(value, name) {
        if (typeof value !== 'object' || value === null) {
            throw new Error(`${name} must be an object`);
        }
        return value;
    }

    static validateBoolean(value, name) {
        if (typeof value !== 'boolean') {
            throw new Error(`${name} must be a boolean`);
        }
        return value;
    }

    static calculateStats(times) {
        const min = Math.min(...times);
        const max = Math.max(...times);
        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        const variance = times.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / times.length;
        const stdDev = Math.sqrt(variance);

        return { min, max, avg, stdDev };
    }
}

module.exports = Helpers; 