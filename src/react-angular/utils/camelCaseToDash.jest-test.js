import camelCaseToDash from './camelCaseToDash';

describe('camelCaseToDash', () => {
  it('should convert camelCased strings to lowercase with dashes', () => {
    expect(camelCaseToDash('myCamelCasedString')).toEqual('my-camel-cased-string');
    expect(camelCaseToDash('aboringstring')).toEqual('aboringstring');
    expect(camelCaseToDash('PascalCasedString')).toEqual('pascal-cased-string');
    expect(camelCaseToDash('weirD-String')).toEqual('weir-d-string');
  });
});
