// Question Title: Palindrome Number
// Question Number: 9
// Difficulty: Easy
// Link: https://leetcode.com/problems/palindrome-number/

/* 
Problem Description:
Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

A number is a palindrome if it reads the same backward as forward.

Examples:

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Constraints:
- `-2^31 <= x <= 2^31 - 1`
*/

// Solution
var isPalindrome = function(x) {
    // Convert the number to a string
    let st = x.toString();

    // Get the length of the string
    let len = st.length;

    // Check characters from both ends
    for (let i = 0; i < Math.floor(len / 2); i++) {
        // Compare the i-th character from the start and the end
        if (st[i] !== st[len - 1 - i]) {
            return false; // Not a palindrome if characters don't match
        }
    }

    return true; // All characters matched, it is a palindrome
};

/* 
Explanation:

1. **Convert to String**:
    - Convert the integer `x` into a string to easily compare characters.

2. **Check Characters from Both Ends**:
    - Use a loop to compare the i-th character from the start with the i-th character from the end.
    - If any characters don’t match, return `false`.

3. **Return Result**:
    - If all characters match, return `true`, indicating that the number is a palindrome.

4. **Edge Cases**:
    - Negative numbers are not palindromes because of the leading `-` sign.
    - Single-digit numbers are always palindromes.

5. **Time Complexity**:
    - O(n), where `n` is the number of digits in `x`, since we loop through half of the string.

6. **Space Complexity**:
    - O(1), as the algorithm uses constant additional space apart from the input and output.
*/