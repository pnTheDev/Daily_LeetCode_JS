// Question Title: Count the nNumber of Fair Pairs
// Question Number: 2563
// Difficulty: Medium
// Link: https://leetcode.com/problems/count-the-number-of-fair-pairs

/* 
Problem Description:
Given a 0-indexed integer array `nums` of size `n` and two integers `lower` and `upper`, return the number of fair pairs.

A pair `(i, j)` is fair if:
- `0 <= i < j < n`, and
- `lower <= nums[i] + nums[j] <= upper`

Examples:

Example 1:
Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).

Example 2:
Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: There is a single fair pair: (2,3).

Constraints:
- `1 <= nums.length <= 10^5`
- `nums.length == n`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= lower <= upper <= 10^9`
*/

// Solution
function countFairPairs(nums, lower, upper) {
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);
    let counter = 0;

    // Step 2: Use two pointers to find valid pairs
    for (let i = 0; i < nums.length; i++) {
        let left = i + 1;
        let right = nums.length - 1;

        // Find the smallest index `left` where nums[i] + nums[left] >= lower
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[i] + nums[mid] >= lower) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        let j_lower = left;

        // Reset `right` pointer to the end of the array
        right = nums.length - 1;

        // Find the largest index `right` where nums[i] + nums[right] <= upper
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[i] + nums[mid] <= upper) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        let j_upper = right;

        // Count valid pairs for index `i`
        if (j_lower <= j_upper) {
            counter += (j_upper - j_lower + 1);
        }
    }

    return counter;
}

/* 
Explanation:

1. Sort `nums` to allow efficient range searching with binary search.
2. For each index `i`:
    a. Use binary search to find the smallest `j` (`j_lower`) such that `nums[i] + nums[j] >= lower`.
    b. Use binary search to find the largest `j` (`j_upper`) such that `nums[i] + nums[j] <= upper`.
    c. The count of fair pairs for this `i` is `j_upper - j_lower + 1`.
3. Accumulate counts across all indices `i` to get the total number of fair pairs.

This approach improves efficiency by avoiding the need for nested loops.
*/