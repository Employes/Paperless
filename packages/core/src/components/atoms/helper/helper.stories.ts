import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Helper',
	component: 'p-helper',
	args: {
		content: 'Helper',
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
		strategy,
		placement,
	}) => html`<p-helper
		strategy=${strategy ?? nothing}
		placement=${placement ?? nothing}
	>
		${content}
	</p-helper>`,
	tags: ['!dev'],
};