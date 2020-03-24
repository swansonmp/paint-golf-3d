import State from "./state.js";

export default class PauseState extends State {
  constructor(game) {
    super(game);
    this.createPauseFilter();
    this.createPauseText();
  }
  
  start() {
    document.getElementById("pauseFilter").style.display = "block";
    document.getElementById("pauseText").style.display = "block";
  }
  
  stop() {
    document.getElementById("pauseFilter").style.display = "none";
    document.getElementById("pauseText").style.display = "none";
  }
  
  render() {
    this.game.graphics.render();
  }
  
  createPauseFilter() {
    let div = document.createElement("div");
    div.id = "pauseFilter";
    document.getElementById("container").appendChild(div);
  }
  
  createPauseText() {
    let div = document.createElement("div");
    div.id = "pauseText";
    div.textContent = "Paused";
    document.getElementById("container").appendChild(div);
  }
  
  handleEnter() { this.game.setState(this.game.getIdleState()); }
  handleEscape() { this.game.setState(this.game.getIdleState()); }
  
}
