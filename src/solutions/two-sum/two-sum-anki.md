# 🎯 Anki Cards for Two Sum

*Generated on: 6/28/2025*

---

## 📚 Quick Reference

**Problem:** Two Sum  
**Pattern:** Hash Map / Two Pointers  
**Difficulty:** Easy  
**LeetCode:** https://leetcode.com/problems/two-sum/

---

## 🔧 Questions

**Q1:** What pattern does "Two Sum" follow and when should I recognize it?

**Q2:** What are the key insights and intuition for "Two Sum"?

**Q3:** What are the different approaches for "Two Sum" and their trade-offs?

**Q4:** What is the optimal code template for "Two Sum" pattern?

**Q5:** What are the common mistakes in "Two Sum"?

**Q6:** What is the time and space complexity of "Two Sum"?

**Q7:** How should I approach "Two Sum" in an interview?

**Q8:** What are the key optimization techniques for "Two Sum"?

**Q9:** What follow-up questions might be asked for "Two Sum"?

**Q10:** What similar problems share the same pattern as "Two Sum"?

---

## 🔧 Answers

**A1:** What pattern does "Two Sum" follow and when should I recognize it?

```
Pattern: Hash Map Complement Search

Recognition Signals:
✅ Need to find pairs that satisfy a condition
✅ Looking for complement/target relationship
✅ One-pass solution requirement hints at hashing
✅ Array + target sum = classic hash map scenario

When to use: Finding pairs, complements, or when you need O(1) lookups
```

**A2:** What are the key insights and intuition for "Two Sum"?

```
🧠 Key Insights:
💡 Instead of checking every pair, store what you've seen
💡 For each number, check if its complement exists
💡 Hash map gives O(1) lookup for complement checking

🎯 Intuition:
- Natural approach: Check every pair (O(n²))
- Mathematical insight: target - current = complement needed
- Visual understanding: Walking through array, remembering previous numbers
- Real-world analogy: Phone book lookup - instant access to stored info

🔑 Mental Model:
"Have I seen the number that would complete this sum?"
```

**A3:** What are the different approaches for "Two Sum" and their trade-offs?

```
Approach 1: Brute Force
├── Description: Check all pairs with nested loops
├── Time: O(n²) | Space: O(1)
├── Pros: Simple, no extra space
└── Cons: Too slow for large inputs

Approach 2: Two Pointers (sorted)
├── Description: Sort array, use left/right pointers
├── Time: O(n log n) | Space: O(n) for tracking indices
├── Pros: Space efficient after sorting
└── Cons: Loses original indices, sorting overhead

Approach 3: Hash Map (Optimal)
├── Description: Store number->index mapping, check complements
├── Time: O(n) | Space: O(n)
├── Pros: Optimal time, preserves indices
└── Cons: Extra space for hash map

💡 Progression: Brute Force → Sorting + Two Pointers → Hash Map
```

**A4:** What is the optimal code template for "Two Sum" pattern?

```javascript
// Universal Hash Map Complement Template
function twoSum(nums, target) {
    const seen = new Map(); // number -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        
        seen.set(nums[i], i);
    }
    
    return []; // No solution found
}

// Key Template Elements:
// 1. Create hash map for O(1) lookups
// 2. Calculate complement for current element
// 3. Check if complement exists before adding current
// 4. Store value->index mapping
```

**A5:** What are the common mistakes in "Two Sum"?

```
❌ Common Mistakes:
- Adding element to map BEFORE checking complement (uses same element twice)
- Returning values instead of indices
- Not handling duplicate numbers correctly
- Assuming solution always exists (not checking bounds)

✅ Correct Approach:
- Check complement first, then add current element
- Store and return indices, not values
- Map handles duplicates naturally (overwrites previous index)
- Handle edge cases gracefully
```

**A6:** What is the time and space complexity of "Two Sum"?

```
Hash Map Approach (Optimal):
📊 Time Complexity: O(n)
   - Single pass through array
   - O(1) hash map operations

📊 Space Complexity: O(n)
   - Hash map stores up to n elements
   - Worst case: no solution found, store all elements

📊 Best Case: O(1) space if solution found early
📊 Average Case: O(n/2) space
```

**A7:** How should I approach "Two Sum" in an interview?

```
🎯 Interview Strategy:
1. "I see this is a two-sum problem - let me think about approaches"
2. "Brute force is O(n²) - can we do better?"
3. "I need fast lookups - hash map gives O(1) access"
4. "Let me trace through an example..."
5. "Edge cases: duplicates, no solution, array length < 2"

🗣️ Communication Tips:
- Mention brute force first, then optimize
- Explain the complement insight clearly
- Walk through the algorithm step-by-step
- Discuss trade-offs between time and space
```

**A8:** What are the key optimization techniques for "Two Sum"?

```
🚀 Optimization Techniques:
1. Single Pass: Check complement before adding (not two passes)
2. Early Return: Return immediately when solution found
3. Efficient Storage: Map stores only what's needed
4. Input Validation: Quick checks for impossible cases

🧠 Memory Optimization:
- Could use sorting + two pointers for O(1) extra space
- Trade-off: O(n log n) time vs O(n) space

🔄 Variations:
- Two Sum II (sorted array) → Two pointers optimal
- Two Sum III (data structure) → Different storage strategy
```

**A9:** What follow-up questions might be asked for "Two Sum"?

```
🤔 Common Follow-ups:
1. "What if the array is sorted?" → Two pointers approach
2. "What if we want all pairs?" → Continue search, avoid duplicates
3. "What about Three Sum?" → Fix one element, two sum on rest
4. "Memory constraints?" → Sorting + two pointers
5. "What if numbers are very large?" → Overflow considerations
6. "Multiple solutions exist?" → Return all or first found

🎯 Advanced Variations:
- Two Sum closest to target
- Two Sum in BST
- Two Sum with k numbers
```

**A10:** What similar problems share the same pattern as "Two Sum"?

```
🔗 Related Problems:
1. Three Sum → Fix one element + Two Sum
2. Four Sum → Nested Two Sum approach
3. Two Sum II (sorted) → Two pointers variant
4. Subarray Sum Equals K → Prefix sum + hash map
5. Container With Most Water → Two pointers optimization
6. Valid Anagram → Character frequency mapping
7. Group Anagrams → Hash map grouping

🎯 Pattern Family: "Complement Search"
- Any problem requiring fast lookups of complements
- Pair-finding problems with target conditions
- Frequency counting and lookup combinations
```

---

## 🎯 Memory Aids

**🧠 Remember:** "Hash map for complements, check before you add!"

**🔑 Key Formula:** `complement = target - current`

**⚡ Quick Check:** Can I solve this with a hash map in one pass?
