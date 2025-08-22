import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Toast container',
	component: 'p-toast-container',
	args: {
		content: 'ToastContainer',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, placement }) => html`<p-toast-container
		placement=${placement ?? nothing}
	>
		${content}
	</p-toast-container>`,
};
