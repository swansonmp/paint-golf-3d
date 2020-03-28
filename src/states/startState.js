import State from "./state.js";

export default class StartState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    this.game.player.reset()
    this.game.holeBag.reset();
    this.game.cardBag.reset();
    
    this.game.setState(this.game.getLoadState());
  }
}