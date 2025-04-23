import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Icon',
	component: 'p-icon',
};

export default meta;

export const Default = {
	render: ({
		variant,
		size,
		rotate,
		flip,
	}) => html`<p-icon
		variant=${variant ?? nothing}
		size=${size ?? nothing}
		rotate=${rotate ?? nothing}
		flip=${flip ?? nothing}
	/>`,
	tags: ['!dev'],
};