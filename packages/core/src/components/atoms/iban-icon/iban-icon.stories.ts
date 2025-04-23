import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Iban icon',
	component: 'p-iban-icon',
};

export default meta;

export const Default = {
	render: ({
		iban,
		variant,
	}) => html`<p-iban-icon
		iban=${iban ?? nothing}
		variant=${variant ?? nothing}
	/>`,
	tags: ['!dev'],
};