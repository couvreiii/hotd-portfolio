/* global THREE */

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create the Dragon's Forge - Glowing Anvil
const anvilGeometry = new THREE.ConeGeometry(1.5, 2, 4, 1, false, Math.PI / 4);
const anvilMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a,
    metalness: 0.9,
    roughness: 0.3,
    emissive: 0x8a1c1c,
    emissiveIntensity: 0.3
});
const anvil = new THREE.Mesh(anvilGeometry, anvilMaterial);
anvil.position.y = -1;
scene.add(anvil);

// Glowing embers/particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 200;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xff6b35,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Floating geometric shapes (representing code/tech)
const shapes = [];
const geometries = [
    new THREE.OctahedronGeometry(0.3),
    new THREE.TetrahedronGeometry(0.3),
    new THREE.IcosahedronGeometry(0.3)
];

for(let i = 0; i < 15; i++) {
    const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xd4af37 : 0x8a1c1c,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const shape = new THREE.Mesh(geometries[i % 3], material);
    shape.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 - 2
    );
    shape.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    
    shapes.push(shape);
    scene.add(shape);
}

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff6b35, 2, 10);
pointLight1.position.set(0, 0, 2);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xd4af37, 1.5, 10);
pointLight2.position.set(2, 2, 2);
scene.add(pointLight2);

// Mouse controls
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
});

// Scroll to zoom
document.addEventListener('wheel', (event) => {
    camera.position.z += event.deltaY * 0.01;
    camera.position.z = Math.max(2, Math.min(10, camera.position.z));
});

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate anvil
    anvil.rotation.y += 0.005;
    
    // Animate particles (rising embers)
    const positions = particlesGeometry.attributes.position.array;
    for(let i = 1; i < particlesCount * 3; i += 3) {
        positions[i] += 0.02;
        if(positions[i] > 5) {
            positions[i] = -2;
        }
    }
    particlesGeometry.attributes.position.needsUpdate = true;
    
    // Rotate floating shapes
    shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        shape.position.y += Math.sin(elapsedTime + index) * 0.002;
    });
    
    // Smooth camera movement
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    anvil.rotation.x += 0.05 * (targetY - anvil.rotation.x);
    anvil.rotation.z += 0.05 * (targetX - anvil.rotation.z);
    
    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();