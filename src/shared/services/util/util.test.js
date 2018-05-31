import { isDefined, isFunction, isString, cloneObject } from './util';

describe('util service', () => {
  const fn = () => { };
  const ob = {};
  const nil = null;
  const undef = undefined;
  let notdefined;
  const str = '';

  it('should recognise the functions ', () => {
    expect(isFunction(fn)).toBe(true);
    expect(isFunction(ob)).toBe(false);
    expect(isFunction(nil)).toBe(false);
    expect(isFunction(undef)).toBe(false);
    expect(isFunction(notdefined)).toBe(false);
    expect(isFunction(str)).toBe(false);
  });

  it('should recognise the definded ', () => {
    expect(isDefined(fn)).toBe(true);
    expect(isDefined(ob)).toBe(true);
    expect(isDefined(nil)).toBe(true);
    expect(isDefined(undef)).toBe(false);
    expect(isDefined(notdefined)).toBe(false);
    expect(isDefined(str)).toBe(true);
  });

  it('should recognise the strings ', () => {
    expect(isString(fn)).toBe(false);
    expect(isString(ob)).toBe(false);
    expect(isString(nil)).toBe(false);
    expect(isString(undef)).toBe(false);
    expect(isString(notdefined)).toBe(false);
    expect(isString(str)).toBe(true);
  });

  it.only('should clone object', () => {
    const obj = { a: 'a', b: { c: 'c' }, f: () => this.b.c };
    const cloned = cloneObject(obj);
    expect(obj).not.toBe(cloned);
    expect(obj).toEqual(cloned);
  });
});
