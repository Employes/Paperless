import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Floating menu/Item',
	component: 'p-floating-menu-item',
	args: {
		content: 'FloatingMenuItem',
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
		hover,
		disabled,
		loading,
		icon,
		'icon-position': iconPosition,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
	}) => html`<p-floating-menu-item
		hover=${hover ?? nothing}
		disabled=${disabled ?? nothing}
		loading=${loading ?? nothing}
		icon=${icon ?? nothing}
		icon-position=${iconPosition ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
	>
		${content}
	</p-floating-menu-item>`,
};
