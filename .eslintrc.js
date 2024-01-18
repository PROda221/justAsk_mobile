module.exports = {
	env: {
		browser: true,
		es2021: true,
		'react-native/react-native': true,
	},
	extends: [
		'xo',
		'plugin:react/recommended',
		'prettier',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'react-native',
		'prettier'
	],
	rules: {
		// Allow .js files to contain JSX code
		'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx', '.js', '.jsx']}],
		// Prevent eslint to complain about the "styles" variable being used before it was defined
		'no-use-before-define': ['error', {variables: false}],
		// ignore errors for the react-navigation package
		'react/prop-types': ['error', {ignore: ['navigation', 'navigation.navigate']}],
		// ignore errors for import directives
	},
};
