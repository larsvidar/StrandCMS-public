
//eslint-disable-next-line
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {

		//Rules
		'indent': [
			'off',
			'tab'
		],
		'linebreak-style': [
			'off',
			'windows'
		],
		'quotes': [
			'warn',
			'single',
			{'allowTemplateLiterals': true},
		],
		'semi': [
			'warn',
			'always',
			{'omitLastInOneLineBlock': true},
		],
		'prefer-const': 'warn',
		'no-extra-boolean-cast': 'off',

		//React rules
		'react/prop-types': 'off',
		'react/no-unescaped-entities': 'off',

		//Typescript-rules
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-extra-semi': 'warn',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/no-inferrable-types': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	}
};
