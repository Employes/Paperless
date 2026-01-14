// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const conventions = require('@paperless/conventions/prettier');

module.exports = Object.assign(conventions, {
	tailwindConfig: './tailwind.config.ts',
});
