// Question Title: String to Integer (atoi)
// Question Number: 8
// Difficulty: Medium
// Link: https://leetcode.com/problems/string-to-integer-atoi/

/* 
Problem Description:
Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:
1. Ignore any leading whitespace.
2. Check the sign of the number by reading the next character (`'-'` or `'+'`). Assume positive if no sign is present.
3. Read the digits and stop when a non-digit character is encountered or the end of the string is reached. If no digits are read, the result is `0`.
4. Ensure the result fits within the 32-bit signed integer range:
    - Clamp values less than `-2^31` to `-2^31`.
    - Clamp values greater than `2^31 - 1` to `2^31 - 1`.

Examples:

Example 1:
Input: s = "42"
Output: 42

Example 2:
Input: s = "   -042"
Output: -42

Example 3:
Input: s = "1337c0d3"
Output: 1337

Example 4:
Input: s = "0-1"
Output: 0

Example 5:
Input: s = "words and 987"
Output: 0

Constraints:
- `0 <= s.length <= 200`
- `s` consists of English letters, digits (0-9), ' ', '+', '-', and '.'.
*/

// Solution
var myAtoi = function(s) {
    const INT_MIN = -(2 ** 31); // Minimum value for a 32-bit signed integer
    const INT_MAX = 2 ** 31 - 1; // Maximum value for a 32-bit signed integer

    let i = 0;
    let n = s.length;
    let sign = 1;
    let result = 0;

    // Step 1: Ignore leading whitespace
    while (i < n && s[i] === ' ') {
        i++;
    }

    // Step 2: Check the sign
    if (i < n && (s[i] === '-' || s[i] === '+')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    // Step 3: Convert digits to integer
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = s[i].charCodeAt(0) - '0'.charCodeAt(0);

        // Check for overflow/underflow
        if (result > Math.floor((INT_MAX - digit) / 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }

        result = result * 10 + digit;
        i++;
    }

    // Step 4: Apply the sign and return the result
    return result * sign;
};

/* 
Explanation:

1. **Ignore Leading Whitespace**:
    - Skip all leading whitespace characters (`' '`).

2. **Determine Sign**:
    - Read the next character to determine the sign. If it is `'-'`, set the `sign` to `-1`. If it is `'+'`, set the `sign` to `1`.

3. **Read Digits**:
    - Iterate through the string and convert consecutive digits into an integer. Stop reading when encountering a non-digit character.

4. **Check for Overflow**:
    - Before adding each digit to `result`, ensure the result won't exceed the 32-bit integer range.

5. **Return Result**:
    - Multiply the result by `sign` and return it.

6. **Edge Cases**:
    - Strings with no valid digits: Return `0`.
    - Overflow/underflow: Clamp the value to the 32-bit signed integer range.
    - Mixed characters: Stop reading at the first non-digit character.

This approach ensures an efficient runtime of O(n), where `n` is the length of the input string.
*/