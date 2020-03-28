import State from "./state.js";

export default class PowerState extends State {
  constructor(game) {
    super(game);
  }
  
  update(deltaTime) {
    //if powerbar is outofrange
      //reset powerbar
      //this.game.setState(this.game.getIdleState());
    //else
      //this.game.powerbar.update();
  }
  
  render() { this.game.graphics.render(); }
  
}
