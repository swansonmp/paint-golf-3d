import State from "./state.js";

export default class MenuState extends State {
  constructor(game) {
    super(game,
      [
        { id: "background" },
        { id: "title", text: "rogolf" },
        { id: "subtitle", text: "Press Enter" }
      ]
    );
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleEnter() { this.game.setState(this.game.getIdleState()); }
  
}
