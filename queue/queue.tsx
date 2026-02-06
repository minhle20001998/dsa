import { CoreNode } from "../common/node";

class Queue<T> {
  top: CoreNode<T> | null = null;
  bottom: CoreNode<T> | null = null;
  size: number = 0;

  constructor() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }

  enqueue = (value: T) => {
    const node = new CoreNode(value);
    if (!this.top && !this.bottom) {
      this.top = node;
      this.bottom = node;
      this.size++;
      return this;
    }

    node.setNext(this.top);
    this.top?.setPrev(node);
    this.top = node;
    this.size++;
    return this;
  };

  dequeue = () => {
    if (!this.bottom) {
      return undefined;
    }
    const newBottom = this.bottom?.getPrev();
    const currentBottomValue = this.bottom.getValue();
    newBottom?.setNext(null);
    this.bottom = newBottom;
    this.size--;
    return currentBottomValue;
  };

  peek = () => {
    return this.bottom ? this.bottom.getValue() : undefined;
  };

  isEmpty = () => {
    return this.size === 0;
  };

  clear = () => {
    this.top = null;
    this.bottom = null;
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
  const queue = new Queue<number>();

  queue.enqueue(1).enqueue(2).enqueue(3);

  console.log("Data: ", queue.toArray().toString());
  console.log("Peek: ", queue.peek());
  console.log("Pop: ", queue.dequeue());
  console.log("Data: ", queue.toArray().toString());
})();
