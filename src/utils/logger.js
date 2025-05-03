const config = require('../config');

class Logger {
    static log(message, type = 'info') {
        const { colors } = config.output;
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${type.toUpperCase()}]`;

        switch (type.toLowerCase()) {
            case 'error':
                console.error(`${colors.red}${prefix} ${message}${colors.reset}`);
                break;
            case 'warn':
                console.warn(`${colors.yellow}${prefix} ${message}${colors.reset}`);
                break;
            case 'success':
                console.log(`${colors.green}${prefix} ${message}${colors.reset}`);
                break;
            case 'info':
                console.log(`${colors.cyan}${prefix} ${message}${colors.reset}`);
                break;
            case 'debug':
                if (process.env.NODE_ENV === 'development') {
                    console.log(`${colors.dim}${prefix} ${message}${colors.reset}`);
                }
                break;
            default:
                console.log(`${prefix} ${message}`);
        }
    }

    static error(message) {
        Logger.log(message, 'error');
    }

    static warn(message) {
        Logger.log(message, 'warn');
    }

    static success(message) {
        Logger.log(message, 'success');
    }

    static info(message) {
        Logger.log(message, 'info');
    }

    static debug(message) {
        Logger.log(message, 'debug');
    }

    static progress(message, current, total) {
        const { colors } = config.output;
        const percentage = Math.round((current / total) * 100);
        const progressBar = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));
        process.stdout.write(`\r${colors.cyan}${message} ${progressBar} ${percentage}%${colors.reset}`);
        if (current === total) {
            process.stdout.write('\n');
        }
    }
}

module.exports = Logger; 