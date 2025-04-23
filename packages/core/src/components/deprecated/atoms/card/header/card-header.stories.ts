import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Card/Header',
	component: 'p-card-header',
};

export default meta;

export const Default = {
	render: ({
		header,
		arrow,
	}) => html`<p-card-header
		header=${header ?? nothing}
		arrow=${arrow ?? nothing}
	/>`,
	tags: ['!dev'],
};