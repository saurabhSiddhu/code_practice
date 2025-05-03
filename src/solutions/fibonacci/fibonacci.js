/**
 * Fibonacci Number
 * 
 * The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, 
 * such that each number is the sum of the two preceding ones, starting from 0 and 1.
 * F(0) = 0, F(1) = 1
 * F(n) = F(n-1) + F(n-2), for n > 1
 * 
 * Difficulty: 🟢 EASY
 * Category: dp
 * LeetCode: https://leetcode.com/problems/fibonacci-number/
 * 
 * Time Complexity:
 * O(n) where n is the input number
 * 
 * Space Complexity:
 * O(1) as we only store two previous values
 */

/**
 * Fibonacci Solution
 * Given a number n, return the nth Fibonacci number
 */
class Fibonacci {
    solve(input) {
        const n = input;
        if (n <= 1) return BigInt(n);
        
        let prev = 0n;
        let curr = 1n;
        
        for (let i = 2; i <= n; i++) {
            const next = prev + curr;
            prev = curr;
            curr = next;
        }
        
        return curr;
    }

    /**
     * Alternative solution using recursion with memoization
     * This approach is more intuitive but less space efficient
     */
    solveAlternative(input) {
        const n = input;  // Input is just a number, not an object
        const memo = new Map();
        
        function fib(n) {
            if (n <= 1) return BigInt(n);
            
            if (memo.has(n)) return memo.get(n);
            
            const result = fib(n - 1) + fib(n - 2);
            memo.set(n, result);
            return result;
        }
        
        return fib(n);
    }

    /**
     * Run performance benchmarks for both solutions
     */
    runBenchmarks() {
        const sizes = [10, 20, 30, 40, 50, 100, 200, 500, 1000];
        const results = {
            iterative: [],
            recursive: []
        };

        console.log('\nPerformance Benchmarks:\n');
        console.log('n\tIterative (ms)\tRecursive (ms)');

        for (const n of sizes) {
            // Benchmark iterative solution
            const startIterative = process.hrtime();
            this.solve(n);
            const [iterativeSec, iterativeNano] = process.hrtime(startIterative);
            const iterativeTime = (iterativeSec * 1000) + (iterativeNano / 1e6);

            // Benchmark recursive solution
            const startRecursive = process.hrtime();
            this.solveAlternative(n);
            const [recursiveSec, recursiveNano] = process.hrtime(startRecursive);
            const recursiveTime = (recursiveSec * 1000) + (recursiveNano / 1e6);

            results.iterative.push({ n, time: iterativeTime });
            results.recursive.push({ n, time: recursiveTime });

            console.log(`${n}\t${iterativeTime.toFixed(3)}\t\t${recursiveTime.toFixed(3)}`);
        }

        return results;
    }

    get testCases() {
        return [
            {
                description: "Base case n=0",
                input: 0,
                expected: 0n,
                category: "basic"
            },
            {
                description: "Base case n=1",
                input: 1,
                expected: 1n,
                category: "basic"
            },
            {
                description: "Small number n=5",
                input: 5,
                expected: 5n,
                category: "basic"
            },
            {
                description: "Medium number n=10",
                input: 10,
                expected: 55n,
                category: "edge"
            },
            {
                description: "Performance test with n=100",
                input: 100,
                expected: 354224848179261915075n,
                category: "performance",
                benchmark: {
                    name: "Large Number Performance",
                    iterations: 100
                }
            }
        ];
    }

    get performanceTests() {
        return [
            {
                description: "Iterative solution performance",
                input: 1000,
                maxTime: 0.1, // 100ms
                category: "performance"
            },
            {
                description: "Recursive solution performance",
                input: 1000,
                maxTime: 0.1, // 100ms
                category: "performance"
            }
        ];
    }
}

module.exports = Fibonacci; 