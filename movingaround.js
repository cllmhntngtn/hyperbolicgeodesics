var draggingA = false; // is a being dragged?
var rolloverA = false; // is the mouse over a?
var draggingB = false; // is b being dragged?
var rolloverB = false; // is the mouse over b?

var xA, yA, xB, yB, d;          // location and diameter
var offsetXA, offsetYA, offsetXB, offsetYB;    // mouseclick offset

var x = [];
var y = [];

vertexLabels = 'abcdefghijklmnopqrstuvwxyz';
firstVertexLabelNumber = 0;
secondVertexLabelNumber = 1;

function setup() {
  createCanvas(windowWidth, 9 * windowHeight / 10);
  background('white');
  textFont('Helvetica');
  textAlign(CENTER, CENTER);

  // starting locations
  xA = 432;
  yA = 337.37142857142857;
  xB = 1008;
  yB = 337.37142857142857;

  // dimensions
  d = 25;

  buttonReset = createButton('reset');
  buttonReset.position(windowWidth / 25, 3 * windowHeight / 20);
  buttonReset.mousePressed(reset);
  buttonReset.style('font-size', '30px');
  buttonReset.style('background-color', 'whitesmoke');
}

function reset() {
  xA = 432;
  yA = 337.37142857142857;
  xB = 1008;
  yB = 337.37142857142857;
}

function draw() {
  background('white');

  // each square on the grid is 'windowWidth / 40' by 'windowHeight / 20'
  // (0,0) = (windowWidth / 2, 5 * windowHeight / 6)

  const xOrigin = windowWidth / 2;
  const yOrigin = 6 * windowHeight / 7;

  const xMin = windowWidth / 10;
  const xMax = windowWidth - windowWidth / 10;
  const yMin = 6 * windowHeight / 7;
  const yMax = windowHeight / 15;

  const xStep = windowWidth / 40;
  const yStep = windowHeight / 20;

  // drawing the half-plane
  push();
  strokeWeight(2);
  // axes
  line(xMin, yOrigin, xMax, yOrigin);
  line(xOrigin, yMin, xOrigin, yMax);
  // axis arrows
  line(xMin, yOrigin, xMin + 10, yOrigin + 10);
  line(xMin, yOrigin, xMin + 10, yOrigin - 10);
  line(xMax, yOrigin, xMax - 10, yOrigin + 10);
  line(xMax, yOrigin, xMax - 10, yOrigin - 10);
  line(xOrigin, yMax, xOrigin - 10, yMax + 10);
  line(xOrigin, yMax, xOrigin + 10, yMax + 10);

  textSize(10);
  // x ticks
  var i = 1;
  while (i < 16) {
      line(xOrigin - i * xStep, yOrigin - 5,
        xOrigin - i * xStep, yOrigin + 5);
      line(xOrigin + i * xStep, yOrigin - 5,
        xOrigin + i * xStep, yOrigin + 5);
      text('-' + i, xOrigin - i * xStep, yOrigin + 15);
      text(i, xOrigin + i * xStep, yOrigin + 15);
      i ++;
    }
  line(xOrigin, yOrigin - 5, xOrigin, yOrigin + 5);
  text('0', xOrigin, yOrigin + 15);
  // y ticks
  var j = 1;
  while (j < 16) {
      line(xOrigin - 5, yOrigin - j * yStep,
        xOrigin + 5, yOrigin - j * yStep);
      text(j, xOrigin - 15, yOrigin - j * yStep);
      j ++;
    }
  pop();

  // calculating the relevant semi-circle
  var circleCentre = (x[0] ** 2 + y[0] ** 2 - x[1] ** 2 - y[1] ** 2) / (2 * x[0] - 2 * x[1]);
  var circleRadius = dist(x[0], y[0], circleCentre, 0);
  // calculating angles for the arc along the semi-circle
  var alpha = acos((- circleRadius * (x[0] - circleCentre)) / (circleRadius * sqrt((x[0] - circleCentre) ** 2 + y[0] ** 2)));
  var beta = acos((- circleRadius * (x[1] - circleCentre)) / (circleRadius * sqrt((x[1] - circleCentre) ** 2 + y[1] ** 2)));

  // drawing the geodesics
  push();
  strokeWeight(6);
  strokeCap(SQUARE);
  noFill();
  if (x[0] === x[1] && y.length === 2) {
    stroke('darkgray');
    line(xOrigin + x[0] * xStep, yOrigin,
      xOrigin + x[1] * xStep, 0);
    stroke('dodgerblue');
    line(xOrigin + x[0] * xStep, yOrigin - y[0] * yStep,
      xOrigin + x[1] * xStep, yOrigin - y[1] * yStep);
  } else if (x[0] < x[1]) {
    stroke('darkgray');
    arc(xOrigin + circleCentre * xStep, yOrigin,
      2 * circleRadius * xStep, 2 * circleRadius * yStep, PI, 0, OPEN);
    stroke('dodgerblue');
    arc(xOrigin + circleCentre * xStep, yOrigin,
      2 * circleRadius * xStep, 2 * circleRadius * yStep,
      PI + alpha, PI + beta, OPEN);
  } else {
    stroke('darkgray');
    arc(xOrigin + circleCentre * xStep, yOrigin,
      2 * circleRadius * xStep, 2 * circleRadius * yStep, PI, 0, OPEN);
    stroke('dodgerblue');
    arc(xOrigin + circleCentre * xStep, yOrigin,
      2 * circleRadius * xStep, 2 * circleRadius * yStep,
      PI + beta, PI + alpha, OPEN);
  }
  pop();

  // is mouse over a?
  if (mouseX > xA - d / 2 && mouseX < xA + d / 2 && mouseY > yA - d / 2 && mouseY < yA + d / 2) {
    rolloverA = true;
  }
  else {
    rolloverA = false;
  }

  // adjust location of a if being dragged
  if (draggingA) {
    xA = mouseX + offsetXA;
    yA = mouseY + offsetYA;
  }

  // is mouse over b?
  if (mouseX > xB - d / 2 && mouseX < xB + d / 2 && mouseY > yB - d / 2 && mouseY < yB + d / 2) {
    rolloverB = true;
  }
  else {
    rolloverB = false;
  }

  // adjust location of b if being dragged
  if (draggingB) {
    xB = mouseX + offsetXB;
    yB = mouseY + offsetYB;
  }

  push();
  // different fills based on state
  if (draggingA) {
    fill ('dodgerblue');
  } else if (rolloverA) {
    fill('darkgray');
  } else {
    fill('white');
  }
  stroke('black');
  strokeWeight(2);
  ellipse(xA, yA, d);
  fill('black');
  strokeWeight(1);
  textFont('Helvetica');
  textSize(20);
  text('a', xA, yA);
  // different fills based on state
  if (draggingB) {
    fill ('dodgerblue');
  } else if (rolloverB) {
    fill('darkgray');
  } else {
    fill('white');
  }
  stroke('black');
  strokeWeight(2);
  ellipse(xB, yB, d);
  fill('black');
  strokeWeight(1);
  textFont('Helvetica');
  textSize(20);
  text('b', xB, yB);
  pop();

  // axis labels
  push();
  textSize(30);
  textStyle(NORMAL);
  text('Re', xMax + 30, yOrigin);
  text('Im', xOrigin, yMax - 25);
  pop();

  x = [(xA - xOrigin) / xStep, (xB - xOrigin) / xStep];
  y = [(yOrigin - yA) / yStep, (yOrigin - yB) / yStep];

  push();
  fill('black');
  textFont('Helvetica');
  textSize(30);
  if (x[0] === 0 && y[0]) {
    text('a = ' + y[0].toFixed(2) + 'i',
          5 * windowWidth / 6, (firstVertexLabelNumber + 1.5) * windowHeight / 20 + 2);
  } else if (x[0] && y[0]) {
    text('a = ' + x[0].toFixed(2) + ' + ' + y[0].toFixed(2) + 'i',
          5 * windowWidth / 6, (firstVertexLabelNumber + 1.5) * windowHeight / 20 + 2);
  }
  if (x[1] === 0 && y[1]) {
    text('b = ' + y[1].toFixed(2) + 'i',
          5 * windowWidth / 6, (secondVertexLabelNumber + 1.5) * windowHeight / 20 + 2);
  } else if (x[1] && y[1]) {
    text('b = ' + x[1].toFixed(2) + ' + ' + y[1].toFixed(2) + 'i',
          5 * windowWidth / 6, (secondVertexLabelNumber + 1.5) * windowHeight / 20 + 2);
  }
  pop();

  push();
  textSize(20);
  textFont('Futura-Bold');
  text('CLICK AND DRAG THE POINTS TO', 2 * windowWidth / 7, windowHeight / 11);
  text('MOVE THEM AROUND THE HALF-PLANE', 2 * windowWidth / 7, windowHeight / 11 + 20);
  pop();
}

function mousePressed() {
  // did I click on a?
  if (mouseX > xA - d / 2 && mouseX < xA + d / 2 && mouseY > yA - d / 2 && mouseY < yA + d / 2) {
    draggingA = true;
    // if so, keep track of relative location of click to centre of a
    offsetXA = xA - mouseX;
    offsetYA = yA - mouseY;
    // did I click on b?
  } else if (mouseX > xB - d / 2 && mouseX < xB + d / 2 && mouseY > yB - d / 2 && mouseY < yB + d / 2) {
    draggingB = true;
    // if so, keep track of relative location of click to centre of b
    offsetXB = xB - mouseX;
    offsetYB = yB - mouseY;
  }
}

function mouseReleased() {
  // stop dragging
  draggingA = false;
  draggingB = false;
}
