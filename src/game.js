import Input from "./input.js";
import Graphics from "./graphics.js";
import UIHelper from "./uiHelper.js";

import Ball from "./objects/ball.js";

import MenuState from "./states/menuState.js";
import IdleState from "./states/idleState.js";
import PauseState from "./states/pauseState.js";

export default class Game {
  constructor(renderer) {
    this.input = new Input(this);
    this.uiHelper = new UIHelper();
    this.graphics = new Graphics(this, renderer);
    
    this.ball = new Ball(this);
    
    this.menuState = new MenuState(this);
    this.idleState = new IdleState(this);
    this.pauseState = new PauseState(this);
    
    this.state = this.getMenuState();
    this.state.start();
  }
  
  update(deltaTime) { this.state.update(deltaTime); }
  render() { this.state.render(); }
  
  setState(state) {
    this.state.stop();
    this.state = state;
    this.state.start();
  }
  
  getMenuState() { return this.menuState; }
  getIdleState() { return this.idleState; }
  getPauseState() { return this.pauseState; }
  
  onWindowResize() { this.graphics.onWindowResize(); }
  
}
