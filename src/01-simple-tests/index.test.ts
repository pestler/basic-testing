// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Add })).toBe(6);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Divide })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Multiply })).toBe(9);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: [], b: 3, action: Action.Add })).toBeNull();
  });
});
