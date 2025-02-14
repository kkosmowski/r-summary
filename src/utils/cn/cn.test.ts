import { describe, expect, test } from 'vitest';

import { cn } from './cn';

describe('cn util', () => {
  test('should skip when no classNames', () => {
    const condition = false;

    expect(cn()).toEqual(undefined);
    expect(cn('')).toEqual(undefined);
    expect(cn(condition && 'some_class')).toEqual(undefined);
    expect(cn(null)).toEqual(undefined);
    expect(cn(undefined)).toEqual(undefined);
  });

  test('should work with single className', () => {
    const className = 'test1852';

    expect(cn(className)).toEqual(className);
  });

  test('should work with multiple classNames', () => {
    const classNames = ['test1852', 'oqj_button', 'hello', 'test128'];
    const expected = classNames.join(' ');

    expect(cn(...classNames)).toEqual(expected);
  });

  test('should work with conditional classNames', () => {
    const condition = false;
    const classNames = ['test1852', condition ? 'oqj_button' : ''];
    const expected = classNames[0];

    expect(cn(...classNames)).toEqual(expected);
  });

  test('should ignore non-string classNames', () => {
    const condition = false;
    const classNames = ['test1852', condition && 'oqj_button', null, undefined, 'last_class'];
    const expected = `${classNames[0]} ${classNames[classNames.length - 1]}`;

    expect(cn(...classNames)).toEqual(expected);
  });

  test('should never leave an empty string', () => {
    const classNames = ['test1852 '];
    const expected = 'test1852';

    expect(cn(...classNames)).toEqual(expected);
  });
});
