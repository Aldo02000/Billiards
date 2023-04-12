/* global THREE */

"use strict";

// * Initialize webGL
const canvas = document.getElementById("myCanvas");
const renderer = new THREE.WebGLRenderer({canvas,
                                          antialias: true});
renderer.setClearColor('#ffffff');    // set background color

renderer.shadowMap.enabled = true;

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper());
const camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
                                            0.1, 1000 );

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});

camera.position.set(3, 4, 4);
camera.lookAt(scene.position);

const controls = new THREE.TrackballControls( camera, renderer.domElement );

//Adding the Spotlight and the Ambient light
const spotLight = new THREE.SpotLight("rgb(255, 255, 255)");
spotLight.position.set(0,2,0);
spotLight.castShadow = true;
scene.add(spotLight);
spotLight.angle = Math.PI/2.5;

const spotLightMaterial = new THREE.MeshBasicMaterial({color:"rgb(255, 242, 1)"})
const spotlightBall = new THREE.Mesh(new THREE.SphereGeometry(0.1), spotLightMaterial)
spotlightBall.position.set(0,2,0);
scene.add(spotlightBall);


const al = new THREE.AmbientLight();
al.color = new THREE.Color(0.4, 0.4, 0.4);
scene.add(al);

// Adding the cord
const cordMaterial = new THREE.MeshBasicMaterial({color:"rgb(154, 154, 154)"})
const cord = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.5, 0.01), cordMaterial);
cord.position.set(0, 2.25, 0)
scene.add(cord);

// Adding the ceiling
const groundAndCeilingMaterial = new THREE.MeshPhongMaterial({color:"rgb(154, 154, 154)"});
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), groundAndCeilingMaterial);
ceiling.rotation.set(Math.PI/2, 0, 0)
ceiling.position.set(0,2.5,0);
scene.add(ceiling);

//Setting the ground


const ground = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), groundAndCeilingMaterial);
ground.rotation.set(-Math.PI/2, 0, 0)



//Adding the legs

const widthOfLeg = 0.1 // in meters
const lengthOfLeg = 0.1 // in meters
const heightOfLeg = 0.75 // in meters
const legMaterial = new THREE.MeshPhongMaterial({color:"rgb(107, 10, 1)"});
const leg = new THREE.Mesh(new THREE.BoxGeometry(widthOfLeg, heightOfLeg, lengthOfLeg), legMaterial);
const leg2 = leg.clone();
const leg3 = leg.clone();
const leg4 = leg.clone();
scene.add(leg);
scene.add(leg2);
scene.add(leg3);
scene.add(leg4);

//Adding the table
const widthOfTable = 1.42; // meters
const lengthOfTable = 2.84; // meters
const heightOfTable = 0.045; // thicknes of the table
const distanceFromGround = 0.75 // meters
const tableMaterial = new THREE.MeshPhongMaterial({color:"rgb(60, 114, 0)"});
const table = new THREE.Mesh(new THREE.BoxGeometry(widthOfTable, heightOfTable, lengthOfTable), tableMaterial);
table.position.set(0, distanceFromGround, 0);
table.receiveShadow = true;
table.castShadow = true;
scene.add(table);

ground.receiveShadow = true;
scene.add(ground);

// Positioning the legs
leg.position.set( widthOfTable/2-widthOfLeg, distanceFromGround/2, lengthOfTable/2-lengthOfLeg);
leg2.position.set( -widthOfTable/2+widthOfLeg, distanceFromGround/2, lengthOfTable/2-lengthOfLeg);
leg3.position.set( -widthOfTable/2+widthOfLeg, distanceFromGround/2, -lengthOfTable/2+lengthOfLeg);
leg4.position.set( widthOfTable/2-widthOfLeg, distanceFromGround/2, -lengthOfTable/2+lengthOfLeg);

// Adding the cushions
const widthOfCushions = 0.1
const cushionHeight = heightOfTable + widthOfCushions/2;
const lengthOfShortEdgedCushion = widthOfTable + 2*widthOfCushions;

const cushionShortEdge = new THREE.Mesh(new THREE.BoxGeometry(widthOfCushions, cushionHeight, lengthOfShortEdgedCushion), tableMaterial);
cushionShortEdge.position.set(0, distanceFromGround+cushionHeight/2, lengthOfTable/2+ widthOfCushions/2)
cushionShortEdge.rotation.set(0, Math.PI/2, 0);
const cushionShortEdge2 = cushionShortEdge.clone();
cushionShortEdge2.position.set(0, distanceFromGround+cushionHeight/2, -lengthOfTable/2)

const lengthOfLongEdgedCushion = lengthOfTable;
const cushionLongEdge = new THREE.Mesh(new THREE.BoxGeometry(widthOfCushions, cushionHeight, lengthOfLongEdgedCushion), tableMaterial);
cushionLongEdge.position.set(widthOfTable/2+widthOfCushions/2, distanceFromGround+cushionHeight/2, 0)
const cushionLongEdge2 = cushionLongEdge.clone();
cushionLongEdge2.position.set(-widthOfTable/2-widthOfCushions/2, distanceFromGround+cushionHeight/2, 0)

scene.add(cushionShortEdge);
scene.add(cushionShortEdge2);
scene.add(cushionLongEdge);
scene.add(cushionLongEdge2);

// Adding the billiard balls

const numOfBalls = 8;
const ballRadius = 0.057;
const images = new Array();
const textures = new Array();
const balls = new Array();
const ballMaterials = new Array();

// Generating the balls as spheres
for(let i = 0; i < numOfBalls; i++) {

images.push(new Image());
images[i].src = imgBase64Array[i];
textures.push(new THREE.Texture(images[i]));
textures[i].needsUpdate = true;
ballMaterials.push(new THREE.MeshPhongMaterial({map:textures[i], wireframe:true}));
balls.push(new THREE.Mesh(new THREE.SphereGeometry(ballRadius), ballMaterials[i]));
balls[i].castShadow = true;
scene.add(balls[i]);
}

function positionBall(i) {
  const ballPositionX = Math.pow(-1, Math.round(10*Math.random())) * (widthOfTable/2*Math.random() - 2*ballRadius);
  const ballPositionZ = Math.pow(-1, Math.round(10*Math.random())) * (lengthOfTable/2*Math.random()  - 2*ballRadius);
  balls[i].position.set(ballPositionX, distanceFromGround+heightOfTable+ballRadius/2, ballPositionZ);
}

function isOverlaping(actualBall) {
  for(let i = 0; i < actualBall; i++) {
    if( (balls[actualBall].position.x >= (balls[i].position.x - 2*ballRadius)) && (balls[actualBall].position.x <= (balls[i].position.x + 2*ballRadius)) && (balls[actualBall].position.z >= (balls[i].position.z - 2*ballRadius)) && (balls[actualBall].position.z <= (balls[i].position.z + 2*ballRadius)))
      return true;
  }
}

let nrOfBallsAdded = 0;

while(nrOfBallsAdded < numOfBalls) {
  positionBall(nrOfBallsAdded);

  if(isOverlaping(nrOfBallsAdded))
    continue;

  nrOfBallsAdded++
}

// Setting the speed of movement
let speed = new Array();
for (let i = 0; i < numOfBalls; i++) {
  speed.push(new THREE.Vector3(0, 0, 0));
}

function resetSpeed() {
  for (let i = 0; i < numOfBalls; i++) {
    let speedX = Math.pow(-1, Math.round(10*Math.random())) * 0.8 * Math.random()
    let speedZ = Math.pow(-1, Math.round(10*Math.random())) * 0.8 * Math.random()
    speed[i].x = speedX;
    speed[i].z = speedZ;
  }
}


// Moving the balls according to the speed
function moveBalls(t,h) {

  const planeNormal = new THREE.Vector3(0,1,0);

  for (let k = 0; k < numOfBalls; k++) {
    balls[k].matrixAutoUpdate = false;
    const axisOfRotation =  planeNormal.clone().cross(speed[k]);
    axisOfRotation.normalize();
    const omega = speed[k].length() / ballRadius; 
    balls[k].matrix.makeRotationAxis(axisOfRotation, omega*t);
    let ballPosition = balls[k].position
    ballPosition.add(speed[k].clone().multiplyScalar(h));
    balls[k].matrix.setPosition(ballPosition);
  }
}


function collisionWithCushion() {
  for(let i = 0; i < numOfBalls; i++) {
    if(Math.abs(balls[i].position.x) >= (widthOfTable/2 - ballRadius))
      speed[i].x *= -1;
    else if(Math.abs(balls[i].position.z) >= (lengthOfTable/2 - ballRadius))
      speed[i].z *= -1;
  }
}


function collisionBetweenBalls(h) {
  for(let i = 0; i < numOfBalls - 1; i++){
    for(let j = i+1; j < numOfBalls; j++){


      const d = balls[i].position.clone().sub(balls[j].position);

      if(d.length() <= 2*ballRadius)
      {
        const u1 = speed[i].clone();
        const u2 = speed[j].clone();
        const uDiff = u1.clone().sub(u2);
        const numerator = uDiff.dot(d);
        const ratio = numerator / d.lengthSq();
        const factor = d.clone().multiplyScalar(ratio);
        const v1 = u1.clone().sub(factor);
        const v2 = u2.clone().add(factor);
        speed[i] = v1.clone();
        speed[j] = v2.clone();
      }
    }
  }
}



// * Render loop
const clock = new THREE.Clock();


function render() {
  requestAnimationFrame(render);
  let h = clock.getDelta();
  let t = clock.getElapsedTime();

  document.getElementById("ResetButton").addEventListener("click", resetSpeed);
  
  moveBalls(t,h);
  collisionBetweenBalls(h);
  collisionWithCushion();

  controls.update();
  renderer.render(scene, camera);
}
render();
