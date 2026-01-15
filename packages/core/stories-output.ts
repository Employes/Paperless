import { BuildCtx, OutputTargetCustom } from '@stencil/core/internal';

const PLUGIN_NAME = 'stories';

export const storiesOutputTarget = (): OutputTargetCustom => ({
	type: 'custom',
	name: PLUGIN_NAME,
	async generator(_config, compilerCtx, buildCtx: BuildCtx) {
		const readmeOutputTargets = outputTargets.filter(isOutputTargetDocsReadme);
		if (readmeOutputTargets.length === 0) {
			return;
		}

		const timespan = buildCtx.createTimeSpan(
			`generate ${PLUGIN_NAME} started`,
			true
		);
		const components = buildCtx.components;
		for (const component of components) {
			const filePath = component.sourceFilePath;
			const dirPath = normalizePath(dirname(filePath));

			console.log(component);
		}

		timespan.finish(`generate ${PLUGIN_NAME} finished`);
	},
});
