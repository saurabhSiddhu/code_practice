const fs = require('fs');
const path = require('path');
const config = require('../config/index');

class FileUtils {
    static ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    static writeFile(filePath, content) {
        FileUtils.ensureDirectoryExists(path.dirname(filePath));
        fs.writeFileSync(filePath, content);
    }

    static readFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    static fileExists(filePath) {
        return fs.existsSync(filePath);
    }

    static getSolutionPath(solutionName) {
        return path.join(config.paths.solutions, solutionName);
    }

    static getSolutionFilePath(solutionName) {
        return path.join(FileUtils.getSolutionPath(solutionName), `${solutionName}.js`);
    }

    static getTestFilePath(solutionName) {
        return path.join(FileUtils.getSolutionPath(solutionName), `${solutionName}.test.js`);
    }

    static getReadmeFilePath(solutionName) {
        return path.join(FileUtils.getSolutionPath(solutionName), 'README.md');
    }

    static getTemplate(templateName) {
        return config.solution.template[templateName];
    }

    static replaceTemplateVariables(template, variables) {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
            result = result.replace(new RegExp(`{${key}}`, 'g'), value);
        }
        return result;
    }
}

module.exports = FileUtils; 