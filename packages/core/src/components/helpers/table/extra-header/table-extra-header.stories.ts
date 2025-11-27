import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Helpers/Table/Extra Header',
	component: 'p-table-extra-header',
};

export default meta;

export const Default = {
	render: ({
		name,
		align,
		'parsed-sizes': parsedSizes,
		sizes,
	}) => html`<p-table-column
		name=${name ?? nothing}
		align=${align ?? nothing}
		parsed-sizes=${parsedSizes ?? nothing}
		sizes=${sizes ?? nothing}
		@tableDefinitionChanged=${action('tableDefinitionChanged')}
	/>`,
};
