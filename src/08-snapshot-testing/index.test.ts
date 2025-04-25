import { generateLinkedList } from './index';

/* type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
}; */

describe('generateLinkedList', () => {
  test('should return an empty linked list for an empty array', () => {
    const result = generateLinkedList([]);
    expect(result).toEqual({ value: null, next: null });
  });

  test('should return a linked list with a single element', () => {
    const result = generateLinkedList([42]);
    expect(result).toEqual({
      value: 42,
      next: { value: null, next: null },
    });
  });

  test('should return a linked list with multiple elements', () => {
    const result = generateLinkedList([1, 2, 3]);
    expect(result).toEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    });
  });

  test('should handle string elements correctly', () => {
    const result = generateLinkedList(['a', 'b', 'c']);
    expect(result).toEqual({
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: { value: null, next: null },
        },
      },
    });
  });
  test('should handle mixed type elements correctly', () => {
    const result = generateLinkedList(['a', 42, true]);
    expect(result).toEqual({
      value: 'a',
      next: {
        value: 42,
        next: {
          value: true,
          next: { value: null, next: null },
        },
      },
    });
  });
});
