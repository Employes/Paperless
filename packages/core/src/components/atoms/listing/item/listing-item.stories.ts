import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Listing/Item',
	component: 'p-listing-item',
	args: {
		content: 'Listing item',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ icon, content }) =>
		html`<p-listing-item icon=${icon ?? nothing}>${content}</p-listing-item>`,
};
