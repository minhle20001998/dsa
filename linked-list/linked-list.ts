import { CoreNode } from "../common/node";

export class LinkedList<T> {
  private head: CoreNode<T> | null = null;
  private tail: CoreNode<T> | null = null;
  private length = 0;

  append = (value: T): this => {
    const node = new CoreNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.setNext(node);
      this.tail = node;
    }

    this.length++;
    return this;
  };

  prepend = (value: T): this => {
    const node = new CoreNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.setNext(this.head);
      this.head = node;
    }

    this.length++;
    return this;
  };

  removeFromHead = (): T | undefined => {
    if (!this.head) return;

    const oldHead = this.head;
    this.head = oldHead.getNext();

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return oldHead.getValue();
  };

  removeFromTail = (): T | undefined => {
    if (!this.head) return;

    if (this.length === 1) {
      const value = this.head.getValue();
      this.head = null;
      this.tail = null;
      this.length = 0;
      return value;
    }

    let current = this.head;

    // reference comparison — correct
    while (current.getNext() !== this.tail) {
      current = current.getNext()!;
    }

    const value = this.tail!.getValue();
    current.setNext(null);
    this.tail = current;
    this.length--;

    return value;
  };

  get = (index: number): T | null => {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current!.getNext();
      i++;
    }

    return current!.getValue();
  };

  insert = (value: T, index: number): boolean => {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.prepend(value);
    if (index === this.length) return !!this.append(value);

    const node = new CoreNode(value);
    let prev = this.head!;

    for (let i = 0; i < index - 1; i++) {
      prev = prev.getNext()!;
    }

    node.setNext(prev.getNext());
    prev.setNext(node);

    this.length++;
    return true;
  };

  remove = (index: number): T | false => {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return this.removeFromHead()!;
    if (index === this.length - 1) return this.removeFromTail()!;

    let prev = this.head!;

    for (let i = 0; i < index - 1; i++) {
      prev = prev.getNext()!;
    }

    const removed = prev.getNext()!;
    prev.setNext(removed.getNext());

    this.length--;
    return removed.getValue();
  };

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.getValue());
      current = current.getNext();
    }

    return result;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size(): number {
    return this.length;
  }
}

(() => {
  const linkedList = new LinkedList<number>();

  console.log("[1] Test append");
  linkedList.append(1).append(2).append(3).append(4);
  console.log("Result:", linkedList.toArray());
  linkedList.clear();

  console.log("[2] Test prepend");
  linkedList.prepend(1).prepend(2).prepend(3).prepend(4);
  console.log("Result:", linkedList.toArray());
  linkedList.clear();

  console.log("[3] Test insert");
  linkedList.append(1).append(3).append(4);
  linkedList.insert(2, 1);
  console.log("Result:", linkedList.toArray());
  linkedList.clear();

  console.log("[4] Test remove");
  linkedList.append(1).append(2).append(3).append(4);
  linkedList.remove(1);
  console.log("Result:", linkedList.toArray());
  linkedList.clear();

  console.log("[5] Test get");
  linkedList.append(1).append(2).append(3).append(4);
  console.log("Result:", linkedList.get(1));
})();
