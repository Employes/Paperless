import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Counter',
	component: 'p-counter',
	args: {
		content: 'Counter',
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
		size,
	}) => html`<p-counter
		variant=${variant ?? nothing}
		size=${size ?? nothing}
	>
		${content}
	</p-counter>`,
	tags: ['!dev'],
};