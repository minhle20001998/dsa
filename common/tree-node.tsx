class TreeNode<T> {
  #value: T | null = null;
  #left: TreeNode<T> | null = null;
  #right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.#value = value;
  }

  setLeft = (node: TreeNode<T>) => {
    this.#left = node;
  };

  setRight = (node: TreeNode<T>) => {
    this.#right = node;
  };

  getLeft = () => {
    return this.#left;
  };

  getRight = () => {
    return this.#right;
  };

  getValue = () => {
    return this.#value;
  };
}

export { TreeNode };
