import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Deprecated/Organisms/Drawer',
	component: 'p-drawer',
};

export default meta;

export const Default = {
	render: ({
		header,
		show,
		'apply-blur': applyBlur,
		'show-close': showClose,
		'backdrop-click-close': backdropClickClose,
		'can-close': canClose,
		'scroll-lock': scrollLock,
	}) => html`<p-drawer
		header=${header ?? nothing}
		show=${show ?? nothing}
		apply-blur=${applyBlur ?? nothing}
		show-close=${showClose ?? nothing}
		backdrop-click-close=${backdropClickClose ?? nothing}
		can-close=${canClose ?? nothing}
		scroll-lock=${scrollLock ?? nothing}
		@closeClicked=${action('closeClicked')}
		@closed=${action('closed')}
	/>`,
	tags: ['!dev'],
};