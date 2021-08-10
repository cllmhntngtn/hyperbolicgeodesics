let cli, clii, cliii, cliv;

function preload() {
  cli = loadImage('https://live.staticflickr.com/7233/7010332073_79dd017a34_k.jpg');
  clii = loadImage('https://live.staticflickr.com/7277/7010337865_a2cc50a3cb_h.jpg');
  cliii = loadImage('https://live.staticflickr.com/7026/6556456979_a8f779856e_b.jpg');
  cliv = loadImage('https://live.staticflickr.com/7054/7010346341_dbbde93322_h.jpg');
}

function setup() {
  createCanvas(windowWidth, 9 * windowHeight / 10);
  textFont('Futura-Bold');
  textAlign(CENTER, CENTER);
}

let speed = -1; // determines the speed
let xPos = 0; // starting position on x-axis

function draw() {
  background('white');

  xPos += speed;

  //if(xPos > windowWidth) {
  //  xPos = 0; // when xPos becomes greater than width, reset to 0
  //}

  textSize(20);
  imageMode(CENTER);
  // first set
  image(cli, xPos - 9 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT I (Nov. 1958)', xPos - 9 * windowWidth / 9, windowHeight / 5)
  image(clii, xPos - 6 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT II (Mar. 1959)', xPos - 6 * windowWidth / 9, windowHeight / 5)
  image(cliii, xPos - 3 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT III (Dec. 1959)', xPos - 3 * windowWidth / 9, windowHeight / 5)
  image(cliv, xPos - 0 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT IV (Jul. 1960)', xPos - 0 * windowWidth / 9, windowHeight / 5)
  // second set
  image(cli, xPos + 3 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT I (Nov. 1958)', xPos + 3 * windowWidth / 9, windowHeight / 5)
  image(clii, xPos + 6 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT II (Mar. 1959)', xPos + 6 * windowWidth / 9, windowHeight / 5)
  image(cliii, xPos + 9 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT III (Dec. 1959)', xPos + 9 * windowWidth / 9, windowHeight / 5)
  image(cliv, xPos + 12 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT IV (Jul. 1960)', xPos + 12 * windowWidth / 9, windowHeight / 5)
  // third set
  image(cli, xPos + 15 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT I (Nov. 1958)', xPos + 15 * windowWidth / 9, windowHeight / 5)
  image(clii, xPos + 18 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT II (Mar. 1959)', xPos + 18 * windowWidth / 9, windowHeight / 5)
  image(cliii, xPos + 21 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT III (Dec. 1959)', xPos + 21 * windowWidth / 9, windowHeight / 5)
  image(cliv, xPos + 24 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT IV (Jul. 1960)', xPos + 24 * windowWidth / 9, windowHeight / 5)
  // fourth set
  image(cli, xPos + 27 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT I (Nov. 1958)', xPos + 27 * windowWidth / 9, windowHeight / 5)
  image(clii, xPos + 30 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT II (Mar. 1959)', xPos + 30 * windowWidth / 9, windowHeight / 5)
  image(cliii, xPos + 33 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT III (Dec. 1959)', xPos + 33 * windowWidth / 9, windowHeight / 5)
  image(cliv, xPos + 36 * windowWidth / 9, windowHeight / 2, 400, 400);
  text('CIRCLE LIMIT IV (Jul. 1960)', xPos + 36 * windowWidth / 9, windowHeight / 5)
}