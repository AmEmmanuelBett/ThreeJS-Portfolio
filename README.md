This is the main JavaScript file for the Three.js portfolio, showcasing various 3D projects and animations.

Overview
The main.js file contains the core logic for rendering and animating 3D objects using the Three.js library. It sets up the scene, camera, renderer, lighting, and controls for the 3D environment. Additionally, it creates and adds various 3D objects, such as a torus, stars, an avatar, the moon, and sets up animations for these objects.

Scene Setup
The file starts by creating a Three.js scene, camera, and renderer. The camera is positioned to give a perspective view, and the renderer is set to display on the canvas element with the ID "bg."

Adding Objects
The script creates and adds several 3D objects to the scene using different geometries and materials. Notably, a torus knot, stars, an avatar (using an image texture), and the moon (with a normal map) are added to the scene.

Lighting and Controls
Point light and ambient light sources are added to illuminate the 3D scene, creating a realistic lighting effect. The OrbitControls enable users to interactively navigate and control the camera view around the 3D objects.

Animation
The script sets up an animation loop using the requestAnimationFrame function. The torus and moon objects are animated with rotation, while the avatar is continuously rotated along both X and Y axes. Additionally, the camera is adjusted based on the scroll position, creating a parallax effect as users scroll down the page.
