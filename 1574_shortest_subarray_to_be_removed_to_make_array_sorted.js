// Question Title: Shortest Subarray to be Removed to Make Array Sorted
// Question Number: 1574
// Difficulty: Medium
// Link: https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted/

/* 
Problem Description:
Given an integer array `arr`, remove a subarray (can be empty) from `arr` such that the remaining elements in `arr` are non-decreasing.

Return the length of the shortest subarray to remove.

A subarray is a contiguous subsequence of the array.

Examples:

Example 1:
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray to remove is [10,4,2] of length 3. The remaining elements [1,2,3,3,5] are sorted.
Another correct solution is to remove the subarray [3,10,4].

Example 2:
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Since the array is strictly decreasing, we can only keep a single element. Therefore we need to remove a subarray of length 4, e.g., [5,4,3,2] or [4,3,2,1].

Example 3:
Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing. We do not need to remove any elements.

Constraints:
- `1 <= arr.length <= 10^5`
- `0 <= arr[i] <= 10^9`
*/

// Solution
var findLengthOfShortestSubarray = function(arr) {
    let n = arr.length;
    let left = 0;
    let right = n - 1;

    // Find the first part of the array that is sorted in non-decreasing order
    while (left < n - 1 && arr[left] <= arr[left + 1]) {
        left++;
    }

    // If the whole array is sorted, no need to remove any subarray
    if (left === n - 1) {
        return 0;
    }

    // Find the second part of the array that is sorted in non-decreasing order from the right
    while (right > left && arr[right] >= arr[right - 1]) {
        right--;
    }

    // Calculate the minimum subarray length that can be removed
    let minLength = Math.min(n - left - 1, right);

    for (let i = 0; i <= left; i++) {
        while (right < n && arr[i] > arr[right]) {
            right++;
        }
        minLength = Math.min(minLength, right - i - 1);
    }

    return minLength;
};

/* 
Explanation:

1. **Identify Sorted Portions**:
    - Use two pointers (`left` and `right`) to find the leftmost and rightmost sorted portions of the array.
    - Increment `left` while `arr[left] <= arr[left + 1]`.
    - Decrement `right` while `arr[right] >= arr[right - 1]`.

2. **Handle Fully Sorted Array**:
    - If the entire array is sorted (`left === n - 1`), return `0`.

3. **Calculate the Minimum Subarray Length**:
    - The shortest subarray to remove can be:
        a. Between the leftmost and rightmost sorted parts.
        b. From merging sorted parts by skipping elements.
    - Use a loop to check merging possibilities by moving `right` forward while maintaining order with the left portion.

4. **Return the Result**:
    - Return `minLength`, the minimum subarray length to remove.

This approach has a time complexity of O(n) and efficiently handles large arrays.
*/