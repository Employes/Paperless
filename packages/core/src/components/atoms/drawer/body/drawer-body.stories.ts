import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Drawer/Body',
	component: 'p-drawer-body',
	args: {
		content: 'ModalBody',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, variant }) => html`
		<p-drawer-body variant=${variant ?? nothing}> ${content} </p-drawer-body>
	`,
};
