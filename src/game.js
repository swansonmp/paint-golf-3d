import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';

export default class Game {
  constructor(renderer) {
    this.renderer = renderer;
    
    this.mapSize = { width: 700, height: 700 };
    this.courseWidth = this.mapSize.width;  // Visual size X
    this.courseDepth = this.mapSize.height;  // Visual size Z
    this.terrainWidth = 700;        // Number of vertices
    this.terrainDepth = 700;
    
    this.terrainMesh;
    
    this.initHeightData(this.terrainWidth, this.terrainDepth);
    this.initScene();
    this.initBall();
    this.initGround();
    this.initTree();
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
  
  initHeightData(width, depth) {
    // Generates the height data
    let size = width * depth;
    let data = new Float32Array(size);
    let p = 0;
    for (let j = 0; j < depth; j++) {
      for (let i = 0; i < width; i++) {
        let height = 0;
        data[p] = height;
        p++;
      }
    }
    this.heightData = data;
  }
  
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
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
    this.camera.position.x = this.courseWidth + this.ball.position.x;
    this.camera.position.z = this.courseDepth + this.ball.position.z;
    this.camera.lookAt(this.ball.position);
  }
  
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  
  initGround() {
    let geometry = new THREE.PlaneBufferGeometry(
        this.courseWidth, 
        this.courseDepth, 
        this.terrainWidth - 1, 
        this.terrainDepth - 1
    );
    geometry.rotateX(-Math.PI / 2);
    
    let vertices = geometry.attributes.position.array;

    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      // j + 1 is the y component
      vertices[j + 1] = this.heightData[i];
    }
    
    //geometry.computeVertexNormals();

    let groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let textureLoader = new THREE.TextureLoader();
    textureLoader.load( "./../assets/course.png", function(texture) {
        groundMaterial.map = texture;
        groundMaterial.needsUpdate = true;
    });

    this.terrainMesh = new THREE.Mesh(geometry, groundMaterial);
    this.scene.add(this.terrainMesh);
  }
  
  initTree() {
    //let spriteMap = new THREE.TextureLoader().load( "sprite.png" );
    //let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
    let sprite = new THREE.Sprite();
    sprite.center.set(0.5, 0);
    sprite.scale.set(10, 25, 10);
    sprite.position.set(250, 0, 250);
    console.log(sprite.position);
    this.scene.add(sprite);
    
  }
  
  initBall() {
    let radius = 5;
    this.ball = new THREE.Mesh( 
      new THREE.SphereBufferGeometry(radius, 8,8 ), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.ball.position.set(0, 0, 0);
    this.scene.add(this.ball);
  }
  
}