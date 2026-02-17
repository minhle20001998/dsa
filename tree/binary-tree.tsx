import { TreeNode } from "../common/tree-node";

class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  constructor() {
    this.root = null;
  }

  insert = (value: T) => {
    const node = new TreeNode(value);

    if (!this.root) {
      this.root = node;
      return this;
    }

    const queue = [this.root];

    while (queue.length) {
      const current = queue.shift();
      const left = current?.getLeft();
      const right = current?.getRight();
      if (!left) {
        current?.setLeft(node);
        return this;
      } else {
        queue.push(left);
      }

      if (!right) {
        current?.setRight(node);
        return this;
      } else {
        queue.push(right);
      }
    }
  };

  inOrderTraverse = (node = this.root, result: TreeNode<T>[] = []) => {
    if (node == null) {
      return result;
    }

    this.inOrderTraverse(node.getLeft(), result);
    result.push(node);
    this.inOrderTraverse(node.getRight(), result);

    return result;
  };

  preOrderTraverse = (node = this.root, result: TreeNode<T>[] = []) => {
    if (node == null) {
      return result;
    }

    result.push(node);
    this.inOrderTraverse(node.getLeft(), result);
    this.inOrderTraverse(node.getRight(), result);

    return result;
  };

  postOrderTraverse = (node = this.root, result: TreeNode<T>[] = []) => {
    if (node == null) {
      return result;
    }

    this.inOrderTraverse(node.getLeft(), result);
    this.inOrderTraverse(node.getRight(), result);
    result.push(node);

    return result;
  };

  search = (value: T) => {
    if (this.root == null) {
      return false;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      if (current?.getValue() === value) {
        return true;
      }

      const left = current?.getLeft();
      const right = current?.getRight();

      if (left) {
        queue.push(left);
      }

      if (right) {
        queue.push(right);
      }
    }

    return false;
  };

  getHeight = (node = this.root): number => {
    if (!node) {
      return -1;
    }

    return (
      1 +
      Math.max(this.getHeight(node.getLeft()), this.getHeight(node.getRight()))
    );
  };
}

(() => {
  const tree = new BinaryTree();

  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);
  tree.insert(6);

  console.log(
    "Inorder:",
    tree.inOrderTraverse().map((value) => {
      return value.getValue();
    }),
  );
  console.log(
    "Preorder:",
    tree.preOrderTraverse().map((value) => {
      return value.getValue();
    }),
  );
  console.log(
    "Postorder:",
    tree.postOrderTraverse().map((value) => {
      return value.getValue();
    }),
  );

  console.log("Search 5:", tree.search(5));
  console.log("Height:", tree.getHeight());
})();
