import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Toast',
	component: 'p-toast',
	args: {
		header: 'This is a header',
		content: 'This is content of the toast',
		variant: 'neutral',
	},
};

export default meta;

export const Default = {
	render: ({
		variant,
		header,
		content,
		'enable-action': enableAction,
		'action-icon': actionIcon,
		'action-icon-flip': actionIconFlip,
		'action-icon-rotate': actionIconRotate,
	}) => html`<p-toast
		variant=${variant ?? nothing}
		header=${header ?? nothing}
		content=${content ?? nothing}
		enable-action=${enableAction ?? nothing}
		action-icon=${actionIcon ?? nothing}
		action-icon-flip=${actionIconFlip ?? nothing}
		action-icon-rotate=${actionIconRotate ?? nothing}
		@action=${action('action')}
	/>`,
	tags: ['!dev'],
};
