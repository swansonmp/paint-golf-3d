import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';
import { ColladaLoader } from './lib/ColladaLoader.js';

export default class Game {
  constructor(renderer) {
    this.renderer = renderer;
    
    this.courseSize = { x: 700, z: 700 };
    
    this.scene = new THREE.Scene();
    this.terrainMesh;
    
    this.initScene();
    this.initBall();
    //this.initTree();
    this.initCamera();
    this.initControls();

    window.addEventListener("resize", resize => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }
  
  update(deltaTime) {
    
  }
  
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  
  initScene() {
    let scene = this.scene;
    let loader = new ColladaLoader();
    loader.load(
      './../assets/terrain.dae',
      function(collada) {
        scene.add(collada.scene);
        
        scene.background = new THREE.Color(0x87ceeb);
    
        let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        scene.add(light);
        let terrain = scene.getObjectByName("Plane");
        terrain.material = new THREE.MeshNormalMaterial( { flatShading: true, color: 0x22b14c } );
      },
      function(data) {
        /*
        if (data.total) {
          let percentLoaded = 100 * data.loaded / data.total;
          console.log("Progress: " + percentLoaded.toFixed(2) + "%");
        }
        else {
          console.log("Progress: " + data.loaded + " bytes");
        }
        */
      }
    );
  }
  
  initCamera() {
    let ratio = 5;
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth/-ratio, 
      window.innerWidth/ratio, 
      window.innerHeight/ratio, 
      window.innerHeight/-ratio, 
      0, 
      5000
    );
    this.camera.position.y = 100;
    this.camera.position.x = this.courseSize.x + this.ball.position.x;
    this.camera.position.z = this.courseSize.z + this.ball.position.z;
    this.camera.lookAt(this.ball.position);
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
      new THREE.SphereBufferGeometry(radius, 8,8 ), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.ball.position.set(0, 0, 0);
    this.scene.add(this.ball);
  }
  
}
