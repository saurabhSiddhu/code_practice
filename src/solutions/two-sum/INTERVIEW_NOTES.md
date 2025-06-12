# two-sum - Interview Notes

## 🔧 Pattern/Category

Hash Table / Complement Search

## 🔑 Key Insight

Instead of checking every pair (O(n²)), store each number as you go and check if its complement exists

## 🧠 Intuition

Think of it as "I need X to make the target. Have I seen X before?" Use a hash table as your memory.

## ⚠️ Common Mistake

- Returning same element twice (index i with itself)
- Forgetting to check if complement exists before accessing
- Not handling the case where complement comes later in array

## 📋 Template/Pattern

```javascript
// Hash Table Complement Pattern:
// 1. Create hash/map to store seen values
// 2. For each element, calculate what we need (complement)
// 3. Check if complement exists in hash
// 4. If yes: return result, if no: store current element
```

## 🔄 Different Ways to Solve

1. **Brute Force**: Nested loops, check all pairs - O(n²) time, O(1) space
2. **Hash Table**: One pass with complement lookup - O(n) time, O(n) space
3. **Two Pointers**: Only works if array is sorted - O(n log n) time due to sorting
4. **Sort + Binary Search**: Sort array, then for each element binary search for complement

## 🌍 Real World Analogies

- **Party Planning**: "I need 5 more people. Have I already invited someone who brings 5 friends?"
- **Puzzle Pieces**: Looking for the piece that completes your current piece
- **Making Change**: "I need to make $7. I have $3, do I have a $4 bill somewhere?"
- **DNA Matching**: Finding complementary base pairs (A-T, G-C)

## 🔗 Similar Problems

- **Three Sum** - Same hash table concept but with triplets
- **Two Sum II (Sorted Array)** - Two pointers approach on sorted array
- **Four Sum** - Extension to quadruplets
- **Pair with Target Sum** - Generic version of the pattern
- **Two Sum BST** - Same concept applied to tree structure

## ❓ Follow-up Questions

- "What if the array is sorted?" → Two pointers approach
- "What if we need all pairs instead of just one?" → Modified logic to collect all
- "What if we can't use extra space?" → Sort array + two pointers
- "What if numbers can repeat?" → Handle duplicate indices
- "What about Three Sum or Four Sum?" → Extend the pattern

## 📊 Complexity

- **Time**: O(n) - single pass through array
- **Space**: O(n) - hash table stores up to n elements

## 🎯 Interview Tips

- Start with brute force approach to show you understand the problem
- Mention the trade-off: time vs space (O(n²)/O(1) vs O(n)/O(n))
- Edge cases: empty array, no solution exists, duplicate numbers
- Follow-up: "What if we can't use extra space?" → Two pointers on sorted array

## 📅 Solved On

12/6/2025

---

_These notes will help you recognize and solve similar problems in interviews_
