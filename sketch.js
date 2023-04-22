const SKETCH_MARGIN = 32;

let sampling;
let scale;
let functionInput;

function getCanvasWidth() {
  return windowWidth - SKETCH_MARGIN * 2;
}

function getCanvasHeight() {
  return windowHeight - SKETCH_MARGIN * 2 - 64;
}

function f(x) {
  try {
    return eval(functionInput.value());
  } catch (e) {
    return 0
  }
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight());
  functionInput = createInput('x > 0 ? Math.sin(x) : x * x');
  sampling = createSlider(1, 10, 10, 1);
  scale = createSlider(20, 250, 100, 1);
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight());
}

function draw() {
  background(24);
  push();
  stroke(64);
  line(0, getCanvasHeight() / 2, getCanvasWidth(), getCanvasHeight() / 2);
  line(getCanvasWidth() / 2, 0, getCanvasWidth() / 2, getCanvasHeight());
  translate(getCanvasWidth() / 2, getCanvasHeight() / 2);
  strokeWeight(4);
  fill(255);
  textAlign(CENTER, TOP);
  for (let i = scale.value(), j = 1; i < getCanvasWidth() / 2; i += scale.value(), j++) {
    point(i, 0);
    text(j, i, 8);
  }
  for (let i = -scale.value(), j = -1; i > -getCanvasWidth() / 2; i -= scale.value(), j--) {
    point(i, 0);
    text(j, i, 8);
  }
  textAlign(LEFT, CENTER);
  for (let i = scale.value(), j = -1; i < getCanvasHeight() / 2; i += scale.value(), j--) {
    point(0, i);
    text(j, 8, i);
  }
  for (let i = -scale.value(), j = 1; i > -getCanvasHeight() / 2; i -= scale.value(), j++) {
    point(0, i);
    text(j, 8, i);
  }
  stroke('gold');
  strokeWeight(2);
  beginShape();
  noFill();

  for (let i = -getCanvasWidth() / 2; i < getCanvasWidth() / 2; i += 1 / sampling.value()) {
    const x = i;
    const y = f(x);

    vertex(x * scale.value(), -y * scale.value());
  }

  endShape();

  strokeWeight(10);
  const x = mouseX - getCanvasWidth() / 2;
  const y = -f(x / scale.value()) * scale.value();
  point(x, y);
  fill(255);
  noStroke();
  textAlign(CENTER, BASELINE);
  text(Math.round(-y / scale.value() * 100) / 100, x, y - 16);

  pop();
}
