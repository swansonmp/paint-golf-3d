import * as THREE from './../lib/three.module.js';

const ANGLE_INCREMENT = 1/32;

export default class Ball {
  constructor(game) {
    this.game = game;
    
    this.position = new THREE.Vector3(-100, 10, -100);
    this.angle = 0;
    
  }
  
  update(deltaTime) {
    this.position.x += 7.5 * deltaTime;
    this.position.z += 7.5 * deltaTime;
    let y = this.game.graphics.getHeight(this.position);
    if (y != undefined) { this.position.y = y; }
    else { this.position.y = 1000; }
  }
  
  reset(position) {
    
  }
  
  setLastPosition() {
    this.lastPosition = this.position.copy();
  }
  
  strike() {
    
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
