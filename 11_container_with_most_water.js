// Question Title: Container With Most Water
// Question Number: 11
// Difficulty: Medium
// Link: https://leetcode.com/problems/container-with-most-water/

/* 
Problem Description:
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Examples:

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation:
- The max area of water the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1

Constraints:
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`
*/

// Solution
var maxArea = function(height) {
    let left = 0; // Pointer at the beginning of the array
    let right = height.length - 1; // Pointer at the end of the array
    let maxArea = 0; // Variable to track the maximum area

    while (left < right) {
        // Calculate the current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;

        // Update maxArea if the current area is larger
        maxArea = Math.max(maxArea, currentArea);

        // Move the pointer of the smaller height inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea; // Return the maximum area found
};

/* 
Explanation:

1. **Two-Pointer Approach**:
    - Start with two pointers, one at the beginning (`left`) and one at the end (`right`) of the array.
    - Calculate the area of the container formed by the lines at `left` and `right` pointers and the x-axis.
    - Update the maximum area if the current area is larger.

2. **Optimizing the Search**:
    - Always move the pointer with the smaller height inward, as this is the only way to potentially find a larger area.

3. **Time Complexity**:
    - O(n): The two-pointer approach ensures that we traverse the array only once.

4. **Space Complexity**:
    - O(1): No additional space is used apart from a few variables.

This approach ensures an efficient solution for finding the maximum water container area.
*/