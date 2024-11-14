// Question Title: Minimized Maximum of Products Distributed to Any Store
// Question Number: 2064
// Difficulty: Medium
// Link: https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/

/* 
Problem Description:
You are given an integer `n` indicating the number of specialty retail stores. There are `m` product types, represented as an integer array `quantities`, where `quantities[i]` represents the number of products of the `i-th` product type.

The task is to distribute all products to the retail stores with the following rules:
1. A store can only be given one product type but can be given any amount of it.
2. After distribution, let `x` be the maximum number of products given to any store.

Our goal is to minimize `x`, the maximum number of products given to any store. Return the minimum possible value of `x`.

Examples:

Example 1:
Input: n = 6, quantities = [11,6]
Output: 3
Explanation: Distribute as follows:
- 11 products of type 0: [2, 3, 3, 3]
- 6 products of type 1: [3, 3]
The maximum products given to any store is 3.

Example 2:
Input: n = 7, quantities = [15,10,10]
Output: 5
Explanation: Distribute as follows:
- 15 products of type 0: [5, 5, 5]
- 10 products of type 1: [5, 5]
- 10 products of type 2: [5, 5]
The maximum products given to any store is 5.

Example 3:
Input: n = 1, quantities = [100000]
Output: 100000
Explanation: All products go to the single store.

Constraints:
- `m == quantities.length`
- `1 <= m <= n <= 10^5`
- `1 <= quantities[i] <= 10^5`
*/

// Solution
var minimizedMaximum = function(n, quantities) {
    // Helper function to check if we can distribute with maxPerStore as the upper limit
    const canDistribute = (maxPerStore) => {
        let storeCount = 0;
        
        for (const quantity of quantities) {
            // Calculate the stores required for each product type given maxPerStore limit
            storeCount += Math.ceil(quantity / maxPerStore);
            if (storeCount > n) return false; // Exit if more stores are required than available
        }
        
        return storeCount <= n;
    };
    
    // Binary search range from 1 to the maximum value in quantities
    let left = 1;
    let right = Math.max(...quantities);
    let result = right;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Check if `mid` can be the minimized maximum
        if (canDistribute(mid)) {
            result = mid; // `mid` is feasible, update result
            right = mid - 1; // Try for a smaller maxPerStore
        } else {
            left = mid + 1; // Increase maxPerStore to find a feasible solution
        }
    }
    
    return result;
};

/* 
Explanation:

1. We use binary search to find the minimum feasible value of `x` (max products per store).
2. Define `canDistribute(maxPerStore)` to check if it's possible to distribute all products to stores such that each store receives at most `maxPerStore` items.
    - For each product quantity, calculate the number of stores needed with `Math.ceil(quantity / maxPerStore)`.
    - Sum the stores needed across all products. If this sum exceeds `n`, return false (infeasible).
3. Binary search:
    - Start `left` at 1 and `right` at the maximum quantity in `quantities`.
    - Check the middle value (`mid`) as a candidate for `maxPerStore`.
    - If `mid` is feasible (`canDistribute(mid)` is true), update `result` to `mid` and try for a smaller value by setting `right = mid - 1`.
    - If `mid` is infeasible, move `left` to `mid + 1`.
4. The final `result` holds the minimized maximum `x`.

This approach optimizes the solution to O(m * log(max(quantities))) using binary search, making it efficient for large input sizes.
*/