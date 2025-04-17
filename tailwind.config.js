const config = require('./packages/core/src/tailwind.config');

module.exports = {
	...config,
	content: [
		'./stories/**/*.{mdx,tsx}',
		'./packages/core/components/**/*.story.mdx',
		'./packages/core/components/**/*.stories.ts',
	],
};
