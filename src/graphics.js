import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';
import { ColladaLoader } from './lib/ColladaLoader.js';

export default class Graphics {
  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
    this.courseSize = { x: 100, z: 100 };
    this.initScene();
  }
  
  init() {
    this.initBall();
    //this.initTree();
    this.initCamera();
    this.initControls();
    
    //raycasting demo
    this.down = new THREE.Vector3(0, -1, 0);
    this.raycaster = new THREE.Raycaster();
    this.initialized = true;
  }
  
  update(deltaTime) {
    if (this.initialized) {
      this.ball.position.x += 0.1;
      this.ball.position.z += 0.1;
      this.raycaster.set(this.ball.position, this.down);
      let intersects = this.raycaster.intersectObject(this.terrainMesh);
      if (intersects[0] != undefined) {
        this.ball.position.y = intersects[0].point.y + 0.5;
        this.camera.position.y = 50;
        this.camera.position.x = this.courseSize.x/2 + this.ball.position.x;
        this.camera.position.z = this.courseSize.z/2 + this.ball.position.z;
        this.camera.lookAt(this.ball.position);
      }
    }
  }
  
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  
  initScene() {
    this.scene = new THREE.Scene();
    let graphics = this;
    let loader = new ColladaLoader();
    loader.load(
      './../assets/terrain.dae',
      function(collada) {
        graphics.scene.add(collada.scene);                                    // Add collada scene
        graphics.scene.background = new THREE.Color(0x87ceeb);                // Set BG
        graphics.scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1)); // Add light
        
        graphics.terrainMesh = graphics.scene.getObjectByName("Plane");           // Get mesh and set its material
        graphics.terrainMesh.material = new THREE.MeshNormalMaterial( { flatShading: true, color: 0x22b14c } );
        
        graphics.init();  // Finish initialization
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
    let ratio = 10;
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
    this.ball.position.set(-100, 1000, -100);
    this.scene.add(this.ball);
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);  
  }
  
}
