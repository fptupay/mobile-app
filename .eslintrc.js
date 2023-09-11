module.exports = {
	'env': {
		'es2021': true,
		'node': true,
		'jest': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
    	'plugin:@typescript-eslint/recommended',
    	'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'project': './tsconfig.json'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'react/jsx-uses-react': 'off',
		"react/react-in-jsx-scope": "off",
		'@typescript-eslint/no-explicit-any': "off",
		'@typescript-eslint/no-unsafe-assignment': "off",
		'@typescript-eslint/no-unsafe-call': "off",
		'@typescript-eslint/no-unsafe-member-access': "off",
		'@typescript-eslint/no-misused-promises': "off",
		'@typescript-eslint/no-unsafe-argument': "off",
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
