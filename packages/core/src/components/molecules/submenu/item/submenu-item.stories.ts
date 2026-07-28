import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Submenu/Item',
	component: 'p-submenu-item',
	args: {
		content: "Item",
		icon: "placeholder"
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ active, content, icon }) =>
			html`
				<p-submenu-item active=${active ?? nothing} icon=${icon ?? 'placeholder'}>${content}</p-submenu-item>
			`
};
