import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Illustration',
	component: 'p-illustration-deprecated',
	args: {
		variant: 'departments',
	},
};

export default meta;

export const Default = {
	render: ({ variant }) =>
		html`<p-illustration-deprecated variant=${variant ?? nothing} />`,
};
