import State from "./state.js";

export default class IdleState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.graphics.update();
  }
  
  render() {
    this.game.graphics.render();
  }
  
  handleEscape() {
    this.game.setState(this.game.getPauseState());
  }
}
