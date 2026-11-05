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
		chevronPosition: {
			type: 'string',
			control: 'select',
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const Default = {
	render: ({ content, active, chevron, 'chevron-position': chevronPosition }) =>
		html`<p-tab-item active=${active ?? nothing} chevron=${chevron ?? nothing} chevron-position=${chevronPosition ?? nothing}> ${content} </p-tab-item>`,
};
