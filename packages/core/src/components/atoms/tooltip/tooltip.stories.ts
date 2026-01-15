import { action } from '@storybook/addon-actions';
import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Tooltip',
	component: 'p-tooltip',
};

export default meta;

export const Default = {
	render: ({
		variant,
		content,
		placement,
		offset,
		strategy,
		'enable-user-input': enableUserInput,
		show,
		'can-manually-close': canManuallyClose,
	}) => html`
		<p-tooltip
			variant=${variant ?? nothing}
			content=${content ?? nothing}
			placement=${placement ?? nothing}
			offset=${offset ?? nothing}
			strategy=${strategy ?? nothing}
			enable-user-input=${enableUserInput ?? nothing}
			show=${show ?? nothing}
			can-manually-close=${canManuallyClose ?? nothing}
			@isOpen=${action('isOpen')}
		>
			<div slot="trigger">Hover/click me</div>
		</p-tooltip>
	`,
};
