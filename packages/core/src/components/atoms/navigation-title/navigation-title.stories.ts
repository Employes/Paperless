import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Navigation title',
	component: 'p-navigation-title',
	args: {
		content: 'NavigationTitle',
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
	}) => html`<p-navigation-title>${content}</p-navigation-title>`,
	tags: ['!dev'],
};