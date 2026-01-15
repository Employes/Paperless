import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Label',
	component: 'p-label',
	args: {
		content: 'Label',
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
		'icon-only': iconOnly,
		icon,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
		'keep-mobile-content': keepMobileContent,
	}) => html`
		<p-label
			variant=${variant ?? nothing}
			icon-only=${iconOnly ?? nothing}
			icon=${icon ?? nothing}
			icon-flip=${iconFlip ?? nothing}
			icon-rotate=${iconRotate ?? nothing}
			keep-mobile-content=${keepMobileContent ?? nothing}
		>
			${content}
		</p-label>
	`,
};
