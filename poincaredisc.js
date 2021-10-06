//function windowResized() {
//  resizeCanvas(windoWidth = 1440, windowHeight = 737);
//}

function setup() {
  createCanvas(1440, 9 * 737 / 10);
  //background('white');
  textFont('Helvetica');
  textAlign(CENTER, CENTER);

  inputReA = createInput('Re(a)', 'number');
  inputReA.position(1440 / 14, 3 * 737 / 20);
  inputReA.size(50);
  inputReA.style('font-size', '20px');
  buttonReA = createButton('✓');
  buttonReA.position(inputReA.x + inputReA.width, 3 * 737 / 20);
  buttonReA.mousePressed(reA);
  buttonReA.style('font-size', '20px');
  buttonReA.style('background-color', 'whitesmoke');


  inputImA = createInput('Im(a)', 'number');
  inputImA.position(1440 / 14, 4 * 737 / 20);
  inputImA.size(50);
  inputImA.style('font-size', '20px');
  buttonImA = createButton('✓');
  buttonImA.position(inputImA.x + inputImA.width, 4 * 737 / 20);
  buttonImA.mousePressed(imA);
  buttonImA.style('font-size', '20px');
  buttonImA.style('background-color', 'whitesmoke');

  inputReB = createInput('Re(b)', 'number');
  inputReB.position(1440 / 14, 6 * 737 / 20);
  inputReB.size(50);
  inputReB.style('font-size', '20px');
  buttonReB = createButton('✓');
  buttonReB.position(inputReB.x + inputReB.width, 6 * 737 / 20);
  buttonReB.mousePressed(reB);
  buttonReB.style('font-size', '20px');
  buttonReB.style('background-color', 'whitesmoke');

  inputImB = createInput('Im(b)', 'number');
  inputImB.position(1440 / 14, 7 * 737 / 20);
  inputImB.size(50);
  inputImB.style('font-size', '20px');
  buttonImB = createButton('✓');
  buttonImB.position(inputImB.x + inputImB.width, 7 * 737 / 20);
  buttonImB.mousePressed(imB);
  buttonImB.style('font-size', '20px');
  buttonImB.style('background-color', 'whitesmoke');

  buttonAddAnotherPair = createButton('add another pair');
  buttonAddAnotherPair.position(1440 / 50, 9 * 737 / 20);
  buttonAddAnotherPair.mousePressed(addAnotherPair);
  buttonAddAnotherPair.style('font-size', '20px');
  buttonAddAnotherPair.style('background-color', 'whitesmoke');
}

var x = ['',''];
var y = ['',''];

var permSemiCentreX = new Array(26);
var permSemiCentreY = new Array(26);
var permSemiRadius = new Array(26);

permIndex = 0;

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

function addAnotherPair() {
  permX.push(x[0]); permX.push(x[1]);
  permY.push(y[0]); permY.push(y[1]);
  x = ['',''];
  y = ['',''];
  inputReA.value('');
  inputImA.value('');
  inputReB.value('');
  inputImB.value('');
  firstVertexLabelNumber += 2;
  secondVertexLabelNumber += 2;
  permIndex += 2;
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
  background('white');

  push();
  noStroke();
  fill('white');
  rect(0, 0, 1440 / 8, 737 / 2);
  pop();

  const xOriginPD = 1440 / 2;
  const yOriginPD = 7 * 737 / 15;
  const discRadius = 2 * 737 / 5;

  // radius of the unit circle is 2 * 737 / 5

  // converting the points in the half-plane to points in the disc and drawing them
  var z_1 = new Complex(x[0], y[0]);
  var hz_1 = (z_1.sub(Complex['I'])).div(Complex['I'].mul(z_1).sub(1));

  var z_2 = new Complex(x[1], y[1]);
  var hz_2 = (z_2.sub(Complex['I'])).div(Complex['I'].mul(z_2).sub(1));

  // converting the points where the semi-circle meets the real line to points on the disc boundary
  var circleCentre = (x[0] ** 2 + y[0] ** 2 - x[1] ** 2 - y[1] ** 2) / (2 * x[0] - 2 * x[1]);
  var circleRadius = dist(x[0], y[0], circleCentre, 0);
  // left point
  var leftPointX = circleCentre - circleRadius;
  var leftPointUHP = new Complex(leftPointX, 0);
  var leftPointPD = (leftPointUHP.sub(Complex['I'])).div(Complex['I'].mul(leftPointUHP).sub(1));
  // rightPoint
  var rightPointX = circleCentre + circleRadius;
  var rightPointUHP = new Complex(rightPointX, 0);
  var rightPointPD = (rightPointUHP.sub(Complex['I'])).div(Complex['I'].mul(rightPointUHP).sub(1));
  // calculating the centre of the semi-circle which contains the geodesic
  var a = [xOriginPD + hz_1.re * discRadius, yOriginPD - hz_1.im * discRadius];
  var b = [xOriginPD + hz_2.re * discRadius, yOriginPD - hz_2.im * discRadius];
  var c = [xOriginPD + leftPointPD.re * discRadius, yOriginPD - leftPointPD.im * discRadius];
  var d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  var semiCentreX = ((a[0]**2 + a[1]**2) * (b[1] - c[1]) + (b[0]**2 + b[1]**2) * (c[1] - a[1])
                      + (c[0]**2 + c[1]**2) * (a[1] - b[1])) / d;
  var semiCentreY = ((a[0]**2 + a[1]**2) * (c[0] - b[0]) + (b[0]**2 + b[1]**2) * (a[0] - c[0])
                      + (c[0]**2 + c[1]**2) * (b[0] - a[0])) / d;
  var semiRadius = dist(semiCentreX, semiCentreY, a[0], a[1]);

  permSemiCentreX[permIndex] = semiCentreX;
  permSemiCentreY[permIndex] = semiCentreY;
  permSemiRadius[permIndex] = semiRadius;

  // drawing the geodesics
  if (x[0] && y[0] && x[1] && y[1]) {
    push();
    strokeWeight(6);
    stroke('darkgray');
    noFill();
    if (x[0] && y[0] && x[1] && y[1]) {
      circle(semiCentreX, semiCentreY, 2 * semiRadius);
    }
    pop();

    // drawing the arc between points
    push();
    strokeWeight(6);
    noFill();
    stroke('dodgerblue');
    // when semi centre is below both points
    if (semiCentreY > yOriginPD - hz_1.im * discRadius && semiCentreY > yOriginPD - hz_2.im * discRadius) {
      var alpha = acos((- semiRadius * (xOriginPD + hz_1.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_1.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_1.im * discRadius - semiCentreY) ** 2)));
      var beta = acos((- semiRadius * (xOriginPD + hz_2.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_2.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_2.im * discRadius - semiCentreY) ** 2)));
      if (xOriginPD + hz_1.re * discRadius < xOriginPD + hz_2.re * discRadius) {
        arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
          PI + alpha, PI + beta, OPEN);
      } else {
        arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
          PI + beta, PI + alpha, OPEN);
      }
    // when semi centre is above both points
    } else if (semiCentreY <= yOriginPD - hz_1.im * discRadius && semiCentreY <= yOriginPD - hz_2.im * discRadius) {
      var alpha = acos((semiRadius * (xOriginPD + hz_1.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_1.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_1.im * discRadius - semiCentreY) ** 2)));
      var beta = acos((semiRadius * (xOriginPD + hz_2.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_2.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_2.im * discRadius - semiCentreY) ** 2)));
      if (xOriginPD + hz_1.re * discRadius < xOriginPD + hz_2.re * discRadius) {
        arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
          beta, alpha, OPEN);
      } else {
        arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
          alpha, beta, OPEN);
      }
    }
    pop();
    // if the two points lie on a diameter of the disc
    push();
    strokeWeight(6);
    if (dist(xOriginPD + leftPointPD.re * discRadius, yOriginPD - leftPointPD.im * discRadius,
            xOriginPD + rightPointPD.re * discRadius, yOriginPD - rightPointPD.im * discRadius)
            < 2 * discRadius + 0.01 && dist(xOriginPD + leftPointPD.re * discRadius, yOriginPD - leftPointPD.im * discRadius,
            xOriginPD + rightPointPD.re * discRadius, yOriginPD - rightPointPD.im * discRadius)
            > 2 * discRadius - 0.01) {
      stroke('darkgray');
      line(xOriginPD + leftPointPD.re * discRadius, yOriginPD - leftPointPD.im * discRadius,
            xOriginPD + rightPointPD.re * discRadius, yOriginPD - rightPointPD.im * discRadius);
      stroke('dodgerblue');
      line(xOriginPD + hz_1.re * discRadius, yOriginPD - hz_1.im * discRadius,
            xOriginPD + hz_2.re * discRadius, yOriginPD - hz_2.im * discRadius);
    }
    pop();
    // when real part is zero
    push();
    strokeWeight(6);
    noFill();
    if (x[0] === '0' && x[1] === '0' && y[0] && y[1]) {
      stroke('darkgray');
      line(xOriginPD, 0, xOriginPD, 737);
      stroke('dodgerblue');
      line(xOriginPD + hz_1.re * discRadius, yOriginPD - hz_1.im * discRadius,
            xOriginPD + hz_2.re * discRadius, yOriginPD - hz_2.im * discRadius);
    }
    pop();

    if (x[0] === x[1] && y[0] && y[1]) {
      var leftPointX = x[0];
      var leftPointUHP = new Complex(leftPointX, 0);
      var leftPointPD = (leftPointUHP.sub(Complex['I'])).div(Complex['I'].mul(leftPointUHP).sub(1));
      // calculating the centre of the semi-circle which contains the geodesic
      var a = [xOriginPD + hz_1.re * discRadius, yOriginPD - hz_1.im * discRadius];
      var b = [xOriginPD + hz_2.re * discRadius, yOriginPD - hz_2.im * discRadius];
      var c = [xOriginPD + leftPointPD.re * discRadius, yOriginPD - leftPointPD.im * discRadius];
      var d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
      var semiCentreX = ((a[0]**2 + a[1]**2) * (b[1] - c[1]) + (b[0]**2 + b[1]**2) * (c[1] - a[1])
                          + (c[0]**2 + c[1]**2) * (a[1] - b[1])) / d;
      var semiCentreY = ((a[0]**2 + a[1]**2) * (c[0] - b[0]) + (b[0]**2 + b[1]**2) * (a[0] - c[0])
                          + (c[0]**2 + c[1]**2) * (b[0] - a[0])) / d;
      var semiRadius = dist(semiCentreX, semiCentreY, a[0], a[1]);

      // drawing the geodesic
      push();
      strokeWeight(6);
      stroke('darkgray');
      noFill();
      if (x[0] && y[0] && x[1] && y[1]) {
        circle(semiCentreX, semiCentreY, 2 * semiRadius);
      }
      pop();
      // drawing the arc between points
      push();
      strokeWeight(6);
      noFill();
      stroke('dodgerblue');
      // when semi centre is below both points
      if (semiCentreY > yOriginPD - hz_1.im * discRadius && semiCentreY > yOriginPD - hz_2.im * discRadius) {
        var alpha = acos((- semiRadius * (xOriginPD + hz_1.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_1.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_1.im * discRadius - semiCentreY) ** 2)));
        var beta = acos((- semiRadius * (xOriginPD + hz_2.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_2.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_2.im * discRadius - semiCentreY) ** 2)));
        if (xOriginPD + hz_1.re * discRadius < xOriginPD + hz_2.re * discRadius) {
          arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
            PI + alpha, PI + beta, OPEN);
        } else {
          arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
            PI + beta, PI + alpha, OPEN);
        }
      // when semi centre is above both points
      } else if (semiCentreY <= yOriginPD - hz_1.im * discRadius && semiCentreY <= yOriginPD - hz_2.im * discRadius) {
        var alpha = acos((semiRadius * (xOriginPD + hz_1.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_1.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_1.im * discRadius - semiCentreY) ** 2)));
        var beta = acos((semiRadius * (xOriginPD + hz_2.re * discRadius - semiCentreX)) / (semiRadius * sqrt((xOriginPD + hz_2.re * discRadius - semiCentreX) ** 2 + (yOriginPD - hz_2.im * discRadius - semiCentreY) ** 2)));
        if (xOriginPD + hz_1.re * discRadius < xOriginPD + hz_2.re * discRadius) {
          arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
            beta, alpha, OPEN);
        } else {
          arc(semiCentreX, semiCentreY, 2 * semiRadius, 2 * semiRadius,
            alpha, beta, OPEN);
        }
      }
      pop();

      permSemiCentreX[permIndex] = semiCentreX;
      permSemiCentreY[permIndex] = semiCentreY;
      permSemiRadius[permIndex] = semiRadius;
    }
  }

  // drawing the circle points on the boundary
  //push();
  //strokeWeight(5);
  //fill('black');
  //if (x.length === 2 && y.length === 2) {
  //    point(xOriginPD + leftPointPD.re * discRadius, yOriginPD - leftPointPD.im * discRadius, 25);
  //    point(xOriginPD + rightPointPD.re * discRadius, yOriginPD - rightPointPD.im * discRadius, 25);
  //}
  //pop();

  // drawing the points in the disc
  push();
  strokeWeight(2);
  fill('white');
  if (x[0] && y[0]) {
      circle(xOriginPD + hz_1.re * discRadius, yOriginPD - hz_1.im * discRadius, 25);
  }
  if (x[1] && y[1]) {
      circle(xOriginPD + hz_2.re * discRadius, yOriginPD - hz_2.im * discRadius, 25);
  }
  fill('black');
  textFont('Helvetica');
  textSize(20);
  if (x[0] && y[0]) {
    text(vertexLabels[firstVertexLabelNumber],
      xOriginPD + hz_1.re * discRadius, yOriginPD - hz_1.im * discRadius);
  }
  if (x[1] && y[1]) {
    text(vertexLabels[secondVertexLabelNumber],
      xOriginPD + hz_2.re * discRadius, yOriginPD - hz_2.im * discRadius);
  }
  pop();

  // permanent drawings for after pressing the addAnotherPair button

  for (var index = 0; index < permX.length; index += 2) {
    // converting the points in the half-plane to points in the disc and drawing them
    var permz_1 = new Complex(permX[index], permY[index]);
    var permhz_1 = (permz_1.sub(Complex['I'])).div(Complex['I'].mul(permz_1).sub(1));

    var permz_2 = new Complex(permX[index + 1], permY[index + 1]);
    var permhz_2 = (permz_2.sub(Complex['I'])).div(Complex['I'].mul(permz_2).sub(1));

    push();
    if (permX[index] === permX[index + 1] && permY[index] && permY[index + 1]) {
      var permLeftPointX = x[0];
      var permLeftPointUHP = new Complex(permLeftPointX, 0);
      var permLeftPointPD = (permLeftPointUHP.sub(Complex['I'])).div(Complex['I'].mul(permLeftPointUHP).sub(1));
      // calculating the centre of the semi-circle which contains the geodesic
      var permA = [xOriginPD + permhz_1.re * discRadius, yOriginPD - permhz_1.im * discRadius];
      var permB = [xOriginPD + permhz_2.re * discRadius, yOriginPD - permhz_2.im * discRadius];
      var permC = [xOriginPD + permLeftPointPD.re * discRadius, yOriginPD - permLeftPointPD.im * discRadius];
      var permD = 2 * (permA[index] * (permB[index + 1] - permC[index + 1]) + permB[index] * (permC[index + 1] - permA[index + 1]) + permC[index] * (permA[index + 1] - permB[index + 1]));
      var pSemiCentreX = ((permA[index]**2 + permA[index + 1]**2) * (permB[index + 1] - permC[index + 1]) + (permB[index]**2 + permB[index + 1]**2) * (permC[index + 1] - permA[index + 1])
                            + (permC[index]**2 + permC[index + 1]**2) * (permA[index + 1] - permB[index + 1])) / permD;
      var pSemiCentreY = ((permA[index]**2 + permA[index + 1]**2) * (permC[index] - permB[index]) + (permB[index]**2 + permB[index + 1]**2) * (permA[index] - permC[index])
                            + (permC[index]**2 + permC[index + 1]**2) * (permB[index] - permA[index])) / permD;
      var pSemiRadius = dist(pSemiCentreX, pSemiCentreY, permA[index], permA[index + 1]);

      // drawing the geodesic
      push();
      strokeWeight(6);
      stroke('darkgray');
      noFill();
      if (permX[index] && permY[index] && permX[index + 1] && permY[index + 1]) {
        circle(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index]);
      }
      pop();
      // drawing the arc between points
      push();
      strokeWeight(6);
      noFill();
      stroke('dodgerblue');
      // when semi centre is below both points
      if (permSemiCentreY[index] > yOriginPD - permhz_1.im * discRadius && permSemiCentreY[index] > yOriginPD - permhz_2.im * discRadius) {
        var permAlpha = acos((- permSemiRadius[index] * (xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_1.im * discRadius - permSemiCentreY[index]) ** 2)));
        var permBeta = acos((- permSemiRadius[index] * (xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_2.im * discRadius - permSemiCentreY[index]) ** 2)));
        if (xOriginPD + permhz_1.re * discRadius < xOriginPD + permhz_2.re * discRadius) {
          arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
            PI + permAlpha, PI + permBeta, OPEN);
        } else {
          arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
            PI + permBeta, PI + permAlpha, OPEN);
        }
      // when semi centre is above both points
      } else if (permSemiCentreY[index] <= yOriginPD - permhz_1.im * discRadius && permSemiCentreY[index] <= yOriginPD - permhz_2.im * discRadius) {
        var permAlpha = acos((permSemiRadius[index] * (xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_1.im * discRadius - permSemiCentreY[index]) ** 2)));
        var permBeta = acos((permSemiRadius[index] * (xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_2.im * discRadius - permSemiCentreY[index]) ** 2)));
        if (xOriginPD + permhz_1.re * discRadius < xOriginPD + permhz_2.re * discRadius) {
          arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
            permBeta, permAlpha, OPEN);
        } else {
          arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
            permAlpha, permBeta, OPEN);
        }
      }
      pop();
    }
    pop();

    // converting the points where the semi-circle meets the real line to points on the disc boundary
    if (permX[index] && permY[index] && permX[index + 1] && permY[index + 1]) {
      // calculating the relevant semi-circle
      var permCircleCentre = (permX[index] ** 2 + permY[index] ** 2 - permX[index + 1] ** 2 - permY[index + 1] ** 2) / (2 * permX[index] - 2 * permX[index + 1]);
      var permCircleRadius = dist(permX[index], permY[index], permCircleCentre, 0);
    }

    // left point
    var permLeftPointX = permCircleCentre - permCircleRadius;
    var permLeftPointUHP = new Complex(permLeftPointX, 0);
    var permLeftPointPD = (permLeftPointUHP.sub(Complex['I'])).div(Complex['I'].mul(permLeftPointUHP).sub(1));
    // rightPoint
    var permRightPointX = permCircleCentre + permCircleRadius;
    var permRightPointUHP = new Complex(permRightPointX, 0);
    var permRightPointPD = (permRightPointUHP.sub(Complex['I'])).div(Complex['I'].mul(permRightPointUHP).sub(1));

    // calculating the centre of the semi-circle which contains the geodesic
    var permA = [xOriginPD + permhz_1.re * discRadius, yOriginPD - permhz_1.im * discRadius];
    var permB = [xOriginPD + permhz_2.re * discRadius, yOriginPD - permhz_2.im * discRadius];
    var permC = [xOriginPD + permLeftPointPD.re * discRadius, yOriginPD - permLeftPointPD.im * discRadius];
    var permD = 2 * (permA[index] * (permB[index + 1] - permC[index + 1]) + permB[index] * (permC[index + 1] - permA[index + 1]) + permC[index] * (permA[index + 1] - permB[index + 1]));
    var pSemiCentreX = ((permA[index]**2 + permA[index + 1]**2) * (permB[index + 1] - permC[index + 1]) + (permB[index]**2 + permB[index + 1]**2) * (permC[index + 1] - permA[index + 1])
                          + (permC[index]**2 + permC[index + 1]**2) * (permA[index + 1] - permB[index + 1])) / permD;
    var pSemiCentreY = ((permA[index]**2 + permA[index + 1]**2) * (permC[index] - permB[index]) + (permB[index]**2 + permB[index + 1]**2) * (permA[index] - permC[index])
                          + (permC[index]**2 + permC[index + 1]**2) * (permB[index] - permA[index])) / permD;
    var pSemiRadius = dist(pSemiCentreX, pSemiCentreY, permA[index], permA[index + 1]);

    // drawing the geodesics
    push();
    strokeWeight(6);
    stroke('darkgray');
    noFill();
    if (permX[index] && permY[index] && permX[index + 1] && permY[index + 1]) {
      circle(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index]);
    }
    pop();

    push();
    strokeWeight(6);
    noFill();
    if (permX[index] === '0' && permX[index + 1] === '0' && permY[index] && permY[index + 1]) {
      stroke('darkgray');
      line(xOriginPD, 0, xOriginPD, 737);
      stroke('dodgerblue');
      line(xOriginPD + permhz_1.re * discRadius, yOriginPD - permhz_1.im * discRadius,
            xOriginPD + permhz_2.re * discRadius, yOriginPD - permhz_2.im * discRadius);
    }
    pop();

    // drawing the arc between points
    push();
    strokeWeight(6);
    noFill();
    stroke('dodgerblue');
    // when semi centre is below both points
    if (permSemiCentreY[index] > yOriginPD - permhz_1.im * discRadius && permSemiCentreY[index] > yOriginPD - permhz_2.im * discRadius) {
      var permAlpha = acos((- permSemiRadius[index] * (xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_1.im * discRadius - permSemiCentreY[index]) ** 2)));
      var permBeta = acos((- permSemiRadius[index] * (xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_2.im * discRadius - permSemiCentreY[index]) ** 2)));
      if (xOriginPD + permhz_1.re * discRadius < xOriginPD + permhz_2.re * discRadius) {
        arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
          PI + permAlpha, PI + permBeta, OPEN);
      } else {
        arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
          PI + permBeta, PI + permAlpha, OPEN);
      }
    // when semi centre is above both points
    } else if (permSemiCentreY[index] <= yOriginPD - permhz_1.im * discRadius && permSemiCentreY[index] <= yOriginPD - permhz_2.im * discRadius) {
      var permAlpha = acos((permSemiRadius[index] * (xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_1.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_1.im * discRadius - permSemiCentreY[index]) ** 2)));
      var permBeta = acos((permSemiRadius[index] * (xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index])) / (permSemiRadius[index] * sqrt((xOriginPD + permhz_2.re * discRadius - permSemiCentreX[index]) ** 2 + (yOriginPD - permhz_2.im * discRadius - permSemiCentreY[index]) ** 2)));
      if (xOriginPD + permhz_1.re * discRadius < xOriginPD + permhz_2.re * discRadius) {
        arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
          permBeta, permAlpha, OPEN);
      } else {
        arc(permSemiCentreX[index], permSemiCentreY[index], 2 * permSemiRadius[index], 2 * permSemiRadius[index],
          permAlpha, permBeta, OPEN);
      }
    }
    pop();

    // if the two points lie on a diameter of the disc
    push();
    strokeWeight(6);
    if (dist(xOriginPD + permLeftPointPD.re * discRadius, yOriginPD - permLeftPointPD.im * discRadius,
            xOriginPD + permRightPointPD.re * discRadius, yOriginPD - permRightPointPD.im * discRadius)
            < 2 * discRadius + 0.01 && dist(xOriginPD + permLeftPointPD.re * discRadius, yOriginPD - permLeftPointPD.im * discRadius,
            xOriginPD + permRightPointPD.re * discRadius, yOriginPD - permRightPointPD.im * discRadius)
            > 2 * discRadius - 0.01) {
      stroke('darkgray');
      line(xOriginPD + permLeftPointPD.re * discRadius, yOriginPD - permLeftPointPD.im * discRadius,
            xOriginPD + permRightPointPD.re * discRadius, yOriginPD - permRightPointPD.im * discRadius);
      stroke('dodgerblue');
      line(xOriginPD + permhz_1.re * discRadius, yOriginPD - permhz_1.im * discRadius,
            xOriginPD + permhz_2.re * discRadius, yOriginPD - permhz_2.im * discRadius);
    }
    pop();

    // drawing the points in the disc
    push();
    strokeWeight(2);
    fill('white');
    if (permX[index] && permY[index]) {
        circle(xOriginPD + permhz_1.re * discRadius, yOriginPD - permhz_1.im * discRadius, 25);
    }
    if (permX[index + 1] && permY[index + 1]) {
        circle(xOriginPD + permhz_2.re * discRadius, yOriginPD - permhz_2.im * discRadius, 25);
    }
    fill('black');
    textFont('Helvetica');
    textSize(20);
    if (permX[index] && permY[index]) {
      text(vertexLabels[index],
        xOriginPD + permhz_1.re * discRadius, yOriginPD - permhz_1.im * discRadius);
    }
    if (permX[index + 1] && permY[index + 1]) {
      text(vertexLabels[index + 1],
        xOriginPD + permhz_2.re * discRadius, yOriginPD - permhz_2.im * discRadius);
    }
    pop();
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
  textSize(25);
  text('Re(' + vertexLabels[firstVertexLabelNumber] + ')', 1440 / 30, 1.5 * 737 / 20 + 11);
  text('Im(' + vertexLabels[firstVertexLabelNumber] + ')', 1440 / 30, 2.5 * 737 / 20 + 11);
  text('Re(' + vertexLabels[secondVertexLabelNumber] + ')', 1440 / 30, 4.5 * 737 / 20 + 11);
  text('Im(' + vertexLabels[secondVertexLabelNumber] + ')', 1440 / 30, 5.5 * 737 / 20 + 11);
  pop();

  // naming the inputted points permanently
  push();
  for (var index = 0; index <= permX.length; index++) {
    fill('black');
    textFont('Helvetica');
    textSize(20);
    if (permX[index] && permY[index]) {
      text(vertexLabels[index] + ' = ' + permX[index] + ' + ' + permY[index] + 'i',
            9 * 1440 / 10, (index + 1.5) * 737 / 30 + 2);
    }
    if (permX[index + 1] && permY[index + 1]) {
      text(vertexLabels[index + 1] + ' = ' + permX[index + 1] + ' + ' + permY[index + 1] + 'i',
            9 * 1440 / 10, (index + 1 + 1.5) * 737 / 30 + 2);
    }
  }
}
