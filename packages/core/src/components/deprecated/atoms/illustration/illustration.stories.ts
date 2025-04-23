import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Illustration',
	component: 'p-illustration',
};

export default meta;

export const Default = {
	render: ({
		variant,
	}) => html`<p-illustration
		variant=${variant ?? nothing}
	/>`,
	tags: ['!dev'],
};