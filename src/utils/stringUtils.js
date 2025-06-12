// String utility functions for problem creation

class StringUtils {
  static toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');
  }

  static toTitleCase(str) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  static formatTags(tags) {
    return tags.map((tag) => `\`${tag}\``).join(' ');
  }

  static getDifficultyColor(difficulty) {
    const colors = {
      Easy: 'green',
      Medium: 'yellow',
      Hard: 'red'
    };
    return colors[difficulty] || 'gray';
  }
}

module.exports = StringUtils;
