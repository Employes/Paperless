import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Slider indicator',
	component: 'p-slider-indicator',
};

export default meta;

export const Default = {
	render: ({
		active,
	}) => html`<p-slider-indicator
		active=${active ?? nothing}
	/>`,
	tags: ['!dev'],
};