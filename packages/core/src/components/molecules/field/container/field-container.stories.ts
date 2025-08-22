import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Field/Container',
	component: 'p-field-container',
	args: {
		label: 'Label',
		content: 'Content',
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
		label,
		loading,
		variant,
		helper,
		required,
		'show-optional': showOptional,
		error,
		content,
		align,
		'error-placement': errorPlacement,
		'force-show-tooltip': forceShowTooltip,
		'optional-template': optionalTemplate,
	}) => html`<p-field-container
		label=${label ?? nothing}
		loading=${loading ?? nothing}
		variant=${variant ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		error=${error ?? nothing}
		show-optional=${showOptional ?? nothing}
		align=${align ?? nothing}
		error-placement=${errorPlacement ?? nothing}
		force-show-tooltip=${forceShowTooltip ?? nothing}
		optional-template=${optionalTemplate ?? nothing}
		@focus=${action('focus')}
	>
		<div slot="content">${content ?? nothing}</div>
	</p-field-container>`,
};
