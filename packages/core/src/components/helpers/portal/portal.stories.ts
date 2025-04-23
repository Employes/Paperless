import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Helpers/Portal',
	component: 'p-portal',
	args: {
		content: 'Portal',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content }) => html`<p-portal>${content}</p-portal>`,
	tags: ['!dev'],
};
