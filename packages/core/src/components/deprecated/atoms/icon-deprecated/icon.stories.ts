import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Icon deprecated',
	component: 'p-icon-deprecated',
};

export default meta;

export const Default = {
	render: ({
		variant,
		size,
		rotate,
		flip,
	}) => html`<p-icon-deprecated
		variant=${variant ?? nothing}
		size=${size ?? nothing}
		rotate=${rotate ?? nothing}
		flip=${flip ?? nothing}
	/>`,
	tags: ['!dev'],
};