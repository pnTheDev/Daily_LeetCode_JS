// Question Title: Longest Substring Without Repeating Characters
// Question Number: 3
// Difficulty: Medium
// Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/

/* 
Problem Description:
Given a string `s`, find the length of the longest substring without repeating characters.

Examples:
Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
- 0 <= s.length <= 5 * 10^4
- `s` consists of English letters, digits, symbols, and spaces.
*/

// Solution
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let tempArr = []; // Array to store characters of the current substring without repeats

    for (let i = 0; i < s.length; i++) {
        // Check if the character is already in tempArr (meaning it's a repeat)
        if (tempArr.includes(s[i])) {
            // Remove characters from the start of tempArr until the repeated character is removed
            while (tempArr.includes(s[i])) {
                tempArr.shift(); // Remove the first character in tempArr
            }
        }
        
        // Add the current character to tempArr
        tempArr.push(s[i]);
        
        // Update maxLength if the current substring is longer
        maxLength = Math.max(maxLength, tempArr.length);
    }

    return maxLength;
};

/* 
Explanation:

1. Initialize `maxLength` to keep track of the longest substring found.
2. Use `tempArr` as a sliding window to store the current substring without repeating characters.
3. For each character in `s`:
    - If the character is already in `tempArr` (indicating a repeat), remove characters from the start of `tempArr` until the repeated character is removed.
    - Add the current character to `tempArr`.
    - Update `maxLength` if `tempArr`'s length is greater than the current `maxLength`.
4. The final `maxLength` is the length of the longest substring without repeating characters.

This approach has a time complexity of O(n) due to the sliding window technique.
*/