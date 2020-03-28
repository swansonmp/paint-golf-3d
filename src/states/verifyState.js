import State from "./state.js"

export default class VerifyState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    if (this.game.graphics.raycaster != undefined) {
      this.game.setState(this.game.getPrepareState());
    }
  }
}