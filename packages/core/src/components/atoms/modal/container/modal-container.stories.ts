import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Modal/Container',
	component: 'p-modal-container',
	args: {
		content: 'ModalContainer',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, size, closing }) => html`
		<p-modal-container
			size=${size ?? nothing}
			closing=${closing ?? nothing}
		>
			${content}
		</p-modal-container>
	`,
};
