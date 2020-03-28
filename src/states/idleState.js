import State from "./state.js";

export default class IdleState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.ball.update(deltaTime);
    this.game.graphics.update(deltaTime);
  }
  
  render() { this.game.graphics.render(); }
  
  handleSpace() { this.game.setState(this.game.getPowerState()); }
  handleEscape() { this.game.setState(this.game.getPauseState()); }
  
}
