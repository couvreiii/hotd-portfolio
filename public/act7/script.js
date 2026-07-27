
let scene, camera, renderer, controls; // Global variables for Three.js scene, camera, renderer, and controls
let lighthouseModel, beam, sea, rainParticles; // Global variables for the lighthouse model, light beam, sea, and rain particles
let orbs = []; // Array to hold memory orbs
let beaconLight; // Global variable for the lighthouse beacon light
let state = { 
    time: 0,
    isNight: true,
    storm: false,
    discovered: new Set() 
};


const storyData = [
    { pos: { x: -10, y: 8, z: -8 }, text: "The lighthouse keeper lit the lantern one last time, though no ships would ever return. As the storm swallowed the shore, he whispered his daughter’s name, knowing the sea had already taken her." },
    { pos: { x: 12, y: 10, z: -6 }, text: "They grew up in the same coastal town, always meeting by the shore after school. Years later, when he finally confessed his feelings, the tide rolled in gently, as if the sea itself was blessing their promise to stay together." },
    { pos: { x: -8, y: 6, z: 10 }, text: "Every night she lay on the rooftop, tracing constellations he once showed her. The stars still burned above, but without his voice beside her, they felt like distant reminders of a love that had slipped beyond reach." },
    { pos: { x: 10, y: 7, z: 9 }, text: "She would lie awake at night, whispering her dreams to the stars, believing they carried her hopes across the sky. But as the years passed, the stars kept shining while her dreams faded, leaving her with only the quiet glow of what might have been." },
    { pos: { x: 0, y: 15, z: -4 }, text: "After years away, the child returned to the coastal village, the sea breeze carrying memories of simpler days. As dusk fell, the lighthouse cast its warm beam across the waves, guiding her small boat to shore—like an old guardian, waiting to embrace her homecoming." },
    { pos: { x: 0, y: 3, z: 12 }, text: "If you are reading this, I am already part of the tide. Keep the light burning." }
];

function init() {
    scene = new THREE.Scene();
    
    
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 40);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 10, 0);
    
    createSky();
    createSea();
    createCliff();
    loadLighthouse();
    createLightBeam();
    createMemoryOrbs();
    createRain(); 
    setupLights();
    setupEvents();
    
    animate();
}

function createSky() {
    const sky = new THREE.Mesh(
        new THREE.SphereGeometry(400, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x0a0a1f, side: THREE.BackSide })
    );
    scene.add(sky);
}



function createSea() {
    const seaGeometry = new THREE.PlaneGeometry(200, 200, 80, 80);
    seaGeometry.rotateX(-Math.PI / 2);
    
    const seaMaterial = new THREE.MeshPhongMaterial({
        color: 0x0a2a4a, shininess: 100, flatShading: true, transparent: true, opacity: 0.9
    });
    
    sea = new THREE.Mesh(seaGeometry, seaMaterial);
    sea.position.y = 0;
    sea.receiveShadow = true;
    scene.add(sea);
    
    sea.userData.originalPositions = seaGeometry.attributes.position.array.slice();
}

function createCliff() {
    const cliff = new THREE.Mesh(
        new THREE.ConeGeometry(8, 6, 8),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, flatShading: true })
    );
    cliff.position.set(0, 3, 0);
    cliff.castShadow = true;
    cliff.receiveShadow = true;
    scene.add(cliff);
}

function loadLighthouse() {
    const loader = new THREE.GLTFLoader();
    loader.load('lighthouse.glb', function (gltf) {
        lighthouseModel = gltf.scene;
        lighthouseModel.scale.set(15, 15, 15); 
        lighthouseModel.position.set(0, 6, 0); 
        
        lighthouseModel.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(lighthouseModel);
        document.getElementById('loading').style.display = 'none';
    }, undefined, function (error) {
        console.error('Error loading model:', error);
    });
}

function createLightBeam() {
    beam = new THREE.Group();
    beam.position.set(0, 9, 0); 
    
    const beamGeometry = new THREE.ConeGeometry(15, 80, 32, 1, true);
    beamGeometry.translate(0, -40, 0);
    
    const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0xffe8a0, transparent: true, opacity: 0.15,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false
    });
    
    const beam1 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam1.rotation.z = Math.PI / 2;
    
    const beam2 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam2.rotation.z = Math.PI / 2;
    beam2.rotation.y = Math.PI;
    
    beam.add(beam1);
    beam.add(beam2);
    scene.add(beam);
}

function createMemoryOrbs() {
    storyData.forEach((story, index) => {
        const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 24, 24),
            new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.9 })
        );
        orb.position.set(story.pos.x, story.pos.y, story.pos.z);
        orb.userData = { id: index, text: story.text, baseY: story.pos.y };
        
        const glow = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.3 })
        );
        orb.add(glow);
        
        orbs.push(orb);
        scene.add(orb);
    });
}

function createRain() {
    const rainCount = 1500;
    const rainGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 6); 
    
    for(let i = 0; i < rainCount; i++) {
        let x = (Math.random() - 0.5) * 100;
        let y = Math.random() * 50;
        let z = (Math.random() - 0.5) * 100;
        
       
        positions[i*6] = x;
        positions[i*6+1] = y;
        positions[i*6+2] = z;
       
        positions[i*6+3] = x - 1; 
        positions[i*6+4] = y - 4; 
        positions[i*6+5] = z;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const rainMat = new THREE.LineBasicMaterial({ 
        color: 0xaaddff, 
        transparent: true, 
        opacity: 0 
    });
    
    rainParticles = new THREE.LineSegments(rainGeo, rainMat);
    scene.add(rainParticles);
}

function setupLights() {
    scene.add(new THREE.AmbientLight(0x404060, 0.2));
    
    const moonLight = new THREE.DirectionalLight(0xaaccff, 0.6);
    moonLight.position.set(-20, 30, -10);
    moonLight.castShadow = true;
    scene.add(moonLight);
    
    beaconLight = new THREE.PointLight(0xffdd88, 3, 100);
    beaconLight.position.set(0, 2, 0); 
    scene.add(beaconLight);
}

function setupEvents() {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    renderer.domElement.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(orbs);
        
        if (intersects.length > 0) {
            const orb = intersects[0].object;
            if (!state.discovered.has(orb.userData.id)) {
                state.discovered.add(orb.userData.id);
                
                const fragment = document.createElement('div');
                fragment.className = 'fragment';
                fragment.textContent = orb.userData.text;
                document.getElementById('story').appendChild(fragment);
                
                orb.material.opacity = 0.3;
            }
        }
    });
    
   
   
    document.getElementById('toggleStorm').addEventListener('click', () => {
        state.storm = !state.storm;
    });
    
    document.getElementById('reset').addEventListener('click', () => {
        state.discovered.clear();
        document.getElementById('story').innerHTML = '';
        orbs.forEach(orb => orb.material.opacity = 0.9);
    });
}

function animate() {
    requestAnimationFrame(animate);
    state.time += 0.016;
    
   
    if (sea) {
        const positions = sea.geometry.attributes.position;
        const original = sea.userData.originalPositions;
        const waveHeight = state.storm ? 1.2 : 0.4; 
        
        for (let i = 0; i < positions.count; i++) {
            const x = original[i * 3];
            const z = original[i * 3 + 2];
            const y = Math.sin(x * 0.1 + state.time * 1.2) * waveHeight + Math.sin(z * 0.08 + state.time * 0.9) * waveHeight;
            positions.setY(i, y);
        }
        positions.needsUpdate = true;
    }
    
    
    if (beam) beam.rotation.y += 0.02;
    if (beaconLight) beaconLight.intensity = 3 + Math.sin(state.time * 3) * 1;
    
    
    orbs.forEach((orb, i) => {
        orb.position.y = orb.userData.baseY + Math.sin(state.time * 1.5 + i) * 0.4;
        orb.rotation.y += 0.01;
    });
    
    
    if (rainParticles) {
        if (state.storm) {
            rainParticles.material.opacity = 0.6; 
            const pos = rainParticles.geometry.attributes.position;
            
            for(let i = 0; i < 1500; i++) {
               
                let y1 = pos.getY(i*2) - 1.5;
                
                let y2 = pos.getY(i*2+1) - 1.5;
                
               
                if(y1 < 0) {
                    let x = (Math.random() - 0.5) * 100;
                    let z = (Math.random() - 0.5) * 100;
                    let y = 40 + Math.random() * 10;
                    pos.setXYZ(i*2, x, y, z);
                    pos.setXYZ(i*2+1, x-1, y-4, z);
                } else {
                    pos.setY(i*2, y1);
                    pos.setY(i*2+1, y2);
                }
            }
            pos.needsUpdate = true;
        } else {
            rainParticles.material.opacity = 0;
        }
    }
    
    controls.update();
    renderer.render(scene, camera);
}

init();