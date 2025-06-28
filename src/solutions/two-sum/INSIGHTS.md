# Two Sum - Interview Notes

## 🔧 Pattern/Category

Hash Map / Complement Search

## 🔑 Key Insight

**Transform nested loop into single pass**: Instead of checking every pair O(n²), store what you've seen and check for complements O(n).

**Critical Realization**: The insight isn't just "use a hash map" - it's "store as you go and look for what you need." This transforms a search problem into a lookup problem.

## 🧠 Intuition

**Natural Approach**: Check every possible pair (i,j) to see if nums[i] + nums[j] = target.

**Optimized Insight**: For each number X, I need target - X. Instead of searching for it every time, remember what I've seen. Hash map gives O(1) lookup.

**Mental Model**: "Have I seen the number that would complete this sum before?"

## ⚠️ Common Mistakes

- **Adding before checking**: Adding current element to map before checking for complement (uses same element twice)
- **Returning values instead of indices**: Problem asks for indices, not the numbers themselves
- **Assuming sorted input**: Don't sort unless using two-pointers approach (loses original indices)
- **Not handling duplicates properly**: Map naturally handles this by overwriting previous index
- **Edge case negligence**: Not considering array length < 2, or no solution exists

## 📋 Template/Pattern

```javascript
// Hash Map Complement Pattern:
// 1. Create hash map to store number -> index mapping
// 2. For each element, calculate complement = target - current
// 3. Check if complement exists in map before adding current
// 4. If found, return [complement_index, current_index]
// 5. Add current element to map for future lookups
```

## 🔄 Different Ways to Solve

1. **Brute Force**: Nested loops checking all pairs → O(n²) time, O(1) space
2. **Hash Map (Optimal)**: Single pass with complement lookup → O(n) time, O(n) space ⭐
3. **Two Pointers**: Sort + two pointers → O(n log n) time, O(n) space (loses original indices)

## 🌍 Real World Analogies

- **Phone Book Lookup**: Instead of calling everyone to ask if they know someone, keep a phone book for instant lookup
- **Shopping Cart**: Looking for items that add up to budget - check if you've seen the "missing piece" before
- **Dance Partners**: Finding pairs that work together - remember who you've met while looking for perfect match

## 🔗 Similar Problems

- **Three Sum** → Fix one element, apply Two Sum on the rest
- **Four Sum** → Nested Two Sum approach  
- **Two Sum II (Sorted Array)** → Two pointers approach optimal
- **Subarray Sum Equals K** → Prefix sum + hash map variation
- **Valid Anagram** → Character frequency mapping
- **Group Anagrams** → Hash map for grouping by pattern

## ❓ Follow-up Questions

- "What if array is sorted?" → Two pointers approach is more space efficient
- "What if we want all pairs?" → Continue search, handle duplicates carefully
- "What about Three Sum?" → Fix one element, Two Sum on remainder
- "What if input has duplicates?" → Hash map naturally handles by overwriting index
- "What if no solution guaranteed?" → Return empty array or handle gracefully
- "What about very large numbers?" → Consider integer overflow in some languages

## 🚨 Google Interview Red Flags Avoided

- ✅ **Pattern Recognition**: Identified complement search pattern immediately
- ✅ **Optimal Approach**: O(n) hash map solution, not O(n²) brute force
- ✅ **Edge Case Handling**: Check array length, handle no solution case
- ✅ **Index Management**: Return indices not values, handle duplicates correctly
- ✅ **Space/Time Trade-off**: Justify O(n) space for O(n) time improvement

## 🎯 Key Interview Talking Points

- **Why hash map works**: O(1) average lookup time for complements
- **Why check before adding**: Prevents using same element twice
- **Trade-offs**: O(n) space for O(n) time vs O(1) space for O(n²) time
- **Pattern extension**: How this approach scales to Three Sum, Four Sum, etc.
- **Alternative approaches**: When two pointers might be preferred (sorted input, space constraints)
