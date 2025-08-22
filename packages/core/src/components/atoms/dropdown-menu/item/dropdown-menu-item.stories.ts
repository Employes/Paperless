import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Dropdown menu/Item',
	component: 'p-dropdown-menu-item',
	args: {
		content: 'DropdownMenuItem',
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
		active,
		checkbox,
		variant,
		'enable-hover': enableHover,
		'enable-text-wrap': enableTextWrap,
		disabled,
		icon,
		'icon-wave': iconWave,
		'use-container': useContainer,
	}) => html`<p-dropdown-menu-item
		active=${active ?? nothing}
		checkbox=${checkbox ?? nothing}
		variant=${variant ?? nothing}
		enable-hover=${enableHover ?? nothing}
		enable-text-wrap=${enableTextWrap ?? nothing}
		disabled=${disabled ?? nothing}
		icon=${icon ?? nothing}
		icon-wave=${iconWave ?? nothing}
		use-container=${useContainer ?? nothing}
	>
		${content}
	</p-dropdown-menu-item>`,
};
