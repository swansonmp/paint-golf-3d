export default class Player {
    constructor(game) {
      this.game = game;
    }
    
    reset() {
      this.power = 0;
      this.control = 0;
      this.impact = 0;
      this.spin = 0;
    }
    
    resetHole() {
      this.strokes = 0;
    }
}
