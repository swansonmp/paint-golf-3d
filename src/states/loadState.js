import State from "./state.js";

export default class LoadState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    // get next hole from holeBag
    // load the hole using graphics
    
    // reset hole-specific player data
    
    this.game.setState(this.game.getIdleState());
  }
}