import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Deprecated/Molecules/Cropper',
	component: 'p-cropper',
};

export default meta;

export const Default = {
	render: ({
		variant,
		value,
		'return-type': returnType,
	}) => html`<p-cropper
		variant=${variant ?? nothing}
		value=${value ?? nothing}
		return-type=${returnType ?? nothing}
		@valueChange=${action('valueChange')}
	/>`,
	tags: ['!dev'],
};