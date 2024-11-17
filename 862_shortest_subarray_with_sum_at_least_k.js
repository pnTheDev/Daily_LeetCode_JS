// Question Title: Shortest Subarray with Sum at Least K
// Question Number: 862
// Difficulty: Hard
// Link: https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/

/* 
Problem Description:
Given an integer array `nums` and an integer `k`, return the length of the shortest non-empty subarray of `nums` with a sum of at least `k`. If there is no such subarray, return `-1`.

A subarray is a contiguous part of an array.

Examples:

Example 1:
Input: nums = [1], k = 1
Output: 1

Example 2:
Input: nums = [1,2], k = 4
Output: -1

Example 3:
Input: nums = [2,-1,2], k = 3
Output: 3

Constraints:
- `1 <= nums.length <= 10^5`
- `-10^5 <= nums[i] <= 10^5`
- `1 <= k <= 10^9`
*/

// Solution
var shortestSubarray = function(nums, k) {
    const n = nums.length;
    const prefixSum = new Array(n + 1).fill(0);
    
    // Calculate prefix sums
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    const deque = []; // Monotonic deque to maintain useful indices
    let minLength = Infinity;

    for (let i = 0; i < prefixSum.length; i++) {
        // Check if the condition is satisfied and update minLength
        while (deque.length > 0 && prefixSum[i] - prefixSum[deque[0]] >= k) {
            minLength = Math.min(minLength, i - deque.shift());
        }

        // Remove indices that are no longer useful
        while (deque.length > 0 && prefixSum[i] <= prefixSum[deque[deque.length - 1]]) {
            deque.pop();
        }

        // Add the current index to the deque
        deque.push(i);
    }

    return minLength === Infinity ? -1 : minLength;
};

/* 
Explanation:

1. **Prefix Sum**:
    - Compute the prefix sum array to efficiently calculate the sum of any subarray in constant time.

2. **Monotonic Deque**:
    - Maintain a deque to store indices of the prefix sum array, ensuring the elements are in increasing order of prefix sums.
    - The deque helps efficiently find subarrays that satisfy the condition `prefixSum[i] - prefixSum[j] >= k`.

3. **Deque Operations**:
    - Remove indices from the front of the deque if the subarray sum is at least `k`.
    - Remove indices from the back of the deque if the current prefix sum is less than or equal to the prefix sum at the back, as they are no longer useful.

4. **Update Result**:
    - Update the minimum length whenever a valid subarray is found.

5. **Edge Case**:
    - If no valid subarray is found, return `-1`.

This approach ensures an efficient time complexity of O(n), making it suitable for large arrays.
*/