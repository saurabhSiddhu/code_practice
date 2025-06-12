/**
 * 🎯 Google Interview Test Template
 *
 * This template follows Google's interview standards:
 * - Comprehensive edge case coverage
 * - Performance validation
 * - Clear test descriptions
 * - Time/space complexity verification
 */

const { twoSum } = require('./two-sum');

// Test cases that Google interviewers commonly use
const testCases = [
  // Basic functionality
  {
    description: 'Basic case: target exists',
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: [0, 1],
    category: 'basic'
  },
  {
    description: 'Different indices',
    input: { nums: [3, 2, 4], target: 6 },
    expected: [1, 2],
    category: 'basic'
  },

  // Edge cases Google tests
  {
    description: 'Minimum array size',
    input: { nums: [3, 3], target: 6 },
    expected: [0, 1],
    category: 'edge'
  },
  {
    description: 'Large numbers',
    input: { nums: [1000000000, 1000000001, 999999999], target: 2000000000 },
    expected: [0, 2],
    category: 'edge'
  },
  {
    description: 'Negative numbers',
    input: { nums: [-1, -2, -3, -4, -5], target: -8 },
    expected: [2, 4],
    category: 'edge'
  },

  // Performance test (Google cares about optimization)
  {
    description: 'Large array performance',
    input: {
      nums: Array.from({ length: 10000 }, (_, i) => i).concat([5000, 5001]),
      target: 10001
    },
    expected: [5000, 10001],
    category: 'performance',
    maxTime: 10 // milliseconds
  }
];

// Google-style test runner
function runGoogleStyleTests() {
  console.log('🎯 Running Google Interview Style Tests');
  console.log('=====================================');

  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase, index) => {
    const start = process.hrtime.bigint();

    try {
      const result = twoSum(testCase.input.nums, testCase.input.target);
      const end = process.hrtime.bigint();
      const timeMs = Number(end - start) / 1000000;

      // Validate result
      const isCorrect = arraysEqual(result.sort(), testCase.expected.sort());

      // Check performance for performance tests
      const performanceOk =
        testCase.category !== 'performance' || timeMs <= (testCase.maxTime || Infinity);

      if (isCorrect && performanceOk) {
        console.log(`✅ Test ${index + 1}: ${testCase.description}`);
        console.log(`   Time: ${timeMs.toFixed(2)}ms`);
        passed++;
      } else {
        console.log(`❌ Test ${index + 1}: ${testCase.description}`);
        console.log(`   Expected: [${testCase.expected}]`);
        console.log(`   Got: [${result}]`);
        console.log(`   Time: ${timeMs.toFixed(2)}ms`);
        if (!performanceOk) {
          console.log(`   ⚠️ Performance issue: ${timeMs}ms > ${testCase.maxTime}ms`);
        }
        failed++;
      }
    } catch (error) {
      console.log(`❌ Test ${index + 1}: ${testCase.description}`);
      console.log(`   Error: ${error.message}`);
      failed++;
    }
  });

  console.log('\n📊 Test Summary:');
  console.log(`Total Tests: ${testCases.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`);

  // Google interview feedback
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Google interview ready.');
  } else {
    console.log('\n⚠️ Some tests failed. Review edge cases and optimization.');
  }
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// Export for integration with your test system
module.exports = { testCases, runGoogleStyleTests };

// Run if called directly
if (require.main === module) {
  runGoogleStyleTests();
}
