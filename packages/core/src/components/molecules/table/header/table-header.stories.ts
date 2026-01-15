import { action } from '@storybook/addon-actions';
import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Table/Header',
	component: 'p-table-header',
};

export default meta;

export const Default = {
	render: ({
		'quick-filters': quickFilters,
		'active-quick-filter-identifier': activeQuickFilterIdentifier,
		loading,
		'enable-search': enableSearch,
		'items-selected-amount': itemsSelectedAmount,
		query,
		'enable-filter': enableFilter,
		'enable-filter-desktop': enableFilterDesktop,
		'selected-filters-amount': selectedFiltersAmount,
		'filter-button-template': filterButtonTemplate,
		'enable-action': enableAction,
		'action-loading': actionLoading,
		'action-icon': actionIcon,
		'action-text': actionText,
		'can-use-action': canUseAction,
		'action-button-template': actionButtonTemplate,
	}) => html`
		<p-table-header
			quick-filters=${quickFilters ?? nothing}
			active-quick-filter-identifier=${activeQuickFilterIdentifier ?? nothing}
			loading=${loading ?? nothing}
			enable-search=${enableSearch ?? nothing}
			items-selected-amount=${itemsSelectedAmount ?? nothing}
			query=${query ?? nothing}
			enable-filter=${enableFilter ?? nothing}
			enable-filter-desktop=${enableFilterDesktop ?? nothing}
			selected-filters-amount=${selectedFiltersAmount ?? nothing}
			filter-button-template=${filterButtonTemplate ?? nothing}
			enable-action=${enableAction ?? nothing}
			action-loading=${actionLoading ?? nothing}
			action-icon=${actionIcon ?? nothing}
			action-text=${actionText ?? nothing}
			can-use-action=${canUseAction ?? nothing}
			action-button-template=${actionButtonTemplate ?? nothing}
			@quickFilter=${action('quickFilter')}
			@queryChange=${action('queryChange')}
			@filter=${action('filter')}
			@action=${action('action')}
		/>
	`,
};
