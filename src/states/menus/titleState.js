import State from "./../state.js";

export default class TitleState extends State {
  constructor(game) {
    super(game,
      [
        { id: "title", text: "rogolf" },
        { id: "subtitle", text: "Press Enter" }
      ]
    );
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleConfirm() {
    this.game.setState(this.game.getIdleState());
    //this.game.menuState.setState(this.game.menuState.getMainMenuState());
  }
  handleBack() { }
  
}