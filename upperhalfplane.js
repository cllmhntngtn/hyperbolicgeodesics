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

  const xOriginUHP = windowWidth / 2;
  const yOriginUHP = 6 * windowHeight / 7;

  const xMinUHP = windowWidth / 10;
  const xMaxUHP = windowWidth - windowWidth / 10;
  const yMinUHP = 6 * windowHeight / 7;
  const yMaxUHP = windowHeight / 15;

  const xStepUHP = windowWidth / 40;
  const yStepUHP = windowHeight / 20;

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
    fill('white');
    circle(xOriginUHP + x[0] * xStepUHP, yOriginUHP - y[0] * yStepUHP, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text(vertexLabels[firstVertexLabelNumber], xOriginUHP + x[0] * xStepUHP, yOriginUHP - y[0] * yStepUHP);
  }
  if (x[1] && y[1]) {
    strokeWeight(2);
    fill('white');
    circle(xOriginUHP + x[1] * xStepUHP, yOriginUHP - y[1] * yStepUHP, 25);
    fill('black');
    textFont('Helvetica');
    textSize(20);
    text(vertexLabels[secondVertexLabelNumber], xOriginUHP + x[1] * xStepUHP, yOriginUHP - y[1] * yStepUHP);
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
  text('Re(' + vertexLabels[firstVertexLabelNumber] + ')', windowWidth / 40, 1.5 * windowHeight / 20 + 10);
  text('Im(' + vertexLabels[firstVertexLabelNumber] + ')', windowWidth / 40, 2.5 * windowHeight / 20 + 10);
  text('Re(' + vertexLabels[secondVertexLabelNumber] + ')', windowWidth / 40, 4.5 * windowHeight / 20 + 10);
  text('Im(' + vertexLabels[secondVertexLabelNumber] + ')', windowWidth / 40, 5.5 * windowHeight / 20 + 10);
  pop();

  // axis labels
  push();
  textSize(30);
  textStyle(NORMAL);
  text('Re', xMaxUHP + 30, yOriginUHP);
  text('Im', xOriginUHP, yMaxUHP - 25);
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
        line(xOriginUHP + permX[index] * xStepUHP, yOriginUHP,
          xOriginUHP + permX[index + 1] * xStepUHP, 0);
        stroke('dodgerblue');
        line(xOriginUHP + permX[index] * xStepUHP, yOriginUHP - permY[index] * yStepUHP,
          xOriginUHP + permX[index + 1] * xStepUHP, yOriginUHP - permY[index + 1] * yStepUHP);
      } else if (permX[index] < permX[index + 1]) {
        stroke('darkgray');
        arc(xOriginUHP + permCircleCentre * xStepUHP, yOriginUHP,
          2 * permCircleRadius * xStepUHP, 2 * permCircleRadius * yStepUHP, PI, 0, OPEN);
        stroke('dodgerblue');
        arc(xOriginUHP + permCircleCentre * xStepUHP, yOriginUHP,
          2 * permCircleRadius * xStepUHP, 2 * permCircleRadius * yStepUHP,
          PI + permAlpha, PI + permBeta, OPEN);
      } else {
        stroke('darkgray');
        arc(xOriginUHP + permCircleCentre * xStepUHP, yOriginUHP,
          2 * permCircleRadius * xStepUHP, 2 * permCircleRadius * yStepUHP, PI, 0, OPEN);
        stroke('dodgerblue');
        arc(xOriginUHP + permCircleCentre * xStepUHP, yOriginUHP,
          2 * permCircleRadius * xStepUHP, 2 * permCircleRadius * yStepUHP,
          PI + permBeta, PI + permAlpha, OPEN);
      }
      pop();

      // drawing the points in the half-plane
      push();
      if (permX[index] && permY[index]) {
        strokeWeight(2);
        fill('white');
        circle(xOriginUHP + permX[index] * xStepUHP, yOriginUHP - permY[index] * yStepUHP, 25);
        fill('black');
        textFont('Helvetica');
        textSize(20);
        text(vertexLabels[index], xOriginUHP + permX[index] * xStepUHP, yOriginUHP - permY[index] * yStepUHP);
      }
      if (permX[index + 1] && permY[index + 1]) {
        strokeWeight(2);
        fill('white');
        circle(xOriginUHP + permX[index + 1] * xStepUHP, yOriginUHP - permY[index + 1] * yStepUHP, 25);
        fill('black');
        textFont('Helvetica');
        textSize(20);
        text(vertexLabels[index + 1], xOriginUHP + permX[index + 1] * xStepUHP, yOriginUHP - permY[index + 1] * yStepUHP);
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
