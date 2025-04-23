import {
	BuildCtx,
	CompilerCtx,
	ComponentCompilerEvent,
	ComponentCompilerMeta,
	ComponentCompilerProperty,
	Config,
	OutputTargetCustom,
} from '@stencil/core/internal';
import { basename, dirname, resolve } from 'path';
import { kebabToSpaces, titleCase } from '../src/utils/transformers';

const PLUGIN_NAME = 'stories';

export const STORIES_TEMPLATE = `import { html, nothing } from 'lit';
COMPONENT_IMPORTS
const meta = {
	title: 'COMPONENT_TITLE',
	component: 'COMPONENT_TAG',
COMPONENT_META_CLOSING

export default meta;

export const Default = {
	render: (COMPONENT_PROPERTIES_OBJ) => html\`<COMPONENT_TAGCOMPONENT_PROPERTIESCOMPONENT_SUFFIX\`,
	tags: ['!dev'],
};`;

export const MDX_TEMPLATE = `import { Meta, Title, Canvas, Markdown, Controls } from '@storybook/blocks';
import { IntendedUsage } from '@doc-blocks/intended-usage';
import * as Stories from './COMPONENT_NAME.stories';

<Meta of={Stories} />

<Title />

<Canvas
	of={Stories.Default}
	meta={Stories}
/>

<Controls of={Stories.Default} />

## Intended usage

<IntendedUsage
	sectionTitle="Do's"
	icon='✅'
>
	<ul>
		<li>Do</li>
	</ul>
</IntendedUsage>
<IntendedUsage
	sectionTitle="Dont's"
	icon='❌'
>
	<ul>
		<li>Don't</li>
	</ul>
</IntendedUsage>`;

const isEvent = (
	prop: ComponentCompilerEvent | ComponentCompilerProperty
): prop is ComponentCompilerEvent => 'method' in prop;

const getActualName = (
	prop: ComponentCompilerEvent | ComponentCompilerProperty
) => {
	const overrides = {
		class: 'className',
		delete: 'deleteFn',
		export: 'exportFn',
	};

	if (overrides[prop.name]) {
		return {
			...prop,
			actualName: overrides[prop.name],
		};
	}

	return {
		...prop,
		actualName: prop.name,
	};
};

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
		let COMPONENT_META_CLOSING = '};';
		let hasSlot = false;

		if (component.htmlTagNames.includes('slot')) {
			const sourceContent = await fs.readFile(component.sourceFilePath);
			hasSlot = sourceContent.includes('<slot />');
		}

		let properties = component.properties
			.map(prop => getActualName(prop))
			.map(prop =>
				!isEvent(prop) && prop.attribute !== prop.actualName
					? `'${prop.attribute}': ${prop.actualName}`
					: prop.name
			);
		if (hasSlot) {
			properties = ['content', ...properties];
		}

		const COMPONENT_PROPERTIES_OBJ = [...properties].join(`,\n\t\t`);
		const COMPONENT_PROPERTIES = [...component.properties, ...component.events]
			.map(prop => getActualName(prop))
			.map(
				prop =>
					`${isEvent(prop) ? `@${prop.name}` : prop.attribute}=\${${
						isEvent(prop)
							? `action('${prop.name}')`
							: `${prop.actualName} ?? nothing`
					}}`
			)
			.join(`\n\t\t`);

		let COMPONENT_SUFFIX = COMPONENT_PROPERTIES?.length ? '/>' : ' />';
		if (hasSlot) {
			COMPONENT_SUFFIX = `>${
				COMPONENT_PROPERTIES?.length ? `\n\t\t` : ''
			}\${content}${COMPONENT_PROPERTIES?.length ? `\n\t` : ''}</${
				component.tagName
			}>`;
			COMPONENT_META_CLOSING = `	args: {
		content: '${component.componentClassName}',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};`;
		}

		const COMPONENT_IMPORTS = component.events.length
			? `import { action } from '@storybook/addon-actions';\n`
			: '';

		const stories = STORIES_TEMPLATE.replaceAll(
			'COMPONENT_TAG',
			component.tagName
		)
			.replaceAll('COMPONENT_IMPORTS', COMPONENT_IMPORTS)
			.replaceAll('COMPONENT_TITLE', title)
			.replaceAll('COMPONENT_META_CLOSING', COMPONENT_META_CLOSING)
			.replaceAll(
				'COMPONENT_PROPERTIES_OBJ',
				COMPONENT_PROPERTIES_OBJ?.length
					? `{\n\t\t${COMPONENT_PROPERTIES_OBJ},\n\t}`
					: ''
			)
			.replaceAll(
				'COMPONENT_PROPERTIES',
				COMPONENT_PROPERTIES?.length ? `\n\t\t${COMPONENT_PROPERTIES}\n\t` : ''
			)
			.replaceAll('COMPONENT_SUFFIX', COMPONENT_SUFFIX);

		await fs.writeFile(storiesPath, stories);
		created.push('stories');
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
