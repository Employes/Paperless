import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Field/Container',
	component: 'p-field-container',
};

export default meta;

export const Default = {
	render: ({
		label,
		variant,
		helper,
		required,
		error,
		'error-placement': errorPlacement,
		'force-show-tooltip': forceShowTooltip,
		'optional-template': optionalTemplate,
	}) => html`<p-field-container
		label=${label ?? nothing}
		variant=${variant ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		error=${error ?? nothing}
		error-placement=${errorPlacement ?? nothing}
		force-show-tooltip=${forceShowTooltip ?? nothing}
		optional-template=${optionalTemplate ?? nothing}
		@focus=${action('focus')}
	/>`,
	tags: ['!dev'],
};