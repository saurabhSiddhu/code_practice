class StringUtils {
    static toKebabCase(str) {
        return str
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    static toTitleCase(str) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    static getDifficultyColor(difficulty) {
        const colors = {
            Easy: 'green',
            Medium: 'yellow',
            Hard: 'red'
        };
        return colors[difficulty] || 'blue';
    }

    static formatTags(tags) {
        return tags.map(tag => `\`${tag}\``).join(', ');
    }

    static formatTestCases(testCases) {
        return testCases.map(testCase => {
            const { description, input, expected, explanation } = testCase;
            return `// ${description}
Input: ${JSON.stringify(input)}
Output: ${JSON.stringify(expected)}
${explanation ? `Explanation: ${explanation}` : ''}`;
        }).join('\n\n');
    }
}

module.exports = StringUtils; 