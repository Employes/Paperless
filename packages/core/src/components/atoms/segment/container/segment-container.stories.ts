import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Segment/Container',
	component: 'p-segment-container',
	args: {
		content: 'SegmentContainer',
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
	}) => html`<p-segment-container>${content}</p-segment-container>`,
	tags: ['!dev'],
};