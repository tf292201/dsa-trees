/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() { 
    if (!this.root) return 0;
  
    const calculateMinDepth = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      if (!node.left) return 1 + calculateMinDepth(node.right);    
      if (!node.right) return 1 + calculateMinDepth(node.left);
      return 1 + Math.min(calculateMinDepth(node.left), calculateMinDepth(node.right));
    };
  
    return calculateMinDepth(this.root);
  }
  



  
  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
  
    const calculateMaxDepth = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      if (!node.left) return 1 + calculateMaxDepth(node.right);    
      if (!node.right) return 1 + calculateMaxDepth(node.left);
      return 1 + Math.max(calculateMaxDepth(node.left), calculateMaxDepth(node.right));
    };
  
    return calculateMaxDepth(this.root);
  }
  

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;


    function calculateMaxSum(node) {
      if (!node) return 0;
      const leftSum = calculateMaxSum(node.left);
      const rightSum = calculateMaxSum(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    calculateMaxSum(this.root);
    return result;

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    function calculateNextLarger(node) {
      if (!node) return;
      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }
      calculateNextLarger(node.left);
      calculateNextLarger(node.right);
    }

    calculateNextLarger(this.root);
    return result;

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // Helper function to find the depth and parent of a node
  const findDepthAndParent = (root, target, depth = 0, parent = null) => {
    if (!root) return null;
    if (root === target) return { depth, parent };
    
    const leftResult = findDepthAndParent(root.left, target, depth + 1, root);
    if (leftResult) return leftResult;
    
    const rightResult = findDepthAndParent(root.right, target, depth + 1, root);
    if (rightResult) return rightResult;
    
    return null;
  };

  // Find depth and parent of both nodes
  const node1Info = findDepthAndParent(this.root, node1);
  const node2Info = findDepthAndParent(this.root, node2);

  // Check if both nodes exist in the tree and have different parents at the same depth
  return (
    node1Info &&
    node2Info &&
    node1Info.depth === node2Info.depth &&
    node1Info.parent !== node2Info.parent
  );

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const serializeHelper = (node) => {
      if (!node) return 'null';
      return `${node.val},${serializeHelper(node.left)},${serializeHelper(node.right)}`;
    };
    return serializeHelper(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    // Split the serialized string by commas to get an array of node values
    const values = stringTree.split(',');
  
    // Helper function to recursively build the tree from the array of values
    const buildTree = () => {
      // Remove the first value from the array
      const val = values.shift();
  
      // If the value is 'null', return null indicating a null node
      if (val === 'null') {
        return null;
      }
  
      // Create a new BinaryTreeNode with the parsed value
      const node = new BinaryTreeNode(parseInt(val));
  
      // Recursively build the left and right subtrees
      node.left = buildTree();
      node.right = buildTree();
  
      // Return the current node
      return node;
    };
  
    // Start building the tree from the root node
    const root = buildTree();
  
    // Create a new BinaryTree object with the reconstructed root
    return new BinaryTree(root);
  }
  
  lowestCommonAncestor(node1, node2) {
    // Helper function to find the lowest common ancestor
    const findLCA = (node, p, q) => {
      // If the current node is null or matches either of the target nodes, return the current node
      if (node === null || node === p || node === q) {
        return node;
      }
  
      // Recursively search the left and right subtrees
      const left = findLCA(node.left, p, q);
      const right = findLCA(node.right, p, q);
  
      // If both left and right subtrees return non-null values, then the current node is the LCA
      if (left !== null && right !== null) {
        return node;
      }
  
      // Otherwise, return the non-null subtree result
      return left !== null ? left : right;
    };
  
    // Call the helper function starting from the root node
    return findLCA(this.root, node1, node2);
  }
  
}

module.exports = { BinaryTree, BinaryTreeNode };
