import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Deprecated/Atoms/Drawer/Header',
	component: 'p-drawer-header',
	args: {
		content: 'ModalHeader',
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
		'show-close': showClose,
	}) => html`<p-drawer-header
		show-close=${showClose ?? nothing}
		@close=${action('close')}
	>
		${content}
	</p-drawer-header>`,
	tags: ['!dev'],
};