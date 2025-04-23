import { html } from 'lit';

const meta = {
	title: 'Design System/Atoms/Badge',
	component: 'p-badge',
	args: {
		content: '10',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content }) => html`<p-badge>${content}</p-badge>`,
	tags: ['!dev'],
};
