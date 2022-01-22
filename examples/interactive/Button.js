import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";

export default class Button extends ThreeMeshUI.Block {

    constructor(buttonOptions) {

        if (!buttonOptions.states) buttonOptions.states = {};

        const hoveredStateAttributes = buttonOptions.states.hovered || defaultHoverState;
        const idleStateAttributes = buttonOptions.states.idle || defaultIdleState;
        const selectStateAttributes = buttonOptions.states.selected || defaultSelectState ;

        // extract block options
        const blockOptions = {};
        for (const option in buttonOptions) {
            if (['states', 'content'].indexOf(option) === -1) {
                blockOptions[option] = buttonOptions[option];
            }
        }

        super({...defaultButtonOptions, ...blockOptions});

        this.setupState({state:"idle",attributes:{...idleStateAttributes}});
        this.setupState({state:"hovered",attributes:{...hoveredStateAttributes}});
        this.setupState({state:"selected",attributes:{...selectStateAttributes}});

        this.label = new ThreeMeshUI.Text({content: buttonOptions.label || ""});
        this.add(this.label);

    }


    setState(state){

        if ( state === this.currentState ) return

        switch ( state ){
            case "selected":
                this.dispatchEvent({ type: 'click' });
                break;

            default:
        }

        super.setState(state);
    }
}

// Defaults
// Default states based on interactive_button

const defaultButtonOptions = {
    width: 0.65,
    height: 0.15,
    justifyContent: 'center',
    alignContent: 'center',
    offset: 0.02,
    margin: 0.02,
    borderRadius: 0.075
};

const defaultHoverState = {
    offset: 0.02,
    backgroundColor: new THREE.Color(0x999999),
    backgroundOpacity: 1,
    fontColor: new THREE.Color(0xffffff)
};

const defaultIdleState = {
    offset: 0.02,
    backgroundColor: new THREE.Color(0x666666),
    backgroundOpacity: 0.3,
    fontColor: new THREE.Color(0xffffff)
};

const defaultSelectState = {
    offset: 0.01,
    backgroundColor: new THREE.Color(0x777777),
    fontColor: new THREE.Color(0x222222)
};