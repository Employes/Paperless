const config = require('./packages/core/src/tailwind.config');

module.exports = {
	...config,
	content: [
		'./stories/**/*.{mdx,tsx}',
		'./packages/core/src/components/**/*.story.mdx',
		'./packages/core/src/components/**/*.stories.@(js|jsx|ts|tsx)',
	],
};
