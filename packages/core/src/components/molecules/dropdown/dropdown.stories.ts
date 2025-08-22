import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Dropdown',
	component: 'p-dropdown',
};

export default meta;

export const Default = {
	render: ({
		variant,
		placement,
		offset,
		strategy,
		show,
		'calculate-width': calculateWidth,
		'apply-max-width': applyMaxWidth,
		'apply-full-width': applyFullWidth,
		'allow-overflow': allowOverflow,
		scrollable,
		'inside-click': insideClick,
		'disable-trigger-click': disableTriggerClick,
		'apply-chevron': applyChevron,
		'chevron-position': chevronPosition,
		'chevron-direction': chevronDirection,
	}) => html`<p-dropdown
		variant=${variant ?? nothing}
		placement=${placement ?? nothing}
		offset=${offset ?? nothing}
		strategy=${strategy ?? nothing}
		show=${show ?? nothing}
		calculate-width=${calculateWidth ?? nothing}
		apply-max-width=${applyMaxWidth ?? nothing}
		apply-full-width=${applyFullWidth ?? nothing}
		allow-overflow=${allowOverflow ?? nothing}
		scrollable=${scrollable ?? nothing}
		inside-click=${insideClick ?? nothing}
		disable-trigger-click=${disableTriggerClick ?? nothing}
		apply-chevron=${applyChevron ?? nothing}
		chevron-position=${chevronPosition ?? nothing}
		chevron-direction=${chevronDirection ?? nothing}
		@isOpen=${action('isOpen')}
	>
		<p-button
			slot="trigger"
			variant="secondary"
		>
			Dropdown
		</p-button>
		<slot slot="items">
			<p-dropdown-menu-item>Item 1</p-dropdown-menu-item>
			<p-dropdown-menu-item>Item 2</p-dropdown-menu-item>
			<p-dropdown-menu-item>Item 3</p-dropdown-menu-item>
		</slot>
	</p-dropdown>`,
};
