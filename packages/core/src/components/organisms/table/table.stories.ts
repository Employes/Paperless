import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Organisms/Table',
	component: 'p-table',
	args: {
		total: 100,
		items: JSON.stringify([
			{
				id: 1,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 2,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 3,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 4,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 1,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 2,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 3,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
			{
				id: 4,
				first: 'First',
				second: 'Second',
				third: 'Third',
			},
		]),
		'quick-filters': [
			{
				identifier: 'first',
				text: 'First',
			},
			{
				identifier: 'second',
				text: 'Second',
			},
			{
				identifier: 'third',
				text: 'Third',
			},
		],
		'selection-key': 'id',
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
		items,
		loading,
		'header-loading': headerLoading,
		'footer-loading': footerLoading,
		'amount-of-loading-rows': amountOfLoadingRows,
		'enable-row-selection': enableRowSelection,
		'row-selection-limit': rowSelectionLimit,
		'enable-row-click': enableRowClick,
		'selected-rows': selectedRows,
		'enable-floating-menu': enableFloatingMenu,
		'floating-menu-amount-selected-template':
			floatingMenuAmountSelectedTemplate,
		'selection-key': selectionKey,
		'can-select-key': canSelectKey,
		'enable-header': enableHeader,
		'quick-filters': quickFilters,
		'active-quick-filter-identifier': activeQuickFilterIdentifier,
		'enable-search': enableSearch,
		query,
		'enable-filter': enableFilter,
		'enable-filter-desktop': enableFilterDesktop,
		'selected-filters-amount': selectedFiltersAmount,
		'filter-button-template': filterButtonTemplate,
		'enable-action': enableAction,
		'action-button-loading': actionButtonLoading,
		'action-button-enabled': actionButtonEnabled,
		'action-button-icon': actionButtonIcon,
		'action-button-text': actionButtonText,
		'action-button-template': actionButtonTemplate,
		'enable-footer': enableFooter,
		'enable-page-size': enablePageSize,
		'enable-pagination': enablePagination,
		'enable-export': enableExport,
		page,
		total,
		'page-size': pageSize,
		'page-size-options': pageSizeOptions,
		'hide-on-single-page': hideOnSinglePage,
		'empty-state-header': emptyStateHeader,
		'empty-state-content': emptyStateContent,
		'empty-state-action': emptyStateAction,
		'enable-empty-state-action': enableEmptyStateAction,
		'empty-state-filtered-header': emptyStateFilteredHeader,
		'empty-state-filtered-content': emptyStateFilteredContent,
		shadow,
	}) => html`
		<p-table
			items=${items ?? nothing}
			loading=${loading ?? nothing}
			header-loading=${headerLoading ?? nothing}
			footer-loading=${footerLoading ?? nothing}
			amount-of-loading-rows=${amountOfLoadingRows ?? nothing}
			enable-row-selection=${enableRowSelection ?? nothing}
			row-selection-limit=${rowSelectionLimit ?? nothing}
			enable-row-click=${enableRowClick ?? nothing}
			selected-rows=${selectedRows ?? nothing}
			enable-floating-menu=${enableFloatingMenu ?? nothing}
			floating-menu-amount-selected-template=${floatingMenuAmountSelectedTemplate ??
			nothing}
			selection-key=${selectionKey ?? nothing}
			can-select-key=${canSelectKey ?? nothing}
			enable-header=${enableHeader ?? nothing}
			quick-filters=${quickFilters ?? nothing}
			active-quick-filter-identifier=${activeQuickFilterIdentifier ?? nothing}
			enable-search=${enableSearch ?? nothing}
			query=${query ?? nothing}
			enable-filter=${enableFilter ?? nothing}
			enable-filter-desktop=${enableFilterDesktop ?? nothing}
			selected-filters-amount=${selectedFiltersAmount ?? nothing}
			filter-button-template=${filterButtonTemplate ?? nothing}
			enable-action=${enableAction ?? nothing}
			action-button-loading=${actionButtonLoading ?? nothing}
			action-button-enabled=${actionButtonEnabled ?? nothing}
			action-button-icon=${actionButtonIcon ?? nothing}
			action-button-text=${actionButtonText ?? nothing}
			action-button-template=${actionButtonTemplate ?? nothing}
			enable-footer=${enableFooter ?? nothing}
			enable-page-size=${enablePageSize ?? nothing}
			enable-pagination=${enablePagination ?? nothing}
			enable-export=${enableExport ?? nothing}
			page=${page ?? nothing}
			total=${total ?? nothing}
			page-size=${pageSize ?? nothing}
			page-size-options=${pageSizeOptions ?? nothing}
			hide-on-single-page=${hideOnSinglePage ?? nothing}
			empty-state-header=${emptyStateHeader ?? nothing}
			empty-state-content=${emptyStateContent ?? nothing}
			empty-state-action=${emptyStateAction ?? nothing}
			enable-empty-state-action=${enableEmptyStateAction ?? nothing}
			empty-state-filtered-header=${emptyStateFilteredHeader ?? nothing}
			empty-state-filtered-content=${emptyStateFilteredContent ?? nothing}
			shadow=${shadow ?? nothing}
			@selectedRowsChange=${action('selectedRowsChange')}
			@rowClick=${action('rowClick')}
			@rowSelected=${action('rowSelected')}
			@rowDeselected=${action('rowDeselected')}
			@hasRendered=${action('hasRendered')}
			@quickFilter=${action('quickFilter')}
			@queryChange=${action('queryChange')}
			@filter=${action('filter')}
			@action=${action('action')}
			@pageChange=${action('pageChange')}
			@pageSizeChange=${action('pageSizeChange')}
			@export=${action('export')}
			@emptyStateActionClick=${action('emptyStateActionClick')}
		>
			<p-table-column
				name="first"
				path="first"
			></p-table-column>
			<p-table-column
				name="second"
				path="first"
			></p-table-column>
			<p-table-column
				name="third"
				path="first"
			></p-table-column>

			<p-table-row-action
				icon="user"
				type="both"
				label="User both"
				@action=${action('rowActionUserBoth')}
			></p-table-row-action>
			<p-table-row-action
				icon="pencil"
				type="single"
				label="Pencil single"
				@action=${action('rowActionPencilSingle')}
			></p-table-row-action>
			<p-table-row-action
				icon="company"
				type="multi"
				label="Multi company"
				@action=${action('rowActionCompanyMulti')}
			></p-table-row-action>
		</p-table>
	`,
	tags: ['!dev'],
};
