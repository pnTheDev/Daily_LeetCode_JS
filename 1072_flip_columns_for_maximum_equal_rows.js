// Question Title: Flip Columns For Maximum Number of Equal Rows
// Question Number: 1072
// Difficulty: Medium
// Link: https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows/

/* 
Problem Description:
You are given an `m x n` binary matrix `matrix`.

You can choose any number of columns in the matrix and flip every cell in that column (i.e., change the value of the cell from `0` to `1` or vice versa).

Return the maximum number of rows that have all values equal after some number of flips.

Examples:

Example 1:
Input: matrix = [[0,1],[1,1]]
Output: 1
Explanation: After flipping no values, 1 row has all values equal.

Example 2:
Input: matrix = [[0,1],[1,0]]
Output: 2
Explanation: After flipping values in the first column, both rows have equal values.

Example 3:
Input: matrix = [[0,0,0],[0,0,1],[1,1,0]]
Output: 2
Explanation: After flipping values in the first two columns, the last two rows have equal values.

Constraints:
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` is either `0` or `1`.
*/

// Solution
var maxEqualRowsAfterFlips = function(matrix) {
    const patterns = new Map();

    for (let row of matrix) {
        // Normalize row based on its first element
        let normalized = row.map(val => val === row[0] ? 0 : 1).join('');

        // Count occurrences of each normalized pattern
        patterns.set(normalized, (patterns.get(normalized) || 0) + 1);
    }

    // Find the maximum frequency
    let maxRows = 0;
    for (let count of patterns.values()) {
        maxRows = Math.max(maxRows, count);
    }

    return maxRows;
};

/* 
Explanation:

1. **Normalization**:
    - For each row in the matrix, create a "normalized" version of the row:
        - If a cell matches the first cell of the row, it is normalized to `0`.
        - Otherwise, it is normalized to `1`.
    - This ensures that all rows that can be made equal by flipping columns have the same normalized pattern.

2. **Count Patterns**:
    - Use a `Map` to count the occurrences of each normalized pattern.

3. **Find Maximum Rows**:
    - Iterate through the `Map` to find the maximum frequency of any normalized pattern, which corresponds to the maximum number of rows that can be made equal.

4. **Time Complexity**:
   - O(m * n): We process each row and each cell once.

5. **Space Complexity**:
   - O(m * n): Space used for storing the normalized patterns.

This approach efficiently determines the maximum number of rows that can be made equal by flipping columns.
*/