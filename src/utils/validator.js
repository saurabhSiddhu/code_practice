// Validation utilities for problem creation

class Validator {
  static validateSolutionName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Solution name is required');
    }
    if (name.length < 2) {
      throw new Error('Solution name must be at least 2 characters');
    }
    return true;
  }

  static validateDifficulty(difficulty) {
    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    const normalized = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();

    if (!validDifficulties.includes(normalized)) {
      throw new Error('Difficulty must be Easy, Medium, or Hard');
    }
    return normalized;
  }

  static validatePattern(pattern) {
    if (!pattern || pattern.trim().length === 0) {
      throw new Error('Pattern is required');
    }
    return true;
  }

  static validateLeetCodeLink(link) {
    if (!link || link.trim().length === 0) return true; // Optional
    if (link.trim().length > 0 && !link.includes('leetcode.com')) {
      throw new Error('Must be a valid LeetCode link or leave empty');
    }
    return true;
  }

  static validateTags(tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
      throw new Error('At least one tag is required');
    }
    return true;
  }

  static validateProblemStatement(statement) {
    if (!statement || statement.trim().length < 10) {
      throw new Error('Problem statement must be at least 10 characters');
    }
    return true;
  }

  static validateAll(problemInfo) {
    try {
      this.validateSolutionName(problemInfo.name);
      this.validateDifficulty(problemInfo.difficulty);
      this.validatePattern(problemInfo.pattern);
      this.validateLeetCodeLink(problemInfo.leetcodeLink);
      this.validateTags(problemInfo.tags);
      this.validateProblemStatement(problemInfo.problemStatement);
      return true;
    } catch (error) {
      console.error('Validation failed:', error.message);
      return false;
    }
  }
}

module.exports = Validator;
