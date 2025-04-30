import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
	TemplateRef,
} from '@angular/core';
import { Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
	isMobile,
	QuickFilter,
	RowClickEvent,
	tableColumSizesOptions,
	floatingMenuContainerClass,
} from '@paperless/core';
import {
	IconVariant,
	IllustrationVariant,
	TableColumnSizes,
} from '@paperless/core/dist/types/components';
import {
	BehaviorSubject,
	distinctUntilChanged,
	filter,
	Subscription,
	take,
} from 'rxjs';
import {
	TableCustomActionsDirective,
	TableCustomFilterDirective,
	TableFilterModalDirective,
} from '../../directives';
import { TableColumn } from '../table-column/table-column.component';
import {
	AsyncItem,
	TableRowAction,
	TableRowActionQueryParams,
	TableRowActionRouterLink,
} from '../table-row-action/table-row-action.component';
import { defaultSize, defaultSizeOptions } from './constants';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'p-table-ngx',
	templateUrl: 'table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table implements OnInit, OnChanges {
	@HostBinding('class') className = 'flex flex-col z-0';

	/**
	 * The items to be fed to the table
	 */
	@Input() items!: string | any[];

	/**
	 * Wether data is loading
	 */
	@Input() loading: boolean = false;

	/**
	 * Wether the header should show loading state
	 */
	@Input() headerLoading: boolean = false;

	/**
	 * Wether the footer should show loading state
	 */
	@Input() footerLoading: boolean = false;

	/**
	 * The amount of loading rows to show
	 */
	@Input() amountOfLoadingRows: number = 6;

	/**
	 * Wether to enable selection
	 */
	@Input() enableRowSelection: boolean = true;

	/**
	 * A limit to the amount of rows that can be selected
	 */
	@Input() rowSelectionLimit: number | undefined = undefined;

	/**
	 * Wether to enable row clicking
	 */
	@Input() enableRowClick: boolean = true;

	/**
	 * The current selection of items
	 */
	@Input() selectedRows: any[] = [];

	/**
	 * Event whenever the current selection changes
	 */
	@Output() selectedRowsChange: EventEmitter<any> = new EventEmitter();

	/**
	 * The key to determine if a row is selected
	 */
	@Input() selectionKey: string | undefined;

	/**
	 * A key to determine if a row can be selected
	 */
	@Input() canSelectKey: string | undefined;

	/**
	 * Wether to enable the floating menu
	 */
	@Input() enableFloatingMenu: boolean = true;

	/**
	 * The floating menu amount item text
	 */
	@Input() floatingMenuAmountSelectedText: string = '0 items selected';

	/**
	 * The template for amount selected item in the floating menu
	 */
	@Input() floatingMenuAmountSelectedTemplate: any;

	/**
	 * Wether the floating menu has been shown atleast once
	 */
	public floatingMenuShown$ = new BehaviorSubject(false);

	/**
	 * Event whenever a row is clicked
	 */
	@Output() rowClick: EventEmitter<RowClickEvent> = new EventEmitter();

	/**
	 * Event whenever a row is selected
	 */
	@Output() rowSelected: EventEmitter<any> = new EventEmitter();

	/**
	 * Event whenever a row is deselected
	 */
	@Output() rowDeselected: EventEmitter<any> = new EventEmitter();

	/** START HEADER */

	/**
	 * Wether to show the header
	 */
	@Input() enableHeader: boolean = true;

	/**
	 * Quick filters to show
	 */
	@Input() quickFilters: QuickFilter[] = [];

	/**
	 * Active quick filter identifier
	 */
	@Input() activeQuickFilterIdentifier: string | undefined;

	/**
	 * Wether to show the search input
	 */
	@Input() enableSearch: boolean = true;

	/**
	 * The query to show in the search bar
	 */
	@Input() query: string | undefined;

	/**
	 * Wether to show the filter button
	 */
	@Input() enableFilter: boolean = true;

	/**
	 * Wether to show the filter button on desktop
	 */
	@Input() enableFilterDesktop: boolean = true;

	/**
	 * The amount of filters being selected
	 */
	@Input() selectedFiltersAmount: number | undefined;

	/**
	 * The template for the filter button text
	 */
	@Input() filterButtonTemplate: any;

	/**
	 * Wether to show the action button
	 */
	@Input() enableAction: boolean = false;

	/**
	 * Wether the action button is loading
	 */
	@Input() actionButtonLoading: boolean = false;

	/**
	 * The action button icon
	 */
	@Input() actionButtonIcon: IconVariant = 'pencil';

	/**
	 * Wether the action button is enabled
	 */
	@Input() actionButtonEnabled: boolean = true;

	/**
	 * The action button text if changed
	 */
	@Input() actionButtonText?: string;

	/**
	 * The template for the action button text
	 */
	@Input() actionButtonTemplate: any;

	/**
	 * Event when one of the quick filters is clicked
	 */
	@Output() quickFilter: EventEmitter<QuickFilter> = new EventEmitter();

	/**
	 * Event when the query changes
	 */
	@Output() queryChange: EventEmitter<string> = new EventEmitter();

	/**
	 * Event when the filter button is clicked
	 */
	@Output() filter: EventEmitter<null> = new EventEmitter();

	/**
	 * Event when the action button is clicked
	 */
	@Output() action: EventEmitter<null> = new EventEmitter();

	/** START FOOTER */

	/**
	 * Wether to show the footer
	 */
	@Input() enableFooter: boolean = true;

	/**
	 * Wether to enable pagination size select
	 */
	@Input() enablePaginationSize: boolean = true;

	/**
	 * Wether to enable pagination pages
	 */
	@Input() enablePaginationPages: boolean = true;

	/**
	 * Wether to enable export
	 */
	@Input() enableExport: boolean = true;

	/**
	 * The current page
	 */
	@Input() page: number = 1;

	/**
	 * The total amount of items
	 */
	@Input() total!: number;

	/**
	 * Event whenever the page changes
	 */
	@Output() pageChange: EventEmitter<number> = new EventEmitter();

	/**
	 * The amount of items per page
	 */
	@Input() pageSize: number = defaultSize;

	/**
	 * The options for the page size
	 */
	@Input() pageSizeOptions: number[] = defaultSizeOptions;

	/**
	 * Event whenever the page changes
	 */
	@Output() pageSizeChange: EventEmitter<number> = new EventEmitter();

	/**
	 * Event whenever the page changes
	 */
	@Output() export: EventEmitter<number> = new EventEmitter();

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Input() hideOnSinglePage: boolean = true;

	/* Empty state start */
	@Input() emptyStateType: 'no_filter' | 'filtered' = 'no_filter';

	@Input() emptyStateIllustration: IllustrationVariant = 'table';
	@Input() emptyStateHeader!: string;
	@Input() emptyStateContent!: string;
	@Input() emptyStateAction!: string;
	@Input() emptyStateActionIcon: IconVariant = 'plus';

	@Input() enableEmptyStateAction: boolean = true;

	@Input() emptyStateFilteredIllustration: IllustrationVariant = 'search';
	@Input() emptyStateFilteredHeader!: string;
	@Input() emptyStateFilteredContent!: string;

	/**
	 * Event whenever the empty state is clicked
	 */
	@Output() emptyStateActionClick: EventEmitter<null> = new EventEmitter();

	/* Empty state end */

	/*
	 * Wether to show the shadow or not
	 */
	@Input() shadow: boolean = true;

	public columns: any[] = [];
	public parsedItems: any[] = [];
	public loadingRows = Array.from({
		length: this.amountOfLoadingRows,
	});
	private _ctrlDown = false;

	// Angular stuff
	// custom filter template
	@ContentChild(TableCustomFilterDirective, {
		read: TemplateRef,
		static: true,
	})
	public headerCustomFilterTemplate: TemplateRef<any> | undefined;

	// custom actions template
	@ContentChild(TableCustomActionsDirective, {
		read: TemplateRef,
		static: true,
	})
	public headerCustomActionsTemplate: TemplateRef<any> | undefined;

	// column templates
	private _columnDefinitions!: QueryList<TableColumn>;

	@ContentChildren(TableColumn)
	set columnDefinitions(v: QueryList<TableColumn>) {
		this._columnDefinitions = v;
		this._generateColumns();
	}
	get columnDefinitions(): QueryList<TableColumn> {
		return this._columnDefinitions;
	}

	// filter modal
	@ContentChild(TableFilterModalDirective, {
		read: TemplateRef,
		static: true,
	})
	public filterModalTemplate: TemplateRef<any> | undefined;

	public filterModalShow$ = new BehaviorSubject(false);

	// row actions templates
	private _rowActions!: QueryList<TableRowAction>;
	private _rowActionsSubscriptions: Subscription[] = [];

	@ContentChildren(TableRowAction)
	set rowActions(v: QueryList<TableRowAction>) {
		this._rowActions = v;
		this._setRowSelectionData();
	}
	get rowActions(): QueryList<TableRowAction> {
		return this._rowActions;
	}

	@Input() filterModalHeaderText: string = 'Filters';
	@Input() filterModalSaveText: string = 'Save';
	@Input() filterModalCancelText: string = 'Cancel';
	@Input() filterModalResetText: string = 'Reset filters';

	@Input() filterModalShowReset: boolean = false;
	@Input() filterModalShowResetMobile: boolean = false;

	@Output() filterModalShow: EventEmitter<boolean> = new EventEmitter();
	@Output() filterModalSave: EventEmitter<void> = new EventEmitter();
	@Output() filterModalReset: EventEmitter<boolean> = new EventEmitter();

	public rowActionsRow$ = new BehaviorSubject<TableRowAction[]>([]);
	public rowActionsFloatingAll$ = new BehaviorSubject<TableRowAction[]>([]);
	public rowActionsFloating$ = new BehaviorSubject<TableRowAction[]>([]);

	public isMobile$ = new BehaviorSubject(isMobile());

	public floatingMenuContainerClass = floatingMenuContainerClass;

	private _resizeTimeout: unknown;
	private _inputEnableRowSelection: boolean = this.enableRowSelection;
	private _inputRowSelectionLimit: number | undefined = this.rowSelectionLimit;

	public footerHidden$ = new BehaviorSubject(false);

	constructor(private _changeDetection: ChangeDetectorRef) {}

	ngOnInit() {
		this._parseItems(this.items);

		this.loadingRows = Array.from({
			length: this.amountOfLoadingRows,
		});

		this.filterModalShow$
			.pipe(untilDestroyed(this), distinctUntilChanged())
			.subscribe(value => this.filterModalShow.next(value));
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['items']) {
			this._parseItems(changes['items'].currentValue);
		}

		if (changes['amountOfLoadingRows']) {
			this.loadingRows = Array.from({
				length: changes['amountOfLoadingRows'].currentValue,
			});
		}

		let calculateRowSelectionData = false;
		if (changes['enableRowSelection']) {
			this._inputEnableRowSelection =
				changes['enableRowSelection'].currentValue;
			calculateRowSelectionData = true;
		}

		if (changes['rowSelectionLimit']) {
			this._inputRowSelectionLimit = changes['rowSelectionLimit'].currentValue;
			calculateRowSelectionData = true;
		}

		if (calculateRowSelectionData || changes['selectedRows']) {
			this._setRowSelectionData();
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this._setRowSelectionData();
	}

	@HostListener('document:keydown', ['$event'])
	keyDown({ key }: { key: string }) {
		if (key !== 'Control' || this._ctrlDown === true) {
			return;
		}

		this._ctrlDown = true;
	}

	@HostListener('document:keyup', ['$event'])
	keyUp({ key }: { key: string }) {
		if (key !== 'Control' || this._ctrlDown === false) {
			return;
		}

		this._ctrlDown = false;
	}

	@HostListener('document:visibilitychange', ['$event'])
	visibilityChange() {
		if (document.visibilityState !== 'hidden' || this._ctrlDown === false) {
			return;
		}

		this._ctrlDown = false;
	}

	onQueryChange({ detail }: any) {
		this.queryChange.emit(detail);
	}

	onQuickFilter({ detail }: any) {
		this.quickFilter.emit(detail);
	}

	onPageSizeChange({ detail }: any) {
		this.pageSize = detail;
		this.pageSizeChange.emit(detail);
	}

	onPageChange({ detail }: any) {
		this.page = detail;
		this.pageChange.emit(detail);
	}

	onFilterModalSave() {
		this.filterModalSave.next();
		this.filterModalShow$.next(false);
	}

	onFilterModalReset(resetQuickFilter = false) {
		this.filterModalReset.next(resetQuickFilter);
		this.filterModalShow$.next(false);
	}

	emptyStateClicked() {
		if (!this.enableEmptyStateAction) {
			return;
		}

		this.emptyStateActionClick.emit();
	}

	parseRowActionsRow(actions: TableRowAction[] | null, rowIndex: number) {
		if (!actions?.length) {
			return [];
		}

		return actions.filter(
			a => !a.showFunction || a.showFunction(this.parsedItems[rowIndex])
		);
	}

	private _parseItems(items: string | any[]) {
		if (!items) {
			this.parsedItems = [];
			return;
		}

		if (Array.isArray(items)) {
			this.parsedItems = items;
			return;
		}

		this.parsedItems = JSON.parse(items);
	}

	private _generateColumns() {
		let definitionsArray = Array.from(this._columnDefinitions) as TableColumn[];

		definitionsArray = this._parseDefinitions(definitionsArray);

		this.columns = definitionsArray;
	}

	public _checkboxDisabled(item: any, rowIndex: number) {
		const selectionContains = this._selectionContains(item, rowIndex);
		return (
			(this.canSelectKey && !item[this.canSelectKey]) ||
			(this.rowSelectionLimit !== undefined &&
				!selectionContains &&
				this.selectedRows.length === this.rowSelectionLimit)
		);
	}

	public _selectAllChange($event: any, forceValue?: boolean) {
		if (!this.enableRowSelection) {
			return;
		}

		const value = forceValue === undefined ? $event.detail : forceValue;

		if (value) {
			const toAdd = [];
			for (let i = 0; i < this.parsedItems.length; i++) {
				const row = this.parsedItems[i];
				if (this.canSelectKey && !row[this.canSelectKey]) {
					continue;
				}

				if (this._selectionContains(row, i)) {
					continue;
				}

				toAdd.push(row);
				this.rowSelected.emit(row);

				if (
					this.rowSelectionLimit !== undefined &&
					this.selectedRows.length + toAdd.length === this.rowSelectionLimit
				) {
					break;
				}
			}

			this.selectedRows = [...this.selectedRows, ...toAdd];
			this.selectedRowsChange.emit(this.selectedRows);

			if (this.enableFloatingMenu) {
				this._showFloatingMenu();
			}

			return;
		}

		for (let i = 0; i < this.selectedRows.length; i++) {
			const value = this.selectedRows[i];
			const row = this.parsedItems.find(
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

	public _checkboxChange(target: any, index: number) {
		if (!this.enableRowSelection) {
			return;
		}

		const value = this._getCheckedValue(target);
		if (
			value &&
			this.rowSelectionLimit !== undefined &&
			this.selectedRows.length >= this.rowSelectionLimit
		) {
			target.checked = false;
			return;
		}

		const row = this.parsedItems[index];

		if (this.canSelectKey && !row[this.canSelectKey]) {
			target.checked = false;
			return;
		}

		if (value) {
			this.selectedRows = [...this.selectedRows, row];
			this.selectedRowsChange.emit(this.selectedRows);
			this.rowSelected.emit(row);

			if (this.enableFloatingMenu) {
				this._showFloatingMenu();
			}
			return;
		}

		const indexOfToRemove = this._selectionContains(row, index, true);

		// we need to do this, because splice does not trigger the selection setter.
		const selection = [...this.selectedRows];
		selection.splice(indexOfToRemove, 1);
		this.selectedRows = selection;
		this.selectedRowsChange.emit(this.selectedRows);
		this.rowDeselected.emit(row);
	}

	private _getCheckedValue(target: any) {
		return target?.checked;
	}

	private _getSelectionValue(row: any, index: number) {
		return this.selectionKey ? row?.[this.selectionKey] || index : index;
	}

	public _selectionContains(row: any, index: number, returnIndex = false): any {
		const returnValue = this.selectedRows.findIndex(
			item =>
				this._getSelectionValue(row, index) ===
				this._getSelectionValue(item, index)
		);
		return !returnIndex ? returnValue >= 0 : returnValue;
	}

	public _selectionContainsAll() {
		let returnValue = true;
		if (!this.parsedItems?.length) {
			return false;
		}

		if (
			this.rowSelectionLimit !== undefined &&
			this.selectedRows.length === this.rowSelectionLimit
		) {
			return true;
		}

		for (let i = 0; i < this.parsedItems?.length; i++) {
			const item = this.parsedItems[i];
			const contains = this._selectionContains(item, i);

			if (!contains) {
				returnValue = false;
				break;
			}
		}

		return returnValue;
	}

	public _selectionIndeterminate() {
		if (!this.parsedItems?.length || !this.selectedRows?.length) {
			return false;
		}

		if (
			this.rowSelectionLimit !== undefined &&
			this.selectedRows.length === this.rowSelectionLimit
		) {
			return false;
		}

		let containsCount = 0;
		for (let i = 0; i < this.parsedItems?.length; i++) {
			const item = this.parsedItems[i];
			const contains = this._selectionContains(item, i);

			if (contains) {
				containsCount++;
			}
		}

		return containsCount > 0 && containsCount !== this.parsedItems.length;
	}

	public _rowClick($event: MouseEvent, index: number) {
		const target = $event.target as HTMLElement;

		if (
			target.tagName.toLowerCase() === 'input' ||
			(target as HTMLInputElement).type === 'checkbox'
		) {
			return;
		}

		const row = this._findRow(target);
		const action = this._findRowAction(target);

		if (action) {
			return;
		}

		if (this.enableRowClick) {
			const item = this.parsedItems[index];
			this.rowClick.emit({
				item,
				ctrlDown: this._ctrlDown,
			});
			return;
		}

		if (!this.enableRowSelection) {
			return;
		}

		const checkbox = row?.querySelector('input[type="checkbox"]');

		if (!checkbox) {
			return;
		}

		checkbox.checked = !checkbox.checked;
		this._checkboxChange(checkbox, index);
	}

	public _getActionRouterLink(
		routerLink: TableRowActionRouterLink,
		rowIndex: number
	): BehaviorSubject<string | any[]> | AsyncItem<string | any[]> {
		if (typeof routerLink === 'function') {
			const item = this.parsedItems[rowIndex];
			return this._getActionRouterLink(routerLink(item), rowIndex);
		}

		if (typeof routerLink === 'string' || Array.isArray(routerLink)) {
			return new BehaviorSubject(routerLink);
		}

		return routerLink;
	}

	public _getActionQueryParams(
		queryParams: TableRowActionQueryParams,
		rowIndex: number
	): BehaviorSubject<Params> | AsyncItem<Params> {
		if (typeof queryParams === 'function') {
			const item = this.parsedItems[rowIndex];
			return this._getActionQueryParams(queryParams(item), rowIndex);
		}

		if (queryParams instanceof Object && queryParams.constructor === Object) {
			return new BehaviorSubject(queryParams);
		}

		return queryParams as AsyncItem<Params>;
	}

	public _rowActionClick(action: TableRowAction, rowIndex?: number) {
		if (action.disabled) {
			return;
		}

		if (action.loading) {
			return;
		}

		if (!action.action) {
			return;
		}

		if (
			action.type === 'multi' ||
			(action.type === 'both' && rowIndex === undefined)
		) {
			action.action.emit({
				items: this.selectedRows,
				multi: true,
				ctrlDown: this._ctrlDown,
			});
			return;
		}

		if (
			action.routerLink ||
			(Array.isArray(action.routerLink) && action.routerLink.length)
		) {
			return;
		}

		const item =
			rowIndex !== undefined
				? this.parsedItems[rowIndex]
				: this.selectedRows[0];
		action.action.emit({
			item,
			multi: false,
			ctrlDown: this._ctrlDown,
		});
	}

	private _findRow(el: HTMLElement | null): any {
		if (!el) {
			return el;
		}

		if (el?.tagName?.toLowerCase() === 'p-table-row') {
			return el;
		}

		return this._findRow(el?.parentElement);
	}

	private _findRowAction(el: HTMLElement | null): any {
		if (!el) {
			return null;
		}

		if (
			el.getAttribute('data-is-action') !== null &&
			el.getAttribute('data-is-action') !== 'false'
		) {
			return el;
		}

		if (el?.tagName?.toLowerCase() === 'p-table-row') {
			return null;
		}

		return this._findRowAction(el?.parentElement);
	}

	private _setRowSelectionData() {
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout as number);
		}

		// We add a timeout here because it's a lot easier on the machine to do these when someone is done
		// resizing and playing around with their browser
		this._resizeTimeout = setTimeout(() => {
			const mobile = isMobile();
			this.isMobile$.next(mobile);

			const actions = Array.from(this._rowActions) as TableRowAction[];

			if (this._rowActionsSubscriptions.length) {
				for (let subscription of this._rowActionsSubscriptions) {
					subscription.unsubscribe();
				}
			}

			this._rowActionsSubscriptions = actions.map(action =>
				action._loadingChanged
					.pipe(untilDestroyed(this))
					.subscribe(() => this._changeDetection.detectChanges())
			);

			// we hack this to any[] to make it work..
			const rowActionsRow = actions.filter(
				a => a.type === 'both' || a.type === 'single'
			);
			const rowActionsFloating = actions.filter(
				a =>
					(this._inputEnableRowSelection &&
						(a.type === 'both' || a.type === 'multi')) ||
					(mobile && a.type === 'single' && !a.routerLink)
			);

			let rowSelectionLimit = this._inputRowSelectionLimit;
			if (
				mobile && // we're mobile
				rowActionsFloating?.length && // we have atleast 1 item in _rowActionsFloating
				((rowSelectionLimit !== undefined && this.enableRowSelection) ||
					!this.enableRowSelection)
			) {
				rowSelectionLimit = 1;
			}

			this.rowSelectionLimit = rowSelectionLimit;

			let enableRowSelection = this._inputEnableRowSelection;
			if (
				mobile && // we're mobile
				rowActionsFloating?.length && // we have atleast 1 item in _rowActionsFloating
				!enableRowSelection
			) {
				enableRowSelection = true;
			}
			this.enableRowSelection = enableRowSelection;

			this.rowActionsRow$.next(rowActionsRow);
			this.rowActionsFloatingAll$.next(rowActionsFloating);

			this.floatingMenuShown$
				.pipe(
					take(1),
					filter(v => !!v)
				)
				.subscribe(() => this._showFloatingMenu());
		}, 200);
	}

	private _showFloatingMenu() {
		this.rowActionsFloatingAll$.pipe(take(1)).subscribe(actions => {
			if (
				this.rowSelectionLimit === 1 &&
				actions.findIndex(
					a => (a.type === 'single' || a.type === 'both') && a.showFunction
				) >= 0
			) {
				actions = actions.filter(
					a =>
						a.type === 'multi' ||
						!a.showFunction ||
						a.showFunction(this.selectedRows[0])
				);
			}

			this.rowActionsFloating$.next(actions);
			this.floatingMenuShown$.next(true);
		});
	}

	private _parseDefinitions(definitionsArray: TableColumn[]) {
		return definitionsArray.map(definition => {
			definition = this._parseDefinitionSizes(definition);
			return definition;
		});
	}

	private _parseDefinitionSizes(definition: TableColumn) {
		const definitionAny = definition as any;
		let parsedSizes: TableColumnSizes = { default: 'full' };

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
