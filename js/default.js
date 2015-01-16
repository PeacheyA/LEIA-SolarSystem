var windowWidth = window.innerWidth, 
    windowHeight = window.innerHeight;
var camera, renderer, scene;

// add your global variables here:
var sunObject,
    mercuryObject,
    venusObject,
    earthObject;


window.onload = function() {
    sun             = new THREE.Object3D();
    mercury         = new THREE.Object3D();
    venus           = new THREE.Object3D();
    earth           = new THREE.Object3D();
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
    renderer.Leia_setSize({width: windowWidth,
                         height:windowHeight,
                         autoFit:true
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
            return (Math.sin( Date.now()/16000 * velocityPartial ) * orbitalRadius ) ;
        };

        var OrbitCalculationZ = function( velocityPartial, orbitalRadius) {
            return (Math.cos( Date.now()/16000 * velocityPartial ) * orbitalRadius ) ;
        };

        var OrbitInclination = function( velocityPartial, InclinationDegree) {
            return (Math.cos( Date.now()/16000 * velocityPartial ) * InclinationDegree ) ;
        };

    
    //Mercury
        //Orbit
            mercury.position.x = OrbitCalculationX( 4.15, 11.5 );
            mercury.position.z = OrbitCalculationZ( 4.15, 11.5 );
            mercury.position.y = OrbitInclination ( 4.15, 1.0 );
        
    //Venus
        //Orbit
            venus.position.x = OrbitCalculationX( 1.62, 12.3 );
            venus.position.z = OrbitCalculationZ( 1.62, 12.3 );
            venus.position.y = OrbitInclination ( 1.62, 0.40 );
        
    //Earth
        //Orbit
            earth.position.x = OrbitCalculationX( 1.00, 14.8 );
            earth.position.z = OrbitCalculationZ( 1.00, 14.8 );
            earth.position.y = OrbitInclination ( 1.00, 0.00 );
        //Rotation
            earth.rotation.y += 0.00005
            

    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0));
    renderer.Leia_render({
        scene: scene,
        camera: camera,
        holoScreenSize: _holoScreenSize,
        holoCamFov: _camFov,
        upclip: _up,
        downclip:  _down,
        messageFlag: _messageFlag 
    });

    


    

}

function addObjectsToScene() { // Add your objects here
    
    //GEOMETRIES
        //Planets
            var sunGeometry     = new THREE.SphereGeometry( 10,      20, 20),
                mercuryGeometry = new THREE.SphereGeometry( 0.34,    20, 20),
                venusGeometry   = new THREE.SphereGeometry( 0.85,    20, 20),
                earthGeometry   = new THREE.SphereGeometry( 0.90,    20, 20);

    //MATERIALS
        //Planets
            var sunMaterial     = new THREE.MeshBasicMaterial(
                            {
                                "color": '#FFC966',
                                "ambient": '#FFC966',
                                "emissive": '#FFC966'
                            }),
                mercuryMaterial = new THREE.MeshBasicMaterial(
                            {
                                "color": '#990000',
                                "ambient": '#990000',
                                "emissive": '#990000'
                            }),
                venusMaterial   = new THREE.MeshBasicMaterial(
                            {
                                "color": '#B27300',
                                "ambient": '#B27300',
                                "emissive": '#B27300'
                            }),
                earthMaterial   = new THREE.MeshBasicMaterial(
                            { 
                                "color": '#6D00F9',
                                "ambient": '#6D00F9',
                                "emissive": '#6D00F9'
                            });

    //OBJECTS
        //Planets
            var sunObject       = new THREE.Mesh(sunGeometry,       sunMaterial),
                mercuryObject   = new THREE.Mesh(mercuryGeometry,   mercuryMaterial),
                venusObject     = new THREE.Mesh(venusGeometry,     venusMaterial),
                earthObject     = new THREE.Mesh(earthGeometry,     earthMaterial);


    //ADD STUFF
        sun.add(sunObject);
        scene.add(sun);
        mercury.add(mercuryObject);
        scene.add(mercury);
        venus.add(venusObject);
        scene.add(venus);
        earth.add(earthObject);
        scene.add(earth);


}

function addLights() {
    //Add Lights Here
   
}