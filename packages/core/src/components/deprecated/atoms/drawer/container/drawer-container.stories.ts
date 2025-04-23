import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Drawer/Container',
	component: 'p-drawer-container',
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
	render: ({
		content,
		closing,
	}) => html`<p-drawer-container
		closing=${closing ?? nothing}
	>
		${content}
	</p-drawer-container>`,
	tags: ['!dev'],
};