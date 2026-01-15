import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Segment/Item',
	component: 'p-segment-item',
	args: {
		content: 'SegmentItem',
		blockTitle: 'Title',
		blockDescription: 'Description',
	},
	argTypes: {
		content: {
			type: 'string',
		},
		blockTitle: {
			type: 'string',
		},
		blockDescription: {
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
		blockTitle,
		blockDescription,
	}) => html`
		<p-segment-item
			variant=${variant ?? nothing}
			active=${active ?? nothing}
			icon-only=${iconOnly ?? nothing}
			icon=${icon ?? nothing}
			icon-flip=${iconFlip ?? nothing}
			icon-rotate=${iconRotate ?? nothing}
		>
			${content}
			${variant === 'block'
				? html`
					<span slot="title">${blockTitle}</span>
					<span slot="description">${blockDescription}</span>
				`
				: nothing}
		</p-segment-item>
	`,
};
