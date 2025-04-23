import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Molecules/Input/Group',
	component: 'p-input-group',
};

export default meta;

export const Default = {
	render: ({
		size,
		prefix,
		suffix,
		icon,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
		'icon-position': iconPosition,
		label,
		helper,
		required,
		error,
		disabled,
		focused,
		'force-show-tooltip': forceShowTooltip,
		'focus-method': focusMethod,
		'error-variant': errorVariant,
	}) => html`<p-input-group
		size=${size ?? nothing}
		prefix=${prefix ?? nothing}
		suffix=${suffix ?? nothing}
		icon=${icon ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
		icon-position=${iconPosition ?? nothing}
		label=${label ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		error=${error ?? nothing}
		disabled=${disabled ?? nothing}
		focused=${focused ?? nothing}
		force-show-tooltip=${forceShowTooltip ?? nothing}
		focus-method=${focusMethod ?? nothing}
		error-variant=${errorVariant ?? nothing}
	/>`,
	tags: ['!dev'],
};