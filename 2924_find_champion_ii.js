// Question Title: Find Champion II
// Question Number: 2924
// Difficulty: Medium
// Link: https://leetcode.com/problems/find-champion-ii/

/* 
Problem Description:
There are `n` teams numbered from `0` to `n - 1` in a tournament; each team is also a node in a Directed Acyclic Graph (DAG).

You are given the integer `n` and a 0-indexed 2D integer array `edges` of length `m` representing the DAG, where `edges[i] = [ui, vi]` indicates a directed edge from team `ui` to team `vi`.

A directed edge from team `a` to team `b` means that team `a` is stronger than team `b`.

A team will be the champion if:
1. There is no team stronger than it.
2. It is the only team satisfying the above condition.

Return the team that will be the champion of the tournament if there is a unique champion, otherwise return `-1`.

Examples:

Example 1:
Input: n = 3, edges = [[0,1],[1,2]]
Output: 0
Explanation: 
- Team 1 is weaker than team 0.
- Team 2 is weaker than team 1.
- Team 0 has no team stronger than it, so it is the champion.

Example 2:
Input: n = 4, edges = [[0,2],[1,3],[1,2]]
Output: -1
Explanation: 
- Team 2 is weaker than team 0 and team 1.
- Team 3 is weaker than team 1.
- Teams 0 and 1 have no team stronger than them.
- Since there is no unique champion, the answer is `-1`.

Constraints:
- `1 <= n <= 100`
- `m == edges.length`
- `0 <= m <= n * (n - 1) / 2`
- `edges[i].length == 2`
- `0 <= edge[i][j] <= n - 1`
- `edges[i][0] != edges[i][1]`

Notes:
- A DAG (Directed Acyclic Graph) is a directed graph with no cycles.
- If `a` is stronger than `b` and `b` is stronger than `c`, then `a` is stronger than `c`.
*/

// Solution
var findChampion = function(n, edges) {
    // Create an array to store the in-degrees of each team
    const inDegree = Array(n).fill(0);
    
    // Populate the in-degree array based on the edges
    for (let [u, v] of edges) {
        inDegree[v] += 1;
    }

    // Find the teams with in-degree 0
    const candidates = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            candidates.push(i);
        }
    }

    // If there's exactly one team with in-degree 0, it is the champion
    if (candidates.length === 1) {
        return candidates[0];
    }

    // Otherwise, there is no unique champion
    return -1;
};

/* 
Explanation:

1. **In-Degree Calculation**:
    - The in-degree of a node (team) represents the number of incoming edges, i.e., the number of teams stronger than it.
    - A champion must have an in-degree of `0` since no other team is stronger than it.

2. **Find Candidates**:
    - Iterate through the in-degree array to identify teams with in-degree `0`.

3. **Unique Champion**:
    - If there is exactly one team with in-degree `0`, it is the unique champion.
    - Otherwise, return `-1` because there is no unique champion.

4. **Time Complexity**:
    - O(n + m): Iterating through nodes (n) and edges (m).

5. **Space Complexity**:
    - O(n): Space required for the in-degree array.

This approach efficiently identifies the champion in the tournament or determines if there is no unique champion.
*/