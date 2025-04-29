import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Segment/Container',
	component: 'p-segment-container',
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const Default = {
	render: () => html`<p-segment-container>
		<p-segment-item>Item 1</p-segment-item>
		<p-segment-item>Item 2</p-segment-item>
		<p-segment-item active>Item 3</p-segment-item>
		<p-segment-item>Item 4</p-segment-item>
		<p-segment-item>Item 5</p-segment-item>
	</p-segment-container>`,
	tags: ['!dev'],
};
