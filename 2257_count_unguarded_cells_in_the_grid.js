// Question Title: Count Unguarded Cells in the Grid
// Question Number: 2257
// Difficulty: Medium
// Link: https://leetcode.com/problems/count-unguarded-cells-in-the-grid/

/* 
Problem Description:
You are given a 0-indexed `m x n` grid. You are also given two 2D integer arrays `guards` and `walls` where:
- `guards[i] = [rowi, coli]` represent the positions of the ith guard.
- `walls[j] = [rowj, colj]` represent the positions of the jth wall.

A guard can see every cell in the four cardinal directions (north, east, south, west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.

Return the number of unoccupied cells that are not guarded.

Examples:

Example 1:
Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7

Example 2:
Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4

Constraints:
- `1 <= m, n <= 10^5`
- `2 <= m * n <= 10^5`
- `1 <= guards.length, walls.length <= 5 * 10^4`
- `2 <= guards.length + walls.length <= m * n`
- `guards[i].length == walls[j].length == 2`
- `0 <= rowi, rowj < m`
- `0 <= coli, colj < n`
- All positions in `guards` and `walls` are unique.
*/

// Solution
var countUnguarded = function(m, n, guards, walls) {
    // Initialize a grid to track the status of each cell
    const grid = Array.from({ length: m }, () => Array(n).fill(0));

    // Constants to define cell states
    const GUARD = 1;
    const WALL = 2;
    const GUARDED = 3;

    // Mark guards and walls in the grid
    for (const [row, col] of guards) {
        grid[row][col] = GUARD;
    }
    for (const [row, col] of walls) {
        grid[row][col] = WALL;
    }

    // Directions: north, south, east, west
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

    // Mark guarded cells
    for (const [row, col] of guards) {
        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            while (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] !== GUARD && grid[r][c] !== WALL) {
                if (grid[r][c] === 0) {
                    grid[r][c] = GUARDED;
                }
                r += dr;
                c += dc;
            }
        }
    }

    // Count unoccupied and unguarded cells
    let unguardedCount = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 0) {
                unguardedCount++;
            }
        }
    }

    return unguardedCount;
};

/* 
Explanation:

1. **Grid Initialization**:
    - Create a grid of size `m x n` initialized with zeros to represent unoccupied cells.
    - Mark cells with guards (`GUARD = 1`) and walls (`WALL = 2`).

2. **Guard Vision**:
    - For each guard, mark cells in all four cardinal directions as `GUARDED` until a wall or another guard is encountered.

3. **Count Unguarded Cells**:
    - Iterate through the grid and count cells that remain unoccupied (`0`).

4. **Edge Cases**:
    - If no guards are present, all unoccupied cells remain unguarded.
    - If guards and walls cover all cells, return `0`.

5. **Time Complexity**:
   - O(m * n): Each cell is processed at most once for marking or counting.

6. **Space Complexity**:
   - O(m * n): Space is used for the grid representation.
*/