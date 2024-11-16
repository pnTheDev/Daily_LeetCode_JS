// Question Title: Find the Power of K-Size Subarrays I
// Question Number: 3254
// Difficulty: Medium
// Link: https://leetcode.com/problems/find-the-power-of-k-size-subarrays-i/

/* 
Problem Description:
You are given an array of integers `nums` of length `n` and a positive integer `k`.

The power of an array is defined as:
- Its maximum element if all of its elements are consecutive and sorted in ascending order.
- `-1` otherwise.

You need to find the power of all subarrays of `nums` of size `k`.

Return an integer array `results` of size `n - k + 1`, where `results[i]` is the power of `nums[i..(i + k - 1)]`.

Examples:

Example 1:
Input: nums = [1,2,3,4,3,2,5], k = 3
Output: [3,4,-1,-1,-1]
Explanation:
Subarrays of size 3:
[1,2,3] -> max = 3, sorted and consecutive.
[2,3,4] -> max = 4, sorted and consecutive.
[3,4,3] -> not consecutive.
[4,3,2] -> not sorted.
[3,2,5] -> not consecutive.

Example 2:
Input: nums = [2,2,2,2,2], k = 4
Output: [-1,-1]

Example 3:
Input: nums = [3,2,3,2,3,2], k = 2
Output: [-1,3,-1,3,-1]

Constraints:
- `1 <= n == nums.length <= 500`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= n`
*/

// Solution
var resultsArray = function(nums, k) {
    const results = [];
    
    for (let i = 0; i <= nums.length - k; i++) {
        const subarray = nums.slice(i, i + k); // Extract subarray of size k
        const maxElement = Math.max(...subarray); // Get the maximum element
        
        // Check if the subarray is sorted and consecutive
        let isConsecutiveAndSorted = true;
        for (let j = 1; j < subarray.length; j++) {
            if (subarray[j] !== subarray[j - 1] + 1) {
                isConsecutiveAndSorted = false;
                break;
            }
        }
        
        // Add the power of the subarray to the results
        results.push(isConsecutiveAndSorted ? maxElement : -1);
    }
    
    return results;
};

/* 
Explanation:

1. **Extract Subarrays**:
    - Use `nums.slice(i, i + k)` to extract each subarray of size `k` from `nums`.

2. **Find Maximum**:
    - Use `Math.max(...subarray)` to determine the maximum element of the subarray.

3. **Check for Sorted and Consecutive**:
    - Iterate through the subarray to verify if each element satisfies `subarray[j] === subarray[j - 1] + 1`.
    - If not, set `isConsecutiveAndSorted` to `false`.

4. **Add to Results**:
    - If the subarray is sorted and consecutive, add its maximum element to `results`.
    - Otherwise, add `-1` to `results`.

5. **Return Results**:
    - Return the `results` array containing the power of each subarray.

This approach ensures clarity and correctness, iterating through all subarrays and checking their conditions in \(O(n \cdot k)\) time.
*/