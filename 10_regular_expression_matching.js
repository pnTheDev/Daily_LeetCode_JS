// Question Title: Regular Expression Matching
// Question Number: 10
// Difficulty: Hard
// Link: https://leetcode.com/problems/regular-expression-matching/

/* 
Problem Description:
Given an input string `s` and a pattern `p`, implement regular expression matching with support for:
1. `.` Matches any single character.
2. `*` Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

Examples:

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. By repeating 'a' once, it becomes "aa".

Example 3:
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".

Constraints:
- `1 <= s.length <= 20`
- `1 <= p.length <= 20`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, '.', and '*'.
- It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/

// Solution 1: Recursive Approach without Dynamic Programming
var isMatchRecursive = function(s, p) {
    const match = (i, j) => {
        if (i >= s.length && j >= p.length) return true; // Both string and pattern consumed
        if (j >= p.length) return false; // Pattern consumed, string not

        let currentMatch = i < s.length && (s[i] === p[j] || p[j] === '.');

        if (j + 1 < p.length && p[j + 1] === '*') {
            return (
                match(i, j + 2) || // Skip '*' and preceding element
                (currentMatch && match(i + 1, j)) // Use '*' to match one or more
            );
        }

        return currentMatch ? match(i + 1, j + 1) : false;
    };

    return match(0, 0);
};

// Solution 2: Dynamic Programming
var isMatchDP = function(s, p) {
    const m = s.length;
    const n = p.length;

    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true; // Empty string matches empty pattern

    // Handle patterns with '*'
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2]; // '*' and preceding character can represent empty
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1]; // Characters match or '.' matches
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2]; // Ignore '*' and preceding element
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j]; // Match one or more
                }
            }
        }
    }

    return dp[m][n];
};

/* 
Explanation:

1. **Recursive Approach**:
    - Use a helper function to check for matches recursively.
    - Handle the '*' case by either skipping it or using it to match the current character repeatedly.

2. **Dynamic Programming**:
    - Create a DP table `dp[i][j]` where `dp[i][j]` is true if `s[0..i-1]` matches `p[0..j-1]`.
    - Base cases:
        - `dp[0][0] = true`: Both string and pattern are empty.
        - Handle patterns with '*' to match empty strings.
    - Fill the DP table:
        - If characters match or pattern has '.', copy the diagonal value.
        - For '*', consider two options:
        1. Ignore '*' and preceding character.
        2. Use '*' to match one or more characters.
    - Return `dp[m][n]` as the final result.

3. **Time Complexity**:
    - Recursive: Exponential in worst case.
    - DP: O(m * n), where `m` and `n` are lengths of `s` and `p`.

4. **Space Complexity**:
    - Recursive: O(m + n) for recursion stack.
    - DP: O(m * n) for DP table.
*/