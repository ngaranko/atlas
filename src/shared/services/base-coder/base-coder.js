class BaseCoder {
  /**
   * Constructor for the BaseCoder class
   * @param base the base to encode and decode numbers, or arrays of numbers
   * to strings or arrays of strings
   */
  constructor(base) {
    /**
     * The charset specifies the mapping from decimal numbers to a certain base
     * Example: F is the 15th character, it represents 15 in the hexadecimal base
     * @type {string[]}
     * @private
     */
    this.CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    if (BaseCoder.isInt(base) && base >= 2 && base <= this.CHARSET.length) {
      this.base = +base;
    } else {
      throw new RangeError(`Base ${base} not within 2 and ${this.CHARSET.length}`);
    }
  }

  /**
   * Gets the decimal value of a character
   * @param {string} c the character for which to get the decimal value
   * @returns {number} the decimal value of the character
   * @private
   */
  characterValue(c) {
    const i = this.CHARSET.indexOf(c);
    if (i >= 0 && i < this.base) {
      return i;
    }
    throw new TypeError(`Illegal character ${c} for base ${this.base}`);
  }

  /**
   * Encodes a number to the base as set in base.
   * It does so by recursively calling itself until arriving at a remainder < base
   * @param {number} n the number to convert
   * @returns {string} the string that represents the number in base base
   * @private
   */
  encodeNumber(n) {
    if (n >= this.base) {
      const quotient = Math.trunc(n / this.base);
      const remainder = n % this.base;
      return this.encodeNumber(quotient) +
        this.encodeNumber(remainder);
    }
    return this.CHARSET[n];
  }

  /**
   * Decodes a string representation of a base encoded number
   * @param {string} s the string to decode
   * @param {number} len the length of the string to decode
   * @returns {number} the decimal value of the base decoded string
   * @private
   */
  decodeString(s, len = s.length) {
    if (len > 1) {
      const quotient = s.substr(0, len - 1);
      const remainder = s.charAt(len - 1);
      return (this.base *
        this.decodeString(quotient, len - 1)) +
        this.decodeString(remainder, 1);
    }
    return this.characterValue(s);
  }
  /**
   * Tells whether a number is an integer
   * @param {number} n the number to test
   * @returns {boolean} true when it concens a number which is an integer
   */
  static isInt(n) {
    return typeof n === 'number' && n % 1 === 0;
  }

  /**
   * The decimal factor that corresponds to the number of decimals
   * Example 1 decimal corresponds to 0.1
   * @param {number} nDecimals
   * @returns {number}
   */
  static precisionFactor(nDecimals) {
    if (BaseCoder.isInt(nDecimals) && nDecimals !== 0) {
      if (nDecimals > 0) {
        return 10 ** nDecimals;
      }
      throw new RangeError(`Negative decimals ${nDecimals} not allowed`);
    } else {
      throw new RangeError(`Non integer decimals ${nDecimals} not allowed`);
    }
  }

  /**
   * Reduces the number of decimals by the given precision factor
   * @param {number|Array} input - it either be a single number of an array of numbers
   * @param {number} decimals
   * @returns {number}
   */
  static toPrecision(input, decimals) {
    if (Array.isArray(input)) {
      return input.map((item) => BaseCoder.toPrecision(item, decimals));
    }
    return Number(`${Math.round(`${input}e${decimals}`)}e-${decimals}`);
  }

  /**
   * Encodes a string expression of a number by converting it to a number
   * @param {string} expr the string expression to convert
   * @param {number} nDecimals
   * @returns {string}
   */
  encodeFromString(expr, nDecimals = 0) {
    return this.encode(Number(expr), nDecimals);
  }

  /**
   * Encodes a number or an array of numbers (to any depth) to base base
   * It does so by calling the private method _encodeNumber
   * @param {(number|number[])}expr the expression (number or array)
   * @param {number} nDecimals
   * @returns {(string|string[])}
   */
  encode(value, nDecimals = 0) {
    if (typeof value === 'number') {
      let expr = value;
      if (nDecimals === 0 && !BaseCoder.isInt(expr)) {
        return undefined;
      } else if (nDecimals !== 0) {
        const precisionFactor = BaseCoder.precisionFactor(nDecimals);
        if (isFinite(precisionFactor)) {
          expr = BaseCoder.toPrecision(expr, nDecimals);
          expr = Math.round(expr * precisionFactor);
        } else {
          return Number.NaN;
        }
      }
      let sign = '';
      if (expr < 0) {
        sign = '-';
        expr = -expr;
      }
      return sign + this.encodeNumber(expr);
    } else if (Array.isArray(value)) {
      return value.map((e) => this.encode(e, nDecimals));
    }
    return '';
  }

  /**
   * Decodes an string or an array of strings (to any depth) to decimals
   * It does so by calling decodeString
   * @param {(string|string[])} expr the expression (string or array of strings)
   * @param {number} nDecimals
   * @returns {number}
   */
  decode(value, nDecimals = 0) {
    if (String.isString(value)) {
      let sign = 1;
      let expr = value;
      if (expr.charAt(0) === '-') {
        sign = -1;
        expr = expr.substr(1);
      }
      let result = sign * this.decodeString(expr);
      if (nDecimals !== 0) {
        const precisionFactor = BaseCoder.precisionFactor(nDecimals);
        if (isFinite(precisionFactor)) {
          result /= precisionFactor;
        } else {
          result = Number.NaN;
        }
      }
      return result;
    } else if (Array.isArray(value)) {
      return value.map((e) => this.decode(e, nDecimals));
    }
    return 0;
  }
}

export function getCoderForBase(base) {
  return new BaseCoder(base);
}

export default BaseCoder;
