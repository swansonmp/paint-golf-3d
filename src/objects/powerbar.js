const DIRECTION = {
  DECREASING: -1,
  IDLE: 0,
  INCREASING: 1
};

export default class PowerBar {
  constructor(game) {
    this.game = game;
    this.reset();
    
    this.BAR_MIN = -12;
    
    //fields for drawing
    this.BAR_WIDTH = 600;
    this.BAR_HEIGHT = 30;
    this.LINE_WIDTH = 3;
    this.CURSOR_WIDTH = 5;
    this.TICK_WIDTH = 3;
    this.tickMarks = [25, 50, 75, 100];
  }
  
  reset() {
    this.current = 0;
    this.direction = DIRECTION.INCREASING;
    this.power = 0;
    this.accuracy = 0;
  }
  
  setPower() { this.power = this.current; }
  setAccuracy() { this.accuracy = this.current; }
  getCurrent() { return this.current; }
  getPower() { return this.power / 100; }
  getAccuracy() { return this.accuracy / -this.BAR_MIN; }
  
  update(deltaTime) { 
    const RATE = 10;
    deltaTime /= RATE;
    
    if (this.direction == DIRECTION.INCREASING) {
      if (this.current < 100)
        this.current += deltaTime;
      else
        this.direction = DIRECTION.DECREASING;
    }
    else if (this.direction == DIRECTION.DECREASING) {
      if (this.current > this.BAR_MIN) {
        this.current -= deltaTime;
      }
      else {
        this.accuracy = this.BAR_MIN;
      }
    }
  }
  
}