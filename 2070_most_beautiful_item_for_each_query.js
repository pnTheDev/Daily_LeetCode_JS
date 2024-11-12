// Question Title: Most Beautiful Item for Each Query
// Question Number: 2070
// Difficulty: Medium
// Link: https://leetcode.com/problems/most-beautiful-item-for-each-query/

/* 
Problem Description:
You are given a 2D integer array `items` where `items[i] = [price_i, beauty_i]` denotes the price and beauty of an item, respectively.

You are also given a 0-indexed integer array `queries`. For each `queries[j]`, determine the maximum beauty of an item whose price is less than or equal to `queries[j]`. If no such item exists, then the answer to this query is `0`.

Return an array `answer` of the same length as `queries` where `answer[j]` is the answer to the j-th query.

Examples:
Example 1:
Input: items = [[1,2],[3,2],[2,4],[5,6],[3,5]], queries = [1,2,3,4,5,6]
Output: [2,4,5,5,6,6]
Explanation:
- For queries[0]=1, [1,2] is the only item which has price <= 1. Hence, the answer for this query is 2.
- For queries[1]=2, items [1,2] and [2,4] have max beauty 4.
- For queries[2]=3 and queries[3]=4, items [1,2], [3,2], [2,4], and [3,5] have max beauty 5.
- For queries[4]=5 and queries[5]=6, all items have max beauty 6.

Example 2:
Input: items = [[1,2],[1,2],[1,3],[1,4]], queries = [1]
Output: [4]
Explanation: All items have price 1, so max beauty is 4.

Example 3:
Input: items = [[10,1000]], queries = [5]
Output: [0]
Explanation: No item has price <= 5, so answer is 0.

Constraints:
1 <= items.length, queries.length <= 10^5
items[i].length == 2
1 <= price_i, beauty_i, queries[j] <= 10^9
*/

// Solution
function mostBeautifulItemForEachQuery(items, queries) {
    const maxI = Infinity;
    const res = [[0, 0, maxI]];

    // Sort items by price
    items.sort((a, b) => a[0] - b[0]);

    // Populate res array with price and beauty thresholds
    for (const [price, beauty] of items) {
        const lastBracket = res[res.length - 1];
        if (beauty > lastBracket[1]) {
            lastBracket[2] = price;
            res.push([price, beauty, maxI]);
        }
    }

    const ans = [];

    // For each query, find the maximum beauty within the price threshold
    for (const x of queries) {
        for (let i = res.length - 1; i >= 0; i--) {
            if (res[i][0] <= x) {
                ans.push(res[i][1]);
                break;
            }
        }
    }

    return ans;
}

/* 
Explanation:

	1.	Initialize maxI as Infinity and res with a starting element [0, 0, maxI].
	2.	Sort items by price, then build the res array to store max beauty per price threshold.
	3.	For each query x:
        •	Search res in reverse for the largest beauty where price <= x.
        •	Append this beauty to the result.
	4.	Return the result array containing max beauty for each query.

This efficiently finds the highest beauty for items under each price limit.
*/