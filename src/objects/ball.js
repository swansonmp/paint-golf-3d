import * as THREE from './../lib/three.module.js';

const ANGLE_INCREMENT = 1/32;

export default class Ball {
  constructor(game) {
    this.game = game;
    this.position = new THREE.Vector3();
    this.lastPosition = new THREE.Vector3();
    
    //this.angle = 0;
    
    // golf ball properties
    this.mass = 0.0459;
    this.crossSectionalArea = 0.04267 * Math.PI / 4;
    this.smashFactor = 1.49;
    
    // nature
    this.gravity = new THREE.Vector3(0, 0, -9.8);
    this.airDensity = 1.2041;
    
    // golf ball aero
    this.dragCoefficient = 0.4;
    this.liftCoefficient = 0.00001;
    this.spinDecayRate = 23;
    
    this.reset(new THREE.Vector3(-100, 10, -100));
  }
  
  reset(position) {
    this.position.copy(position);
    this.velocity = new THREE.Vector3(0,0,0);
    this.angularVelocity = new THREE.Vector3(0,0,0);
    this.acceleration = new THREE.Vector3(0,0,0); 
    
    this.setLastPosition();
  }
  
  strike() {
    // init shot attributes
    this.initSpeed = 0.0;
    this.initVerticalAngleDegrees = 0.0;
    this.initHorizontalAngleDegrees = 0.0;
    this.initBackspinRPM = 0.0;
    this.initSpinAngle = 0.0;
    
    // init velocity
    this.velocity = this.getInitialVelocity(this.initSpeedMPH, this.smashFactor, this.initVerticalAngleDegrees, this.initHorizontalAngleDegrees);
    
    // init angular velocity (spin rate)
    this.angularVelocity = this.getInitialSpin(this.initBackspinRPM, this.initSpinAngle);
  }
  
  getInitialVelocity(speed, smashFactor, verticalDegrees, horizontalDegrees) {    
    let velocity = new THREE.Vector3(0, 0, 0);
    velocity.x = Math.sin(-1 * horizontalDegrees * Math.PI / 180);
    velocity.y = Math.sin(verticalDegrees * Math.PI / 180);
    velocity.z = Math.cos(verticalDegrees * Math.PI / 180);     
    return velocity.normalize().multiplyScalar(speed * smashFactor);
  }
  
  toMPS(n) { return n; }
  
  getInitialSpin = function(spinRPM, spinAngle) {
    let spin = new THREE.Vector3(0, 0, 0);
    spin.x = -1; // full backspin
    spin.y = Math.sin(spinAngle * Math.PI / 180);
    spin.normalize().multiplyScalar(spinRPM * 2 * Math.PI / 60);
    return spin;
  }
  
  update(deltaTime) {
    this.deltaTime = deltaTime;

    // calculate velocity change           
    this.velocity.add(this.getAcceleration().clone().multiplyScalar(this.deltaTime));
    this.position.add(this.velocity.clone().multiplyScalar(this.deltaTime));

    // calculate spin rate decay
    this.angularVelocity.add(this.angularDecayVector());
    
    //TODO check bounce
  }
  
  getAcceleration() {
    // drag acceleration = drag force / mass
    let adjustedDragCoefficient = this.dragCoefficient * Math.min(1.0, 14 / this.velocity.length());
    let dragForceAcceleration = this.velocity.clone().multiplyScalar(-1 * adjustedDragCoefficient * this.airDensity * this.crossSectionalArea / this.mass);

    // magnus acceleration (from ball spin) = magnus force / mass
    let magnusForceAcceleration = this.angularVelocity.clone().cross(this.velocity).multiplyScalar(this.liftCoefficient / this.mass);

    // combined acceleration = gravity + drag + magnus
    return (new THREE.Vector3(0,0,0)).add(this.gravity).add(dragForceAcceleration).add(magnusForceAcceleration);
  }
  
  angularDecayVector() {
    return this.angularVelocity.clone().normalize().negate().multiplyScalar(this.spinDecayRateConstant * this.deltaTime);
  }
  
  setLastPosition() {
    this.lastPosition.copy(this.position);
  }
  
  incrementAngle() {
    this.angle += ANGLE_INCREMENT;
    if (this.angle >= Math.PI * 2)
      this.angle -= Math.PI * 2;
  }
  
  decrementAngle() {
    this.angle -= ANGLE_INCREMENT;
    if (this.angle <= 0)
      this.angle += Math.PI * 2;
  }
  
}
