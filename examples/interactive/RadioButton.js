import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import ToggleButton from "three-mesh-ui/examples/interactive/ToggleButton";
import {EventDispatcher} from "three";


export default class RadioButton extends ToggleButton {

    static getGroup(name){
        return RadioButtonGroup.getGroup(name);
    }

    constructor(checkBoxOptions) {

        // Set default checkbox styles different from button
        // if( !checkBoxOptions.states ) checkBoxOptions.states = {};
        //
        // checkBoxOptions.states.hovered = checkBoxOptions.states.hovered || {backgroundOpacity:0};
        // checkBoxOptions.states.idle = checkBoxOptions.states.idle || {backgroundOpacity:0};
        // checkBoxOptions.states.select = checkBoxOptions.states.select || {backgroundOpacity:0};
        // checkBoxOptions.states.selected = checkBoxOptions.states.selected || {backgroundOpacity:0};


        super({labelElement: DefaultRadioButtonLabel, ...checkBoxOptions});


        this._selected = checkBoxOptions.selected || false;

        this._group = RadioButtonGroup.getGroup( checkBoxOptions.group );
        this._group.addRadio( this );

        if( this._selected ){
            this.label.setState("selected", true)
        }else{
            this.label.setState("idle",true);
        }
    }

    _initialiseCurrentState() {

    }

    get group(){
        return this._group;
    }

    get checked(){
        return this.selected;
    }

    set checked(v){
        this.selected = v;
    }

    set disabled(v){

        const wasSelected = this._selected;

        super.disabled = v;

        if( this._disabled )
        {
            this._selected = false;
        }

        if( this._disabled && wasSelected ){
            this._group.fallback();
        }
    }

    get disabled(){
        return super.disabled;
    }

    _changeState(state) {
        switch ( state ) {
            case "select":

                if( this._selected ){
                    return 'selected';
                }

                this._selected = true;

                if( this._selected ) {
                    this.label.setState('selected', true)
                }

                this.dispatchEvent({type: 'change'});

                break;

            default:
        }
        return state;
    }
}

class DefaultRadioButtonBox extends ThreeMeshUI.Block {
    constructor(options) {
        super({
            width: 0.055,
            height: 0.055,
            borderOpacity: 1,
            borderRadius: 0.0275,
            borderWidth: 0.005,
            alignContent: 'center',
            borderColor: new THREE.Color(0xFFFFFF),
            backgroundOpacity: 0,
            ...options
        })

        this.name = "defaultLabelBox";

        this.boxFill = new ThreeMeshUI.Block({
            width: 0.03,
            height: 0.03,
            margin: 0.0125,
            borderWidth: 0,
            borderRadius: 0.015,
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

        this.boxFill.setupState({
            state: "disabled", attributes: {
                backgroundOpacity: 0
            }
        })

        this.add(this.boxFill);

        this.setupState({state:"idle",attributes:defaultBoxState});
        this.setupState({state:"hovered",attributes:defaultBoxState});
        this.setupState({state:"select",attributes:defaultBoxState});
        this.setupState({state:"selected",attributes:defaultBoxState});
        this.setupState({state:"disabled",attributes:defaultBoxState});
    }
}

class DefaultRadioButtonLabel extends ThreeMeshUI.Block {
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

        this.box = new DefaultRadioButtonBox();
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
        this.label.setupState({state:"disabled",attributes: {}});

        this.labelBlock.add(this.label);

        this.labelBlock.setupState({state:"idle",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"hovered",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"select",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"selected",attributes:defaultLabelBlockState});
        this.labelBlock.setupState({state:"disabled",attributes:defaultLabelBlockState});


        this.add(this.labelBlock);

        this.setupState({state:"idle",attributes:defaultLabelState});
        this.setupState({state:"hovered",attributes:defaultLabelState});
        this.setupState({state:"select",attributes:defaultLabelState});
        this.setupState({state:"selected",attributes:defaultLabelState});
        this.setupState({state:"disabled",attributes:defaultLabelState});

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

const _groups = {};
class RadioButtonGroup extends EventDispatcher{

    static getGroup( name ){
        if( _groups[name] ){
            return _groups[name];
        }


        const group = new RadioButtonGroup(name);
        _groups[name] = group;

        return group;
    }

    constructor(name) {
        super();

        this._name = name;
        console.log("create group");

        this._selectedOption = null;
        this._buttons = [];
        this._eventHandler = this.selectRadio.bind(this);
    }

    addRadio( radio ){
        if( this._buttons.indexOf(radio) === -1 ){
            this._buttons.push( radio );
            radio.addEventListener('change', this._eventHandler );
        }
    }

    selectRadio(evt){

        const currentSelected = this._buttons.find( radio => radio.label.currentState === 'selected' && radio !== evt.target);

        if( currentSelected !== evt.target ){


            if( currentSelected ){
                currentSelected.selected = false;
                currentSelected.setState('idle',true);
                currentSelected.label.setState('idle',true);
            }

            this._selectedOption = evt.target;

            this.dispatchEvent({type:'change'});
        }
    }

    fallback(){
        requestAnimationFrame( ()=>{


            const firstAvailableOption = this._buttons.find( radio => !radio.disabled );


            console.log("sfallback should be", firstAvailableOption.value)
                this._selectedOption = firstAvailableOption;
                this._selectedOption.setState('selected', true);

                this.dispatchEvent({type:'change'});

        })
    }

    get name(){
        return this._name;
    }

    get selectedOption(){
        return this._selectedOption;
    }

    get buttons(){
        return this._buttons;
    }

}