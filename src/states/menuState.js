import State from "./state.js";

export default class MenuState extends State {
  constructor(game) {
    super(game);
    this.createBackground();
    this.createTitle();
    this.createSubtitle();
  }
  
  start() {
    document.getElementById("background").style.display = "block";
    document.getElementById("title").style.display = "block";
    document.getElementById("subtitle").style.display = "block";
  }
  
  stop() {
    document.getElementById("background").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("subtitle").style.display = "none";
  }
  
  update(deltaTime) {
    
  }
  
  render() {
    
  }
  
  createBackground() {
    let div = document.createElement("div");
    div.id = "background";
    document.getElementById("container").appendChild(div);
  }
  
  createTitle() {
    let div = document.createElement("div");
    div.id = "title";
    div.textContent = "rogolf";
    document.getElementById("container").appendChild(div);
  }
  
  createSubtitle() {
    let div = document.createElement("div");
    div.id = "subtitle";
    div.textContent = "Press Enter";
    document.getElementById("container").appendChild(div);
  }
  
  handleEnter() { this.game.setState(this.game.getIdleState()); }
}
