import State from "./../state.js";

export default class MainState extends State {
  constructor(game) {
    super(game,
      [
        { class_: "heading", text: "Main" },
        { class_: "item1", text: "Play" }
      ]
    );
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleConfirm() {
    this.game.setState(this.game.getIdleState());
  }
  handleBack() {
    this.game.menuState.setState(this.game.menuState.getTitleState());
  }
  
}