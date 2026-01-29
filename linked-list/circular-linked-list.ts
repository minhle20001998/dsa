import { CoreNode } from "../common/node";

class CircularLinkedList<T> {
  private head: CoreNode<T> | null = null;
  private length = 0;

  append = (value: T): this => {
    const node = new CoreNode(value);

    const newInit = !this.head;

    if (newInit) {
      node.setNext(node);
      node.setPrev(node);
      this.head = node;
    } else {
      const tail = this.head!.getPrev();
      tail!.setNext(node);
      node.setPrev(tail);
      node.setNext(this.head);
      this.head?.setPrev(node);
    }

    this.length++;

    return this;
  };

  prepend = (value: T): this => {
    this.append(value);
    this.head = this.head!.getPrev();

    this.length++;

    return this;
  };

  removeFromHead = () => {
    if (!this.head) {
      return;
    }
    const value = this.head.getValue();
    const tail = this.head.getPrev();
    const nextHead = this.head.getNext();

    if (this.length === 1) {
      this.head = null;
    } else {
      nextHead?.setPrev(tail);
      tail?.setNext(nextHead);
      this.head = nextHead;
    }

    this.length--;

    return value;
  };

  removeFromTail = () => {
    if (!this.head) {
      return;
    }

    const tail = this.head.getPrev();
    const value = tail?.getValue();

    if (this.length === 1) {
      this.head = null;
    } else {
      const prevTail = tail?.getPrev();
      prevTail?.setNext(this.head);
      this.head.setPrev(prevTail!);
    }

    this.length--;

    return value;
  };

  get = (index: number): T | null => {
    if (!this.head || index < 0 || index >= this.length) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.getNext()!;
    }

    return current.getValue();
  };

  remove = (index: number): T | false => {
    if (!this.head || index < 0 || index >= this.length) return false;
    if (index === 0) return this.removeFromHead()!;
    if (index === this.length - 1) return this.removeFromTail()!;

    let current = this.head;
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
    if (!this.head) return result;

    let current = this.head;

    do {
      result.push(current.getValue());
      current = current.getNext()!;
    } while (current !== this.head);

    return result;
  }

  clear(): void {
    this.head = null;
    this.length = 0;
  }

  size(): number {
    return this.length;
  }
}

(() => {
  const list = new CircularLinkedList<number>();

  console.log("[1] append");
  list.append(1).append(2).append(3).append(4);
  console.log(list.toArray());

  console.log("[2] prepend");
  list.prepend(0);
  console.log(list.toArray());

  console.log("[3] remove head");
  list.removeFromHead();
  console.log(list.toArray());

  console.log("[4] remove tail");
  list.removeFromTail();
  console.log(list.toArray());

  console.log("[5] get");
  console.log(list.get(1));
})();
