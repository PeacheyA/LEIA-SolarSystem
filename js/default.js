var windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;
var camera, renderer, scene;

// add your global variables here:
var sunObject,
    mercuryObject,
    venusObject,
    earthObject,
    marsObject,
    jupiterObject,
    saturnObject,
    uranusObject,
    neptuneObject,
    plutoObject;


window.onload = function() {
    sun = new THREE.Object3D();
    mercury = new THREE.Object3D();
    venus = new THREE.Object3D();
    earth = new THREE.Object3D();
    mars = new THREE.Object3D();
    jupiter = new THREE.Object3D();
    saturn = new THREE.Object3D();
    uranus = new THREE.Object3D();
    neptune = new THREE.Object3D();
    pluto = new THREE.Object3D();
    Init();
    animate();
};

function Init() {
    scene = new THREE.Scene();

    // camera setup
    camera = new LeiaCamera({
        cameraPosition: new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z),
        targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
    });
    scene.add(camera);

    // rendering setup
    renderer = new LeiaWebGLRenderer({
        antialias: true,
        renderMode: _renderMode,
        shaderMode: _nShaderMode,
        colorMode: _colorMode,
        devicePixelRatio: 1
    });
    renderer.Leia_setSize({
        width: windowWidth,
        height: windowHeight,
        autoFit: true
    });
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    document.body.appendChild(renderer.domElement);

    //add object to scene
    addObjectsToScene();

    //add Light
    addLights();
}

function animate() {
    requestAnimationFrame(animate);


    //Mechanical Calculations
    //  
    var OrbitCalculationX = function(velocityPartial, orbitalRadius) {
        return (Math.sin(Date.now() / 16000 * velocityPartial) * orbitalRadius);
    };

    var OrbitCalculationZ = function(velocityPartial, orbitalRadius) {
        return (Math.cos(Date.now() / 16000 * velocityPartial) * orbitalRadius);
    };

    var OrbitInclination = function(velocityPartial, InclinationDegree) {
        return (Math.cos(Date.now() / 16000 * velocityPartial) * InclinationDegree);
    };


    //Mercury
    //Orbit
    mercury.position.x = OrbitCalculationX(4.15, 11.5);
    mercury.position.z = OrbitCalculationZ(4.15, 11.5);
    mercury.position.y = OrbitInclination(4.15, 1.0);

    //Venus
    //Orbit
    venus.position.x = OrbitCalculationX(1.62, 12.3);
    venus.position.z = OrbitCalculationZ(1.62, 12.3);
    venus.position.y = OrbitInclination(1.62, 0.40);

    //Earth
    //Orbit
    earth.position.x = OrbitCalculationX(1.00, 13.8);
    earth.position.z = OrbitCalculationZ(1.00, 13.8);
    earth.position.y = OrbitInclination(1.00, 0.00);
    /*//Rotation
            earth.rotation.y += 0.00005*/

    //Mars
    //Orbit
    mars.position.x = OrbitCalculationX(0.53, 14.8);
    mars.position.z = OrbitCalculationZ(0.53, 14.8);
    mars.position.y = OrbitInclination(0.53, 1.90);


    //Jupiter
    //Orbit
    jupiter.position.x = OrbitCalculationX(0.084, 18.0);
    jupiter.position.z = OrbitCalculationZ(0.084, 18.0);
    jupiter.position.y = OrbitInclination(0.084, 1.30);


    //Saturn
    //Orbit
    saturn.position.x = OrbitCalculationX(0.034, 24.0);
    saturn.position.z = OrbitCalculationZ(0.034, 24.0);
    saturn.position.y = OrbitInclination(0.034, 2.50);
    //Axial Tilt
    saturn.rotation.x = 0.2;
    saturn.rotation.z = 0.4;


    //Uranus=
    //Orbit
    uranus.position.x = OrbitCalculationX(0.0119, 28.0);
    uranus.position.z = OrbitCalculationZ(0.0119, 28.0);
    uranus.position.y = OrbitInclination(0.0119, 0.80);


    //Neptune
    //Orbit
    neptune.position.x = OrbitCalculationX(0.0061, 31.3);
    neptune.position.z = OrbitCalculationZ(0.0061, 31.3);
    neptune.position.y = OrbitInclination(0.0061, 1.80);


    //Pluto
    //Orbit
    pluto.position.x = OrbitCalculationX(0.004, 40.1);
    pluto.position.z = OrbitCalculationZ(0.004, 40.1);
    pluto.position.y = OrbitInclination(0.004, 17.2);

    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0));
    renderer.Leia_render({
        scene: scene,
        camera: camera,
        holoScreenSize: _holoScreenSize,
        holoCamFov: _camFov,
        upclip: _up,
        downclip: _down,
        messageFlag: _messageFlag
    });






}

function addObjectsToScene() { // Add your objects here

    //GEOMETRIES
    //Planets
    var sunGeometry = new THREE.SphereGeometry(10.0, 20, 20),
        mercuryGeometry = new THREE.SphereGeometry(0.34, 20, 20),
        venusGeometry = new THREE.SphereGeometry(0.85, 20, 20),
        earthGeometry = new THREE.SphereGeometry(0.90, 20, 20),
        marsGeometry = new THREE.SphereGeometry(0.48, 20, 20),
        jupiterGeometry = new THREE.SphereGeometry(3.36, 20, 20),
        saturnGeometry = new THREE.SphereGeometry(2.83, 20, 20),
        uranusGeometry = new THREE.SphereGeometry(1.80, 20, 20),
        neptuneGeometry = new THREE.SphereGeometry(1.74, 20, 20),
        plutoGeometry = new THREE.SphereGeometry(0.17, 20, 20);

    //MATERIALS
    //Planets
    var sunMaterial = new THREE.MeshBasicMaterial({
            "color": '#FFC966',
            "ambient": '#FFC966',
            "emissive": '#FFC966',
            "map": THREE.ImageUtils.loadTexture(
                "resources/sun.png")
        }),
        mercuryMaterial = new THREE.MeshBasicMaterial({
            "color": '#990000',
            "ambient": '#990000',
            "emissive": '#990000',
            "map": THREE.ImageUtils.loadTexture(
                "resources/mercury.png")
        }),
        venusMaterial = new THREE.MeshBasicMaterial({
            "color": '#B27300',
            "ambient": '#B27300',
            "emissive": '#B27300',
            "map": THREE.ImageUtils.loadTexture(
                "resources/venus.png")
        }),
        earthMaterial = new THREE.MeshBasicMaterial({
            "color": '#6D00F9',
            "ambient": '#6D00F9',
            "emissive": '#6D00F9',
            "map": THREE.ImageUtils.loadTexture(
                "resources/earth.png")
        }),
        marsMaterial = new THREE.MeshBasicMaterial({
            "color": '#6B1919',
            "ambient": '#6B1919',
            "emissive": '#6B1919',
            "map": THREE.ImageUtils.loadTexture(
                "resources/mars.png")
        }),
        jupiterMaterial = new THREE.MeshBasicMaterial({
            "color": '#CCA37A',
            "ambient": '#CCA37A',
            "emissive": '#CCA37A',
            "map": THREE.ImageUtils.loadTexture(
                "resources/jupiter.png")
        }),
        saturnMaterial = new THREE.MeshBasicMaterial({
            "color": '#7A6149',
            "ambient": '#7A6149',
            "emissive": '#7A6149',
            "map": THREE.ImageUtils.loadTexture(
                "resources/saturn.png")
        }),
        uranusMaterial = new THREE.MeshBasicMaterial({
            "color": '#9999FF',
            "ambient": '#9999FF',
            "emissive": '#9999FF',
            "map": THREE.ImageUtils.loadTexture(
                "resources/uranus.png")
        }),
        neptuneMaterial = new THREE.MeshBasicMaterial({
            "color": '#000099',
            "ambient": '#000099',
            "emissive": '#000099',
            "map": THREE.ImageUtils.loadTexture(
                "resources/neptune.png")
        }),
        plutoMaterial = new THREE.MeshBasicMaterial({
            "color": '#311E21',
            "ambient": '#311E21',
            "emissive": '#311E21',
            "map": THREE.ImageUtils.loadTexture(
                "resources/pluto.png")
        });

    //OBJECTS
    //Planets
    var sunObject = new THREE.Mesh(sunGeometry, sunMaterial),
        mercuryObject = new THREE.Mesh(mercuryGeometry, mercuryMaterial),
        venusObject = new THREE.Mesh(venusGeometry, venusMaterial),
        earthObject = new THREE.Mesh(earthGeometry, earthMaterial),
        marsObject = new THREE.Mesh(marsGeometry, marsMaterial),
        jupiterObject = new THREE.Mesh(jupiterGeometry, jupiterMaterial),
        saturnObject = new THREE.Mesh(saturnGeometry, saturnMaterial),
        uranusObject = new THREE.Mesh(uranusGeometry, uranusMaterial),
        neptuneObject = new THREE.Mesh(neptuneGeometry, neptuneMaterial),
        plutoObject = new THREE.Mesh(plutoGeometry, plutoMaterial);


    //ADD STUFF
    sun.add(sunObject);
    scene.add(sun);

    mercury.add(mercuryObject);
    scene.add(mercury);

    venus.add(venusObject);
    scene.add(venus);

    earth.add(earthObject);
    scene.add(earth);

    mars.add(marsObject);
    scene.add(mars);

    jupiter.add(jupiterObject);
    scene.add(jupiter);

    saturn.add(saturnObject);
    scene.add(saturn);

    uranus.add(uranusObject);
    scene.add(uranus);

    neptune.add(neptuneObject);
    scene.add(neptune);

    pluto.add(plutoObject);
    scene.add(pluto);


}

function addLights() {
    //Add Lights Here

}