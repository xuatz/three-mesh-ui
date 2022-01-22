import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import Button from "three-mesh-ui/examples/interactive/Button";

export default class CheckBox extends Button {

    constructor(checkBoxOptions) {

        // Set default checkbox styles different from button
        // if( !checkBoxOptions.states ) checkBoxOptions.states = {};
        //
        // checkBoxOptions.states.hovered = checkBoxOptions.states.hovered || {backgroundOpacity:0};
        // checkBoxOptions.states.idle = checkBoxOptions.states.idle || {backgroundOpacity:0};
        // checkBoxOptions.states.select = checkBoxOptions.states.select || {backgroundOpacity:0};
        // checkBoxOptions.states.selected = checkBoxOptions.states.selected || {backgroundOpacity:0};


        super({labelElement: DefaultLabelElement, ...checkBoxOptions});

        this._selected = checkBoxOptions.checked || false;

        if( this._selected ){
            console.log("selected")
            this.label.setState("selected", true)
        }else{
            this.label.setState("idle",true);
        }
    }

    get checked(){
        return this._selected;
    }

    setState(state) {

        if( state === this.currentState ) return

        switch ( state ) {
            case "select":
                this._selected = !this._selected;

                if( this._selected ){
                    this.label.setState('selected', true)
                }else{
                    this.label.setState('idle', true)
                }

                this.dispatchEvent({type: 'change'});

                break;

            default:
        }

        super.setState(state, false);
    }
}

class DefaultCheckBoxBox extends ThreeMeshUI.Block {
    constructor(options) {
        super({
            width: 0.055,
            height: 0.055,
            borderOpacity: 1,
            borderRadius: 0.01,
            borderWidth: 0.005,
            alignContent: 'center',
            borderColor: new THREE.Color(0xFFFFFF),
            backgroundOpacity: 0,
            ...options
        })

        this.name = "defaultLabelBox"

        this.boxFill = new ThreeMeshUI.Block({
            width: 0.03,
            height: 0.03,
            margin: 0.0125,
            borderWidth: 0,
            borderRadius: 0.008,
            backgroundOpacity: 1,
            backgroundColor: new THREE.Color(0x00FF99),
            offset: 0.001
        })
        this.boxFill.name = "defaultLabelBoxFill"

        this.boxFill.setupState({
            state: "select", attributes: {
                backgroundOpacity: 0
            }
        });

        this.boxFill.setupState({
            state: "selected", attributes: {
                backgroundOpacity: 1
            }
        });

        this.boxFill.setupState({
            state: "hovered", attributes: {
                backgroundOpacity: 0
            }
        });
        this.boxFill.setupState({
            state: "idle", attributes: {
                backgroundOpacity: 0
            }
        })

        this.add(this.boxFill);

        this.setupState({state:"idle",attributes:defaultBoxState});
        this.setupState({state:"hovered",attributes:defaultBoxState});
        this.setupState({state:"select",attributes:defaultBoxState});
        this.setupState({state:"selected",attributes:defaultBoxState});
    }
}

class DefaultLabelElement extends ThreeMeshUI.Block {
    constructor(options) {
        super({
            offset: 0,
            width: 0.65,
            height: 0.15,
            backgroundOpacity: 0,
            contentDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center'
        });

        this.name = "defaultLabelElement"

        this.box = new DefaultCheckBoxBox();
        this.add(this.box);


        // This can be simplified with TextBlock();
        this.labelBlock = new ThreeMeshUI.Block({
            width: 0.45,
            height: 0.06,
            contentDirection: 'column',
            alignContent: 'left',
            justifyContent: 'center',
            backgroundOpacity: 0,
            margin: 0.03,
            interLine: 0.001
        })
        this.labelBlock.name = 'labelBlock';
        this.label = new ThreeMeshUI.Text({content: options.content });

        this.label.setupState({state:"idle",attributes: {}});
        this.label.setupState({state:"hovered",attributes: {}});
        this.label.setupState({state:"select",attributes: {}});
        this.label.setupState({state:"selected",attributes: {}});

        this.labelBlock.add(this.label);

        this.labelBlock.setupState({state:"idle",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"hovered",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"select",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"selected",attributes:defaultLabelBlockState});


        this.add(this.labelBlock);

        this.setupState({state:"idle",attributes:defaultLabelState});
        this.setupState({state:"hovered",attributes:defaultLabelState});
        this.setupState({state:"select",attributes:defaultLabelState});
        this.setupState({state:"selected",attributes:defaultLabelState});

    }
}

const defaultBoxState = {
    alignContent: 'center',
    contentDirection: 'row',
}

const defaultLabelState = {
    contentDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
}

const defaultLabelBlockState = {
    contentDirection: 'column',
    alignContent: 'left',
    justifyContent: 'center',
}