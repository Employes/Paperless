module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'header-max-length': [0, 'always'],
		'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
		'scope-case': [2, 'always', 'kebab-case'],
	},
};
