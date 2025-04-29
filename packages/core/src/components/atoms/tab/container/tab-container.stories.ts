import { html } from 'lit';

const meta = {
	title: 'Design System/Atoms/Tab/Container',
	component: 'p-tab-container',
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const Default = {
	render: () => html`<p-tab-container>
		<p-tab-item>Item 1</p-tab-item>
		<p-tab-item>Item 2</p-tab-item>
		<p-tab-item active>Item 3</p-tab-item>
		<p-tab-item>Item 4</p-tab-item>
		<p-tab-item>Item 5</p-tab-item>
	</p-tab-container>`,
	tags: ['!dev'],
};
