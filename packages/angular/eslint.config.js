import base from '../../eslint.config.js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['./projects/paperless/src/lib/stencil/**/*']),
	...base,
]);
