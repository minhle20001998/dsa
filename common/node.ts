export class CoreNode<T> {
  #value;
  #next: CoreNode<T> | null = null;
  #prev: CoreNode<T> | null = null;

  constructor(value: T) {
    this.#value = value;
  }

  setNext = (next: CoreNode<T> | null) => {
    this.#next = next;
  };

  setPrev = (prev: CoreNode<T> | null) => {
    this.#prev = prev;
  };

  getValue = () => {
    return this.#value;
  };

  getNext = () => {
    return this.#next;
  };

  getPrev = () => {
    return this.#prev;
  };
}
