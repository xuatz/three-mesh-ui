import * as THREE from 'three';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
import ShadowedLight from './utils/ShadowedLight.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';
import Button from "three-mesh-ui/examples/interactive/Button";
import InteractiveRaycaster from "three-mesh-ui/examples/interactive/InteractiveRaycaster";
import CheckBox from "three-mesh-ui/examples/interactive/CheckBox";
import ToggleButton from "three-mesh-ui/examples/interactive/ToggleButton";
import RadioButton from "three-mesh-ui/examples/interactive/RadioButton";

let scene, camera, renderer, controls, vrControl, interactiveRaycaster;
let mainContainer;
let meshContainer, meshes, currentMesh;

window.addEventListener('load', init);
window.addEventListener('resize', onWindowResize);

//

function init() {

    ////////////////////////
    //  Basic Three Setup
    ////////////////////////

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));
    document.body.appendChild(renderer.domElement);

    // Orbit controls for no-vr

    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1.6, 0);
    controls.target = new THREE.Vector3(0, 1, -1.8);

    /////////
    // Room
    /////////

    const room = new THREE.LineSegments(
        new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
        new THREE.LineBasicMaterial({color: 0x808080})
    );

    const roomMesh = new THREE.Mesh(
        new THREE.BoxGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
        new THREE.MeshBasicMaterial({side: THREE.BackSide}),
    );

    scene.add(room);
    // objsToTest.push(roomMesh);

    //////////
    // Light
    //////////

    const light = ShadowedLight({
        z: 10,
        width: 6,
        bias: -0.0001
    });

    const hemLight = new THREE.HemisphereLight(0x808080, 0x606060);

    scene.add(light, hemLight);

    ////////////////
    // Controllers
    ////////////////

    vrControl = VRControl(renderer, camera, scene);
    scene.add(vrControl.controllerGrips[0], vrControl.controllers[0]);

    ////////////////
    // Raycaster
    ////////////////

    interactiveRaycaster = new InteractiveRaycaster(camera, renderer, vrControl);


    //////////
    // Panel
    //////////

    makeMainPanel();
    makeSimpleButtons();
    makeReuseableButtons();
    makeCheckBoxes();
    makeToggleButtons();
    makeRadioButtons();

    //

    renderer.setAnimationLoop(loop);

};

// Shows the primitive mesh with the passed ID and hide the others

function showMesh(id) {

    meshes.forEach((mesh, i) => {
        mesh.visible = i === id ? true : false;
    });

};

///////////////////
// UI contruction
///////////////////
function makeMainPanel() {
    mainContainer = new ThreeMeshUI.Block({
        justifyContent: 'center',
        alignContent: 'center',
        contentDirection: 'column',
        fontFamily: FontJSON,
        fontTexture: FontImage,
        fontSize: 0.07,
        padding: 0.02,
        borderRadius: 0.11,
        width: 4,
        height: 2
    })
    mainContainer.position.set(0, 1, -1.8);
    mainContainer.rotation.x = -0.55;
    scene.add(mainContainer);
}

function makeSimpleButtons() {
    const panelContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.32,
        contentDirection: 'column',
        padding: 0.02,
        backgroundOpacity: 0,
    });
    mainContainer.add(panelContainer);

    // Add a title in this panel
    panelContainer.add(__addTitle("Simple Buttons"))

    const buttonsContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.18,
        contentDirection: 'row',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    panelContainer.add(buttonsContainer);

    // Button has default settings to fasten its uses
    const defaultButton = new Button({label: "Default Button"});
    buttonsContainer.add(defaultButton);

    // Button can customize its settings
    let customButton = new Button({
        label: "Custom Button",
        borderRadius: 0.025,
        height: 0.12,
        states: {
            idle: {
                backgroundColor: new THREE.Color(0x0099FF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xffffff),
                offset: 0.02
            },
            hovered: {
                backgroundColor: new THREE.Color(0x00BBFF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xFFFFFF),
                offset: 0.02
            }
        }
    });
    buttonsContainer.add(customButton);

    interactiveRaycaster.addObject(defaultButton, customButton);

}

function makeReuseableButtons() {
    const panelContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.32,
        contentDirection: 'column',
        padding: 0.02,
        backgroundOpacity: 0,
    });
    mainContainer.add(panelContainer);

    // Add a title in this panel
    panelContainer.add(__addTitle("Re-using button styles"))

    const buttonsContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.18,
        contentDirection: 'row',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    panelContainer.add(buttonsContainer);


    const buttonOptionsAndStyles = {
        borderRadius: 0.025,
        height: 0.12,
        states: {
            idle: {
                backgroundColor: new THREE.Color(0x0099FF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xffffff),
                offset: 0.02
            },
            hovered: {
                backgroundColor: new THREE.Color(0x00BBFF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xFFFFFF),
                offset: 0.02
            },
        }
    }

    // Button can customize its settings
    let customButtonA = new Button({label: "ButtonA", ...buttonOptionsAndStyles});
    let customButtonB = new Button({label: "ButtonB", ...buttonOptionsAndStyles});
    let customButtonC = new Button({label: "ButtonC", ...buttonOptionsAndStyles});
    let customButtonD = new Button({label: "ButtonD", ...buttonOptionsAndStyles});
    let customButtonE = new Button({label: "ButtonE", ...buttonOptionsAndStyles});
    buttonsContainer.add(customButtonA, customButtonB, customButtonC, customButtonD, customButtonE);

    interactiveRaycaster.addObject(customButtonA, customButtonB, customButtonC, customButtonD, customButtonE);
}

function makeCheckBoxes() {
    const panelContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.32,
        contentDirection: 'column',
        padding: 0.02,
        backgroundOpacity: 0,
    });
    mainContainer.add(panelContainer);

    // Add a title in this panel
    panelContainer.add(__addTitle("Checkboxes"))

    const checkBoxesContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.18,
        contentDirection: 'row',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    panelContainer.add(checkBoxesContainer);

    // Button has default settings to fasten its uses
    const defaultButtonA = new CheckBox({label: "Option A", value: "a"});
    const defaultButtonB = new CheckBox({label: "Option B", value: "b"});
    const defaultButtonC = new CheckBox({label: "Option C", value: "c"});
    checkBoxesContainer.add(defaultButtonA, defaultButtonB, defaultButtonC);

    // Button can customize its settings
    let customButton = new Button({
        label: "Custom Button",
        borderRadius: 0.025,
        height: 0.12,
        states: {
            idle: {
                backgroundColor: new THREE.Color(0x0099FF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xffffff),
                offset: 0.02
            },
            hovered: {
                backgroundColor: new THREE.Color(0xFFFFFF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0x0099FF),
                offset: 0.02
            }
        }
    });
    checkBoxesContainer.add(customButton);

    interactiveRaycaster.addObject(defaultButtonA, defaultButtonB, defaultButtonC, customButton);

    function onCheckBoxChange(evt) {
        console.log(evt.target.value);
    }

    defaultButtonA.addEventListener('change', onCheckBoxChange);
    defaultButtonB.addEventListener('change', onCheckBoxChange);
    defaultButtonC.addEventListener('change', onCheckBoxChange);

}

function makeToggleButtons() {
    const panelContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.32,
        contentDirection: 'column',
        padding: 0.02,
        backgroundOpacity: 0,
    });
    mainContainer.add(panelContainer);

    // Add a title in this panel
    panelContainer.add(__addTitle("Toggle Buttons"))

    const toggleButtonsContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.18,
        contentDirection: 'row',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    panelContainer.add(toggleButtonsContainer);

    // Button has default settings to fasten its uses
    const defaultButtonA = new ToggleButton({label: "Option A", value: "a"});
    const defaultButtonB = new ToggleButton({label: "Option B", value: "b"});
    const defaultButtonC = new ToggleButton({label: "Option C", value: "c"});
    toggleButtonsContainer.add(defaultButtonA, defaultButtonB, defaultButtonC);

    // Button can customize its settings
    let customButton = new Button({
        label: "Custom Button",
        borderRadius: 0.025,
        height: 0.12,
        states: {
            idle: {
                backgroundColor: new THREE.Color(0x0099FF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xffffff),
                offset: 0.02
            },
            hovered: {
                backgroundColor: new THREE.Color(0xFFFFFF),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0x0099FF),
                offset: 0.02
            }
        }
    });
    toggleButtonsContainer.add(customButton);

    interactiveRaycaster.addObject(defaultButtonA, defaultButtonB, defaultButtonC, customButton);

    function onCheckBoxChange(evt) {
        console.log(evt.target.value);
    }

    defaultButtonA.addEventListener('change', onCheckBoxChange);
    defaultButtonB.addEventListener('change', onCheckBoxChange);
    defaultButtonC.addEventListener('change', onCheckBoxChange);

}

function makeRadioButtons() {
    const panelContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.32,
        contentDirection: 'column',
        padding: 0.02,
        backgroundOpacity: 0,
    });
    mainContainer.add(panelContainer);

    // Add a title in this panel
    panelContainer.add(__addTitle("Radio Buttons"))

    const radioButtonsContainer = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.18,
        contentDirection: 'row',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    panelContainer.add(radioButtonsContainer);

    // Button has default settings to fasten its uses
    const defaultButtonA = new RadioButton({label: "Option A", value: "a", group: "a"});
    const defaultButtonB = new RadioButton({label: "Option B", value: "b", group: "a"});
    const defaultButtonC = new RadioButton({label: "Option C", value: "c", group: "a"});
    const defaultButtonD = new RadioButton({label: "Option D", value: "d", group: "a"});
    const defaultButtonE = new RadioButton({label: "Option E", value: "e", group: "a"});
    radioButtonsContainer.add(defaultButtonA, defaultButtonB, defaultButtonC, defaultButtonD, defaultButtonE);


    interactiveRaycaster.addObject(defaultButtonA, defaultButtonB, defaultButtonC, defaultButtonD, defaultButtonE);

    function onRadioChanged(evt) {
        console.log("Group changed", evt.target.selectedOption.value );
    }

    defaultButtonA.group.addEventListener('change', onRadioChanged);

}


function __addTitle(title) {
    const titleBlock = new ThreeMeshUI.Block({
        width: 3.8,
        height: 0.12,
        contentDirection: 'row',
        justifyContent: 'start',
        backgroundOpacity: 0,
        fontSize: 0.12
    });
    titleBlock.add(new ThreeMeshUI.Text({content: title}));

    return titleBlock;
}

// Handle resizing the viewport

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

//

function loop() {

    // Don't forget, ThreeMeshUI must be updated manually.
    // This has been introduced in version 3.0.0 in order
    // to improve performance
    ThreeMeshUI.update();

    controls.update();

    renderer.render(scene, camera);

    interactiveRaycaster.update();

};
