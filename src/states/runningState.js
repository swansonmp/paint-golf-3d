import State from "./state.js";

export default class RunningState extends State {
  constructor(game) {
    super(game);
  }
  
  render() { this.game.graphics.render(); }
  
}
