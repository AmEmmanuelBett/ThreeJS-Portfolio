import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
/* 
Three items required
1. Scene is a container for items
2. Camera is the view the user sees
    - 75 is the degrees,
    - ration is the size of browser. Ratio of window width vs height
    - 0.1 to 1000 is the full scope of camera
3. Renderer - Display the 3d
*/
// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bg")
})
// Render pixels based on device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// Set camera postion
camera.position.setZ(30)
camera.position.setX(-3)
// Render scene and camera
// renderer.render(scene, camera)

/*
Adding objects
 - Geometry
    - a 3d object
 - Material
    - Gives color and texture
- Torus combines geometry and material by meshing
*/
const geometry = new THREE.TorusKnotGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)


// adding object to scene
scene.add(torus)

// Add lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridhelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridhelper)

// Control the orbit
const controls = new OrbitControls(camera, renderer.domElement)


// Add stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    // Generate postion value for each star
    const [a, b, c] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    // set star position
    star.position.set(a, b, c)
    scene.add(star)
}
Array(400).fill().forEach(addStar)

// Avatar
const imageTexture = new THREE.TextureLoader().load('naruto.jpg')

const naruto = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: imageTexture })
)
scene.add(naruto)
// Add background image
const spacetexture = new THREE.TextureLoader().load('starry.jpg')
scene.background = spacetexture


// Add Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
)
scene.add(moon)
moon.position.z = 30
moon.position.setX(-10)

// Setup camera to move on scroll
function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    moon.rotateX += 0.05
    moon.rotateY += 0.075
    moon.rotateZ += 0.05

    naruto.rotateY += 0.01;
    naruto.rotateX += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002
}
document.body.onscroll = moveCamera
// Setup infinite loop so as to render the renderer
function animate() {
    // request the browser to display animation
    requestAnimationFrame(animate)

    // Animate the object
    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01


    controls.update()
    // Render every time the screen reloads
    renderer.render(scene, camera)

}

animate()