const HOLES_PATH = "./../../assets/holes/";

export default class HoleBag {
    constructor(game) {
      this.game = game;
      
      this.holes = [
        "terrain.dae"
      ];
    }
    
    reset() {
      // TODO
      // Copy this.holes into this.bag, then shuffle
    }
    
    getHole() {
      return this.holes[0];
    }
    
}
