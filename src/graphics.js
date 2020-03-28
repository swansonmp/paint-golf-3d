import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';
import { ColladaLoader } from './lib/ColladaLoader.js';

const HOLES_PATH = "./../assets/holes/";

export default class Graphics {
  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
  }
  
  load(filename) {
    this.scene = new THREE.Scene();
    let graphics = this;
    let loader = new ColladaLoader();
    loader.load(
      HOLES_PATH + filename,
      function(collada) {
        graphics.scene.add(collada.scene);                                    // Add collada scene
        graphics.scene.background = new THREE.Color(0x87ceeb);                // Set BG
        graphics.scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1)); // Add light
        
        graphics.terrainMesh = graphics.scene.getObjectByName("Plane");           // Get mesh and set its material
        graphics.terrainMesh.material = new THREE.MeshNormalMaterial( { flatShading: true, color: 0x22b14c } );
        
        // For raycasting
        graphics.down = new THREE.Vector3(0, -1, 0);
        graphics.raycaster = new THREE.Raycaster();
        
        graphics.initBall();
        //graphics.initTree();
        graphics.initCamera();
        graphics.initControls();
      },
      function(data) { }
    );
  }
  
  initCamera() {
    let ratio = 10;
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth/-ratio, 
      window.innerWidth/ratio, 
      window.innerHeight/ratio, 
      window.innerHeight/-ratio, 
      0, 
      5000
    );
    this.camera.position.set(0, 100, 0);
  }
  
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  
  initTree() {
    /*
    //let spriteMap = new THREE.TextureLoader().load( "sprite.png" );
    //let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
    let sprite = new THREE.Sprite();
    sprite.center.set(0.5, 0);
    sprite.scale.set(10, 25, 10);
    sprite.position.set(250, 0, 250);
    console.log(sprite.position);
    this.scene.add(sprite);
    */
  }
  
  initBall() {
    let radius = 0.5;
    this.ball = new THREE.Mesh( 
      new THREE.SphereBufferGeometry(radius, 8, 8), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.scene.add(this.ball);
  }
  
  update(deltaTime) {
    // Set ball's graphical position
    this.ball.position.copy(this.game.ball.position);
    this.ball.position.y += 0.5;
    
    //this.updateCamera();
  }
  
  updateCamera() {
    this.camera.position.x = 50 + this.ball.position.x;
    this.camera.position.y = 75;
    this.camera.position.z = 50 + this.ball.position.z;
    this.camera.lookAt(this.ball.position);
  }
  
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  
  getHeight(object) {
    this.raycaster.set(object, this.down);
    let intersects = this.raycaster.intersectObject(this.terrainMesh);
    if (intersects[0] != undefined) {
      return intersects[0].point.y;
    }
    else {
      return undefined;
    }
  }
  
  onWindowResize() {
    if (this.camera != undefined) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  
}
