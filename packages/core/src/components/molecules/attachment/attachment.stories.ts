import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Attachment',
	component: 'p-attachment',
};

export default meta;

export const Default = {
	render: ({
		value,
		mode,
		loading,
		label,
		helper,
		required,
		error,
		downloading,
	}) => html`<p-attachment
		mode=${mode ?? nothing}
		loading=${loading ?? nothing}
		error=${error ?? nothing}
		value=${value ?? nothing}
		label=${label ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		downloading=${downloading ?? nothing}
		@download=${action('download')}
		@delete=${action('delete')}
	>
	</p-attachment>`,
	tags: ['!dev'],
};
