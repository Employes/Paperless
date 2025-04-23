import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Divider',
	component: 'p-divider',
	args: {
		content: 'Divider',
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
	}) => html`<p-divider
		variant=${variant ?? nothing}
	>
		${content}
	</p-divider>`,
	tags: ['!dev'],
};