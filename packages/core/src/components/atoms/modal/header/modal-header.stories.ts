import { action } from '@storybook/addon-actions';
import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Modal/Header',
	component: 'p-modal-header',
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
	render: ({ content, size, 'show-close': showClose }) => html`
		<p-modal-header
			show-close=${showClose ?? nothing}
			size=${size ?? nothing}
			@close=${action('close')}
		>
			${content}
		</p-modal-header>
	`,
};
