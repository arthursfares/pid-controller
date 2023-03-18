// initial position of the circle
let circleX = 400; 
let circleY = 400;
// target position
let targetX = 400;
let targetY = 400;
// initial velocity of the circle
let velocityX = 0;
let velocityY = 0;
// initial acceleration of the circle
let accelerationX = 0;
let accelerationY = 0;
// PID constants
let kp = 0.2;
let ki = 0.01; 
let kd = 0.1;
// proportional gain
let proportionalX = 0;
let proportionalY = 0;
// integral gain
let integralX = 0;
let integralY = 0;
// derivative gain
let derivativeX = 0; 
let derivativeY = 0;
// error from last cycle 
let lastErrorX = 0;
let lastErrorY = 0;
// mouse position when pressed
let mousePressedX = 0;
let mousePressedY = 0;
// flag
let isDragging = false;


function setup() {
  var canvas = createCanvas(800, 800);
  canvas.parent("canvasContainer");
  canvas.mousePressed(canvasMousePressed);
  canvas.mouseReleased(canvasMouseReleased);
}

function draw() {
  // get input values
  let kpInput = document.getElementById("kp-input");
  let kiInput = document.getElementById("ki-input");
  let kdInput = document.getElementById("kd-input");
  // update constants
  kp = parseFloat(kpInput.value);
  ki = parseFloat(kiInput.value);
  kd = parseFloat(kdInput.value);

  background(220);
  fill(0);
  ellipse(400,400,5,5);
  ellipse(circleX, circleY, 50, 50);

  // activate PID controller to update position when mouse is released
  if (!mouseIsPressed) {
    let errorX = targetX - circleX;
    let errorY = targetY - circleY;

    proportionalX = errorX * kp;
    proportionalY = errorY * kp;

    integralX += errorX * ki;
    integralY += errorY * ki;

    derivativeX = (errorX - lastErrorX) * kd;
    derivativeY = (errorY - lastErrorY) * kd;

    lastErrorX = errorX;
    lastErrorY = errorY;

    accelerationX = proportionalX + integralX + derivativeX;
    accelerationY = proportionalY + integralY + derivativeY;

    velocityX += accelerationX;
    velocityY += accelerationY;

    circleX += velocityX;
    circleY += velocityY;
  }
}

function canvasMousePressed() {
  let d = dist(mouseX, mouseY, circleX, circleY);
  // check if the mouse is pressed within the circle
  if (d < 25) { // if mouse is within the circle
    isDragging = true; // set dragging to true
  }
}

function mouseDragged() {
  if (isDragging) { // if dragging is true
    circleX = mouseX; // update circle's x position with mouse's x position
    circleY = mouseY; // update circle's y position with mouse's y position
  }
}

function canvasMouseReleased() {
  isDragging = false; // set dragging to false when the mouse button is released

  targetX = 400;
  targetY = 400;
  velocityX = 0;
  velocityY = 0;
  integralX = 0;
  integralY = 0;
  derivativeX = 0;
  derivativeY = 0;
  lastErrorX = 0;
  lastErrorY = 0;
}