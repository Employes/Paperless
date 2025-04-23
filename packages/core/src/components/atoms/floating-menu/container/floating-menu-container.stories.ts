import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Atoms/Floating menu/Container',
	component: 'p-floating-menu-container',
	args: {
		content: 'FloatingMenuContainer',
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
		'used-in-table': usedInTable,
		'enable-amount-selected': enableAmountSelected,
		amount,
		'enable-close': enableClose,
		'amount-selected-template': amountSelectedTemplate,
	}) => html`<p-floating-menu-container
		used-in-table=${usedInTable ?? nothing}
		enable-amount-selected=${enableAmountSelected ?? nothing}
		amount=${amount ?? nothing}
		enable-close=${enableClose ?? nothing}
		amount-selected-template=${amountSelectedTemplate ?? nothing}
		@close=${action('close')}
	>
		${content}
	</p-floating-menu-container>`,
	tags: ['!dev'],
};