// Question Title: Longest Palindromic Substring
// Question Number: 5
// Difficulty: Medium
// Link: https://leetcode.com/problems/longest-palindromic-substring/

/* 
Problem Description:
Given a string `s`, return the longest palindromic substring in `s`.

Examples:

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Constraints:
- `1 <= s.length <= 1000`
- `s` consists of only digits and English letters.
*/

// Solution
var longestPalindrome = function(s) {
    // If the string is empty or has one character, it's already the longest palindrome
    if (s.length <= 1) return s;

    let start = 0, maxLength = 0;

    // Helper function to expand around the center and return the length of the palindrome
    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;  // Move left pointer outward
            right++; // Move right pointer outward
        }
        return right - left - 1; // Length of the palindrome
    };

    // Iterate through the string and check for palindromes around each character
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(i, i);       // Odd-length palindrome
        let len2 = expandAroundCenter(i, i + 1);   // Even-length palindrome
        let len = Math.max(len1, len2);            // Maximum palindrome length at this center

        if (len > maxLength) {
            maxLength = len;
            start = i - Math.floor((len - 1) / 2); // Update start index of the longest palindrome
        }
    }

    // Return the substring representing the longest palindrome
    return s.substring(start, start + maxLength);
};

/* 
Explanation:

1. **Base Case**:
    - If the string has length <= 1, it is already the longest palindrome.

2. **Expand Around Center**:
    - Palindromes can be expanded around their centers. For each index `i` in the string:
        - Check for odd-length palindromes with `expandAroundCenter(i, i)`.
        - Check for even-length palindromes with `expandAroundCenter(i, i + 1)`.

3. **Update Longest Palindrome**:
    - For each center, calculate the length of the palindrome.
    - If this length is greater than the current maximum length, update `maxLength` and `start`.

4. **Return the Result**:
     - Extract the substring starting at `start` with length `maxLength` as the result.

This approach ensures an efficient runtime of O(n^2), as we expand around each character in the string.
*/