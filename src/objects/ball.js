import * as THREE from './../lib/three.module.js';

export default class Ball {
  constructor(game) {
    this.game = game;
    
    this.position = new THREE.Vector3(-100, 10, -100);
  }
  
  update(deltaTime) {
    this.position.x += 7.5 * deltaTime;
    this.position.z += 7.5 * deltaTime;
    let y = this.game.graphics.getHeight(this.position);
    if (y != undefined) { this.position.y = y; }
    else { this.position.y = 1000; }
  }
  
}
