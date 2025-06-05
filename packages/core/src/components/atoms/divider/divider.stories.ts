import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Divider',
	component: 'p-divider',
	args: {
		content: 'Divider',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, variant, 'align-content': alignContent }) =>
		!!content.length
			? html`<p-divider
					variant=${variant ?? nothing}
					align-content=${alignContent ?? nothing}
			  >
					${content}
			  </p-divider>`
			: html`<p-divider variant=${variant ?? nothing} />`,
	tags: ['!dev'],
};
