import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Status',
	component: 'p-status',
	args: {
		content: 'Status',
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
		icon,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
	}) => html`<p-status
		variant=${variant ?? nothing}
		icon=${icon ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
	>
		${content}
	</p-status>`,
	tags: ['!dev'],
};