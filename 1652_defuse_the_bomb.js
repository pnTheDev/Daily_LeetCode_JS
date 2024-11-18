// Question Title: Defuse the Bomb
// Question Number: 1652
// Difficulty: Easy
// Link: https://leetcode.com/problems/defuse-the-bomb/

/* 
Problem Description:
You have a bomb to defuse, and your informer will provide you with a circular array `code` of length `n` and a key `k`.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously:
- If `k > 0`, replace the `i-th` number with the sum of the next `k` numbers.
- If `k < 0`, replace the `i-th` number with the sum of the previous `k` numbers.
- If `k == 0`, replace the `i-th` number with `0`.

As `code` is circular:
- The next element of `code[n-1]` is `code[0]`.
- The previous element of `code[0]` is `code[n-1]`.

Return the decrypted code to defuse the bomb.

Examples:

Example 1:
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation:
- Each number is replaced by the sum of the next 3 numbers.
- Decrypted code = [7+1+4, 1+4+5, 4+5+7, 5+7+1].

Example 2:
Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation:
- When `k` is zero, all numbers are replaced by `0`.

Example 3:
Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation:
- Decrypted code = [3+9, 2+3, 4+2, 9+4].

Constraints:
- `n == code.length`
- `1 <= n <= 100`
- `1 <= code[i] <= 100`
- `-(n - 1) <= k <= n - 1`
*/

// Solution
var decrypt = function(code, k) {
    const n = code.length;
    const result = new Array(n).fill(0);

    if (k === 0) {
        return result; // If k == 0, replace all numbers with 0
    }

    for (let i = 0; i < n; i++) {
        let total = 0;
        if (k > 0) {
            // Sum of the next k numbers
            for (let j = 1; j <= k; j++) {
                total += code[(i + j) % n]; // Circular indexing
            }
        } else {
            // Sum of the previous k numbers
            for (let j = 1; j <= Math.abs(k); j++) {
                total += code[(i - j + n) % n]; // Circular indexing for negatives
            }
        }
        result[i] = total;
    }

    return result;
};

/* 
Explanation:

1. **Base Case**:
    - If `k == 0`, all elements in the result array are `0`. Return an array of zeros.

2. **Circular Indexing**:
    - Use modulo (`% n`) to wrap around indices when summing the next or previous elements.

3. **Key Scenarios**:
    - For `k > 0`, sum the next `k` elements starting from the current index.
    - For `k < 0`, sum the previous `k` elements. Use `(i - j + n) % n` to handle circular indexing correctly.

4. **Time Complexity**:
   - The solution has a time complexity of O(n * |k|), where `n` is the length of the array and `|k|` is the absolute value of `k`.

5. **Space Complexity**:
    - The space complexity is O(n) due to the result array.

This implementation efficiently handles circular arrays and varying values of `k` while maintaining clarity and correctness.
*/