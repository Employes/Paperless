import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Button group',
	component: 'p-button-group',
	args: {
		content: 'ButtonGroup',
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
		size,
	}) => html`<p-button-group
		size=${size ?? nothing}
	>
		${content}
	</p-button-group>`,
	tags: ['!dev'],
};