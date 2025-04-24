import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Organisms/Modal',
	component: 'p-modal',
	args: {
		header: 'Modal',
		content: 'Modal content',
		show: true,
		'scroll-lock': false,
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
	parameters: {
		docs: {
			iframeHeight: 600,
			story: {
				height: '700px',
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({
		content,
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
	>
		<slot slot="content">${content}</slot>
		<p-button
			slot="footer"
			class="hidden tablet:inline-block"
			variant="secondary"
		>
			Cancel
		</p-button>
		<p-button
			slot="footer"
			class="w-full tablet:ml-auto tablet:w-auto"
		>
			Submit
		</p-button>
	</p-modal>`,
	tags: ['!dev'],
};
