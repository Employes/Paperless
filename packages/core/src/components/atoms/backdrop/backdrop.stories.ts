import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Atoms/Backdrop',
	component: 'p-backdrop',
	args: {
		content: 'Backdrop',
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
		variant,
		'apply-blur': applyBlur,
		closing,
		'scroll-lock': scrollLock,
		'class': className,
	}) => html`<p-backdrop
		variant=${variant ?? nothing}
		apply-blur=${applyBlur ?? nothing}
		closing=${closing ?? nothing}
		scroll-lock=${scrollLock ?? nothing}
		class=${className ?? nothing}
		@clicked=${action('clicked')}
	>
		${content}
	</p-backdrop>`,
};
