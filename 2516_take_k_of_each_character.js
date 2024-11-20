// Question Title: Take K of Each Character From Left and Right
// Question Number: 2516
// Difficulty: Medium
// Link: https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/

/* 
Problem Description:
You are given a string `s` consisting of the characters 'a', 'b', and 'c', and a non-negative integer `k`. 

Each minute, you may take either the leftmost character of `s` or the rightmost character of `s`.

Return the minimum number of minutes needed for you to take at least `k` of each character, or return `-1` if it is not possible.

Examples:

Example 1:
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation:
- Take 3 characters from the left: ['a', 'a', 'b'].
- Take 5 characters from the right: ['a', 'c', 'a', 'a', 'b'].
- This gives 4 'a', 2 'b', and 2 'c' in 3 + 5 = 8 minutes.

Example 2:
Input: s = "a", k = 1
Output: -1
Explanation:
- It's impossible to take one 'b' or 'c', so return -1.

Constraints:
- `1 <= s.length <= 10^5`
- `s` consists of only the letters 'a', 'b', and 'c'.
- `0 <= k <= s.length`
*/

// Solution
var takeCharacters = function(s, k) {
    const n = s.length;

    // Count the total occurrences of 'a', 'b', and 'c'
    const count = { a: 0, b: 0, c: 0 };
    for (let char of s) {
        count[char]++;
    }

    // If any character is less than k, it's not possible
    if (count.a < k || count.b < k || count.c < k) {
        return -1;
    }

    // Sliding window to find the largest middle section that we can keep
    let left = 0, maxMiddle = 0;
    const current = { a: 0, b: 0, c: 0 };

    for (let right = 0; right < n; right++) {
        current[s[right]]++;

        // While the middle section doesn't allow us to take `k` from both sides
        while (current.a > count.a - k || current.b > count.b - k || current.c > count.c - k) {
            current[s[left]]--;
            left++;
        }

        // Update the maximum size of the middle section
        maxMiddle = Math.max(maxMiddle, right - left + 1);
    }

    // The minimum characters to take is the total length minus the largest middle section
    return n - maxMiddle;
};

/* 
Explanation:

1. **Character Count Check**:
    - Count the occurrences of 'a', 'b', and 'c' in the string.
    - If any character has less than `k` occurrences, return `-1` as it's impossible to take `k` of that character.

2. **Sliding Window Technique**:
    - Use a sliding window to determine the largest "middle section" of the string that can be kept while ensuring `k` characters can be taken from both sides.
    - Maintain a `current` count of characters in the sliding window and shrink the window from the left if the condition (`current.a > count.a - k`, etc.) is violated.

3. **Calculate Result**:
    - Subtract the size of the largest middle section from the total length of the string to determine the minimum number of characters that need to be taken.

4. **Time Complexity**:
    - O(n): The solution iterates through the string once while maintaining the sliding window.
    - O(1) space for counting, apart from the input and output.

5. **Edge Cases**:
    - If `k == 0`, no characters need to be taken, so the result is `0`.
    - If the string is too short to take `k` characters of any type, return `-1`.
*/