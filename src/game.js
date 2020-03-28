import Input from "./input.js";
import Graphics from "./graphics.js";
import UIHelper from "./uiHelper.js";

import HoleBag from "./objects/holeBag.js";
import CardBag from "./objects/cardBag.js";
import Player from "./objects/player.js";
import Ball from "./objects/ball.js";

import MenuState from "./states/menuState.js";
import StartState from "./states/startState.js";
import LoadState from  "./states/loadState.js";
import PrepareState from "./states/prepareState.js";
import IdleState from "./states/idleState.js";
import PauseState from "./states/pauseState.js";
import PowerState from "./states/powerState.js";
import AccuracyState from "./states/accuracyState.js";
import PreStrikingState from "./states/preStrikingState.js";
import StrikingState from "./states/strikingState.js";
import RunningState from "./states/runningState.js";
import PostRunningState from "./states/postRunningState.js";
import EvaluateState from "./states/evaluateState.js";
import PostHoleState from "./states/postHoleState.js";
import ChoiceState from "./states/choiceState.js";
import ResultsState from "./states/resultsState.js";

export default class Game {
  constructor(renderer) {
    this.input = new Input(this);
    this.uiHelper = new UIHelper();
    this.graphics = new Graphics(this, renderer);
    
    this.holeBag = new HoleBag(this);
    this.cardBag = new CardBag(this);
    this.player = new Player(this);
    this.ball = new Ball(this);
    
    this.menuState = new MenuState(this);
    this.startState = new StartState(this);
    this.loadState = new LoadState(this);
    this.prepareState = new PrepareState(this);
    this.idleState = new IdleState(this);
    this.pauseState = new PauseState(this);
    this.powerState = new PowerState(this);
    this.accuracyState = new AccuracyState(this);
    this.preStrikingState = new PreStrikingState(this);
    this.strikingState = new StrikingState(this);
    this.runningState = new RunningState(this);
    this.postRunningState = new PostRunningState(this);
    this.evaluateState = new EvaluateState(this);
    this.postHoleState = new PostHoleState(this);
    this.choiceState = new ChoiceState(this);
    this.resultsState = new ResultsState(this);
    
    this.state = this.getMenuState();
    this.state.start();
  }
  
  update(deltaTime) { this.state.update(deltaTime); }
  render() { this.state.render(); }
  
  setState(state) {
    this.state.stop();
    this.state = state;
    this.state.start();
  }
  
  getMenuState() { return this.menuState; }
  getStartState() { return this.startState; }
  getLoadState() { return this.loadState; }
  getPrepareState () { return this.prepareState }
  getIdleState() { return this.idleState; }
  getPauseState() { return this.pauseState; }
  getPowerState () { return this.powerState }
  getAccuracyState () { return this.accuracyState }
  getPreStrikingState () { return this.preStrikingState }
  getStrikingState () { return this.strikingState }
  getRunningState () { return this.runningState }
  getPostRunningState () { return this.postRunningState }
  getEvaluateState () { return this.evaluateState }
  getPostHoleState () { return this.postHoleState }
  getChoiceState () { return this.choiceState }
  getResultsState () { return this.resultsState }
  
  onWindowResize() { this.graphics.onWindowResize(); }
  
}
