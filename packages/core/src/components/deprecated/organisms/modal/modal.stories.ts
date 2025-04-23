import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Deprecated/Organisms/Modal',
	component: 'p-modal',
};

export default meta;

export const Default = {
	render: ({
		size,
		variant,
		header,
		show,
		'apply-blur': applyBlur,
		'show-close': showClose,
		'show-mobile-footer': showMobileFooter,
		'backdrop-click-close': backdropClickClose,
		'scroll-lock': scrollLock,
		padding,
	}) => html`<p-modal
		size=${size ?? nothing}
		variant=${variant ?? nothing}
		header=${header ?? nothing}
		show=${show ?? nothing}
		apply-blur=${applyBlur ?? nothing}
		show-close=${showClose ?? nothing}
		show-mobile-footer=${showMobileFooter ?? nothing}
		backdrop-click-close=${backdropClickClose ?? nothing}
		scroll-lock=${scrollLock ?? nothing}
		padding=${padding ?? nothing}
		@closeClicked=${action('closeClicked')}
		@closed=${action('closed')}
	/>`,
	tags: ['!dev'],
};