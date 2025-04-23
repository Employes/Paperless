import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Segment/Item',
	component: 'p-segment-item',
	args: {
		content: 'SegmentItem',
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
		active,
		'icon-only': iconOnly,
		icon,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
	}) => html`<p-segment-item
		variant=${variant ?? nothing}
		active=${active ?? nothing}
		icon-only=${iconOnly ?? nothing}
		icon=${icon ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
	>
		${content}
	</p-segment-item>`,
	tags: ['!dev'],
};