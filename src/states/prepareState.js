import State from "./state.js";

export default class PrepareState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    // things like update the ball cursor
    
    this.game.setState(this.game.getIdleState());
  }
  
  render() { this.game.graphics.render(); }
  
}
