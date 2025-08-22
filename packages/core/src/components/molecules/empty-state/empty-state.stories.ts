import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Empty state',
	component: 'p-empty-state',
	args: {
		illustration: 'table',
		header: 'Nog niks ingediend',
		content:
			'Er kan geen overzicht worden getoond tot er iets wordt ingediend. Begin met indienen.',
		'enable-action': true,
		'action-icon': 'plus',
		'action-text': 'Nieuw',
	},
};

export default meta;

export const Default = {
	render: ({
		illustration,
		header,
		content,
		'enable-action': enableAction,
		'action-text': actionText,
		'action-icon': actionIcon,
		'action-loading': actionLoading,
	}) => html`<p-empty-state
		illustration=${illustration ?? nothing}
		header=${header ?? nothing}
		content=${content ?? nothing}
		enable-action=${enableAction ?? nothing}
		action-text=${actionText ?? nothing}
		action-icon=${actionIcon ?? nothing}
		action-loading=${actionLoading ?? nothing}
		@action=${action('action')}
	/>`,
};
