let tracker, capture;
let stock, black, vid2;
let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
let distance, stretch;
let rsphere, photonsphere;

function preload() {
  stock = loadImage('star.jpg');
  black = loadImage('black.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // start capturing video
  capture = createCapture(VIDEO);
  capture.size(800, 1000);
  capture.hide();

  // create the tracker
  tracker = new clm.tracker()
  tracker.init();
  tracker.start(capture.elt);
}


function draw() {

  let positions = tracker.getCurrentPosition();//refresh tracking


  if (positions.length > 0) {//if clm is sensing a face

    // leftEyeX = positions[32][0];
    // leftEyeY = positions[32][1];
    //
    // rightEyeX = positions[27][0];
    // rightEyeY = positions[27][1];

    distance = dist(positions[32][0], positions[32][1], positions[27][0], positions[27][1]);
    //calc distance between left and right eyes to judge distance from camera to person
    stretch = (2 * distance) + 682;
  }

  if (stretch < 1000) {
    stroke(255);
    fill(255);
    strokeWeight(0);

    rsphere = pow(1.042, distance);
    photonsphere = rsphere * 3 / 2;

    texture(black);//center sphere, the hole
    sphere(rsphere);

    translate(0, 0, -100);//ring ellipsoid, distortion around black hole
    texture(stock);
    torus(photonsphere, distance);

    translate(0, 0, 150);//world ellipsoid
    texture(stock);
    ellipsoid(800, 800, stretch);
  }
}
