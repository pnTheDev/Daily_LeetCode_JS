// Question Title: Integer to Roman
// Question Number: 12
// Difficulty: Medium
// Link: https://leetcode.com/problems/integer-to-roman/

/* 
Problem Description:
Seven different symbols represent Roman numerals with the following values:

Symbol  Value
I       1
V       5
X       10
L       50
C       100
D       500
M       1000

Given an integer `num`, convert it to a Roman numeral.

Examples:

Example 1:
Input: num = 3749
Output: "MMMDCCXLIX"
Explanation:
3000 = MMM (1000 + 1000 + 1000)
700 = DCC (500 + 100 + 100)
40 = XL (10 less than 50)
9 = IX (1 less than 10)

Example 2:
Input: num = 58
Output: "LVIII"
Explanation:
50 = L
8 = VIII

Example 3:
Input: num = 1994
Output: "MCMXCIV"
Explanation:
1000 = M
900 = CM (100 less than 1000)
90 = XC (10 less than 100)
4 = IV (1 less than 5)

Constraints:
- `1 <= num <= 3999`
*/

// Solution
var intToRoman = function(num) {
    // Define Roman numerals and their corresponding values in descending order
    const romanSymbols = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];

    let result = [];

    // Iterate over the symbol-value pairs
    for (let [symbol, value] of romanSymbols) {
        // Append the symbol to the result as many times as possible
        while (num >= value) {
            result.push(symbol);
            num -= value;
        }
    }

    // Join the result array into a single string
    return result.join('');
};

/* 
Explanation:

1. **Roman Numeral Mapping**:
    - The symbols and their corresponding values are defined in descending order.

2. **Iterative Conversion**:
    - For each symbol-value pair, check how many times the value can be subtracted from `num`.
    - Append the symbol to the result for each subtraction and reduce `num` accordingly.

3. **Edge Cases**:
    - Subtractive forms like "CM" (900), "XL" (40), and "IV" (4) are handled naturally as they appear in the mapping in the correct order.

4. **Time Complexity**:
    - O(1): The loop iterates over a constant number of symbols (13).

5. **Space Complexity**:
    - O(1): The space used is constant, excluding the output string.

This approach ensures that the Roman numeral conversion is efficient and adheres to the rules.
*/