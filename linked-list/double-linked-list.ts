import { CoreNode } from "../common/node";

class DoubleLinkedList<T> {
  private head: CoreNode<T> | null = null;
  private tail: CoreNode<T> | null = null;
  private length = 0;

  append = (value: T): this => {
    const node = new CoreNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.setPrev(this.tail);
      this.tail?.setNext(node);
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
      this.head.setPrev(node);
      this.head = node;
    }

    this.length++;
    return this;
  };

  removeFromHead = (): T | undefined => {
    if (!this.head) return;

    const oldHead = this.head;
    this.head = oldHead.getNext();

    if (this.head) {
      this.head.setPrev(null);
    } else {
      this.tail = null;
    }

    this.length--;
    return oldHead.getValue();
  };

  removeFromTail = (): T | undefined => {
    if (!this.head || !this.tail) {
      return;
    }

    if (this.length === 1) {
      const value = this.head.getValue();
      this.head = null;
      this.tail = null;
      this.length = 0;
      return value;
    }

    const nodeBeforeTail = this.tail?.getPrev();
    const value = this.tail?.getValue();
    nodeBeforeTail?.setNext(null);
    this.tail = nodeBeforeTail;
    this.length--;

    return value;
  };

  get = (index: number): T | null => {
    if (index < 0 || index >= this.length) return null;

    let current: CoreNode<T> | null;

    if (index < this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.getNext();
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current!.getPrev();
      }
    }

    return current!.getValue();
  };

  insert = (value: T, index: number): boolean => {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.prepend(value);
    if (index === this.length) return !!this.append(value);

    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.getNext()!;
    }

    const node = new CoreNode(value);
    const prev = current.getPrev()!;

    node.setPrev(prev);
    node.setNext(current);

    prev.setNext(node);
    current.setPrev(node);

    this.length++;
    return true;
  };

  remove = (index: number): T | false => {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return this.removeFromHead()!;
    if (index === this.length - 1) return this.removeFromTail()!;

    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.getNext()!;
    }

    const prev = current.getPrev()!;
    const next = current.getNext()!;

    prev.setNext(next);
    next.setPrev(prev);

    this.length--;
    return current.getValue();
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
  const linkedList = new DoubleLinkedList<number>();

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
