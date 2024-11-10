// Question Title: Shortest Subarray With OR at Least K II
// Question Number: 3097
// Difficulty: Medium
// Link: https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/

/* 
Problem Description:
You are given an array nums of non-negative integers and an integer k.

An array is called special if the bitwise OR of all of its elements is at least k.

Return the length of the shortest special non-empty subarray of nums, or return -1 if no special subarray exists.

Examples:
Example 1:
Input: nums = [1,2,3], k = 2
Output: 1
Explanation: The subarray [3] has OR value of 3. Hence, we return 1.

Example 2:
Input: nums = [2,1,8], k = 10
Output: 3
Explanation: The subarray [2,1,8] has OR value of 11. Hence, we return 3.

Example 3:
Input: nums = [1,2], k = 0
Output: 1
Explanation: The subarray [1] has OR value of 1. Hence, we return 1.

Constraints:
1 <= nums.length <= 2 * 10^5
0 <= nums[i] <= 10^9
0 <= k <= 10^9
*/

// Solution
function shortestSubarrayWithORAtLeastK(nums, k) {
    // Initialize the minimum length to Infinity as we are looking for the smallest length
    let minLength = Infinity;
    // Start pointer for the sliding window
    let start = 0;
    // Variable to store the cumulative OR value of the current subarray
    let orValue = 0;

    // Iterate over each element in nums using the end pointer for the sliding window
    for (let end = 0; end < nums.length; end++) {
        // Update the OR value by including the current element at 'end'
        orValue |= nums[end]; 

        // While the current OR value is at least k, try to shrink the window from the left
        while (orValue >= k) {
            // Update the minimum length if the current window length is smaller
            minLength = Math.min(minLength, end - start + 1);
            // Remove the effect of nums[start] from the OR value as we slide the start of the window
            orValue ^= nums[start];
            // Move the start pointer to shrink the window
            start++;
        }
    }

    // If minLength was not updated, no valid subarray was found; otherwise, return the smallest length
    return minLength === Infinity ? -1 : minLength;
}

/* 
Explaination:

	1.	Initialize minLength to Infinity, start to 0, and orValue to 0.
	2.	Expand the sliding window from the right, updating orValue with orValue |= nums[end].
	3.	While orValue >= k:
        •	Update minLength with the current subarray length (end - start + 1).
        •	Shrink the window from the left by removing nums[start] effect using orValue ^= nums[start].
        •	Increment start.
	4.	Return -1 if no subarray found; otherwise, return minLength.

This efficiently finds the shortest subarray with OR at least k.
*/
