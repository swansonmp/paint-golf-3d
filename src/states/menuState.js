import State from "./state.js";

export default class MenuState extends State {
  constructor(game) {
    super(game);
    this.game.uiHelper.createElementWithID("div", "background");
    this.game.uiHelper.createElementWithID("div", "title", "rogolf");
    this.game.uiHelper.createElementWithID("div", "subtitle", "Press Enter");
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
  
  handleEnter() { this.game.setState(this.game.getIdleState()); }
  
}
