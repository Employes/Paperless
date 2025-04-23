import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Pagination/Size',
	component: 'p-pagination-size',
};

export default meta;

export const Default = {
	render: ({
		size,
		'size-options': sizeOptions,
		'item-template': itemTemplate,
		hidden,
	}) => html`<p-pagination-size
		size=${size ?? nothing}
		size-options=${sizeOptions ?? nothing}
		item-template=${itemTemplate ?? nothing}
		hidden=${hidden ?? nothing}
		@sizeChange=${action('sizeChange')}
	/>`,
	tags: ['!dev'],
};