// Question Title: Two Sum
// Question Number: 1
// Difficulty: Easy
// Link: https://leetcode.com/problems/two-sum/

/* 
Problem Description:
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

Assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Examples:
Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
*/

// Solution
function twoSum(nums, target) {
    // Initialize a map to store the numbers we encounter and their indices
    const map = new Map();

    // Iterate through each number in the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate the complement needed to reach the target
        const complement = target - nums[i];

        // Check if the complement already exists in the map
        if (map.has(complement)) {
            // If it exists, return the indices of the complement and the current number
            return [map.get(complement), i];
        }

        // Otherwise, add the current number and its index to the map
        map.set(nums[i], i);
    }

    // If no solution is found, return an empty array (although the problem guarantees a solution exists)
    return [];
}

/* 
Explanation:

	1.	Initialize an empty map to keep track of each number's index.
	2.	Loop through nums and calculate the complement for each number (target - nums[i]).
	3.	Check if the complement exists in the map:
        •	If it does, return the stored index of the complement and the current index.
        •	If not, store the current number and index in the map.
	4.	This approach ensures O(n) time complexity by using a hash map for constant-time lookups.

This efficiently finds the two numbers that add up to the target.
*/