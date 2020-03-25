import State from "./state.js";

export default class PauseState extends State {
  constructor(game) {
    super(game);
    this.elements = [
      { id: "pauseFilter" },
      { id: "pauseText", text: "Paused"}
    ];
    this.elements.forEach(element => {
      game.uiHelper.createElement(element);
    });
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
  
  handleEnter() { this.game.setState(this.game.getIdleState()); }
  handleEscape() { this.game.setState(this.game.getIdleState()); }
  
}
