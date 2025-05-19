import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Organisms/Drawer',
	component: 'p-drawer',
	args: {
		header: 'Drawer',
		show: true,
		'scroll-lock': false,
	},
	parameters: {
		docs: {
			iframeHeight: 900,
			story: {
				height: '900px',
			},
		},
	},
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
	>
		<p-card-container slot="content" slot="content">
			<p-card-header
				header="Card header"
			></p-card-header>
			<p-card-body>
				Card content!
			</p-card-body>
		</p-card-container>
	</p-drawer>`,
	tags: ['!dev'],
};
