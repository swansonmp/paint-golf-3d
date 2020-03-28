import State from "./state.js";

export default class LoadState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    let holeFilename = this.game.holeBag.getHole();
    this.game.graphics.load(holeFilename);
    
    this.game.player.resetHole();
    
    this.game.setState(this.game.getIdleState());
  }
}