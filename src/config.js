const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

const test = {
    iterations: 100,
    warmupRuns: 5,
    precision: 2,
    timeout: 5000, // 5 seconds
    maxMemory: 1024 * 1024 * 1024, // 1GB
    categories: ['basic', 'edge', 'performance'],
    validators: {
        array: (actual, expected) => {
            if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
            if (actual.length !== expected.length) return false;
            return actual.every((val, idx) => val === expected[idx]);
        },
        object: (actual, expected) => {
            if (typeof actual !== 'object' || typeof expected !== 'object') return false;
            const actualKeys = Object.keys(actual).sort();
            const expectedKeys = Object.keys(expected).sort();
            if (actualKeys.length !== expectedKeys.length) return false;
            return actualKeys.every(key => actual[key] === expected[key]);
        }
    }
};

const time = {
    msToUs: 1000,
    msToNs: 1000000,
    formats: {
        microseconds: 'µs',
        milliseconds: 'ms',
        seconds: 's'
    }
};

const paths = {
    solutions: 'src/solutions',
    tests: 'src/solutions',
    utils: 'src/utils',
    config: 'src/config.js'
};

const validation = {
    maxTestCases: 1000,
    maxInputSize: 1000000,
    maxOutputSize: 1000000,
    maxExecutionTime: 5000, // 5 seconds
    maxMemoryUsage: 1024 * 1024 * 1024 // 1GB
};

const output = {
    formats: ['console', 'json', 'html'],
    defaultFormat: 'console',
    colors: true,
    timestamps: true,
    showStackTraces: false
};

const performance = {
    minIterations: 10,
    maxIterations: 10000,
    defaultIterations: 100,
    minWarmupRuns: 1,
    maxWarmupRuns: 100,
    defaultWarmupRuns: 5,
    precision: 2
};

module.exports = {
    colors,
    test,
    time,
    paths,
    validation,
    output,
    performance
}; 