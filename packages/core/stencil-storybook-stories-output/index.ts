import {
	BuildCtx,
	CompilerCtx,
	ComponentCompilerMeta,
	Config,
	OutputTargetCustom,
} from '@stencil/core/internal';
import { basename, dirname, resolve } from 'path';
import { kebabToSpaces, titleCase } from '../src/utils/transformers';

const PLUGIN_NAME = 'stories';

export const STORIES_TEMPLATE = `const meta = {
	title: 'COMPONENT_TITLE',
	component: 'COMPONENT_TAG',
};

export default meta;

export const Default = {
	tags: ['!dev'],
};`;

export const MDX_TEMPLATE = `import { Meta, Title, Canvas, Markdown, Controls } from '@storybook/blocks';
import * as Stories from './COMPONENT_NAME.stories';
import Docs from './readme.md?raw';

<Meta of={Stories} />

<Title />

<Canvas
	of={Stories.Default}
	meta={Stories}
/>

<Controls of={Stories.Default} />

---

<br /><br />

<Markdown>{Docs}</Markdown>`;

const generateTitle = (dirPath: string) => {
	const baseDir = resolve(__dirname, '../src/components');
	const segments = dirPath.replace(`${baseDir}/`, '').split('/');

	const last = segments.pop();
	const name = kebabToSpaces(titleCase(last!));
	const categories = segments.map(cat => kebabToSpaces(titleCase(cat)));

	return `Design System/${categories.join('/')}/${name}`;
};

const generateStories = async (
	_config: Config,
	component: ComponentCompilerMeta,
	compilerCtx: CompilerCtx
) => {
	const fs = compilerCtx.fs;

	const filePath = component.sourceFilePath;
	const dirPath = dirname(filePath);
	const name = basename(filePath).replace('.component.tsx', '');

	const mdxPath = `${dirPath}/${name}.story.mdx`;
	const storiesPath = `${dirPath}/${name}.stories.ts`;

	const { exists: mdxExists } = await fs.stat(mdxPath);
	const { exists: storiesExists } = await fs.stat(storiesPath);

	const title = generateTitle(dirPath);

	const created: Array<'mdx' | 'stories'> = [];
	if (!mdxExists) {
		const mdx = MDX_TEMPLATE.replaceAll('COMPONENT_NAME', name);
		await fs.writeFile(mdxPath, mdx);
		created.push('mdx');
	}

	if (!storiesExists) {
		const stories = STORIES_TEMPLATE.replaceAll(
			'COMPONENT_TAG',
			component.tagName
		).replaceAll('COMPONENT_TITLE', title);

		await fs.writeFile(storiesPath, stories);
		created.push('mdx');
	}

	if (!created.length) {
		return;
	}

	_config.logger?.info(
		`Generated ${created.indexOf('mdx') >= 0 ? 'mdx' : ''}${
			created.indexOf('mdx') >= 0 && created.indexOf('stories') >= 0
				? ' & '
				: ''
		}${created.indexOf('stories') >= 0 ? 'stories' : ''} for ${
			component.tagName
		}`
	);
};

export const storiesOutputTarget = (): OutputTargetCustom => {
	return {
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

			const components = buildCtx.components;
			const promises = components.map(component =>
				generateStories(_config, component, compilerCtx)
			);

			await Promise.all(promises);

			timespan.finish(`generate ${PLUGIN_NAME} finished`);
		},
	};
};
