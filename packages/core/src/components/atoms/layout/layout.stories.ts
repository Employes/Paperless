import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Layout',
	component: 'p-layout',
};

export default meta;

export const Default = {
	render: ({
		variant,
	}) => html`<p-layout
		variant=${variant ?? nothing}
	/>`,
	tags: ['!dev'],
};
