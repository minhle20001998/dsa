import { CoreNode } from "../common/node";
import { LinkedList } from "../linked-list/linked-list";

class Stack<T> {
  top: CoreNode<T> | null = null;
  size: number = 0;

  constructor() {
    this.top = null;
    this.size = 0;
  }

  push = (value: T) => {
    const node = new CoreNode(value);
    node.setNext(this.top);
    this.top = node;
    this.size++;
    return this;
  };

  pop = () => {
    if (!this.top) return undefined;
    const currentTopValue = this.top.getValue();
    const nextTop = this.top.getNext();
    this.top = nextTop;
    this.size--;
    return currentTopValue;
  };

  peek = () => {
    return this.top ? this.top.getValue() : undefined;
  };

  isEmpty = () => {
    return this.size === 0;
  };

  clear = () => {
    this.top = null;
    this.size = 0;
  };

  toArray = () => {
    const result: T[] = [];
    let current = this.top;
    while (current) {
      result.push(current.getValue());
      current = current.getNext();
    }

    return result;
  };
}

(() => {
  const stack = new Stack<number>();

  stack.push(1).push(2).push(3);

  console.log("Data: ", stack.toArray().toString());

  console.log("Peek: ", stack.peek());

  console.log("Pop: ", stack.pop());
  console.log("Data: ", stack.toArray().toString());
})();
