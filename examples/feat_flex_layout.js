import * as THREE from "three";
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {BoxLineGeometry} from "three/examples/jsm/geometries/BoxLineGeometry.js";

import ThreeMeshUI from "three-mesh-ui";

import SnakeImage from "./assets/spiny_bush_viper.jpg";
import FontJSON from "./assets/Roboto-msdf.json";
import FontImage from "./assets/Roboto-msdf.png";
import RadioButton from "three-mesh-ui/examples/interactive/RadioButton";
import InteractiveRaycaster from "three-mesh-ui/examples/interactive/InteractiveRaycaster";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, container, uiRaycaster;

window.addEventListener("load", init);
window.addEventListener("resize", onWindowResize);

//

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050);

    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1.6, 0);
    controls.target = new THREE.Vector3(0, 1, -1.8);
    controls.update();

    // ROOM

    const room = new THREE.LineSegments(
        new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
        new THREE.LineBasicMaterial({color: 0x808080})
    );

    scene.add(room);

    // Raycast
    uiRaycaster = new InteractiveRaycaster(camera, renderer);

    // TEXT PANEL

    makeTextPanel();
    makeContentDirectionUI();
    makeJustifyContentUI();
    makeAlignContentUI();

    //

    renderer.setAnimationLoop(loop);
}

//

function makeTextPanel() {

    const title = new ThreeMeshUI.Block({
        width: 1.5,
        height: 0.15,
        padding: 0.025,
        fontFamily: FontJSON,
        fontTexture: FontImage,
        fontColor: new THREE.Color(0xffffff),
        backgroundOpacity: 1,
        borderRadius: 0.025,
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 0.09,
    });

    title.add(new ThreeMeshUI.Text({content: "Flex Layout"}))

    title.position.set(0, 1.7, -2);
    scene.add(title);

    container = new ThreeMeshUI.Block({
        ref: "container",
        padding: 0.025,
        width: 1.8,
        height: 1,
        fontFamily: FontJSON,
        fontTexture: FontImage,
        fontColor: new THREE.Color(0xffffff),
        backgroundOpacity: 0.5,
        backgroundColor: new THREE.Color(0xcecece),
        borderRadius: 0.025,
        contentDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    });

    container.position.set(-0.45, 0.85, -1.8);
    container.rotation.x = -0.55;
    container.scale.setScalar(0.75)
    scene.add(container);

    //

    const child1 = new ThreeMeshUI.Block({
        height: 0.2,
        width: 0.5,
        margin: 0.025,
        justifyContent: "center",
        backgroundColor: new THREE.Color(0xff9900),
        fontSize: 0.09,
    });

    child1.add(
        new ThreeMeshUI.Text({
            content: "B1",
        })
    );

    container.add(child1);

    const child2 = new ThreeMeshUI.Block({
        height: 0.2,
        width: 0.5,
        margin: 0.025,
        backgroundColor: new THREE.Color(0x00ff99),
        justifyContent: "center",
        fontSize: 0.09,
    });

    child2.add(
        new ThreeMeshUI.Text({
            content: "B2",
        })
    );

    container.add(child2);

    const child3 = new ThreeMeshUI.Block({
        height: 0.2,
        width: 0.5,
        margin: 0.025,
        backgroundColor: new THREE.Color(0x0099ff),
        justifyContent: "center",
        fontSize: 0.09,
    });

    child3.add(
        new ThreeMeshUI.Text({
            content: "B3",
        })
    );

    container.add(child3);

}

function makeContentDirectionUI() {
    const uiContainer = new ThreeMeshUI.Block({
        ref: "container",
        padding: 0.025,
        fontFamily: FontJSON,
        fontTexture: FontImage,
        fontColor: new THREE.Color(0xffffff),
        backgroundOpacity: 0,
        borderRadius: 0.025,
        contentDirection: 'column',
        justifyContent: 'start',
        alignContent: 'left',
        width: 3
    });

    uiContainer.position.set(0, 1.5, -2);
    uiContainer.scale.setScalar(0.75);
    scene.add(uiContainer);

    const label = new ThreeMeshUI.Block({
        width: 1.5,
        height: 0.12,
        contentDirection: 'row',
        alignContent: 'left',
        justifyContent: 'center',
        fontSize: 0.075,
        backgroundOpacity: 0
    });
    label.add(new ThreeMeshUI.Text({content: 'contentDirection:'}));
    uiContainer.add(label);

    const radioButtonsContainer = new ThreeMeshUI.Block({
        width: 3,
        height: 0.18,
        contentDirection: 'row',
        justifyContent: 'center',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    uiContainer.add(radioButtonsContainer);

    // Button has default settings to fasten its uses
    const defaultButtonA = new RadioButton({label: "row", value: "row", group: "contentDirection"});
    const defaultButtonB = new RadioButton({label: "row-reverse", value: "row-reverse", group: "contentDirection"});
    const defaultButtonC = new RadioButton({label: "column", value: "column", group: "contentDirection", selected:true});
    const defaultButtonD = new RadioButton({
        label: "column-reverse",
        value: "column-reverse",
        group: "contentDirection"
    });
    radioButtonsContainer.add(defaultButtonA, defaultButtonB, defaultButtonC, defaultButtonD);


    uiRaycaster.addObject(defaultButtonA, defaultButtonB, defaultButtonC, defaultButtonD);

    function onRadioChanged(evt) {
        container.set({[evt.target.name]: evt.target.selectedOption.value});
        updateAvailableAlignments();
    }

    defaultButtonA.group.addEventListener('change', onRadioChanged);
}

function makeJustifyContentUI() {
    const uiContainer = new ThreeMeshUI.Block({
        ref: "container",
        padding: 0.025,
        fontFamily: FontJSON,
        fontTexture: FontImage,
        fontColor: new THREE.Color(0xffffff),
        backgroundOpacity: 0,
        borderRadius: 0.025,
        contentDirection: 'column',
        justifyContent: 'start',
        alignContent: 'left',
        width: 0.75
    });

    uiContainer.scale.setScalar(0.75);
    uiContainer.position.set(0.525, 1.10, -1.95);
    uiContainer.rotation.x = -0.55;
    scene.add(uiContainer);

    const label = new ThreeMeshUI.Block({
        width: 0.75,
        height: 0.12,
        contentDirection: 'row',
        alignContent: 'left',
        justifyContent: 'center',
        fontSize: 0.075,
        backgroundOpacity: 0
    });
    label.add(new ThreeMeshUI.Text({content: 'justifyContent:'}));
    uiContainer.add(label);

    const radioButtonsContainer = new ThreeMeshUI.Block({
        width: 0.75,
        // height: 0.18,
        contentDirection: 'column',
        justifyContent: 'start',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    uiContainer.add(radioButtonsContainer);

    // Button has default settings to fasten its uses
    const defaultButtonA = new RadioButton({label: "start", value: "start", group: "justifyContent"});
    const defaultButtonB = new RadioButton({label: "center", value: "center", group: "justifyContent", selected:true});
    const defaultButtonC = new RadioButton({label: "end", value: "end", group: "justifyContent"});
    radioButtonsContainer.add(defaultButtonA, defaultButtonB, defaultButtonC);


    uiRaycaster.addObject(defaultButtonA, defaultButtonB, defaultButtonC);

    function onRadioChanged(evt) {
        container.set({[evt.target.name]: evt.target.selectedOption.value});
    }

    defaultButtonA.group.addEventListener('change', onRadioChanged);
}

function makeAlignContentUI() {
    const uiContainer = new ThreeMeshUI.Block({
        ref: "container",
        padding: 0.025,
        fontFamily: FontJSON,
        fontTexture: FontImage,
        fontColor: new THREE.Color(0xffffff),
        backgroundOpacity: 0,
        borderRadius: 0.025,
        contentDirection: 'column',
        justifyContent: 'start',
        alignContent: 'left',
        width: 0.75
    });

    uiContainer.scale.setScalar(0.75);
    uiContainer.position.set(1.1, 0.85, -1.75);
    uiContainer.rotation.x = -0.55;
    scene.add(uiContainer);

    const label = new ThreeMeshUI.Block({
        width: 0.75,
        height: 0.12,
        contentDirection: 'row',
        alignContent: 'left',
        justifyContent: 'center',
        fontSize: 0.075,
        backgroundOpacity: 0
    });
    label.add(new ThreeMeshUI.Text({content: 'alignContent:'}));
    uiContainer.add(label);

    const radioButtonsContainer = new ThreeMeshUI.Block({
        width: 0.75,
        // height: 0.18,
        contentDirection: 'column',
        justifyContent: 'start',
        borderRadius: 0.05,
        padding: 0.02,
        backgroundColor: new THREE.Color(0x000000)
    });
    uiContainer.add(radioButtonsContainer);

    // Button has default settings to fasten its uses
    const defaultButtonA = new RadioButton({label: "top", value: "top", group: "alignContent"});
    const defaultButtonB = new RadioButton({label: "bottom", value: "bottom", group: "alignContent"});
    const defaultButtonC = new RadioButton({label: "center", value: "center", group: "alignContent", selected:true});
    const defaultButtonD = new RadioButton({label: "left", value: "left", group: "alignContent"});
    const defaultButtonE = new RadioButton({label: "right", value: "right", group: "alignContent"});
    radioButtonsContainer.add(defaultButtonA, defaultButtonB, defaultButtonC, defaultButtonD, defaultButtonE);


    uiRaycaster.addObject(defaultButtonA, defaultButtonB, defaultButtonC, defaultButtonD, defaultButtonE);

    function onRadioChanged(evt) {
        container.set({[evt.target.name]: evt.target.selectedOption.value});
    }

    defaultButtonA.group.addEventListener('change', onRadioChanged);
}

function updateAvailableAlignments(){


    if( container.contentDirection.indexOf('column')===0){
        // disable proper options top + bottom
        const radios = RadioButton.getGroup('alignContent').buttons;
        for ( let i = 0; i < radios.length; i++ ) {
            if( radios[i].value === 'top' || radios[i].value === 'bottom'){
                radios[i].disabled = true;
                console.log( radios[i], radios[i].value , radios[i].disabled );
            }else{
                radios[i].disabled = false;
            }
        }
    }else{
        // disable other options right + left
        const radios = RadioButton.getGroup('alignContent').buttons;
        for ( let i = 0; i < radios.length; i++ ) {
            if( radios[i].value === 'right' || radios[i].value === 'left'){
                radios[i].disabled = true;
            }else{
                radios[i].disabled = false;
            }
        }
    }
}

//

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function loop() {
    // Don't forget, ThreeMeshUI must be updated manually.
    // This has been introduced in version 3.0.0 in order
    // to improve performance
    ThreeMeshUI.update();

    uiRaycaster.update();

    controls.update();
    renderer.render(scene, camera);
}
