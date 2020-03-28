import State from "./state.js";

export default class PostRunningState extends State {
  constructor(game) {
    super(game);
  }
  
  render() { this.game.graphics.render(); }
  
}
