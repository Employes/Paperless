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
	render: () => html`
		<p-tab-container>
			<p-tab-item>Item 1</p-tab-item>
			<p-tab-item>Item 2</p-tab-item>
			<p-tab-item active>Item 3</p-tab-item>
			<p-tab-item>Item 4</p-tab-item>
			<p-tab-item>Item 5</p-tab-item>
		</p-tab-container>
	`,
};

export const WithoutScroll = {
	render: () => html`
		<p-tab-container enable-scroll=${false}>
			<p-dropdown>
				<p-tab-item slot="trigger">Item 1</p-tab-item>
				<div slot="items">
					<p-dropdown-menu-item>Item 1</p-dropdown-menu-item>
					<p-dropdown-menu-item>Item 2</p-dropdown-menu-item>
					<p-dropdown-menu-item>Item 3</p-dropdown-menu-item>
				</div>
			</p-dropdown>
			<p-tab-item>Item 2</p-tab-item>
			<p-tab-item active>Item 3</p-tab-item>
			<p-tab-item>Item 4</p-tab-item>
			<p-tab-item>Item 5</p-tab-item>
		</p-tab-container>
	`,
};
