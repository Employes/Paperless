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
		'show-optional': showOptional,
		autofocus,
		error,
		'error-placement': errorPlacement,
		disabled,
		focused,
		'force-show-tooltip': forceShowTooltip,
		'select-all-on-focus': selectAllOnFocus,
		'focus-method': focusMethod,
		'optional-template': optionalTemplate,
		'show-add-on-empty': showAddOnEmpty,
		'add-text': addText,
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
		show-optional=${showOptional ?? nothing}
		autofocus=${autofocus ?? nothing}
		error=${error ?? nothing}
		error-placement=${errorPlacement ?? nothing}
		disabled=${disabled ?? nothing}
		focused=${focused ?? nothing}
		force-show-tooltip=${forceShowTooltip ?? nothing}
		select-all-on-focus=${selectAllOnFocus ?? nothing}
		focus-method=${focusMethod ?? nothing}
		optional-template=${optionalTemplate ?? nothing}
		show-add-on-empty=${showAddOnEmpty ?? nothing}
		add-text=${addText ?? nothing}
		@valueChange=${action('valueChange')}
		@inputRefChange=${action('inputRefChange')}
		@add=${action('add clicked')}
	/>`,
	tags: ['!dev'],
};

export const OverflowReadOnly = {
	render: ({
		size,
		type,
		properties,
		prefix,
		suffix,
		icon,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
		'icon-position': iconPosition,
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
		variant="read"
		size=${size ?? nothing}
		type=${type ?? nothing}
		properties=${properties ?? nothing}
		prefix=${prefix ?? nothing}
		suffix=${suffix ?? nothing}
		icon=${icon ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
		icon-position=${iconPosition ?? nothing}
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
	>
		<a
			slot="value"
			class="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-teal hover:text-teal-600 hover:underline"
			href="https://google.com"
		>
			This is a very very very very very very long text This is a very very very
			very very very long text This is a very very very very very very long text
			This is a very very very very very very long text This is a very very very
			very very very long text This is a very very very very very very long text
			This is a very very very very very very long t;ext
		</a>
	</p-field>`,
	tags: ['!dev'],
};

const withPreventDefault = handler => e => {
	e.preventDefault();
	handler(e);
};
export const InsideForm = {
	render: () =>
		html`<form @submit=${withPreventDefault(action('submit'))}>
			<p-field
				value="Test"
				@input=${action('valuechange')}
			>
			</p-field>
			<p-button type="submit">Submitt</p-button>
		</form> `,
	tags: ['!dev'],
};
