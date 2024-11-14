// Question Title: Median of Two Sorted Arrays
// Question Number: 4
// Difficulty: Hard
// Link: https://leetcode.com/problems/median-of-two-sorted-arrays/

/* 
Problem Description:
Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.

The overall runtime complexity should be `O(log (m+n))`.

Examples:

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: Merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Constraints:
- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`
*/

// Solution
var findMedianSortedArrays = function(nums1, nums2) {
    // Ensure nums1 is the smaller array for binary search efficiency
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;
    const halfLength = Math.floor((totalLength + 1) / 2);

    let left = 0;
    let right = m;

    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = halfLength - partitionX;

        const maxX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
        const minX = (partitionX === m) ? Infinity : nums1[partitionX];

        const maxY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
        const minY = (partitionY === n) ? Infinity : nums2[partitionY];

        // Check if we found the correct partition
        if (maxX <= minY && maxY <= minX) {
            if (totalLength % 2 === 0) {
                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
            } else {
                return Math.max(maxX, maxY);
            }
        } else if (maxX > minY) {
            // Move towards the left in nums1
            right = partitionX - 1;
        } else {
            // Move towards the right in nums1
            left = partitionX + 1;
        }
    }

    throw new Error("Input arrays are not sorted or invalid.");
};

/* 
Explanation:

1. **Binary Search for Partition**:
    - Use binary search on `nums1` (ensuring it is the smaller array) to find a partition that divides both arrays into halves.
    - The goal is to position `partitionX` in `nums1` and `partitionY` in `nums2` such that the left half of the combined arrays is less than or equal to the right half.

2. **Partition Conditions**:
    - `maxX`: Maximum element on the left side of `partitionX` in `nums1`.
    - `minX`: Minimum element on the right side of `partitionX` in `nums1`.
    - `maxY`: Maximum element on the left side of `partitionY` in `nums2`.
    - `minY`: Minimum element on the right side of `partitionY` in `nums2`.

3. **Median Calculation**:
    - If `maxX <= minY` and `maxY <= minX`, then the correct partition is found.
    - If the total length is even, the median is the average of the maximum on the left and the minimum on the right.
    - If the total length is odd, the median is the maximum of the left side.

4. **Adjusting Partition**:
    - If `maxX > minY`, move `right` to `partitionX - 1`.
    - If `maxY > minX`, move `left` to `partitionX + 1`.

This approach achieves `O(log(min(m, n)))` time complexity due to binary search.
*/