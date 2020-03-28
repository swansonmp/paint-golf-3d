import State from "./state.js";

export default class LoadState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.player.resetHole();
    
    let holeFilename = this.game.holeBag.getHole();
    this.game.graphics.load(holeFilename);
    
    this.game.setState(this.game.getVerifyState());
  }
}