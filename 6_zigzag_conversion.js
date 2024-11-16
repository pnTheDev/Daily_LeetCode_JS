// Question Title: Zigzag Conversion
// Question Number: 6
// Difficulty: Medium
// Link: https://leetcode.com/problems/zigzag-conversion/

/* 
Problem Description:
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:

P   A   H   N
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows.

Examples:

Example 1:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Example 2:
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I

Example 3:
Input: s = "A", numRows = 1
Output: "A"

Constraints:
- `1 <= s.length <= 1000`
- `s` consists of English letters (lower-case and upper-case), ',' and '.'.
- `1 <= numRows <= 1000`
*/

// Solution
var convert = function(s, numRows) {
    // If the number of rows is 1 or the string is too short, return the original string
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }

    // Initialize rows as an array of empty strings
    const rows = new Array(numRows).fill("");
    let currentRow = 0; // Pointer to track the current row
    let goingDown = false; // Direction flag for zigzag traversal

    // Iterate through each character in the string
    for (const char of s) {
        rows[currentRow] += char; // Add the character to the current row

        // Change direction when reaching the top or bottom row
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }

        // Move to the next row based on direction
        currentRow += goingDown ? 1 : -1;
    }

    // Combine all rows into a single string and return
    return rows.join("");
};

/* 
Explanation:

1. **Base Cases**:
    - If `numRows` is 1 or `s.length <= numRows`, return the original string as zigzag conversion is not needed.

2. **Row Initialization**:
    - Create an array `rows` of size `numRows` to store characters for each row in the zigzag pattern.

3. **Zigzag Traversal**:
    - Use a pointer `currentRow` to track the current row.
    - Use a flag `goingDown` to determine whether to move down or up in the zigzag pattern.
    - Iterate through the characters in `s`:
        - Add the character to the current row.
        - Change direction (`goingDown`) if at the top (`currentRow === 0`) or bottom (`currentRow === numRows - 1`).

4. **Combine Rows**:
     - Concatenate all rows into a single string using `join("")` and return it.

This approach efficiently builds the zigzag pattern and concatenates it into the final result in O(n) time complexity, where `n` is the length of the input string.
*/