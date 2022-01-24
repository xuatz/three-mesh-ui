const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// data in format [ JS file name => demo title in examples page ]
let pages = [
	['tut_basic_setup', 'basic setup'],
	['tut_preloaded_font', 'preloaded font'],
	['tut_nested_blocks', 'nested blocks'],
	['feat_border', 'block borders'],
	['tut_tutorial_result', 'tutorial result'],
	['ex_interactive_button', 'interactive button'],
	['ex_interactive_components', 'interactive components'],
	['feat_msdf_text', 'big text'],
	['feat_background_size', 'backgroundSize'],
	['feat_inline_block', 'InlineBlock'],
	['feat_hidden_overflow', 'hiddenOverflow'],
	['feat_onafterupdate', 'onAfterUpdate'],
	['feat_manual_positioning', 'manual content positioning'],
	['feat_keyboard', 'keyboard'],
	['feat_letter_spacing', 'letter spacing'],
	['feat_font_kerning', 'font kerning'],
    ['feat_best_fit', 'best fit'],
	['feat_antialiasing', 'antialiasing'],
	['feat_flex_layout', 'Flex layout'],
    ['dev_whitespace', 'whitespace']
];

// create one config for each of the data set above
pagesConfig = pages.map( (page)=> {
	return new HtmlWebpackPlugin({
		title: page[0],
		filename: page[0] + '.html',
		template: path.resolve(__dirname, `../examples/html/example_template.html`),
		chunks: [page[0], 'three-mesh-ui'],
		inject: true
	});
});

function pageReducer(accu, page){
    return accu + `<li title="${ page[0] }">${ page[1] }</li>`
}

// just add one config for the index page
const indexConfig = new HtmlWebpackPlugin({
    pages: {
        examples:pages.filter(x=>x[0].indexOf("ex_")===0).reduce(pageReducer,''),
        features:pages.filter(x=>x[0].indexOf("feat_")===0).reduce(pageReducer,''),
        tutorials:pages.filter(x=>x[0].indexOf("tut_")===0).reduce(pageReducer,''),
        dev:pages.filter(x=>x[0].indexOf("dev_")===0).reduce(pageReducer,'')
    },
    environment: {
        production: false,
    },
    filename: 'index.html',
    template: path.resolve(__dirname, `../examples/html/index.html`),
    inject: false
});
pagesConfig.push( indexConfig );

module.exports = env => {

	let mode = "development";
	let devtool = 'eval-source-map';

	// Prod environment
	if (env.NODE_ENV === 'prod') {
		devtool = false;
		mode = 'production';
        indexConfig.options.environment.production = true;
	};

	return {

		mode: mode,

		entry: {
			'../dist/three-mesh-ui': './src/three-mesh-ui.js',
			tut_basic_setup: './examples/basic_setup.js',
			tut_preloaded_font: './examples/preloaded_font.js',
			tut_nested_blocks: './examples/nested_blocks.js',
            tut_tutorial_result: './examples/tutorial_result.js',
            ex_interactive_button: './examples/interactive_button.js',
            ex_interactive_components: './examples/interactive_components.js',
            feat_border: './examples/border.js',
			feat_msdf_text: './examples/msdf_text.js',
			feat_background_size: './examples/background_size.js',
			feat_inline_block: './examples/inline_block.js',
			feat_hidden_overflow: './examples/hidden_overflow.js',
			feat_onafterupdate: './examples/onafterupdate.js',
			feat_manual_positioning: './examples/manual_positioning.js',
			feat_keyboard: './examples/keyboard.js',
			feat_letter_spacing: './examples/letter_spacing.js',
			feat_font_kerning: './examples/font_kerning.js',
            feat_best_fit: './examples/best_fit.js',
			feat_antialiasing: './examples/antialiasing.js',
			feat_flex_layout: './examples/feat_flex_layout.js',
            dev_whitespace : './examples/dev_whitespace.js'
		},

		plugins: pagesConfig,

		devtool: devtool,

		devServer: {
			contentBase: false
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../dist')
		},

        resolve: {
            alias: {
                // add an alias of three-mesh-ui itself in order to make examples more real-case scenario and avoiding ../src/three-mesh-ui;
                "three-mesh-ui/examples": path.resolve(__dirname, '../examples/'),
                "three-mesh-ui": path.resolve(__dirname, '../src/three-mesh-ui.js'),
            },
        },

		module: {

			rules: [

				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader',
					],
				},

			],

		}

	}

}