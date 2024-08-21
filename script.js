// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the 3D model
const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();

mtlLoader.load('model.mtl', function(materials) {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load('model.obj', function(object) {
        scene.add(object);
        object.position.set(0, 0, 0);
        object.rotation.y = Math.PI; // Optional: adjust the rotation
        object.scale.set(1, 1, 1); // Optional: adjust the scale
    }, undefined, function(error) {
        console.error(error);
    });
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set the camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
