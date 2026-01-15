import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
	State,
	Watch,
} from '@stencil/core';

import { PCheckboxCustomEvent } from '../../../components';
import { tableColumSizesOptions } from '../../../types/constants';
import { IconVariant } from '../../../types/icon';
import {
	QuickFilter,
	RowClickEvent,
	TableColumnSizes,
} from '../../../types/table';
import {
	floatingMenuContainerClass,
	formatTranslation,
	getLocaleComponentStrings,
	isMobile,
} from '../../../utils';
import { cn } from '../../../utils/cn';
import {
	PAGINATION_DEFAULT_PAGE_SIZE,
	PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS,
} from '../../../utils/constants';
import { TableColumn } from '../../helpers/table/column/table-column.component';
import { TableExtraHeader } from '../../helpers/table/extra-header/table-extra-header.component';
import { TableRowAction } from '../../helpers/table/row-action/table-row-action.component';
import { buttonTemplateFunc } from '../../molecules/table/header/table-header.component';

export type templateFunc = () => string;
export type amountSelectedTemplateFunc = (amount: number) => string;

@Component({
	tag: 'p-table',
	styleUrl: 'table.component.css',
})
export class Table {
	/**
	 * The items to be fed to the table
	 */
	@Prop() items: string;

	/**
	 * Wether data is loading
	 */
	@Prop() loading: boolean = false;

	/**
	 * Wether the header should show loading state
	 */
	@Prop() headerLoading: boolean = false;

	/**
	 * Wether the footer should show loading state
	 */
	@Prop() footerLoading: boolean = false;

	/**
	 * The amount of loading rows to show
	 */
	@Prop() amountOfLoadingRows: number = 6;

	/**
	 * Wether to enable selection
	 */
	@Prop() enableRowSelection: boolean = true;

	/**
	 * A limit to the amount of rows that can be selected
	 */
	@Prop() rowSelectionLimit: number | undefined;

	/**
	 * Wether to enable row clicking
	 */
	@Prop() enableRowClick: boolean = true;

	/**
	 * The current selection of items
	 */
	@Prop() selectedRows: any[] = [];

	/**
	 * Wether to enable the floating menu
	 */
	@Prop() enableFloatingMenu: boolean = true;

	/**
	 * The template for amount selected item in the floating menu
	 */
	@Prop() floatingMenuAmountSelectedTemplate: amountSelectedTemplateFunc = (
		amount: number
	) =>
		formatTranslation(
			(amount === 1
				? this._locales.floating_menu?.amount_selected
				: this._locales.floating_menu?.amount_selected_plural
			)?.replace('{{amount}}', amount)
		);

	/**
	 * Event whenever the current selection changes
	 */
	@Event({
		bubbles: false,
	})
	selectedRowsChange: EventEmitter<any>;

	/**
	 * The key to determine if a row is selected
	 */
	@Prop() selectionKey: string;

	/**
	 * A key to determine if a row can be selected
	 */
	@Prop() canSelectKey: string;

	/**
	 * Event whenever a row is clicked
	 */
	@Event({
		bubbles: false,
	})
	rowClick: EventEmitter<RowClickEvent>;

	/**
	 * Event whenever a row is selected
	 */
	@Event({
		bubbles: false,
	})
	rowSelected: EventEmitter<any>;

	/**
	 * Event whenever a row is deselected
	 */
	@Event({
		bubbles: false,
	})
	rowDeselected: EventEmitter<any>;

	/**
	 * Event when the table has rendered
	 */
	@Event({
		bubbles: false,
	})
	hasRendered: EventEmitter<number>;

	/** START HEADER */

	/**
	 * Wether to show the header
	 */
	@Prop() enableHeader: boolean = true;

	/**
	 * Quick filters to show
	 */
	@Prop() quickFilters: QuickFilter[] | string = [];

	/**
	 * Active quick filter identifier
	 */
	@Prop() activeQuickFilterIdentifier: string;

	/**
	 * Wether to show the search input
	 */
	@Prop() enableSearch: boolean = true;

	/**
	 * The query to show in the search bar
	 */
	@Prop({ mutable: true }) query: string;

	/**
	 * Wether to show the filter button
	 */
	@Prop() enableFilter: boolean = true;

	/**
	 * Wether to show the filter button on desktop
	 */
	@Prop() enableFilterDesktop: boolean = true;

	/**
	 * The amount of filters being selected
	 */
	@Prop() selectedFiltersAmount: number;

	/**
	 * The template for the filter button text
	 */
	@Prop() filterButtonTemplate: templateFunc;

	/**
	 * Wether to show the action button
	 */
	@Prop() enableAction: boolean = false;

	/**
	 * Wether the action button is loading
	 */
	@Prop() actionButtonLoading: boolean = false;

	/**
	 * Wether the action button is enabled
	 */
	@Prop() actionButtonEnabled: boolean = false;

	/**
	 * The action button icon
	 */
	@Prop() actionButtonIcon: IconVariant = 'pencil';

	/**
	 * The action button text if changed
	 */
	@Prop() actionButtonText: string;

	/**
	 * The template for the action button text
	 */
	@Prop() actionButtonTemplate: buttonTemplateFunc;

	/**
	 * Event when one of the quick filters is clicked
	 */
	@Event({
		bubbles: false,
	})
	quickFilter: EventEmitter<QuickFilter>;

	/**
	 * Event when the query changes
	 */
	@Event({
		bubbles: false,
	})
	queryChange: EventEmitter<string>;

	/**
	 * Event when the filter button is clicked
	 */
	@Event({
		bubbles: false,
	})
	filter: EventEmitter<null>;

	/**
	 * Event when the action button is clicked
	 */
	@Event({
		bubbles: false,
	})
	action: EventEmitter<null>;

	/** START FOOTER */

	/**
	 * Wether to show the header
	 */
	@Prop() enableFooter: boolean = true;

	/**
	 * Wether to enable pagination size select
	 */
	@Prop() enablePaginationSize: boolean = true;

	/**
	 * Wether to enable pagination pages
	 */
	@Prop() enablePaginationPages: boolean = true;

	/**
	 * Wether to enable export
	 */
	@Prop() enableExport: boolean = true;

	/**
	 * The current page
	 */
	@Prop({ mutable: true, reflect: true }) page: number = 1;

	/**
	 * The total amount of items
	 */
	@Prop() total!: number;

	/**
	 * Event whenever the page changes
	 */
	@Event({
		bubbles: false,
	})
	pageChange: EventEmitter<number>;

	/**
	 * The amount of items per page
	 */
	@Prop() pageSize: number = PAGINATION_DEFAULT_PAGE_SIZE;

	/**
	 * The options for the page size
	 */
	@Prop() pageSizeOptions: number[] = PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS;

	/**
	 * Event whenever the page changes
	 */
	@Event({
		bubbles: false,
	})
	pageSizeChange: EventEmitter<number>;

	/**
	 * Event whenever the page changes
	 */
	@Event({
		bubbles: false,
	})
	export: EventEmitter<number>;

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hideOnSinglePage: boolean = true;

	/* Empty state start */
	@Prop() emptyStateHeader: templateFunc = () =>
		formatTranslation(this._locales.empty_state?.no_filter.header);
	@Prop() emptyStateContent: templateFunc = () =>
		formatTranslation(this._locales.empty_state?.no_filter.content);
	@Prop() emptyStateAction: templateFunc = () =>
		formatTranslation(this._locales.empty_state?.no_filter.action);
	/**
	 * Wether to enable empty state action
	 */
	@Prop() enableEmptyStateAction: boolean = true;

	@Prop() emptyStateFilteredHeader: templateFunc = () =>
		formatTranslation(this._locales.empty_state.filtered.header);
	@Prop() emptyStateFilteredContent: templateFunc = () =>
		formatTranslation(this._locales.empty_state.filtered.content);

	/**
	 * Event whenever the empty state is clicked
	 */
	@Event({
		bubbles: false,
	})
	emptyStateActionClick: EventEmitter<null>;

	/*
	 * Wether to show the shadow or not
	 */
	@Prop() shadow: boolean = true;

	/* Empty state end */

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	@State() private _extraHeaders: any[] = [];
	@State() private _columns: any[] = [];
	@State() private _items: any[] = [];

	@State() private _enableRowSelection: boolean = this.enableRowSelection;
	@State() private _rowSelectionLimit: number | undefined;

	private _rowActionsFloatingAll: TableRowAction[] = [];
	@State() private _rowActionsFloating: TableRowAction[] = [];
	@State() private _rowActionsRow: TableRowAction[] = [];

	@State() private _footerHidden: boolean = false;

	private _ctrlDown = false;
	private _hasCustomFilterSlot = false;
	private _hasCustomActionsSlot = false;
	private _floatingMenuShown = false;
	private _resizeTimeout: NodeJS.Timeout | undefined;

	componentWillLoad() {
		this._hasCustomFilterSlot = !!this._el.querySelector(
			':scope > [slot="custom-filter"]'
		);

		this._hasCustomActionsSlot = !!this._el.querySelector(
			':scope > [slot="custom-actions"]'
		);

		this._setRowSelectionData();

		this._setLocales();
		this._parseItems(this.items);
		this._generateExtraHeaders();
		this._generateColumns();
	}

	componentDidRender() {
		this.hasRendered.emit();
	}

	render() {
		return (
			<Host class='z-0 flex flex-col'>
				<p-table-container>
					{this.enableHeader && (
						<p-table-header
							class='mb-8'
							// quick filters
							quickFilters={this.quickFilters}
							activeQuickFilterIdentifier={this.activeQuickFilterIdentifier}
							onQuickFilter={({ detail }) => this.quickFilter.emit(detail)}
							// search
							enableSearch={this.enableSearch}
							query={this.query}
							onQueryChange={({ detail }) => this.queryChange.emit(detail)}
							// filter button
							enableFilter={this.enableFilter}
							enableFilterDesktop={this.enableFilterDesktop}
							selectedFiltersAmount={this.selectedFiltersAmount}
							filterButtonTemplate={this.filterButtonTemplate}
							onFilter={() => this.filter.emit()}
							// action button
							enableAction={this.enableAction}
							actionIcon={this.actionButtonIcon}
							actionText={this.actionButtonText}
							actionLoading={this.actionButtonLoading}
							canUseAction={this.actionButtonEnabled}
							actionButtonTemplate={this.actionButtonTemplate}
							onAction={() => this.action.emit()}
							itemsSelectedAmount={this.selectedRows?.length}
							//export
							enableExport={this.enableExport}
							onExport={() => this.export.emit()}
							//loading
							loading={this.headerLoading}
						>
							{this._hasCustomFilterSlot && (
								<slot
									name='custom-filter'
									slot='custom-filter'
								/>
							)}

							{this._hasCustomActionsSlot && (
								<slot
									name='custom-actions'
									slot='custom-actions'
								/>
							)}
						</p-table-header>
					)}

					{this._getExtraHeader()}
					{this._getHeader()}
					<div class='flex flex-1 flex-col'>
						{this._getRows()}
						<slot name='custom-rows' />
					</div>

					{this.enableFloatingMenu && this._enableRowSelection ? (
						<p-floating-menu-container
							usedInTable={true}
							class={floatingMenuContainerClass({
								hasFooter: this.enableFooter && !this._footerHidden,
								active: !!this.selectedRows?.length,
								shown: this._floatingMenuShown,
							})}
							amountSelectedTemplate={this.floatingMenuAmountSelectedTemplate}
							amount={this.selectedRows?.length}
							enableAmountSelected={!!this._rowActionsFloating?.length}
							onClose={() => this._selectAllChange(null, false)}
						>
							{this._rowActionsFloating?.length &&
								this._rowActionsFloating.map(a => (
									<p-floating-menu-item
										slot='floating-menu-item'
										disabled={a.disabled}
										loading={a.loading}
										icon={a.icon}
										iconRotate={a.iconRotate}
										iconFlip={a.iconFlip}
										onClick={() =>
											!a.disabled &&
											!a.loading &&
											!!a.action &&
											a.type === 'single'
												? a.action(this.selectedRows[0], false)
												: a.action(this.selectedRows, true)
										}
									>
										{a.label}
									</p-floating-menu-item>
								))}
						</p-floating-menu-container>
					) : (
						''
					)}

					{this.enableFooter && (
						<p-table-footer
							// overall
							hideOnSinglePage={this.hideOnSinglePage}
							// page size select
							enablePaginationSize={this.enablePaginationSize}
							pageSize={this.pageSize}
							pageSizeOptions={this.pageSizeOptions}
							onPageSizeChange={({ detail }) =>
								this.pageSizeChange.emit(detail)
							}
							// pagination
							enablePaginationPages={this.enablePaginationPages}
							page={this.page}
							total={this.total}
							onPageChange={({ detail }) => this.pageChange.emit(detail)}
							//loading
							loading={this.footerLoading}
							onHiddenChange={({ detail }) => (this._footerHidden = detail)}
							// header adjustment
							tableHeaderHasAction={
								this.enableHeader &&
								this.enableAction &&
								this.actionButtonEnabled
							}
						></p-table-footer>
					)}
				</p-table-container>
			</Host>
		);
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}

	@Listen('tableDefinitionChanged', { target: 'body' })
	onTableDefinitionUpdated() {
		this._generateColumns();
	}

	@Listen('keydown', { target: 'document' })
	keyDown({ key }) {
		if (key !== 'Control' || this._ctrlDown === true) {
			return;
		}

		this._ctrlDown = true;
	}

	@Listen('keyup', { target: 'document' })
	keyUp({ key }) {
		if (key !== 'Control' || this._ctrlDown === false) {
			return;
		}

		this._ctrlDown = false;
	}

	@Listen('visibilitychange', { target: 'document' })
	visibilityChange() {
		if (document.visibilityState !== 'hidden' || this._ctrlDown === false) {
			return;
		}

		this._ctrlDown = false;
	}

	@Watch('items')
	private _parseItems(items: string) {
		if (!items) {
			this._items = [];
			return;
		}

		if (Array.isArray(items)) {
			this._items = items;
			return;
		}

		this._items = JSON.parse(items);
	}

	@Watch('enableRowSelection')
	@Watch('rowSelectionLimit')
	@Watch('selectedRows')
	@Listen('resize', { target: 'window' })
	private _setRowSelectionData() {
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}

		// We add a timeout here because it's a lot easier on the machine to do these when someone is done
		// resizing and playing around with their browser
		this._resizeTimeout = setTimeout(() => {
			const mobile = isMobile();

			// we hack this to any[] to make it work..
			const actions = [
				...this._el.querySelectorAll(':scope > p-table-row-action'),
			] as any[] as TableRowAction[];
			this._rowActionsRow = actions.filter(
				a => a.type === 'both' || a.type === 'single'
			);
			this._rowActionsFloatingAll = actions
				.filter(
					a =>
						(this.enableRowSelection &&
							(a.type === 'both' || a.type === 'multi')) ||
						(mobile && a.type === 'single')
				)
				.map(a => {
					if (a.type === 'single') {
						a.disabled = this.selectedRows?.length > 1;
					}

					return a;
				});

			let rowSelectionLimit = this.rowSelectionLimit;
			if (
				mobile && // we're mobile
				this._rowActionsFloatingAll?.length && // we have atleast 1 item in _rowActionsFloating
				((rowSelectionLimit !== undefined && this.enableRowSelection) ||
					!this.enableRowSelection)
			) {
				rowSelectionLimit = 1;
			}

			this._rowSelectionLimit = rowSelectionLimit;

			let enableRowSelection = this.enableRowSelection;
			if (
				mobile && // we're mobile
				this._rowActionsFloatingAll?.length && // we have atleast 1 item in _rowActionsFloating
				!enableRowSelection
			) {
				enableRowSelection = true;
			}

			this._enableRowSelection = enableRowSelection;

			if (this._floatingMenuShown) {
				this._showFloatingMenu();
			}
		}, 200);
	}

	private _generateExtraHeaders() {
		const definitions = this._el.querySelectorAll('p-table-extra-header');
		let definitionsArray = [...definitions];

		definitionsArray = this._parseDefinitions(definitionsArray);

		this._extraHeaders = definitionsArray;
	}

	private _generateColumns() {
		const definitions = this._el.querySelectorAll('p-table-column');
		let definitionsArray = [...definitions];

		definitionsArray = this._parseDefinitions(definitionsArray);

		this._columns = definitionsArray;
	}

	private _getExtraHeader() {
		if (!this._extraHeaders?.length) {
			return null;
		}

		return (
			<p-table-row
				variant='header-secondary'
				isLast={true}
			>
				{this._extraHeaders.map((col: TableExtraHeader, index) => (
					<p-table-cell
						definition={col}
						variant='header-secondary'
						checkboxOffset={index === 0 && this._enableRowSelection}
						index={index}
					>
						<b>{col.name}</b>
					</p-table-cell>
				))}
			</p-table-row>
		);
	}

	private _getHeader() {
		return (
			<p-table-row variant='header'>
				{this._columns.map((col: TableColumn, index) => (
					<p-table-cell
						definition={col}
						value={col.name}
						variant='header'
						checkbox={
							index === 0 || col.hasCheckbox
								? this._getCheckbox(null, this.loading ? 'loading' : 'header')
								: null
						}
						index={index}
					></p-table-cell>
				))}
			</p-table-row>
		);
	}

	private _getRows() {
		if (this.loading) {
			return Array.from(
				{
					length: this.amountOfLoadingRows,
				},
				(_, i) => (
					<p-table-row
						enableHover={this._enableRowSelection || this.enableRowClick}
						isLast={i === this.amountOfLoadingRows - 1}
					>
						{this._getLoadingColumns(i)}
					</p-table-row>
				)
			);
		}

		if (this._items.length === 0) {
			return this._getEmptyState();
		}

		return this._items.map((item, index) => (
			<p-table-row
				enableHover={this._enableRowSelection || this.enableRowClick}
				checked={this._selectionContains(index)}
				onClick={ev => this._rowClick(ev, index)}
				isLast={index === this._items.length - 1}
			>
				{this._getRowColumns(item, index)}
				{this._getActions(item, index)}
			</p-table-row>
		));
	}

	private _getActions(item, index) {
		const actions = this._rowActionsRow.filter(a =>
			a.showFunction ? a.showFunction(item) : true
		);

		if (actions?.length && !isMobile()) {
			return (
				<p-table-row-actions-container
					slot='actions'
					checked={this._selectionContains(index)}
				>
					{actions.map(a => (
						<p-tooltip
							strategy='fixed'
							content={a.label}
						>
							<p-button
								data-is-action
								variant='secondary'
								slot='trigger'
								icon={a.icon}
								iconRotate={a.iconRotate}
								iconFlip={a.iconFlip}
								iconOnly={true}
								size='sm'
								onClick={() =>
									typeof a.action === 'function' && a.action?.(item, false)
								}
							></p-button>
						</p-tooltip>
					))}
				</p-table-row-actions-container>
			);
		}

		return null;
	}
	private _getRowColumns(item, index) {
		return this._columns.map((col: TableColumn, colIndex) => (
			<p-table-cell
				definition={col}
				item={item}
				checkbox={
					colIndex === 0 || col.hasCheckbox ? this._getCheckbox(index) : null
				}
				index={colIndex}
				rowIndex={index}
			></p-table-cell>
		));
	}

	private _getLoadingColumns(index) {
		return this._columns.map((col: TableColumn, colIndex) => (
			<p-table-cell
				definition={col}
				variant='loading'
				checkbox={
					colIndex === 0 || col.hasCheckbox
						? this._getCheckbox(index, 'loading')
						: null
				}
				index={colIndex}
				rowIndex={index}
			></p-table-cell>
		));
	}

	private _getCheckbox(
		rowIndex: number,
		variant: 'header' | 'default' | 'loading' = 'default'
	) {
		if (
			!this._enableRowSelection ||
			(!this.selectionKey && !this._rowActionsFloating?.length)
		) {
			return;
		}

		if (variant === 'loading') {
			return (
				<p-loader
					variant='ghost'
					class='h-6 w-6 rounded'
				/>
			);
		}

		if (variant === 'header') {
			return (
				<p-checkbox
					class={cn({
						'opacity-0': this._rowSelectionLimit !== undefined,
					})}
					checked={this._selectionContainsAll()}
					indeterminate={this._selectionIndeterminate()}
					disabled={this._rowSelectionLimit !== undefined}
					onCheckedChange={ev => this._selectAllChange(ev)}
				/>
			);
		}

		const item = this._items[rowIndex];

		const selectionContains = this._selectionContains(rowIndex);

		return (
			<p-checkbox
				class='flex-shrink-0'
				disabled={
					(this.canSelectKey && !item[this.canSelectKey]) ||
					(this._rowSelectionLimit !== undefined &&
						!selectionContains &&
						this.selectedRows.length === this._rowSelectionLimit)
				}
				checked={selectionContains}
				onCheckedChange={ev => this._checkboxChange(ev, rowIndex)}
			/>
		);
	}

	private _getEmptyState() {
		if (this.query?.length || this.selectedFiltersAmount) {
			return (
				<p-empty-state
					class='my-16 self-center'
					illustration='search'
					header={this.emptyStateFilteredHeader()}
					content={this.emptyStateFilteredContent()}
				></p-empty-state>
			);
		}

		return (
			<p-empty-state
				class='my-16 self-center'
				illustration='table'
				header={this.emptyStateHeader()}
				content={this.emptyStateContent()}
				enableAction={this.enableEmptyStateAction}
				actionIcon='plus'
				actionText={this.emptyStateAction()}
				onAction={() => this.enableAction && this.action.emit()}
			></p-empty-state>
		);
	}

	private _selectAllChange(
		ev: PCheckboxCustomEvent<boolean>,
		forceValue?: boolean
	) {
		if (!this._enableRowSelection) {
			return;
		}

		const checked = ev?.detail ?? forceValue ?? false;

		const value = forceValue === undefined ? checked : forceValue;
		if (value) {
			const toAdd = [];
			for (let i = 0; i < this._items.length; i++) {
				const row = this._items[i];
				if (this.canSelectKey && !row[this.canSelectKey]) {
					continue;
				}

				if (this._selectionContains(i)) {
					continue;
				}

				toAdd.push(row);
				this.rowSelected.emit(row);

				if (
					this._rowSelectionLimit !== undefined &&
					this.selectedRows.length + toAdd.length === this._rowSelectionLimit
				) {
					break;
				}
			}

			this.selectedRows = [...this.selectedRows, ...toAdd];
			this.selectedRowsChange.emit(this.selectedRows);
			if (this.enableFloatingMenu && !this._floatingMenuShown) {
				this._showFloatingMenu();
			}

			return;
		}

		for (let i = 0; i < this.selectedRows.length; i++) {
			const value = this.selectedRows[i];
			const row = this._items.find(
				d => this._getSelectionValue(d, i) === this._getSelectionValue(value, i)
			);

			if (!row) {
				continue;
			}

			this.rowDeselected.emit(row);
		}

		this.selectedRows = [];
		this.selectedRowsChange.emit(this.selectedRows);
	}

	private _checkboxChange(
		{ detail: checked, target }: PCheckboxCustomEvent<boolean>,
		index: number
	) {
		if (!this._enableRowSelection) {
			return;
		}

		if (
			checked &&
			this._rowSelectionLimit !== undefined &&
			this.selectedRows.length >= this._rowSelectionLimit
		) {
			target.checked = false;
			return;
		}

		const row = this._items[index];

		if (this.canSelectKey && !row[this.canSelectKey]) {
			target.checked = false;
			return;
		}

		if (checked) {
			this.selectedRows = [
				...this.selectedRows,
				{
					...row,
					index,
				},
			];
			this.selectedRowsChange.emit(this.selectedRows);
			this.rowSelected.emit(row);

			if (this.enableFloatingMenu && !this._floatingMenuShown) {
				this._showFloatingMenu();
			}

			return;
		}

		const indexOfToRemove = this._selectionContains(index, true);

		// we need to do this, because splice does not trigger the selection setter.
		const selection = [...this.selectedRows];
		selection.splice(indexOfToRemove, 1);
		this.selectedRows = selection;
		this.selectedRowsChange.emit(this.selectedRows);
		this.rowDeselected.emit(row);
	}

	private _getSelectionValue(row: any, index: number) {
		return this.selectionKey ? row?.[this.selectionKey] || index : index;
	}

	private _selectionContains(index, returnIndex = false): any {
		const returnValue = this.selectedRows.findIndex(
			item => item.index === index
		);
		return returnIndex ? returnValue : returnValue !== -1;
	}

	private _selectionContainsAll() {
		let returnValue = true;
		if (!this._items?.length) {
			return false;
		}

		if (
			this._rowSelectionLimit !== undefined &&
			this.selectedRows.length === this._rowSelectionLimit
		) {
			return true;
		}

		for (let i = 0; i < this._items?.length; i++) {
			const contains = this._selectionContains(i);

			if (!contains) {
				returnValue = false;
				break;
			}
		}

		return returnValue;
	}

	private _selectionIndeterminate() {
		if (!this._items?.length || !this.selectedRows?.length) {
			return false;
		}

		if (
			this._rowSelectionLimit !== undefined &&
			this.selectedRows.length === this._rowSelectionLimit
		) {
			return false;
		}

		let containsCount = 0;
		for (let i = 0; i < this._items?.length; i++) {
			const contains = this._selectionContains(i);

			if (contains) {
				containsCount++;
			}
		}

		return containsCount > 0 && containsCount !== this._items.length;
	}

	private _rowClick($event, index) {
		const target = $event.target;

		if (
			target.tagName.toLowerCase() === 'input' ||
			target.type === 'checkbox'
		) {
			return;
		}

		const row = this._findRow($event.target);
		const action = this._findRowAction($event.target);

		if (action) {
			return;
		}

		if (this.enableRowClick) {
			const item = this._items[index];
			this.rowClick.emit({
				item,
				ctrlDown: this._ctrlDown,
			});
			return;
		}

		if (!this._enableRowSelection) {
			return;
		}

		const checkbox = row?.querySelector('input[type="checkbox"]');

		if (!checkbox) {
			return;
		}

		checkbox.checked = !checkbox.checked;
		this._checkboxChange(checkbox, index);
	}

	private _findRow(el: HTMLElement) {
		if (!el) {
			return el;
		}

		if (el?.tagName?.toLowerCase() === 'p-table-row') {
			return el;
		}

		return this._findRow(el?.parentElement);
	}

	private _findRowAction(el: HTMLElement) {
		if (!el) {
			return null;
		}

		if (el.dataset.isAction !== null && el.dataset.isAction !== 'false') {
			return el;
		}

		if (el?.tagName?.toLowerCase() === 'p-table-row') {
			return null;
		}

		return this._findRowAction(el?.parentElement);
	}

	private _showFloatingMenu() {
		let actions = this._rowActionsFloatingAll;
		if (
			this.rowSelectionLimit === 1 &&
			actions.some(
				a => (a.type === 'single' || a.type === 'both') && a.showFunction
			)
		) {
			actions = actions.filter(
				a =>
					a.type === 'multi' ||
					!a.showFunction ||
					a.showFunction(this.selectedRows[0])
			);
		}

		this._rowActionsFloating = actions;
		this._floatingMenuShown = true;
	}

	private _parseDefinitions(
		definitionsArray: HTMLPTableColumnElement[] | HTMLPTableExtraHeaderElement[]
	) {
		return definitionsArray.map(definition => {
			definition = this._parseDefinitionSizes(definition);
			return definition;
		});
	}

	private _parseDefinitionSizes(
		definition: HTMLPTableColumnElement | HTMLPTableExtraHeaderElement
	) {
		const definitionAny = definition as any;
		let parsedSizes: TableColumnSizes = { default: 'full' };

		if (
			typeof definition.sizes === 'string' &&
			!['auto', 'hidden', 'full'].includes(definition.sizes)
		) {
			definition.sizes = JSON.parse(definition.sizes);
		}

		for (const [index, size] of tableColumSizesOptions.entries()) {
			if (
				definitionAny.sizes === 'auto' ||
				definitionAny.sizes === 'hidden' ||
				definitionAny.sizes === 'full' ||
				typeof definitionAny.sizes === 'number'
			) {
				parsedSizes[size] =
					definitionAny.sizes === 'auto' ? 'full' : definitionAny.sizes;
				continue;
			}

			parsedSizes[size] =
				definitionAny.sizes[size] ??
				parsedSizes[tableColumSizesOptions[index - 1]];
		}

		definition.parsedSizes = parsedSizes;
		return definition;
	}
}
