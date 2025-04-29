import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Tab/Item',
	component: 'p-tab-item',
	args: {
		content: 'TabItem',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const Default = {
	render: ({ content, active }) => html`<p-tab-item active=${active ?? nothing}>
		${content}
	</p-tab-item>`,
	tags: ['!dev'],
};
