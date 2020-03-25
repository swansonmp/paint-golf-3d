import State from "./state.js";

import TitleState from "./menus/titleState.js";

export default class MenuState extends State {
  constructor(game) {
    super(game,
      [
        { id: "background" }
      ]
    );
    this.createBall();
    
    this.titleState = new TitleState(game);
    
    this.state = this.titleState;
    this.state.start();
  }
  
  createBall() {
    let svg = document.createElement("svg");
    svg.id = "ballSVG";
    let circle = document.createElement("circle");
    circle.id = "ballCircle";
    document.getElementById("container").appendChild(svg);
    document.getElementById("ballSVG").appendChild(circle);
    
    this.circle = circle;
    //this.elements.push(svg);
  }
  
  getTitleState() { return this.titleState; }
  
  setState(state) {
    this.state.stop();
    this.state = state;
    this.state.start();
  }
  
  start() {
    this.state.start();
    this.showElements();
  }
  
  stop() {
    this.state.stop();
    this.hideElements();
  }
  
  update(deltaTime) {
    /*
    deltaTime /= 50;
    this.circle.cx += deltaTime;
    if (this.circle.cx > window.innerWidth + this.circle.r) {
      this.circle.cy = Math.floor(Math.random() * window.innerHeight);
      this.circle.cx %= window.innerWidth;
    }
    */
  }
  
  handleEnter() { this.state.handleConfirm(); }
  handleSpace() { this.state.handleConfirm(); }
  handleEscape() { this.state.handleBack(); }
  
}
