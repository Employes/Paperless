import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Range',
	component: 'p-range',
};

export default meta;

export const Default = {
	render: ({
		min,
		max,
		step,
		value,
	}) => html`<p-range
		min=${min ?? nothing}
		max=${max ?? nothing}
		step=${step ?? nothing}
		value=${value ?? nothing}
		@valueChange=${action('valueChange')}
	/>`,
	tags: ['!dev'],
};