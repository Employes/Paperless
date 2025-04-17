import { html } from 'lit';

const meta = {
	title: 'Design System/Atoms/Navigation title',
	component: 'p-navigation-title',
	args: {
		content: 'Navigation title',
	},
	argTypes: {
		content: {
			type: {
				required: true,
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({ content }) =>
		html`<p-navigation-title>${content}</p-navigation-title>`,
	tags: ['!dev'],
};
