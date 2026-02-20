import { greet } from './index';

describe('greet', () => {
  it('returns default greeting', () => {
    expect(greet()).toBe('Hello, World!');
  });

  it('returns personalized greeting', () => {
    expect(greet('Alice')).toBe('Hello, Alice!');
  });
});
