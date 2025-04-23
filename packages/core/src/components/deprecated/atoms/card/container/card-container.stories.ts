import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Card/Container',
	component: 'p-card-container',
	args: {
		content: 'CardContainer',
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
		hoverable,
		shadow,
	}) => html`<p-card-container
		hoverable=${hoverable ?? nothing}
		shadow=${shadow ?? nothing}
	>
		${content}
	</p-card-container>`,
	tags: ['!dev'],
};