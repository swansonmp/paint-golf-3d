import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';

export default class Game {
  constructor(renderer) {
    this.renderer = renderer;
    
    this.imageSize = { width: 2000, height: 2000 };
    this.scale = 2;
    this.courseWidth = this.imageSize.width  / this.scale;  // Visual size X
    this.courseDepth = this.imageSize.height / this.scale;  // Visual size Z
    this.terrainWidth = this.imageSize.width  / 100;        // Number of vertices
    this.terrainDepth = this.imageSize.height / 100;
    
    this.terrainMesh;
    
    this.initHeightData(this.terrainWidth, this.terrainDepth);
    this.initScene();
    this.initBall();
    this.initCamera();
    this.initControls();
    this.initGround();

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
    this.camera.position.x = this.courseWidth;
    this.camera.position.z = this.courseDepth;
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

    geometry.computeVertexNormals();

    let groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let textureLoader = new THREE.TextureLoader();
    textureLoader.load( "./../assets/course.png", function(texture) {
        groundMaterial.map = texture;
        groundMaterial.needsUpdate = true;
    });

    this.terrainMesh = new THREE.Mesh(geometry, groundMaterial);
    this.scene.add(this.terrainMesh);
  }
  
  initBall() {
    let radius = 1;
    this.ball = new THREE.Mesh( 
      new THREE.SphereBufferGeometry(radius, 8,8 ), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.ball.position.set(0, 0, 0);
    this.scene.add(this.ball);
  }
  
}