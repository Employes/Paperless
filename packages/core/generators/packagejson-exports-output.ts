import {
	BuildCtx,
	CompilerCtx,
	Config,
	OutputTargetCustom,
} from '@stencil/core/internal';

const PLUGIN_NAME = 'exports';

const generateExports = async (
	_config: Config,
	compilerCtx: CompilerCtx,
	buildCtx: BuildCtx
) => {
	const fs = compilerCtx.fs;
	const packageJson = fs.readFileSync('package.json');

	const data = JSON.parse(packageJson);
	const exports = data.exports;

	for (const key of Object.keys(exports)) {
		if (key.startsWith('./components/p-')) {
			delete exports[key];
		}
	}

	for (const component of buildCtx.components) {
		exports[`./components/${component.tagName}.js`] = {
			import: `./dist/components/${component.tagName}.js`,
			types: `./dist/components/${component.tagName}.d.ts`,
		};
	}

	data.exports = exports;

	fs.writeFile(
		'package.json',
		JSON.stringify(data, null, 4).replaceAll('    ', '\t')
	);
};

export const exportsOutputTarget = (): OutputTargetCustom => ({
	type: 'custom',
	name: PLUGIN_NAME,
	validate(config) {
		return config;
	},
	async generator(
		_config: Config,
		compilerCtx: CompilerCtx,
		buildCtx: BuildCtx
	) {
		const timespan = buildCtx.createTimeSpan(
			`generate ${PLUGIN_NAME} started`,
			true
		);

		await generateExports(_config, compilerCtx, buildCtx);

		timespan.finish(`generate ${PLUGIN_NAME} finished`);
	},
});
