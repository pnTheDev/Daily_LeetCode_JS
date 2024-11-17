// Question Title: Reverse Integer
// Question Number: 7
// Difficulty: Medium
// Link: https://leetcode.com/problems/reverse-integer/

/* 
Problem Description:
Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, return `0`.

Assume the environment does not allow you to store 64-bit integers.

Examples:

Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21

Constraints:
- `-2^31 <= x <= 2^31 - 1`
*/

// Solution
var reverse = function(x) {
    const INT_MIN = -(2 ** 31); // Minimum 32-bit signed integer
    const INT_MAX = 2 ** 31 - 1; // Maximum 32-bit signed integer

    // Check if the number is negative and work with its absolute value
    let isNegative = x < 0;
    let str = Math.abs(x).toString().split(''); // Convert to string and split into characters
    
    let start = 0;
    let end = str.length - 1;

    // Reverse the string by swapping characters from both ends
    while (start < end) {
        let temp = str[start];
        str[start] = str[end];
        str[end] = temp;
        start++;
        end--;
    }

    // Convert the reversed string back to a number
    let reversed = parseInt(str.join(''), 10);

    // Restore the sign
    if (isNegative) reversed = -reversed;

    // Return 0 if the reversed number is out of the 32-bit signed integer range
    return reversed >= INT_MIN && reversed <= INT_MAX ? reversed : 0;
};

/* 
Explanation:

1. **32-bit Signed Integer Range**:
    - The problem constraints ensure that the reversed integer must stay within the range `[-2^31, 2^31 - 1]`. If it goes out of this range, return `0`.

2. **Convert to String**:
    - Convert the number to its absolute value, then to a string to reverse the digits easily.

3. **Reverse the Digits**:
    - Use two pointers (`start` and `end`) to swap the digits from both ends of the string until they meet in the middle.

4. **Restore the Sign**:
    - If the original number was negative, apply the negative sign to the reversed number.

5. **Check Range**:
    - If the reversed number exceeds the 32-bit signed integer range, return `0`. Otherwise, return the reversed number.

6. **Edge Cases**:
    - Single-digit numbers: Remain the same when reversed.
    - Large numbers: Return `0` if the reversed number is out of bounds.

This solution efficiently handles the problem within O(n) time complexity, where `n` is the number of digits in `x`.
*/