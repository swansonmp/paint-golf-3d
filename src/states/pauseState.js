import State from "./state.js";

export default class PauseState extends State {
  constructor(game) {
    super(game,
      [
        { id: "pauseFilter" },
        { id: "pauseText", text: "Paused"}
      ]
    );
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  render() { this.game.graphics.render(); }
  
  handleEnter() { this.game.setState(this.game.getIdleState()); }
  handleEscape() { this.game.setState(this.game.getIdleState()); }
  
}
