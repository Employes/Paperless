import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Accordion',
	component: 'p-accordion',
	args: {
		header: 'Accordion header',
		content: 'Accordion content!',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({
		content,
		variant,
		header,
		open,
		closeable,
		openable,
	}) => html`<p-accordion
		header=${header ?? nothing}
		variant=${variant ?? nothing}
		open=${open ?? nothing}
		closeable=${closeable ?? nothing}
		openable=${openable ?? nothing}
		@isOpen=${action('isOpen')}
	>
		${content}
	</p-accordion>`,
	tags: ['!dev'],
};
