//function windowResized() {
//  resizeCanvas(windoWidth = 1440, windowHeight = 737);
//}

function setup() {
  createCanvas(1440, 9 * 737 / 10);
  background('white');
  textFont('Helvetica');
  textAlign(CENTER, CENTER);

  inputReA = createInput('', 'number');
  inputReA.position(1440 / 18, 3 * 737 / 20);
  inputReA.size(50);
  inputReA.style('font-size', '20px');
  buttonReA = createButton('✓');
  buttonReA.position(inputReA.x + inputReA.width, 3 * 737 / 20);
  buttonReA.mousePressed(reA);
  buttonReA.style('font-size', '20px');
  buttonReA.style('background-color', 'whitesmoke');


  inputImA = createInput('', 'number');
  inputImA.position(1440 / 18, 4 * 737 / 20);
  inputImA.size(50);
  inputImA.style('font-size', '20px');
  buttonImA = createButton('✓');
  buttonImA.position(inputImA.x + inputImA.width, 4 * 737 / 20);
  buttonImA.mousePressed(imA);
  buttonImA.style('font-size', '20px');
  buttonImA.style('background-color', 'whitesmoke');

  inputReB = createInput('', 'number');
  inputReB.position(1440 / 18, 6 * 737 / 20);
  inputReB.size(50);
  inputReB.style('font-size', '20px');
  buttonReB = createButton('✓');
  buttonReB.position(inputReB.x + inputReB.width, 6 * 737 / 20);
  buttonReB.mousePressed(reB);
  buttonReB.style('font-size', '20px');
  buttonReB.style('background-color', 'whitesmoke');

  inputImB = createInput('', 'number');
  inputImB.position(1440 / 18, 7 * 737 / 20);
  inputImB.size(50);
  inputImB.style('font-size', '20px');
  buttonImB = createButton('✓');
  buttonImB.position(inputImB.x + inputImB.width, 7 * 737 / 20);
  buttonImB.mousePressed(imB);
  buttonImB.style('font-size', '20px');
  buttonImB.style('background-color', 'whitesmoke');

  inputMobA = createInput('1', 'number');
  inputMobA.position(1440 / 18, 13.5 * 737 / 20);
  inputMobA.size(50);
  inputMobA.style('font-size', '20px');
  buttonMobA = createButton('✓');
  buttonMobA.position(inputMobA.x + inputMobA.width, 13.5 * 737 / 20);
  buttonMobA.mousePressed(möA);
  buttonMobA.style('font-size', '20px');
  buttonMobA.style('background-color', 'whitesmoke');

  inputMobB = createInput('0', 'number');
  inputMobB.position(1440 / 18, 14.5 * 737 / 20);
  inputMobB.size(50);
  inputMobB.style('font-size', '20px');
  buttonMobB = createButton('✓');
  buttonMobB.position(inputMobB.x + inputMobB.width, 14.5 * 737 / 20);
  buttonMobB.mousePressed(möB);
  buttonMobB.style('font-size', '20px');
  buttonMobB.style('background-color', 'whitesmoke');

  inputMobC = createInput('0', 'number');
  inputMobC.position(1440 / 18, 15.5 * 737 / 20);
  inputMobC.size(50);
  inputMobC.style('font-size', '20px');
  buttonMobC = createButton('✓');
  buttonMobC.position(inputMobC.x + inputMobC.width, 15.5 * 737 / 20);
  buttonMobC.mousePressed(möC);
  buttonMobC.style('font-size', '20px');
  buttonMobC.style('background-color', 'whitesmoke');

  inputMobD = createInput('1', 'number');
  inputMobD.position(1440 / 18, 16.5 * 737 / 20);
  inputMobD.size(50);
  inputMobD.style('font-size', '20px');
  buttonMobD = createButton('✓');
  buttonMobD.position(inputMobD.x + inputMobD.width, 16.5 * 737 / 20);
  buttonMobD.mousePressed(möD);
  buttonMobD.style('font-size', '20px');
  buttonMobD.style('background-color', 'whitesmoke');

  //buttonTransform = createButton('transform');
  //buttonTransform.position(1 * 1440 / 20, 17 * 737 / 20);
  //buttonTransform.mousePressed(transform);
  //buttonTransform.style('font-size', '20px');
  //buttonTransform.style('background-color', 'whitesmoke');

  //buttonDoAnotherTransformation = createButton('do another transformation');
  //buttonDoAnotherTransformation.position(8 * 1440 / 10, 3 * 737 / 20);
  //buttonDoAnotherTransformation.mousePressed(doAnotherTransformation);
  //buttonDoAnotherTransformation.style('font-size', '20px');
  //buttonDoAnotherTransformation.style('background-color', 'whitesmoke');
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

var x = [-11,-3];
var y = [3,4];

//var x = ['',''];
//var y = ['',''];

var permX = [];
var permY = [];

vertexLabels = 'abcdefghijklmnopqrstuvwxyz';
firstVertexLabelNumber = 0;
secondVertexLabelNumber = 1;

function reA() {
  x[0] = inputReA.value();
}

function imA() {
  y[0] = inputImA.value();
}

function reB() {
  x[1] = inputReB.value();
}

function imB() {
  y[1] = inputImB.value();
}

var mobiusA = 1;
var mobiusB = 0;
var mobiusC = 0;
var mobiusD = 1;

function möA() {
  mobiusA = inputMobA.value();
}

function möB() {
  mobiusB = inputMobB.value();
}

function möC() {
  mobiusC = inputMobC.value();
}

function möD() {
  mobiusD = inputMobD.value();
}

//function doAnotherTransformation() {
//  mobiusA.pop(); mobiusB.pop(); mobiusC.pop(); mobiusD.pop();
//  inputMobA.value('');
//  inputMobB.value('');
//  inputMobC.value('');
//  inputMobD.value('');
//}

function draw() {
  background('white');

  push();
  noStroke();
  fill('white');
  rect(0, 0, 1440 / 8, 737 / 2);
  pop();

  // each square on the grid is '1440 / 40' by '737 / 20'
  // (0,0) = (1440 / 2, 5 * 737 / 6)

  const xOriginUHP = 1440 / 2;
  const yOriginUHP = 6 * 737 / 7;

  const xMinUHP = 1440 / 10;
  const xMaxUHP = 1440 - 1440 / 10;
  const yMinUHP = 6 * 737 / 7;
  const yMaxUHP = 737 / 15;

  const xStepUHP = 1440 / 40;
  const yStepUHP = 737 / 20;

  // drawing the half-plane
  push();
  strokeWeight(2);
  // axes
  line(xMinUHP, yOriginUHP, xMaxUHP, yOriginUHP);
  line(xOriginUHP, yMinUHP, xOriginUHP, yMaxUHP);
  // axis arrows
  line(xMinUHP, yOriginUHP, xMinUHP + 10, yOriginUHP + 10);
  line(xMinUHP, yOriginUHP, xMinUHP + 10, yOriginUHP - 10);
  line(xMaxUHP, yOriginUHP, xMaxUHP - 10, yOriginUHP + 10);
  line(xMaxUHP, yOriginUHP, xMaxUHP - 10, yOriginUHP - 10);
  line(xOriginUHP, yMaxUHP, xOriginUHP - 10, yMaxUHP + 10);
  line(xOriginUHP, yMaxUHP, xOriginUHP + 10, yMaxUHP + 10);

  textSize(10);
  // x ticks
  var i = 1;
  while (i < 16) {
      line(xOriginUHP - i * xStepUHP, yOriginUHP - 5,
        xOriginUHP - i * xStepUHP, yOriginUHP + 5);
      line(xOriginUHP + i * xStepUHP, yOriginUHP - 5,
        xOriginUHP + i * xStepUHP, yOriginUHP + 5);
      text('-' + i, xOriginUHP - i * xStepUHP, yOriginUHP + 15);
      text(i, xOriginUHP + i * xStepUHP, yOriginUHP + 15);
      i ++;
    }
  line(xOriginUHP, yOriginUHP - 5, xOriginUHP, yOriginUHP + 5);
  text('0', xOriginUHP, yOriginUHP + 15);
  // y ticks
  var j = 1;
  while (j < 16) {
      line(xOriginUHP - 5, yOriginUHP - j * yStepUHP,
        xOriginUHP + 5, yOriginUHP - j * yStepUHP);
      text(j, xOriginUHP - 15, yOriginUHP - j * yStepUHP);
      j ++;
    }
  pop();

  if (x[0] && y[0] && x[1] && y[1]) {
    // calculating the relevant semi-circle
    var circleCentre = (x[0] ** 2 + y[0] ** 2 - x[1] ** 2 - y[1] ** 2) / (2 * x[0] - 2 * x[1]);
    var circleRadius = dist(x[0], y[0], circleCentre, 0);
    // calculating angles for the arc along the semi-circle
    var alpha = acos((- circleRadius * (x[0] - circleCentre)) / (circleRadius * sqrt((x[0] - circleCentre) ** 2 + y[0] ** 2)));
    var beta = acos((- circleRadius * (x[1] - circleCentre)) / (circleRadius * sqrt((x[1] - circleCentre) ** 2 + y[1] ** 2)));
  }

  if (x[0] && y[0] && x[1] && y[1]) {
    var z_1 = new Complex(x[0], y[0]);
    var z_2 = new Complex(x[1], y[1]);

    var mobz_1 = (((z_1.mul(mobiusA)).add(mobiusB))).div(((z_1.mul(mobiusC)).add(mobiusD)));
    var mobz_2 = (((z_2.mul(mobiusA)).add(mobiusB))).div(((z_2.mul(mobiusC)).add(mobiusD)));

    var newReA = mobz_1.re;
    var newImA = mobz_1.im;
    var newReB = mobz_2.re;
    var newImB = mobz_2.im;
  }

  if (newReA && newImA && newReB && newImA) {
    // calculating the relevant semi-circle
    var newCircleCentre = (newReA ** 2 + newImA ** 2 - newReB ** 2 - newImB ** 2) / (2 * newReA - 2 * newReB);
    var newCircleRadius = dist(newReA, newImA, newCircleCentre, 0);
    // calculating angles for the arc along the semi-circle
    var newAlpha = acos((- newCircleRadius * (newReA - newCircleCentre)) / (newCircleRadius * sqrt((newReA - newCircleCentre) ** 2 + newImA ** 2)));
    var newBeta = acos((- newCircleRadius * (newReB - newCircleCentre)) / (newCircleRadius * sqrt((newReB - newCircleCentre) ** 2 + newImB ** 2)));
  }

  // drawing the geodesics
  if (newReA && newImA && newReB && newImB) {
    push();
    strokeWeight(6);
    strokeCap(SQUARE);
    noFill();
    if (newReA === newReB) {
      stroke('darkgray');
      line(xOriginUHP + newReA * xStepUHP, yOriginUHP,
        xOriginUHP + newReB * xStepUHP, 0);
      stroke('firebrick');
      line(xOriginUHP + newReA * xStepUHP, yOriginUHP - newImA * yStepUHP,
        xOriginUHP + newReB * xStepUHP, yOriginUHP - newImB * yStepUHP);
    } else if (newReA < newReB) {
      stroke('darkgray');
      arc(xOriginUHP + newCircleCentre * xStepUHP, yOriginUHP,
        2 * newCircleRadius * xStepUHP, 2 * newCircleRadius * yStepUHP, PI, 0, OPEN);
      stroke('firebrick');
      arc(xOriginUHP + newCircleCentre * xStepUHP, yOriginUHP,
        2 * newCircleRadius * xStepUHP, 2 * newCircleRadius * yStepUHP,
        PI + newAlpha, PI + newBeta, OPEN);
    } else if (newReA > newReB) {
      stroke('darkgray');
      arc(xOriginUHP + newCircleCentre * xStepUHP, yOriginUHP,
        2 * newCircleRadius * xStepUHP, 2 * newCircleRadius * yStepUHP, PI, 0, OPEN);
      stroke('firebrick');
      arc(xOriginUHP + newCircleCentre * xStepUHP, yOriginUHP,
        2 * newCircleRadius * xStepUHP, 2 * newCircleRadius * yStepUHP,
        PI + newBeta, PI + newAlpha, OPEN);
    }
    pop();
  }

  // drawing the points in the half-plane
  push();
  if (newReA && newImA) {
    strokeWeight(2);
    fill('mistyrose');
    circle(xOriginUHP + newReA * xStepUHP, yOriginUHP - newImA * yStepUHP, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text('α\'', xOriginUHP + newReA * xStepUHP, yOriginUHP - newImA * yStepUHP);
  }
  if (newReB && newImB) {
    strokeWeight(2);
    fill('mistyrose');
    circle(xOriginUHP + newReB * xStepUHP, yOriginUHP - newImB * yStepUHP, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text('β\'', xOriginUHP + newReB * xStepUHP, yOriginUHP - newImB * yStepUHP);
  }
  pop();

  // drawing the geodesics
  if (x[0] && y[0] && x[1] && y[1]) {
    push();
    strokeWeight(6);
    strokeCap(SQUARE);
    noFill();
    if (x[0] === x[1]) {
      stroke('darkgray');
      line(xOriginUHP + x[0] * xStepUHP, yOriginUHP,
        xOriginUHP + x[1] * xStepUHP, 0);
      stroke('dodgerblue');
      line(xOriginUHP + x[0] * xStepUHP, yOriginUHP - y[0] * yStepUHP,
        xOriginUHP + x[1] * xStepUHP, yOriginUHP - y[1] * yStepUHP);
    } else if (x[0] < x[1]) {
      stroke('darkgray');
      arc(xOriginUHP + circleCentre * xStepUHP, yOriginUHP,
        2 * circleRadius * xStepUHP, 2 * circleRadius * yStepUHP, PI, 0, OPEN);
      stroke('dodgerblue');
      arc(xOriginUHP + circleCentre * xStepUHP, yOriginUHP,
        2 * circleRadius * xStepUHP, 2 * circleRadius * yStepUHP,
        PI + alpha, PI + beta, OPEN);
    } else if (x[0] > x[1]) {
      stroke('darkgray');
      arc(xOriginUHP + circleCentre * xStepUHP, yOriginUHP,
        2 * circleRadius * xStepUHP, 2 * circleRadius * yStepUHP, PI, 0, OPEN);
      stroke('dodgerblue');
      arc(xOriginUHP + circleCentre * xStepUHP, yOriginUHP,
        2 * circleRadius * xStepUHP, 2 * circleRadius * yStepUHP,
        PI + beta, PI + alpha, OPEN);
    }
    pop();
  }

  // drawing the points in the half-plane
  push();
  if (x[0] && y[0]) {
    strokeWeight(2);
    fill('azure');
    circle(xOriginUHP + x[0] * xStepUHP, yOriginUHP - y[0] * yStepUHP, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text('α', xOriginUHP + x[0] * xStepUHP, yOriginUHP - y[0] * yStepUHP);
  }
  if (x[1] && y[1]) {
    strokeWeight(2);
    fill('azure');
    circle(xOriginUHP + x[1] * xStepUHP, yOriginUHP - y[1] * yStepUHP, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text('β', xOriginUHP + x[1] * xStepUHP, yOriginUHP - y[1] * yStepUHP);
  }
  pop();

  // whiteout of the background outside the plane
  //push();
  //fill('white');
  //noStroke();
  //beginShape();
  //  vertex(0, 0);
  //  vertex(1440, 0);
  //  vertex(1440, 737);
  //  vertex(0, 737);
  //  beginContour();
  //    vertex(xMinUHP - 2, yMinUHP + 22);
  //    vertex(xMaxUHP + 2, yMinUHP + 22);
  //    vertex(xMaxUHP + 2, yMaxUHP - 2);
  //    vertex(xMinUHP - 2, yMaxUHP - 2);
  //  endContour();
  //endShape();
  //pop();

  // input labels
  push();
  textSize(25);
  text('Re(α)', 1440 / 40, 1.5 * 737 / 20 + 11);
  text('Im(α)', 1440 / 40, 2.5 * 737 / 20 + 11);
  text('Re(β)', 1440 / 40, 4.5 * 737 / 20 + 11);
  text('Im(β)', 1440 / 40, 5.5 * 737 / 20 + 11);
  text('a', 1440 / 40, 12 * 737 / 20 + 11);
  text('b', 1440 / 40, 13 * 737 / 20 + 11);
  text('c', 1440 / 40, 14 * 737 / 20 + 11);
  text('d', 1440 / 40, 15 * 737 / 20 + 11);
  pop();

  // Möbius transformation
  push();
  textAlign(LEFT);
  textSize(25);
  strokeWeight(3);
  strokeCap(SQUARE, CENTER);
  text('γ(z) =', 1440 / 12 - 75, 9 * 737 / 20);
  let aString1 = 'az + b';
  let aString2 = 'cz + d';
  let sWidth = textWidth(aString1);
  text(aString1, 1440 / 12, 8.5 * 737 / 20);
  line(1440 / 12, 9 * 737 / 20, 1440 / 12 + sWidth, 9 * 737 / 20);
  text(aString2, 1440 / 12, 9.5 * 737 / 20);
  text('ad - bc > 0', 1440 / 12 - 60, 10.5 * 737 / 20);
  pop();

  // axis labels
  push();
  textSize(30);
  textStyle(NORMAL);
  text('Re', xMaxUHP + 30, yOriginUHP);
  text('Im', xOriginUHP, yMaxUHP - 25);
  pop();

  if (x[0] && x[1] && y[0] && y[1]) {
    push();
    let alphabetalabels = 'α = ' + x[0].toFixed(2) + ' + ' + y[0].toFixed(2) + 'i,     β = ' + x[1].toFixed(2) + ' + ' + y[1].toFixed(2) + 'i'
    let alphabetaprimelabels = 'α\' = ' + newReA.toFixed(2) + ' + ' + newImA.toFixed(2) + 'i,     β\' = ' + newReB.toFixed(2) + ' + ' + newImB.toFixed(2) + 'i'
    let abWidth = textWidth(alphabetalabels);
    let abpWidth = textWidth(alphabetaprimelabels);
    fill('white');
    strokeWeight(3);
    rectMode(CENTER);
    stroke('dodgerblue');
    rect(4 * 1440 / 5, 737 / 12, abWidth + 20, 40, 20);
    stroke('firebrick');
    rect(4 * 1440 / 5, 737 / 12 + 54, abpWidth + 20, 40, 20);
    pop();
    push();
    fill('black');
    textFont('Helvetica');
    textSize(30);
    textAlign(CENTER, CENTER);
    text(alphabetalabels, 4 * 1440 / 5, 737 / 12);
    text(alphabetaprimelabels, 4 * 1440 / 5, 737 / 12 + 54);
  }

  push();
  textAlign(LEFT);
  textSize(30);
  strokeWeight(3);
  strokeCap(SQUARE, CENTER);
  text('γ(z) =', 9 * 1440 / 32 - 85, 2.25 * 737 / 20);
  let aString3 = mobiusA + 'z + ' + mobiusB;
  let aString4 = mobiusC + 'z + ' + mobiusD;
  let sWidth2 = Math.max(textWidth(aString3), textWidth(aString4));
  text(aString3, 9 * 1440 / 32, 1.75 * 737 / 20);
  line(9 * 1440 / 32, 2.25 * 737 / 20, 9 * 1440 / 32 + sWidth2, 2.25 * 737 / 20);
  text(aString4, 9 * 1440 / 32, 2.75 * 737 / 20);
  pop();
}

//function transform() {
//  x[0] = mobz_1.re;
//  y[0] = mobz_1.im;
//  x[1] = mobz_2.re;
//  y[1] = mobz_2.im;
//}
