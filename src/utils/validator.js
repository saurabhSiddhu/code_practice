const Logger = require('./logger');

class Validator {
    static validateSolutionName(name) {
        if (!name) {
            throw new Error('Solution name is required');
        }

        if (typeof name !== 'string') {
            throw new Error('Solution name must be a string');
        }

        if (name.length < 3) {
            throw new Error('Solution name must be at least 3 characters long');
        }

        if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
            throw new Error('Solution name can only contain letters, numbers, spaces, and hyphens');
        }
    }

    static validateDifficulty(difficulty) {
        const validDifficulties = ['Easy', 'Medium', 'Hard'];
        if (!validDifficulties.includes(difficulty)) {
            throw new Error(`Difficulty must be one of: ${validDifficulties.join(', ')}`);
        }
    }

    static validatePattern(pattern) {
        if (!pattern) {
            throw new Error('Pattern is required');
        }

        if (typeof pattern !== 'string') {
            throw new Error('Pattern must be a string');
        }

        if (pattern.length < 2) {
            throw new Error('Pattern must be at least 2 characters long');
        }
    }

    static validateLeetCodeLink(link) {
        if (link && typeof link !== 'string') {
            throw new Error('LeetCode link must be a string');
        }

        if (link && !link.startsWith('https://leetcode.com/problems/')) {
            throw new Error('Invalid LeetCode problem link');
        }
    }

    static validateTags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error('Tags must be an array');
        }

        if (tags.length === 0) {
            throw new Error('At least one tag is required');
        }

        tags.forEach(tag => {
            if (typeof tag !== 'string') {
                throw new Error('Each tag must be a string');
            }

            if (tag.length < 2) {
                throw new Error('Each tag must be at least 2 characters long');
            }
        });
    }

    static validateProblemStatement(statement) {
        if (!statement) {
            throw new Error('Problem statement is required');
        }

        if (typeof statement !== 'string') {
            throw new Error('Problem statement must be a string');
        }

        if (statement.length < 10) {
            throw new Error('Problem statement must be at least 10 characters long');
        }
    }

    static validateAll(problemInfo) {
        try {
            Validator.validateSolutionName(problemInfo.name);
            Validator.validateDifficulty(problemInfo.difficulty);
            Validator.validatePattern(problemInfo.pattern);
            Validator.validateLeetCodeLink(problemInfo.leetcodeLink);
            Validator.validateTags(problemInfo.tags);
            Validator.validateProblemStatement(problemInfo.problemStatement);
            return true;
        } catch (error) {
            Logger.error(error.message);
            return false;
        }
    }
}

module.exports = Validator; 