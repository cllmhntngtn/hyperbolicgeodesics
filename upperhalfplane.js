function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, 9 * windowHeight / 10);
  background('white');
  textFont('Helvetica');
  textAlign(CENTER, CENTER);

  inputReA = createInput('Re(a)', 'number');
  inputReA.position(windowWidth / 18, 3 * windowHeight / 20);
  inputReA.size(40);
  inputReA.style('font-size', '20px');
  buttonReA = createButton('submit');
  buttonReA.position(inputReA.x + inputReA.width, 3 * windowHeight / 20);
  buttonReA.mousePressed(reA);
  buttonReA.style('font-size', '20px');
  buttonReA.style('background-color', 'whitesmoke');

  inputImA = createInput('Im(a)', 'number');
  inputImA.position(windowWidth / 18, 4 * windowHeight / 20);
  inputImA.size(40);
  inputImA.style('font-size', '20px');
  buttonImA = createButton('submit');
  buttonImA.position(inputImA.x + inputImA.width, 4 * windowHeight / 20);
  buttonImA.mousePressed(imA);
  buttonImA.style('font-size', '20px');
  buttonImA.style('background-color', 'whitesmoke');

  inputReB = createInput('Re(b)', 'number');
  inputReB.position(windowWidth / 18, 6 * windowHeight / 20);
  inputReB.size(40);
  inputReB.style('font-size', '20px');
  buttonReB = createButton('submit');
  buttonReB.position(inputReB.x + inputReB.width, 6 * windowHeight / 20);
  buttonReB.mousePressed(reB);
  buttonReB.style('font-size', '20px');
  buttonReB.style('background-color', 'whitesmoke');

  inputImB = createInput('Im(b)', 'number');
  inputImB.position(windowWidth / 18, 7 * windowHeight / 20);
  inputImB.size(40);
  inputImB.style('font-size', '20px');
  buttonImB = createButton('submit');
  buttonImB.position(inputImB.x + inputImB.width, 7 * windowHeight / 20);
  buttonImB.mousePressed(imB);
  buttonImB.style('font-size', '20px');
  buttonImB.style('background-color', 'whitesmoke');

  buttonAddAnotherPair = createButton('add another pair');
  buttonAddAnotherPair.position(windowWidth / 50, 9 * windowHeight / 20);
  buttonAddAnotherPair.mousePressed(addAnotherPair);
  buttonAddAnotherPair.style('font-size', '20px');
  buttonAddAnotherPair.style('background-color', 'whitesmoke');
}

var x = ['',''];
var y = ['',''];

var permX = [];
var permY = [];

vertexLabels = 'abcdefghijklmnopqrstuvwxyz';
firstVertexLabelNumber = 0;
secondVertexLabelNumber = 1;

function reA() {
  var realA = inputReA.value();
  x[0] = realA;
}

function imA() {
  var imagA = inputImA.value();
  y[0] = imagA;
}

function reB() {
  var realB = inputReB.value();
  x[1] = realB;
}

function imB() {
  var imagB = inputImB.value();
  y[1] = imagB;
}

function addAnotherPair() {
  permX.push(x[0]); permX.push(x[1]);
  permY.push(y[0]); permY.push(y[1]);
  x.pop(); x.pop();
  y.pop(); y.pop();
  inputReA.value('');
  inputImA.value('');
  inputReB.value('');
  inputImB.value('');
  firstVertexLabelNumber += 2;
  secondVertexLabelNumber += 2;
}

function draw() {
  background('white');

  push();
  noStroke();
  fill('white');
  rect(0, 0, windowWidth / 8, windowHeight / 2);
  pop();

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

  if (x[0] && y[0] && x[1] && y[1]) {
    // calculating the relevant semi-circle
    var circleCentre = (x[0] ** 2 + y[0] ** 2 - x[1] ** 2 - y[1] ** 2) / (2 * x[0] - 2 * x[1]);
    var circleRadius = dist(x[0], y[0], circleCentre, 0);
    // calculating angles for the arc along the semi-circle
    var alpha = acos((- circleRadius * (x[0] - circleCentre)) / (circleRadius * sqrt((x[0] - circleCentre) ** 2 + y[0] ** 2)));
    var beta = acos((- circleRadius * (x[1] - circleCentre)) / (circleRadius * sqrt((x[1] - circleCentre) ** 2 + y[1] ** 2)));
  }

  // drawing the geodesics
  push();
  strokeWeight(6);
  strokeCap(SQUARE);
  noFill();
  if (x[0] === x[1] && x[0] && y[0] && x[1] && y[1]) {
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

  // drawing the points in the half-plane
  push();
  if (x[0] && y[0]) {
    strokeWeight(2);
    fill('white');
    circle(xOrigin + x[0] * xStep, yOrigin - y[0] * yStep, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text(vertexLabels[firstVertexLabelNumber], xOrigin + x[0] * xStep, yOrigin - y[0] * yStep);
  }
  if (x[1] && y[1]) {
    strokeWeight(2);
    fill('white');
    circle(xOrigin + x[1] * xStep, yOrigin - y[1] * yStep, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text(vertexLabels[secondVertexLabelNumber], xOrigin + x[1] * xStep, yOrigin - y[1] * yStep);
  }
  pop();

  // whiteout of the background outside the plane
  //push();
  //fill('white');
  //noStroke();
  //beginShape();
  //  vertex(0, 0);
  //  vertex(windowWidth, 0);
  //  vertex(windowWidth, windowHeight);
  //  vertex(0, windowHeight);
  //  beginContour();
  //    vertex(xMin - 2, yMin + 22);
  //    vertex(xMax + 2, yMin + 22);
  //    vertex(xMax + 2, yMax - 2);
  //    vertex(xMin - 2, yMax - 2);
  //  endContour();
  //endShape();
  //pop();

  // input labels
  push();
  textSize(25);
  text('Re(' + vertexLabels[firstVertexLabelNumber] + ')', windowWidth / 40, 1.5 * windowHeight / 20 + 10);
  text('Im(' + vertexLabels[firstVertexLabelNumber] + ')', windowWidth / 40, 2.5 * windowHeight / 20 + 10);
  text('Re(' + vertexLabels[secondVertexLabelNumber] + ')', windowWidth / 40, 4.5 * windowHeight / 20 + 10);
  text('Im(' + vertexLabels[secondVertexLabelNumber] + ')', windowWidth / 40, 5.5 * windowHeight / 20 + 10);
  pop();

  // axis labels
  push();
  textSize(30);
  textStyle(NORMAL);
  text('Re', xMax + 30, yOrigin);
  text('Im', xOrigin, yMax - 25);
  pop();


  // permanent drawings for after pressing the addAnotherPair button

  for (let index = 0; index < permX.length; index += 2) {
      if (permX[index] && permY[index] && permX[index + 1] && permY[index + 1]) {
        // calculating the relevant semi-circle
        var permCircleCentre = (permX[index] ** 2 + permY[index] ** 2 - permX[index + 1] ** 2 - permY[index + 1] ** 2) / (2 * permX[index] - 2 * permX[index + 1]);
        var permCircleRadius = dist(permX[index], permY[index], permCircleCentre, 0);
        // calculating angles for the arc along the semi-circle
        var permAlpha = acos((- permCircleRadius * (permX[index] - permCircleCentre)) / (permCircleRadius * sqrt((permX[index] - permCircleCentre) ** 2 + permY[index] ** 2)));
        var permBeta = acos((- permCircleRadius * (permX[index + 1] - permCircleCentre)) / (permCircleRadius * sqrt((permX[index + 1] - permCircleCentre) ** 2 + permY[index + 1] ** 2)));
      }

      // drawing the geodesics
      push();
      strokeWeight(6);
      strokeCap(SQUARE);
      noFill();
      if (permX[index] === permX[index + 1] && permX[index] && permX[index + 1] && permY[index] && permY[index + 1]) {
        stroke('darkgray');
        line(xOrigin + permX[index] * xStep, yOrigin,
          xOrigin + permX[index + 1] * xStep, 0);
        stroke('dodgerblue');
        line(xOrigin + permX[index] * xStep, yOrigin - permY[index] * yStep,
          xOrigin + permX[index + 1] * xStep, yOrigin - permY[index + 1] * yStep);
      } else if (permX[index] < permX[index + 1]) {
        stroke('darkgray');
        arc(xOrigin + permCircleCentre * xStep, yOrigin,
          2 * permCircleRadius * xStep, 2 * permCircleRadius * yStep, PI, 0, OPEN);
        stroke('dodgerblue');
        arc(xOrigin + permCircleCentre * xStep, yOrigin,
          2 * permCircleRadius * xStep, 2 * permCircleRadius * yStep,
          PI + permAlpha, PI + permBeta, OPEN);
      } else {
        stroke('darkgray');
        arc(xOrigin + permCircleCentre * xStep, yOrigin,
          2 * permCircleRadius * xStep, 2 * permCircleRadius * yStep, PI, 0, OPEN);
        stroke('dodgerblue');
        arc(xOrigin + permCircleCentre * xStep, yOrigin,
          2 * permCircleRadius * xStep, 2 * permCircleRadius * yStep,
          PI + permBeta, PI + permAlpha, OPEN);
      }
      pop();

      // drawing the points in the half-plane
      push();
      if (permX[index] && permY[index]) {
        strokeWeight(2);
        fill('white');
        circle(xOrigin + permX[index] * xStep, yOrigin - permY[index] * yStep, 25);
        fill('black');
        textFont('Helvetica');
        textSize(20);
        text(vertexLabels[index], xOrigin + permX[index] * xStep, yOrigin - permY[index] * yStep);
      }
      if (permX[index + 1] && permY[index + 1]) {
        strokeWeight(2);
        fill('white');
        circle(xOrigin + permX[index + 1] * xStep, yOrigin - permY[index + 1] * yStep, 25);
        fill('black');
        textFont('Helvetica');
        textSize(20);
        text(vertexLabels[index + 1], xOrigin + permX[index + 1] * xStep, yOrigin - permY[index + 1] * yStep);
      }
      pop();
  }

  // naming the inputted points permanently
  push();
  for (let index = 0; index <= permX.length; index++) {
    fill('black');
    textFont('Helvetica');
    textSize(20);
    if (permX[index] && permY[index]) {
      text(vertexLabels[index] + ' = ' + permX[index] + ' + ' + permY[index] + 'i',
            9 * windowWidth / 10, (index + 1.5) * windowHeight / 30 + 2);
    }
    if (permX[index + 1] && permY[index + 1]) {
      text(vertexLabels[index + 1] + ' = ' + permX[index + 1] + ' + ' + permY[index + 1] + 'i',
            9 * windowWidth / 10, (index + 1 + 1.5) * windowHeight / 30 + 2);
    }
  }
  pop();
}
