import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Helpers/Table/Column',
	component: 'p-table-column',
};

export default meta;

export const Default = {
	render: ({
		path,
		type,
		name,
		'use-slot': useSlot,
		'has-checkbox': hasCheckbox,
		align,
		'is-last': isLast,
		'parsed-sizes': parsedSizes,
		sizes,
	}) => html`<p-table-column
		path=${path ?? nothing}
		type=${type ?? nothing}
		name=${name ?? nothing}
		use-slot=${useSlot ?? nothing}
		has-checkbox=${hasCheckbox ?? nothing}
		align=${align ?? nothing}
		is-last=${isLast ?? nothing}
		parsed-sizes=${parsedSizes ?? nothing}
		sizes=${sizes ?? nothing}
		@tableDefinitionChanged=${action('tableDefinitionChanged')}
	/>`,
	tags: ['!dev'],
};