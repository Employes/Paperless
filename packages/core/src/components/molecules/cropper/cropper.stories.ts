import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Cropper',
	component: 'p-cropper',
	args: {
		value:
			'https://images.unsplash.com/photo-1576014662151-46d23666bc28?auto=format&fit=crop&crop=faces&w=300&h=150&q=80',
		'return-type': 'base64',
	},
};

export default meta;

export const Default = {
	render: ({ variant, value, 'return-type': returnType }) => html`<p-cropper
		variant=${variant ?? nothing}
		value=${value ?? nothing}
		return-type=${returnType ?? nothing}
		@valueChange=${action('valueChange')}
	/>`,
	tags: ['!dev'],
};
