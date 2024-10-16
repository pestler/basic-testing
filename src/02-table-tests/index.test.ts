// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 3, action: Action.Add, expected: 6 },

  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: -5, b: -5, action: Action.Divide, expected: 1 },

  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 3, b: -3, action: Action.Multiply, expected: -9 },

  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 10, b: 10, action: Action.Exponentiate, expected: 10000000000 },

  { a: 3, b: 3, action: 'invalid', expected: null },

  { a: [], b: 3, action: Action.Add, expected: null },
  { a: {}, b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', (): void => {
  test.each(testCases)(
    'should perform $action on $a and $b and return $expected',
    ({ a, b, action, expected }): void => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
