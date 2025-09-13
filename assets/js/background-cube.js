// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('container-cube').appendChild(renderer.domElement);

// Create cube wireframe
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
const cubeMaterial = new THREE.LineBasicMaterial({ 
    color: 0x333333, 
    transparent: true, 
    opacity: 0,
    linewidth: 2
});
const cubeWireframe = new THREE.LineSegments(cubeEdges, cubeMaterial);
scene.add(cubeWireframe);

// Create fixed dots in a regular grid inside the cube
const dotsPerDimension = 8;
const dots = [];
// const dotGeometry = new THREE.SphereGeometry(0.03, 6, 6);
const dotGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
const dotMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true, 
    opacity: 0.08,
});

for (let x = 0; x < dotsPerDimension; x++) {
    for (let y = 0; y < dotsPerDimension; y++) {
        for (let z = 0; z < dotsPerDimension; z++) {
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            
            // Position dots in a regular grid within the cube
            const spacing = 3.5 / (dotsPerDimension - 1);
            dot.position.set(
                (x - (dotsPerDimension - 1) / 2) * spacing,
                (y - (dotsPerDimension - 1) / 2) * spacing,
                (z - (dotsPerDimension - 1) / 2) * spacing
            );
            
            scene.add(dot);
            dots.push(dot);
        }
    }
}

// Store original positions for rotation calculations
dots.forEach(dot => {
    dot.userData = { originalPosition: dot.position.clone() };
});

// Animation variables
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Rotate the cube with all dots fixed inside (half speed)
    cubeWireframe.rotation.x += 0.00025;
    cubeWireframe.rotation.y += 0.0004;
    cubeWireframe.rotation.z += 0.00015;
    
    // Rotate all dots along with the cube
    dots.forEach(dot => {
        dot.rotation.copy(cubeWireframe.rotation);
        
        // Apply the same rotation to dot positions relative to cube center
        const originalPos = dot.userData.originalPosition.clone();
        originalPos.applyEuler(cubeWireframe.rotation);
        dot.position.copy(originalPos);
    });
    
    // Camera orbital movement (closer and slower)
    const radius = 2;
    camera.position.x = Math.cos(time * 0.15) * radius;
    camera.position.z = Math.sin(time * 0.15) * radius;
    camera.position.y = 2 + Math.sin(time * 0.1) * 1;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Start animation
animate();