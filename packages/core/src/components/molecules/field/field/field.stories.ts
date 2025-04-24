import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Field/Field',
	component: 'p-field',
	args: {
		label: 'Label',
	},
};

export default meta;

export const Default = {
	render: ({
		variant,
		size,
		type,
		properties,
		prefix,
		suffix,
		icon,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
		'icon-position': iconPosition,
		value,
		label,
		loading,
		placeholder,
		helper,
		required,
		autofocus,
		error,
		'error-placement': errorPlacement,
		disabled,
		focused,
		'force-show-tooltip': forceShowTooltip,
		'select-all-on-focus': selectAllOnFocus,
		'focus-method': focusMethod,
		'optional-template': optionalTemplate,
	}) => html`<p-field
		variant=${variant ?? nothing}
		size=${size ?? nothing}
		type=${type ?? nothing}
		properties=${properties ?? nothing}
		prefix=${prefix ?? nothing}
		suffix=${suffix ?? nothing}
		icon=${icon ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
		icon-position=${iconPosition ?? nothing}
		value=${value ?? nothing}
		label=${label ?? nothing}
		loading=${loading ?? nothing}
		placeholder=${placeholder ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		autofocus=${autofocus ?? nothing}
		error=${error ?? nothing}
		error-placement=${errorPlacement ?? nothing}
		disabled=${disabled ?? nothing}
		focused=${focused ?? nothing}
		force-show-tooltip=${forceShowTooltip ?? nothing}
		select-all-on-focus=${selectAllOnFocus ?? nothing}
		focus-method=${focusMethod ?? nothing}
		optional-template=${optionalTemplate ?? nothing}
		@valueChange=${action('valueChange')}
		@inputRefChange=${action('inputRefChange')}
	/>`,
	tags: ['!dev'],
};
