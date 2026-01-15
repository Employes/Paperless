import { html } from 'lit';

const meta = {
	title: 'Design System/Atoms/Modal/Footer',
	component: 'p-modal-footer',
	args: {
		content: 'ModalFooter',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content }) => html`<p-modal-footer>${content}</p-modal-footer>`,
};
