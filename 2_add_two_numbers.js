// Question Title: Add Two Numbers
// Question Number: 2
// Difficulty: Medium
// Link: https://leetcode.com/problems/add-two-numbers/

/* 
Problem Description:
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Examples:
Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.
*/

// Solution
function addTwoNumbers(l1, l2) {
    // Initialize a dummy node to build the result linked list
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    // Traverse both linked lists until the end of both lists
    while (l1 || l2) {
        // Get the values of the current nodes or 0 if the list is exhausted
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        // Calculate the sum and the new carry
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);

        // Add the resulting digit to the linked list
        current.next = new ListNode(sum % 10);
        current = current.next;

        // Move to the next nodes in l1 and l2
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    // If there is a carry remaining, add a new node for it
    if (carry > 0) {
        current.next = new ListNode(carry);
    }

    // Return the result linked list, skipping the dummy node
    return dummy.next;
}

/* 
Explanation:

	1.	Initialize a dummy node to build the result list and set the carry to 0.
	2.	Traverse through l1 and l2, adding corresponding values and carry.
	3.	Calculate sum = val1 + val2 + carry and update carry with sum / 10.
	4.	Add sum % 10 as a new node in the result linked list.
	5.	Once both lists are exhausted, add a node with carry if it’s greater than 0.
	6.	Return dummy.next as the result list.

This effectively adds the two numbers digit-by-digit in O(n) time.
*/