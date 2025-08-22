import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Illustration',
	component: 'p-illustration',
	args: {
		variant: 'calculator',
	},
};

export default meta;

export const Default = {
	render: ({ variant }) => html`<p-illustration
		variant=${variant ?? nothing}
	/>`,
};
