import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import Button from "three-mesh-ui/examples/interactive/Button";

export default class ToggleButton extends Button {

    constructor(toggleButtonOptions) {

        if( !toggleButtonOptions.states ) toggleButtonOptions.states = {};

        const selectedStateAttributes = toggleButtonOptions.states.selected || defaultSelectedState;

        super(toggleButtonOptions);

        this.setupState({state:"selected",attributes:selectedStateAttributes});

        this._selected = toggleButtonOptions.selected || false;

    }

    _initialiseCurrentState() {

        // init
        if( this._selected ){
            this.setState("selected", true)
        }else{
            this.setState("idle",true);
        }

        // disabled can still get priority over selected
        super._initialiseCurrentState();
    }

    get selected(){
        return this._selected;
    }

    set selected(value){
        this._selected = value;
        // this.setState( )
    }

    _changeState(state) {

        switch ( state ) {
            case "select":
                this._selected = !this._selected;
                // When selected, we should redefined styles/states
                // in order to merge selected with hover and select in order to combine states.
                // currently it is only showing when mouse out occurs
                break;

            case "default":
            case "idle":
                if( this._selected ){
                    state = 'selected';
                }
                break;

            default:
        }

        return state;
    }
}

const defaultSelectedState = {
    backgroundColor: new THREE.Color(0x00FF99),
    fontColor: new THREE.Color(0x222222)
};
