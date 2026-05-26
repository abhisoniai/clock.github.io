const { test, expect } = require('@jest/globals');
const greet = require('./greet');

describe('greet function', () => {
  test('should greet with name', () => {
    expect(greet('John')).toBe('Hello, John!');
  });
});