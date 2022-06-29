import * as THREE from "three";

export { THREE };

export type BlockOptions = {
	width: number;
	height: number;
	padding?: number;
	fontFamily?: string;
	fontTexture?: string;
	backgroundColor?: THREE.Color;
	backgroundOpacity?: number;
	borderRadius?:
		| number
		| [
				topLeft: number,
				topRight: number,
				bottomRight: number,
				bottomLeft: number
		  ];
	// @todo add missing properties
	[property: string]: any;
};

export declare class Block extends THREE.Object3D {
	constructor(options: BlockOptions);
}

export type TextOptions = {
	// @todo add missing properties
	[property: string]: any;
};

export declare class Text extends THREE.Object3D {
	constructor(options: TextOptions);
}

export type InlineBlockOptions = {
	// @todo add missing properties
	[property: string]: any;
};

export declare class InlineBlock extends THREE.Object3D {
	constructor(options: InlineBlockOptions);
}

export type KeyboardOptions = {
	// @todo add missing properties
	[property: string]: any;
};

export declare class Keyboard extends THREE.Object3D {
	constructor(options: KeyboardOptions);
}

export declare namespace FontLibrary {
	export function setFontFamily(): void;

	export function setFontTexture(): void;

	export function getFontOf(): void;

	// @todo fix type
	export function addFont(...args: any[]): any;
}

export declare function update(): void;

declare global {
	namespace JSX {
		interface IntrinsicElements {
			block: any;
			text: any;
		}
	}
}
