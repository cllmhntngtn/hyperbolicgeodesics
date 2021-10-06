//function windowResized() {
//  resizeCanvas(windoWidth = 1440, windowHeight = 737);
//}

function setup() {
  createCanvas(1440, 9 * 737 / 10);
  //background('white');
  textFont('Helvetica');
  textAlign(CENTER, CENTER);

  inputChips = createInput('chips', 'number');
  inputChips.position(1440 / 10, 3 * 737 / 20);
  inputChips.size(50);
  inputChips.style('font-size', '30px');
  buttonChips = createButton('✓');
  buttonChips.position(inputChips.x + inputChips.width, 3 * 737 / 20);
  buttonChips.mousePressed(chips);
  buttonChips.style('font-size', '30px');
  buttonChips.style('background-color', 'whitesmoke');

  buttonReset = createButton('reset');
  buttonReset.position(1440 / 14, 5 * 737 / 20);
  buttonReset.mousePressed(reset);
  buttonReset.style('font-size', '30px');
  buttonReset.style('background-color', 'whitesmoke');
}

var chipPattern = ['','','',''];

var n = 0

var x = ['',''];
var y = ['',''];

vertexLabels = 'abcdefghijklmnopqrstuvwxyz';
firstVertexLabelNumber = 0;
secondVertexLabelNumber = 1;

function chips() {
  n = inputChips.value();
}

function reset() {
  n = 0;
  inputChips.value('')
}

// this is complex.js - I can't get it to work without including all 1400 lines of it in this file - my work continues on line 1483
(function(root) {

  'use strict';

  var cosh = function(x) {
    return (Math.exp(x) + Math.exp(-x)) * 0.5;
  };

  var sinh = function(x) {
    return (Math.exp(x) - Math.exp(-x)) * 0.5;
  };

  /**
   * Calculates cos(x) - 1 using Taylor series if x is small (-¼π ≤ x ≤ ¼π).
   *
   * @param {number} x
   * @returns {number} cos(x) - 1
   */
  var cosm1 = function(x) {

    var b = Math.PI / 4;
    if (-b > x || x > b) {
      return Math.cos(x) - 1.0;
    }

    /* Calculate horner form of polynomial of taylor series in Q
    var fac = 1, alt = 1, pol = {};
    for (var i = 0; i <= 16; i++) {
      fac*= i || 1;
      if (i % 2 == 0) {
        pol[i] = new Fraction(1, alt * fac);
        alt = -alt;
      }
    }
    console.log(new Polynomial(pol).toHorner()); // (((((((1/20922789888000x^2-1/87178291200)x^2+1/479001600)x^2-1/3628800)x^2+1/40320)x^2-1/720)x^2+1/24)x^2-1/2)x^2+1
    */

    var xx = x * x;
    return xx * (
      xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx * (
                  xx / 20922789888000
                  - 1 / 87178291200)
                + 1 / 479001600)
              - 1 / 3628800)
            + 1 / 40320)
          - 1 / 720)
        + 1 / 24)
      - 1 / 2);
  };

  var hypot = function(x, y) {

    var a = Math.abs(x);
    var b = Math.abs(y);

    if (a < 3000 && b < 3000) {
      return Math.sqrt(a * a + b * b);
    }

    if (a < b) {
      a = b;
      b = x / y;
    } else {
      b = y / x;
    }
    return a * Math.sqrt(1 + b * b);
  };

  var parser_exit = function() {
    throw SyntaxError('Invalid Param');
  };

  /**
   * Calculates log(sqrt(a^2+b^2)) in a way to avoid overflows
   *
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  function logHypot(a, b) {

    var _a = Math.abs(a);
    var _b = Math.abs(b);

    if (a === 0) {
      return Math.log(_b);
    }

    if (b === 0) {
      return Math.log(_a);
    }

    if (_a < 3000 && _b < 3000) {
      return Math.log(a * a + b * b) * 0.5;
    }

    /* I got 4 ideas to compute this property without overflow:
     *
     * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
     *
     * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)
     Math.log(a * a + b * b) / 2
     *
     *
     * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)
     var fn = function(a, b) {
     a = Math.abs(a);
     b = Math.abs(b);
     var t = Math.min(a, b);
     a = Math.max(a, b);
     t = t / a;
     return Math.log(a) + Math.log(1 + t * t) / 2;
     };
     * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)
     Math.log(a / Math.cos(Math.atan2(b, a)))
     * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)
     Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))
     */

    return Math.log(a / Math.cos(Math.atan2(b, a)));
  }

  var parse = function(a, b) {

    var z = { 're': 0, 'im': 0 };

    if (a === undefined || a === null) {
      z['re'] =
      z['im'] = 0;
    } else if (b !== undefined) {
      z['re'] = a;
      z['im'] = b;
    } else
      switch (typeof a) {

        case 'object':

          if ('im' in a && 're' in a) {
            z['re'] = a['re'];
            z['im'] = a['im'];
          } else if ('abs' in a && 'arg' in a) {
            if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) {
              return Complex['INFINITY'];
            }
            z['re'] = a['abs'] * Math.cos(a['arg']);
            z['im'] = a['abs'] * Math.sin(a['arg']);
          } else if ('r' in a && 'phi' in a) {
            if (!Number.isFinite(a['r']) && Number.isFinite(a['phi'])) {
              return Complex['INFINITY'];
            }
            z['re'] = a['r'] * Math.cos(a['phi']);
            z['im'] = a['r'] * Math.sin(a['phi']);
          } else if (a.length === 2) { // Quick array check
            z['re'] = a[0];
            z['im'] = a[1];
          } else {
            parser_exit();
          }
          break;

        case 'string':

          z['im'] = /* void */
          z['re'] = 0;

          var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
          var plus = 1;
          var minus = 0;

          if (tokens === null) {
            parser_exit();
          }

          for (var i = 0; i < tokens.length; i++) {

            var c = tokens[i];

            if (c === ' ' || c === '\t' || c === '\n') {
              /* void */
            } else if (c === '+') {
              plus++;
            } else if (c === '-') {
              minus++;
            } else if (c === 'i' || c === 'I') {

              if (plus + minus === 0) {
                parser_exit();
              }

              if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
                i++;
              } else {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + '1');
              }
              plus = minus = 0;

            } else {

              if (plus + minus === 0 || isNaN(c)) {
                parser_exit();
              }

              if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + c);
                i++;
              } else {
                z['re'] += parseFloat((minus % 2 ? '-' : '') + c);
              }
              plus = minus = 0;
            }
          }

          // Still something on the stack
          if (plus + minus > 0) {
            parser_exit();
          }
          break;

        case 'number':
          z['im'] = 0;
          z['re'] = a;
          break;

        default:
          parser_exit();
      }

    if (isNaN(z['re']) || isNaN(z['im'])) {
      // If a calculation is NaN, we treat it as NaN and don't throw
      //parser_exit();
    }

    return z;
  };

  /**
   * @constructor
   * @returns {Complex}
   */
  function Complex(a, b) {

    if (!(this instanceof Complex)) {
      return new Complex(a, b);
    }

    var z = parse(a, b);

    this['re'] = z['re'];
    this['im'] = z['im'];
  }

  Complex.prototype = {

    're': 0,
    'im': 0,

    /**
     * Calculates the sign of a complex number, which is a normalized complex
     *
     * @returns {Complex}
     */
    'sign': function() {

      var abs = this['abs']();

      return new Complex(
        this['re'] / abs,
        this['im'] / abs);
    },

    /**
     * Adds two complex numbers
     *
     * @returns {Complex}
     */
    'add': function(a, b) {

      var z = new Complex(a, b);

      // Infinity + Infinity = NaN
      if (this['isInfinite']() && z['isInfinite']()) {
        return Complex['NAN'];
      }

      // Infinity + z = Infinity { where z != Infinity }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      return new Complex(
        this['re'] + z['re'],
        this['im'] + z['im']);
    },

    /**
     * Subtracts two complex numbers
     *
     * @returns {Complex}
     */
    'sub': function(a, b) {

      var z = new Complex(a, b);

      // Infinity - Infinity = NaN
      if (this['isInfinite']() && z['isInfinite']()) {
        return Complex['NAN'];
      }

      // Infinity - z = Infinity { where z != Infinity }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      return new Complex(
        this['re'] - z['re'],
        this['im'] - z['im']);
    },

    /**
     * Multiplies two complex numbers
     *
     * @returns {Complex}
     */
    'mul': function(a, b) {

      var z = new Complex(a, b);

      // Infinity * 0 = NaN
      if ((this['isInfinite']() && z['isZero']()) || (this['isZero']() && z['isInfinite']())) {
        return Complex['NAN'];
      }

      // Infinity * z = Infinity { where z != 0 }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      // Short circuit for real values
      if (z['im'] === 0 && this['im'] === 0) {
        return new Complex(this['re'] * z['re'], 0);
      }

      return new Complex(
        this['re'] * z['re'] - this['im'] * z['im'],
        this['re'] * z['im'] + this['im'] * z['re']);
    },

    /**
     * Divides two complex numbers
     *
     * @returns {Complex}
     */
    'div': function(a, b) {

      var z = new Complex(a, b);

      // 0 / 0 = NaN and Infinity / Infinity = NaN
      if ((this['isZero']() && z['isZero']()) || (this['isInfinite']() && z['isInfinite']())) {
        return Complex['NAN'];
      }

      // Infinity / 0 = Infinity
      if (this['isInfinite']() || z['isZero']()) {
        return Complex['INFINITY'];
      }

      // 0 / Infinity = 0
      if (this['isZero']() || z['isInfinite']()) {
        return Complex['ZERO'];
      }

      a = this['re'];
      b = this['im'];

      var c = z['re'];
      var d = z['im'];
      var t, x;

      if (0 === d) {
        // Divisor is real
        return new Complex(a / c, b / c);
      }

      if (Math.abs(c) < Math.abs(d)) {

        x = c / d;
        t = c * x + d;

        return new Complex(
          (a * x + b) / t,
          (b * x - a) / t);

      } else {

        x = d / c;
        t = d * x + c;

        return new Complex(
          (a + b * x) / t,
          (b - a * x) / t);
      }
    },

    /**
     * Calculate the power of two complex numbers
     *
     * @returns {Complex}
     */
    'pow': function(a, b) {

      var z = new Complex(a, b);

      a = this['re'];
      b = this['im'];

      if (z['isZero']()) {
        return Complex['ONE'];
      }

      // If the exponent is real
      if (z['im'] === 0) {

        if (b === 0 && a > 0) {

          return new Complex(Math.pow(a, z['re']), 0);

        } else if (a === 0) { // If base is fully imaginary

          switch ((z['re'] % 4 + 4) % 4) {
            case 0:
              return new Complex(Math.pow(b, z['re']), 0);
            case 1:
              return new Complex(0, Math.pow(b, z['re']));
            case 2:
              return new Complex(-Math.pow(b, z['re']), 0);
            case 3:
              return new Complex(0, -Math.pow(b, z['re']));
          }
        }
      }

      /* I couldn't find a good formula, so here is a derivation and optimization
       *
       * z_1^z_2 = (a + bi)^(c + di)
       *         = exp((c + di) * log(a + bi)
       *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
       * =>...
       * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
       * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
       *
       * =>...
       * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
       * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
       *
       * =>
       * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
       * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
       *
       */

      if (a === 0 && b === 0 && z['re'] > 0 && z['im'] >= 0) {
        return Complex['ZERO'];
      }

      var arg = Math.atan2(b, a);
      var loh = logHypot(a, b);

      a = Math.exp(z['re'] * loh - z['im'] * arg);
      b = z['im'] * loh + z['re'] * arg;
      return new Complex(
        a * Math.cos(b),
        a * Math.sin(b));
    },

    /**
     * Calculate the complex square root
     *
     * @returns {Complex}
     */
    'sqrt': function() {

      var a = this['re'];
      var b = this['im'];
      var r = this['abs']();

      var re, im;

      if (a >= 0) {

        if (b === 0) {
          return new Complex(Math.sqrt(a), 0);
        }

        re = 0.5 * Math.sqrt(2.0 * (r + a));
      } else {
        re = Math.abs(b) / Math.sqrt(2 * (r - a));
      }

      if (a <= 0) {
        im = 0.5 * Math.sqrt(2.0 * (r - a));
      } else {
        im = Math.abs(b) / Math.sqrt(2 * (r + a));
      }

      return new Complex(re, b < 0 ? -im : im);
    },

    /**
     * Calculate the complex exponent
     *
     * @returns {Complex}
     */
    'exp': function() {

      var tmp = Math.exp(this['re']);

      if (this['im'] === 0) {
        //return new Complex(tmp, 0);
      }
      return new Complex(
        tmp * Math.cos(this['im']),
        tmp * Math.sin(this['im']));
    },

    /**
     * Calculate the complex exponent and subtracts one.
     *
     * This may be more accurate than `Complex(x).exp().sub(1)` if
     * `x` is small.
     *
     * @returns {Complex}
     */
    'expm1': function() {

      /**
       * exp(a + i*b) - 1
       = exp(a) * (cos(b) + j*sin(b)) - 1
       = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
       */

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.expm1(a) * Math.cos(b) + cosm1(b),
        Math.exp(a) * Math.sin(b));
    },

    /**
     * Calculate the natural log
     *
     * @returns {Complex}
     */
    'log': function() {

      var a = this['re'];
      var b = this['im'];

      if (b === 0 && a > 0) {
        //return new Complex(Math.log(a), 0);
      }

      return new Complex(
        logHypot(a, b),
        Math.atan2(b, a));
    },

    /**
     * Calculate the magnitude of the complex number
     *
     * @returns {number}
     */
    'abs': function() {

      return hypot(this['re'], this['im']);
    },

    /**
     * Calculate the angle of the complex number
     *
     * @returns {number}
     */
    'arg': function() {

      return Math.atan2(this['im'], this['re']);
    },

    /**
     * Calculate the sine of the complex number
     *
     * @returns {Complex}
     */
    'sin': function() {

      // sin(c) = (e^b - e^(-b)) / (2i)

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.sin(a) * cosh(b),
        Math.cos(a) * sinh(b));
    },

    /**
     * Calculate the cosine
     *
     * @returns {Complex}
     */
    'cos': function() {

      // cos(z) = (e^b + e^(-b)) / 2

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.cos(a) * cosh(b),
        -Math.sin(a) * sinh(b));
    },

    /**
     * Calculate the tangent
     *
     * @returns {Complex}
     */
    'tan': function() {

      // tan(c) = (e^(ci) - e^(-ci)) / (i(e^(ci) + e^(-ci)))

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = Math.cos(a) + cosh(b);

      return new Complex(
        Math.sin(a) / d,
        sinh(b) / d);
    },

    /**
     * Calculate the cotangent
     *
     * @returns {Complex}
     */
    'cot': function() {

      // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = Math.cos(a) - cosh(b);

      return new Complex(
        -Math.sin(a) / d,
        sinh(b) / d);
    },

    /**
     * Calculate the secant
     *
     * @returns {Complex}
     */
    'sec': function() {

      // sec(c) = 2 / (e^(ci) + e^(-ci))

      var a = this['re'];
      var b = this['im'];
      var d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);

      return new Complex(
        Math.cos(a) * cosh(b) / d,
        Math.sin(a) * sinh(b) / d);
    },

    /**
     * Calculate the cosecans
     *
     * @returns {Complex}
     */
    'csc': function() {

      // csc(c) = 2i / (e^(ci) - e^(-ci))

      var a = this['re'];
      var b = this['im'];
      var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);

      return new Complex(
        Math.sin(a) * cosh(b) / d,
        -Math.cos(a) * sinh(b) / d);
    },

    /**
     * Calculate the complex arcus sinus
     *
     * @returns {Complex}
     */
    'asin': function() {

      // asin(c) = -i * log(ci + sqrt(1 - c^2))

      var a = this['re'];
      var b = this['im'];

      var t1 = new Complex(
        b * b - a * a + 1,
        -2 * a * b)['sqrt']();

      var t2 = new Complex(
        t1['re'] - b,
        t1['im'] + a)['log']();

      return new Complex(t2['im'], -t2['re']);
    },

    /**
     * Calculate the complex arcus cosinus
     *
     * @returns {Complex}
     */
    'acos': function() {

      // acos(c) = i * log(c - i * sqrt(1 - c^2))

      var a = this['re'];
      var b = this['im'];

      var t1 = new Complex(
        b * b - a * a + 1,
        -2 * a * b)['sqrt']();

      var t2 = new Complex(
        t1['re'] - b,
        t1['im'] + a)['log']();

      return new Complex(Math.PI / 2 - t2['im'], t2['re']);
    },

    /**
     * Calculate the complex arcus tangent
     *
     * @returns {Complex}
     */
    'atan': function() {

      // atan(c) = i / 2 log((i + x) / (i - x))

      var a = this['re'];
      var b = this['im'];

      if (a === 0) {

        if (b === 1) {
          return new Complex(0, Infinity);
        }

        if (b === -1) {
          return new Complex(0, -Infinity);
        }
      }

      var d = a * a + (1.0 - b) * (1.0 - b);

      var t1 = new Complex(
        (1 - b * b - a * a) / d,
        -2 * a / d).log();

      return new Complex(-0.5 * t1['im'], 0.5 * t1['re']);
    },

    /**
     * Calculate the complex arcus cotangent
     *
     * @returns {Complex}
     */
    'acot': function() {

      // acot(c) = i / 2 log((c - i) / (c + i))

      var a = this['re'];
      var b = this['im'];

      if (b === 0) {
        return new Complex(Math.atan2(1, a), 0);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).atan()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).atan();
    },

    /**
     * Calculate the complex arcus secant
     *
     * @returns {Complex}
     */
    'asec': function() {

      // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))

      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(0, Infinity);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).acos()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).acos();
    },

    /**
     * Calculate the complex arcus cosecans
     *
     * @returns {Complex}
     */
    'acsc': function() {

      // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))

      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(Math.PI / 2, Infinity);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).asin()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).asin();
    },

    /**
     * Calculate the complex sinh
     *
     * @returns {Complex}
     */
    'sinh': function() {

      // sinh(c) = (e^c - e^-c) / 2

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        sinh(a) * Math.cos(b),
        cosh(a) * Math.sin(b));
    },

    /**
     * Calculate the complex cosh
     *
     * @returns {Complex}
     */
    'cosh': function() {

      // cosh(c) = (e^c + e^-c) / 2

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        cosh(a) * Math.cos(b),
        sinh(a) * Math.sin(b));
    },

    /**
     * Calculate the complex tanh
     *
     * @returns {Complex}
     */
    'tanh': function() {

      // tanh(c) = (e^c - e^-c) / (e^c + e^-c)

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = cosh(a) + Math.cos(b);

      return new Complex(
        sinh(a) / d,
        Math.sin(b) / d);
    },

    /**
     * Calculate the complex coth
     *
     * @returns {Complex}
     */
    'coth': function() {

      // coth(c) = (e^c + e^-c) / (e^c - e^-c)

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = cosh(a) - Math.cos(b);

      return new Complex(
        sinh(a) / d,
        -Math.sin(b) / d);
    },

    /**
     * Calculate the complex coth
     *
     * @returns {Complex}
     */
    'csch': function() {

      // csch(c) = 2 / (e^c - e^-c)

      var a = this['re'];
      var b = this['im'];
      var d = Math.cos(2 * b) - cosh(2 * a);

      return new Complex(
        -2 * sinh(a) * Math.cos(b) / d,
        2 * cosh(a) * Math.sin(b) / d);
    },

    /**
     * Calculate the complex sech
     *
     * @returns {Complex}
     */
    'sech': function() {

      // sech(c) = 2 / (e^c + e^-c)

      var a = this['re'];
      var b = this['im'];
      var d = Math.cos(2 * b) + cosh(2 * a);

      return new Complex(
        2 * cosh(a) * Math.cos(b) / d,
        -2 * sinh(a) * Math.sin(b) / d);
    },

    /**
     * Calculate the complex asinh
     *
     * @returns {Complex}
     */
    'asinh': function() {

      // asinh(c) = log(c + sqrt(c^2 + 1))

      var tmp = this['im'];
      this['im'] = -this['re'];
      this['re'] = tmp;
      var res = this['asin']();

      this['re'] = -this['im'];
      this['im'] = tmp;
      tmp = res['re'];

      res['re'] = -res['im'];
      res['im'] = tmp;
      return res;
    },

    /**
     * Calculate the complex acosh
     *
     * @returns {Complex}
     */
    'acosh': function() {

      // acosh(c) = log(c + sqrt(c^2 - 1))

      var res = this['acos']();
      if (res['im'] <= 0) {
        var tmp = res['re'];
        res['re'] = -res['im'];
        res['im'] = tmp;
      } else {
        var tmp = res['im'];
        res['im'] = -res['re'];
        res['re'] = tmp;
      }
      return res;
    },

    /**
     * Calculate the complex atanh
     *
     * @returns {Complex}
     */
    'atanh': function() {

      // atanh(c) = log((1+c) / (1-c)) / 2

      var a = this['re'];
      var b = this['im'];

      var noIM = a > 1 && b === 0;
      var oneMinus = 1 - a;
      var onePlus = 1 + a;
      var d = oneMinus * oneMinus + b * b;

      var x = (d !== 0)
        ? new Complex(
          (onePlus * oneMinus - b * b) / d,
          (b * oneMinus + onePlus * b) / d)
        : new Complex(
          (a !== -1) ? (a / 0) : 0,
          (b !== 0) ? (b / 0) : 0);

      var temp = x['re'];
      x['re'] = logHypot(x['re'], x['im']) / 2;
      x['im'] = Math.atan2(x['im'], temp) / 2;
      if (noIM) {
        x['im'] = -x['im'];
      }
      return x;
    },

    /**
     * Calculate the complex acoth
     *
     * @returns {Complex}
     */
    'acoth': function() {

      // acoth(c) = log((c+1) / (c-1)) / 2

      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(0, Math.PI / 2);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).atanh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).atanh();
    },

    /**
     * Calculate the complex acsch
     *
     * @returns {Complex}
     */
    'acsch': function() {

      // acsch(c) = log((1+sqrt(1+c^2))/c)

      var a = this['re'];
      var b = this['im'];

      if (b === 0) {

        return new Complex(
          (a !== 0)
            ? Math.log(a + Math.sqrt(a * a + 1))
            : Infinity, 0);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).asinh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).asinh();
    },

    /**
     * Calculate the complex asech
     *
     * @returns {Complex}
     */
    'asech': function() {

      // asech(c) = log((1+sqrt(1-c^2))/c)

      var a = this['re'];
      var b = this['im'];

      if (this['isZero']()) {
        return Complex['INFINITY'];
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).acosh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).acosh();
    },

    /**
     * Calculate the complex inverse 1/z
     *
     * @returns {Complex}
     */
    'inverse': function() {

      // 1 / 0 = Infinity and 1 / Infinity = 0
      if (this['isZero']()) {
        return Complex['INFINITY'];
      }

      if (this['isInfinite']()) {
        return Complex['ZERO'];
      }

      var a = this['re'];
      var b = this['im'];

      var d = a * a + b * b;

      return new Complex(a / d, -b / d);
    },

    /**
     * Returns the complex conjugate
     *
     * @returns {Complex}
     */
    'conjugate': function() {

      return new Complex(this['re'], -this['im']);
    },

    /**
     * Gets the negated complex number
     *
     * @returns {Complex}
     */
    'neg': function() {

      return new Complex(-this['re'], -this['im']);
    },

    /**
     * Ceils the actual complex number
     *
     * @returns {Complex}
     */
    'ceil': function(places) {

      places = Math.pow(10, places || 0);

      return new Complex(
        Math.ceil(this['re'] * places) / places,
        Math.ceil(this['im'] * places) / places);
    },

    /**
     * Floors the actual complex number
     *
     * @returns {Complex}
     */
    'floor': function(places) {

      places = Math.pow(10, places || 0);

      return new Complex(
        Math.floor(this['re'] * places) / places,
        Math.floor(this['im'] * places) / places);
    },

    /**
     * Ceils the actual complex number
     *
     * @returns {Complex}
     */
    'round': function(places) {

      places = Math.pow(10, places || 0);

      return new Complex(
        Math.round(this['re'] * places) / places,
        Math.round(this['im'] * places) / places);
    },

    /**
     * Compares two complex numbers
     *
     * **Note:** new Complex(Infinity).equals(Infinity) === false
     *
     * @returns {boolean}
     */
    'equals': function(a, b) {

      var z = new Complex(a, b);

      return Math.abs(z['re'] - this['re']) <= Complex['EPSILON'] &&
        Math.abs(z['im'] - this['im']) <= Complex['EPSILON'];
    },

    /**
     * Clones the actual object
     *
     * @returns {Complex}
     */
    'clone': function() {

      return new Complex(this['re'], this['im']);
    },

    /**
     * Gets a string of the actual complex number
     *
     * @returns {string}
     */
    'toString': function() {

      var a = this['re'];
      var b = this['im'];
      var ret = "";

      if (this['isNaN']()) {
        return 'NaN';
      }

      if (this['isInfinite']()) {
        return 'Infinity';
      }

      if (Math.abs(a) < Complex['EPSILON']) {
        a = 0;
      }

      if (Math.abs(b) < Complex['EPSILON']) {
        b = 0;
      }

      // If is real number
      if (b === 0) {
        return ret + a;
      }

      if (a !== 0) {
        ret += a;
        ret += " ";
        if (b < 0) {
          b = -b;
          ret += "-";
        } else {
          ret += "+";
        }
        ret += " ";
      } else if (b < 0) {
        b = -b;
        ret += "-";
      }

      if (1 !== b) { // b is the absolute imaginary part
        ret += b;
      }
      return ret + "i";
    },

    /**
     * Returns the actual number as a vector
     *
     * @returns {Array}
     */
    'toVector': function() {

      return [this['re'], this['im']];
    },

    /**
     * Returns the actual real value of the current object
     *
     * @returns {number|null}
     */
    'valueOf': function() {

      if (this['im'] === 0) {
        return this['re'];
      }
      return null;
    },

    /**
     * Determines whether a complex number is not on the Riemann sphere.
     *
     * @returns {boolean}
     */
    'isNaN': function() {
      return isNaN(this['re']) || isNaN(this['im']);
    },

    /**
     * Determines whether or not a complex number is at the zero pole of the
     * Riemann sphere.
     *
     * @returns {boolean}
     */
    'isZero': function() {
      return this['im'] === 0 && this['re'] === 0;
    },

    /**
     * Determines whether a complex number is not at the infinity pole of the
     * Riemann sphere.
     *
     * @returns {boolean}
     */
    'isFinite': function() {
      return isFinite(this['re']) && isFinite(this['im']);
    },

    /**
     * Determines whether or not a complex number is at the infinity pole of the
     * Riemann sphere.
     *
     * @returns {boolean}
     */
    'isInfinite': function() {
      return !(this['isNaN']() || this['isFinite']());
    }
  };

  Complex['ZERO'] = new Complex(0, 0);
  Complex['ONE'] = new Complex(1, 0);
  Complex['I'] = new Complex(0, 1);
  Complex['PI'] = new Complex(Math.PI, 0);
  Complex['E'] = new Complex(Math.E, 0);
  Complex['INFINITY'] = new Complex(Infinity, Infinity);
  Complex['NAN'] = new Complex(NaN, NaN);
  Complex['EPSILON'] = 1e-15;

  if (typeof define === 'function' && define['amd']) {
    define([], function() {
      return Complex;
    });
  } else if (typeof exports === 'object') {
    Object.defineProperty(Complex, "__esModule", { 'value': true });
    Complex['default'] = Complex;
    Complex['Complex'] = Complex;
    module['exports'] = Complex;
  } else {
    root['Complex'] = Complex;
  }

})(this);

function draw() {
  const zero = 'darkblue';
  const one = 'mediumpurple';
  const two = 'seagreen';
  const three = 'bisque';

  background('white');

  push();
  noStroke();
  fill('white');
  rect(0, 0, 1440 / 8, 737 / 2);
  pop();

  const xOriginPD = 1440 / 2;
  const yOriginPD = 7 * 737 / 15;
  const discRadius = 2 * 737 / 5;

  // drawing the central tile
  if (chipPattern[0]) {
    push();
    strokeWeight(2);
    stroke('black');
    fill(chipPattern[0]);
    circle(xOriginPD, yOriginPD, 2 * discRadius);
    pop();
  }

  // drawing a1 tiles
  if (chipPattern[1]) {
    //for(var k = 1; k<8; k+=2) {
    //  x = xOriginPD + discRadius * cos(k*PI/4);
    //  y = yOriginPD + discRadius * sin(k*PI/4);
    //}

    var a1X = [-0.414214,0.414214,0.414214,2.414214,2.414214,-2.414214,-2.414214,-0.414214];
    var a1Y = [0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001];

    var a1SemiCentreX = [720,720,303.089971,303.089971,720,720,1136.910028,1136.910028];
    var a1SemiCentreY = [-72.977136,-72.977136,343.933515,343.933515,760.843439,760.843439,343.933516,343.933516];
    var a1SemiRadius = [294.800440,294.800440,294.799818,294.799818,294.799925,294.799925,294.799817,294.799817];

    for (var index = 0; index < a1X.length; index += 2) {
      push();
      strokeWeight(2);
      stroke('black');
      fill(chipPattern[1]);
      if (a1X[index] && a1Y[index] && a1X[index + 1] && a1Y[index + 1]) {
        circle(a1SemiCentreX[index], a1SemiCentreY[index], 2 * a1SemiRadius[index]);
      }
      pop();
    }
  }

  // drawing a2 tiles
  if (chipPattern[2]) {
    //for(var k = 1; k<24; k+=2) {
    //  x = xOriginPD + discRadius * cos(k*PI/12);
    //  y = yOriginPD + discRadius * sin(k*PI/12);
    //}

    var a2X = [-0.414214,-0.131652,-0.131652,0.131652,0.131652,0.414214,0.414214,0.767327,0.767327,1.303225,1.303225,2.414214,
      2.414214,7.595754,7.595754,-7.595754,-7.595754,-2.414214,-2.414214,-1.303225,-1.303225,-0.767327,-0.767327,-0.414214];

    var a2Y = [0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,
      0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001];

    var a2SemiCentreX = [872.599714,872.599714,720,720,567.400286,567.400286,455.689519,455.689519,414.800594,414.800594,455.689525,455.689525,
      567.400310,567.400310,720,720,872.599687,872.599687,984.310474,984.310474,1025.199406,1025.199406,984.310481,984.310481];

    var a2SemiCentreY = [79.622806,79.622806,38.733995,38.733995,79.622805,79.622805,191.333740,191.333740,343.933293,343.933293,496.533031,496.533031,
      608.243787,608.243787,649.132750,649.132750,608.243792,608.243792,496.533030,496.533030,343.933294,343.933294,191.333740,191.333740];

    var a2SemiRadius = [78.991694,78.991694,78.991113,78.991113,78.991695,78.991695,78.991306,78.991306,78.991376,78.991376,78.991486,78.991486,
      78.991401,78.991401,78.991423,78.991423,78.991406,78.991406,78.991485,78.991485,78.991306,78.991306,78.991306,78.991306];

    for (var index = 0; index < a2X.length; index += 2) {
      push();
      strokeWeight(2);
      stroke('black');
      fill(chipPattern[2]);
      if (a2X[index] && a2Y[index] && a2X[index + 1] && a2Y[index + 1]) {
        circle(a2SemiCentreX[index], a2SemiCentreY[index], 2 * a2SemiRadius[index]);
      }
      pop();
    }
  }

  // drawing a3 tiles
  if (chipPattern[3]) {
    //for(var k = 1; k<72; k+=2) {
    //  x = xOriginPD + discRadius * cos(k*PI/36);
    //  y = yOriginPD + discRadius * sin(k*PI/36);
    //}

    var a3X = [-0.414214,-0.315299,-0.315299,-0.221695,-0.221695,-0.131652,-0.131652,-0.043661,-0.043661,0.043661,0.043661,0.131652,
      0.131652,0.221695,0.221695,0.315299,0.315299,0.414214,0.414214,0.520567,0.520567,0.637070,0.637070,0.767327,
      0.767327,0.916331,0.916331,1.091309,1.091309,1.303225,1.303225,1.569686,1.569686,1.920982,1.920982,2.414214,
      2.414214,3.171595,3.171595,4.510709,4.510709,7.595754,7.595754,22.903766,22.903766,-22.903766,-22.903766,-7.595754,
      -7.595754,-4.510709,-4.510709,-3.171595,-3.171595,-2.414214,-2.414214,-1.920982,-1.920982,-1.569686,-1.569686,-1.303225,
      -1.303225,-1.091309,-1.091309,-0.916331,-0.916331,-0.767327,-0.767327,-0.637070,-0.637070,-0.520567,-0.520567,-0.414214];

    var a3Y = [0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,
      0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,
      0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,
      0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,
      0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,
      0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,0.000001,];

    var a3SemiCentreX = [910.217754,910.217754,867.963174,867.963174,821.212644,821.212644,771.386898,771.386898,720,720,668.613102,668.613102,
      618.787356,618.787356,572.036826,572.036826,529.782246,529.782246,493.307409,493.307409,463.720527,463.720527,441.920452,441.920452,
      428.569701,428.569701,424.073903,424.073903,428.569708,428.569708,441.920430,441.920430,463.720507,463.720507,493.307470,493.307470,
      529.782397,529.782397,572.036966,572.036966,618.787323,618.787323,668.612974,668.612974,720,720,771.387036,771.387036,
      821.212678,821.212678,867.963033,867.963033,910.217605,910.217605,946.692529,946.692529,976.279492,976.279492,998.079570,998.079570,
      1011.430293,1011.430293,1015.926096,1015.926096,1011.430299,1011.430299,998.079548,998.079548,976.279473,976.279473,946.692591,946.692591];

    var a3SemiCentreY = [117.240902,117.240902,87.653902,87.653902,65.853735,65.853735,52.503019,52.503019,48.007242,48.007242,52.503019,52.503019,
      65.853735,65.853735,87.653902,87.653902,117.240902,117.240902,153.715793,153.715793,195.970233,195.970233,242.791715,242.791715,
      292.546282,292.546282,343.933373,343.933373,395.320384,395.320384,445.146014,445.146014,491.896340,491.896340,534.150966,534.150966,
      570.625884,570.625884,600.212849,600.212849,622.012896,622.012896,635.363635,635.363635,639.859488,639.859488,635.363649,635.363649,
      622.012890,622.012890,600.212850,600.212850,570.625884,570.625884,534.150966,534.150966,491.896370,491.896370,445.146015,445.146015,
      395.320384,395.320384,343.933373,343.933373,292.546283,292.546283,242.720599,242.720599,195.970233,195.970233,153.715793,153.715793];

    var a3SemiRadius = [25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,
      25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,
      25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,
      25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791,25.791];

    for (var index = 0; index < a3X.length; index += 2) {
      push();
      strokeWeight(2);
      stroke('black');
      fill(chipPattern[3]);
      if (a3X[index] && a3Y[index] && a3X[index + 1] && a3Y[index + 1]) {
        circle(a3SemiCentreX[index], a3SemiCentreY[index], 2 * a3SemiRadius[index]);
      }
      pop();
    }
  }

  // whiteout of the background outside the disc
  push();
  fill('white');
  var N = 100;
  noStroke();
  beginShape();
    vertex(0, 0);
    vertex(1440, 0);
    vertex(1440, 737);
    vertex(0, 737);
    beginContour();
      for(var k = 0; k<=N; k++) {
        vertex(xOriginPD + discRadius * cos(-k * 2 * PI/N),
          yOriginPD + discRadius * sin(-k * 2 * PI/N));
      }
    endContour();
  endShape();
  pop();

  // drawing the disc
  push();
  strokeWeight(2);
  noFill();
  circle(xOriginPD, yOriginPD, 2 * discRadius);
  pop();

  // input labels
  push();
  textSize(40);
  text('chips', 1440 / 18, 1.5 * 737 / 20 + 18);
  pop();

  // colour key
  push();
  textSize(40);
  textAlign(RIGHT, CENTER);
  text('zero =', 1440 / 9, 9 * 737 / 20 + 18);
  text('one =', 1440 / 9, 10.5 * 737 / 20 + 18);
  text('two =', 1440 / 9, 12 * 737 / 20 + 18);
  text('three =', 1440 / 9, 13.5 * 737 / 20 + 18);
  pop();

  push();
  noStroke();
  fill(zero);
  circle(1440 / 9 + 40, 9 * 737 / 20 + 18, 40);
  fill(one);
  circle(1440 / 9 + 40, 10.5 * 737 / 20 + 18, 40);
  fill(two);
  circle(1440 / 9 + 40, 12 * 737 / 20 + 18, 40);
  fill(three);
  circle(1440 / 9 + 40, 13.5 * 737 / 20 + 18, 40);
  pop();

  if (n == 0) {chipPattern = ['','','',''];}
  if (n == 1) {chipPattern = [one,'','',''];}
  if (n == 2) {chipPattern = [two,'','',''];}
  if (n == 3) {chipPattern = [three,'','',''];}
  if (n == 4) {chipPattern = [zero,one,'',''];}
  if (n == 5) {chipPattern = [one,one,'',''];}
  if (n == 6) {chipPattern = [two,one,'',''];}
  if (n == 7) {chipPattern = [three,one,'',''];}
  if (n == 8) {chipPattern = [zero,two,'',''];}
  if (n == 9) {chipPattern = [one,two,'',''];}
  if (n == 10) {chipPattern = [two,two,'',''];}
  if (n == 11) {chipPattern = [three,two,'',''];}
  if (n == 12) {chipPattern = [zero,three,'',''];}
  if (n == 13) {chipPattern = [one,three,'',''];}
  if (n == 14) {chipPattern = [two,three,'',''];}
  if (n == 15) {chipPattern = [three,three,'',''];}
  if (n == 16) {chipPattern = [zero,one,one,''];}
  if (n == 17) {chipPattern = [one,one,one,''];}
  if (n == 18) {chipPattern = [two,one,one,''];}
  if (n == 19) {chipPattern = [three,one,one,''];}
  if (n == 20) {chipPattern = [zero,two,one,''];}
  if (n == 21) {chipPattern = [one,two,one,''];}
  if (n == 22) {chipPattern = [two,two,one,''];}
  if (n == 23) {chipPattern = [three,two,one,''];}
  if (n == 24) {chipPattern = [zero,three,one,''];}
  if (n == 25) {chipPattern = [one,three,one,''];}
  if (n == 26) {chipPattern = [two,three,one,''];}
  if (n == 27) {chipPattern = [three,three,one,''];}
  if (n == 28) {chipPattern = [zero,one,two,''];}
  if (n == 29) {chipPattern = [one,one,two,''];}
  if (n == 30) {chipPattern = [two,one,two,''];}
  if (n == 31) {chipPattern = [three,one,two,''];}
  if (n == 32) {chipPattern = [zero,two,two,''];}
  if (n == 33) {chipPattern = [one,two,two,''];}
  if (n == 34) {chipPattern = [two,two,two,''];}
  if (n == 35) {chipPattern = [three,two,two,''];}
  if (n == 36) {chipPattern = [zero,three,two,''];}
  if (n == 37) {chipPattern = [one,three,two,''];}
  if (n == 38) {chipPattern = [two,three,two,''];}
  if (n == 39) {chipPattern = [three,three,two,''];}
  if (n == 40) {chipPattern = [zero,one,three,''];}
  if (n == 41) {chipPattern = [one,one,three,''];}
  if (n == 42) {chipPattern = [two,one,three,''];}
  if (n == 43) {chipPattern = [three,one,three,''];}
  if (n == 44) {chipPattern = [zero,two,three,''];}
  if (n == 45) {chipPattern = [one,two,three,''];}
  if (n == 46) {chipPattern = [two,two,three,''];}
  if (n == 47) {chipPattern = [three,two,three,''];}
  if (n == 48) {chipPattern = [zero,three,three,''];}
  if (n == 49) {chipPattern = [one,three,three,''];}
  if (n == 50) {chipPattern = [two,three,three,''];}
  if (n == 51) {chipPattern = [three,three,three,''];}
  if (n == 52) {chipPattern = [zero,one,one,one];}
  if (n == 53) {chipPattern = [one,one,one,one];}
  if (n == 54) {chipPattern = [two,one,one,one];}
  if (n == 55) {chipPattern = [three,one,one,one];}
  if (n == 56) {chipPattern = [zero,two,one,one];}
  if (n == 57) {chipPattern = [one,two,one,one];}
  if (n == 58) {chipPattern = [two,two,one,one];}
  if (n == 59) {chipPattern = [three,two,one,one];}
  if (n == 60) {chipPattern = [zero,three,one,one];}
  if (n == 61) {chipPattern = [one,three,one,one];}
  if (n == 62) {chipPattern = [two,three,one,one];}
  if (n == 63) {chipPattern = [three,three,one,one];}
  if (n == 64) {chipPattern = [zero,one,two,one];}
  if (n == 65) {chipPattern = [one,one,two,one];}
  if (n == 66) {chipPattern = [two,one,two,one];}
  if (n == 67) {chipPattern = [three,one,two,one];}
  if (n == 68) {chipPattern = [zero,two,two,one];}
  if (n == 69) {chipPattern = [one,two,two,one];}
  if (n == 70) {chipPattern = [two,two,two,one];}
  if (n == 71) {chipPattern = [three,two,two,one];}
  if (n == 72) {chipPattern = [zero,three,two,one];}
  if (n == 73) {chipPattern = [one,three,two,one];}
  if (n == 74) {chipPattern = [two,three,two,one];}
  if (n == 75) {chipPattern = [three,three,two,one];}
  if (n == 76) {chipPattern = [zero,one,three,one];}
  if (n == 77) {chipPattern = [one,one,three,one];}
  if (n == 78) {chipPattern = [two,one,three,one];}
  if (n == 79) {chipPattern = [three,one,three,one];}
  if (n == 80) {chipPattern = [zero,two,three,one];}
  if (n == 81) {chipPattern = [one,two,three,one];}
  if (n == 82) {chipPattern = [two,two,three,one];}
  if (n == 83) {chipPattern = [three,two,three,one];}
  if (n == 84) {chipPattern = [zero,three,three,one];}
  if (n == 85) {chipPattern = [one,three,three,one];}
  if (n == 86) {chipPattern = [two,three,three,one];}
  if (n == 87) {chipPattern = [three,three,three,one];}
  if (n == 88) {chipPattern = [zero,one,one,two];}
  if (n == 89) {chipPattern = [one,one,one,two];}
  if (n == 90) {chipPattern = [two,one,one,two];}
  if (n == 91) {chipPattern = [three,one,one,two];}
  if (n == 92) {chipPattern = [zero,two,one,two];}
  if (n == 93) {chipPattern = [one,two,one,two];}
  if (n == 94) {chipPattern = [two,two,one,two];}
  if (n == 95) {chipPattern = [three,two,one,two];}
  if (n == 96) {chipPattern = [zero,three,one,two];}
  if (n == 97) {chipPattern = [one,three,one,two];}
  if (n == 98) {chipPattern = [two,three,one,two];}
  if (n == 99) {chipPattern = [three,three,one,two];}
  if (n == 100) {chipPattern = [zero,one,two,two];}
  if (n == 101) {chipPattern = [one,one,two,two];}
  if (n == 102) {chipPattern = [two,one,two,two];}
  if (n == 103) {chipPattern = [three,one,two,two];}
  if (n == 104) {chipPattern = [zero,two,two,two];}
  if (n == 105) {chipPattern = [one,two,two,two];}
  if (n == 106) {chipPattern = [two,two,two,two];}
  if (n == 107) {chipPattern = [three,two,two,two];}
}
