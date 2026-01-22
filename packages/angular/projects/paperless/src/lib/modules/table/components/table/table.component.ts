/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
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
	ViewChild,
	ViewChildren,
	AfterViewInit,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
	BehaviorSubject,
	debounceTime,
	distinctUntilChanged,
	filter,
	Subscription,
	take,
} from 'rxjs';

import {
	cn,
	floatingMenuContainerClass,
	isMobile,
	onStateChange,
	state,
	TABLE_COLUMN_SIZES,
	IconVariant,
	IllustrationVariant,
	QuickFilter,
	RowClickEvent,
	TableColumnSizes,
} from '@paperless/core';

import {
	PButton,
	PCheckbox,
	PEmptyState,
	PFloatingMenuContainer,
	PFloatingMenuItem,
	PLoader,
	PModal,
	PTableContainer,
	PTableFooter,
	PTableHeader,
	PTableRow,
	PTableRowActionsContainer,
	PTooltip,
} from '../../../../stencil/components';
import {
	PTableCustomActionsDirective,
	PTableCustomFilterDirective,
	PTableFilterModalDirective,
} from '../../directives';
import { PTableCustomRowDirective } from '../../directives/p-table-custom-row.directive';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { TableColumnComponent } from '../table-column/table-column.component';
import { TableExtraHeaderComponent } from '../table-extra-header/table-extra-header.component';
import {
	AsyncItem,
	TableRowActionComponent,
	TableRowActionQueryParams,
	TableRowActionRouterLink,
} from '../table-row-action/table-row-action.component';

import { defaultSize, defaultSizeOptions } from './constants';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'p-table-ngx',
	templateUrl: 'table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		AsyncPipe,
		RouterLink,
		NgTemplateOutlet,

		PModal,
		PEmptyState,
		PLoader,
		PButton,
		PCheckbox,
		PTooltip,
		PTableContainer,
		PTableHeader,
		PTableRow,
		PTableFooter,
		PFloatingMenuContainer,
		PFloatingMenuItem,
		PTableRowActionsContainer,
		TableCellComponent,
	],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
	@HostBinding('class') hostClass = 'flex flex-col z-0';
	@HostBinding('attr.data-theme') theme = state.theme;

	/**
	 * The items to be fed to the table
	 */
	@Input() items!: string | any[];

	/**
	 * Wether data is loading
	 */
	@Input() loading = false;

	/**
	 * Wether the header should show loading state
	 */
	@Input() headerLoading = false;

	/**
	 * Wether the footer should show loading state
	 */
	@Input() footerLoading = false;

	/**
	 * The amount of loading rows to show
	 */
	@Input() amountOfLoadingRows = 6;

	/**
	 * Wether to enable selection
	 */
	@Input() enableRowSelection = true;

	/**
	 * A limit to the amount of rows that can be selected
	 */
	@Input() rowSelectionLimit: number | undefined = undefined;

	/**
	 * Wether to enable row clicking
	 */
	@Input() enableRowClick = true;

	/**
	 * The current selection of items
	 */
	@Input() selectedRows: any[] = [];

	/**
	 * Event whenever the current selection changes
	 */
	@Output() selectedRowsChange = new EventEmitter<any>();

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
	@Input() enableFloatingMenu = true;

	/**
	 * The floating menu amount item text
	 */
	@Input() floatingMenuAmountSelectedText = '0 items selected';

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
	@Output() rowClick = new EventEmitter<RowClickEvent>();

	/**
	 * Event whenever a row is selected
	 */
	@Output() rowSelected = new EventEmitter<any>();

	/**
	 * Event whenever a row is deselected
	 */

	@Output() rowDeselected = new EventEmitter<any>();

	/** START HEADER */

	/**
	 * Wether to show the header
	 */
	@Input() enableHeader = true;

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
	@Input() enableSearch = true;

	/**
	 * The query to show in the search bar
	 */
	@Input() query: string | undefined;

	/**
	 * Wether to show the filter button
	 */
	@Input() enableFilter = true;

	/**
	 * Wether to show the filter button on desktop
	 */
	@Input() enableFilterDesktop = true;

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
	@Input() enableAction = false;

	/**
	 * Wether the action button is loading
	 */
	@Input() actionButtonLoading = false;

	/**
	 * The action button icon
	 */
	@Input() actionButtonIcon: IconVariant = 'pencil';

	/**
	 * Wether the action button is enabled
	 */
	@Input() actionButtonEnabled = true;

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
	@Output() quickFilter = new EventEmitter<QuickFilter>();

	/**
	 * Event when the query changes
	 */
	@Output() queryChange = new EventEmitter<string>();

	/**
	 * Event when the filter button is clicked
	 */
	@Output() filter = new EventEmitter<null>();

	/**
	 * Event when the action button is clicked
	 */
	@Output() action = new EventEmitter<null>();

	/** START FOOTER */

	/**
	 * Wether to show the footer
	 */
	@Input() enableFooter = true;

	/**
	 * Wether to enable pagination size select
	 */
	@Input() enablePaginationSize = true;

	/**
	 * Wether to enable pagination pages
	 */
	@Input() enablePaginationPages = true;

	/**
	 * Wether to enable export
	 */
	@Input() enableExport = true;

	/**
	 * The current page
	 */
	@Input() page = 1;

	/**
	 * The total amount of items
	 */
	@Input() total!: number;

	/**
	 * Event whenever the page changes
	 */
	@Output() pageChange = new EventEmitter<number>();

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
	@Output() pageSizeChange = new EventEmitter<number>();

	/**
	 * Event whenever the page changes
	 */
	@Output() export = new EventEmitter<number>();

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Input() hideOnSinglePage = true;

	/* Empty state start */
	@Input() emptyStateType: 'no_filter' | 'filtered' = 'no_filter';

	@Input() emptyStateIllustration: IllustrationVariant = 'table';
	@Input() emptyStateHeader!: string;
	@Input() emptyStateContent!: string;
	@Input() emptyStateAction!: string;
	@Input() emptyStateActionIcon: IconVariant = 'plus';

	@Input() enableEmptyStateAction = true;

	@Input() emptyStateFilteredIllustration: IllustrationVariant = 'search';
	@Input() emptyStateFilteredHeader!: string;
	@Input() emptyStateFilteredContent!: string;

	/**
	 * Wether to enable scrolling
	 */
	@Input() enableScroll = false;
	@ViewChildren(PTableRow, { read: ElementRef }) tableRows!: QueryList<
		ElementRef<PTableRow>
	>;
	@ViewChildren(TableCellComponent, { read: ElementRef })
	tableCells!: QueryList<ElementRef<TableCellComponent>>;
	@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

	public reachedScrollStart$ = new BehaviorSubject(true);
	public reachedScrollEnd$ = new BehaviorSubject(false);
	private _totalWidth = 0;
	private _calculateColumnWidthsTimeout?: number;

	private _rowChangesSubscription?: Subscription;
	private _cellChangesSubscription?: Subscription;

	/**
	 * Event whenever the empty state is clicked
	 */
	@Output() emptyStateActionClick = new EventEmitter<null>();

	/* Empty state end */

	/*
	 * Wether to show the shadow or not
	 */
	@Input() shadow = true;

	public extraHeaders$ = new BehaviorSubject<any[]>([]);

	public columns$ = new BehaviorSubject<any[]>([]);

	public parsedItems: any[] = [];
	public loadingRows = Array.from({
		length: this.amountOfLoadingRows,
	});
	private _ctrlDown = false;

	// Angular stuff
	// custom filter template
	@ContentChild(PTableCustomFilterDirective, {
		read: TemplateRef,
		static: true,
	})
	public headerCustomFilterTemplate: TemplateRef<any> | undefined;

	// custom actions template
	@ContentChild(PTableCustomActionsDirective, {
		read: TemplateRef,
		static: true,
	})
	public headerCustomActionsTemplate: TemplateRef<any> | undefined;

	// column templates
	@ContentChildren(TableColumnComponent)
	columnDefinitions!: QueryList<TableColumnComponent>;
	@ContentChildren(TableExtraHeaderComponent)
	extraHeaderDefinitions!: QueryList<TableExtraHeaderComponent>;

	// filter modal
	@ContentChild(PTableFilterModalDirective, {
		read: TemplateRef,
		static: true,
	})
	public filterModalTemplate: TemplateRef<any> | undefined;

	public filterModalShow$ = new BehaviorSubject(false);

	// row actions templates
	private _rowActions!: QueryList<TableRowActionComponent>;
	private _rowActionsSubscriptions: Subscription[] = [];

	@ContentChildren(TableRowActionComponent)
	set rowActions(v: QueryList<TableRowActionComponent>) {
		this._rowActions = v;
		this._setRowSelectionData();
	}
	get rowActions(): QueryList<TableRowActionComponent> {
		return this._rowActions;
	}

	// custom rows templates
	@ContentChildren(PTableCustomRowDirective)
	customRows!: QueryList<PTableCustomRowDirective>;

	@Input() filterModalHeaderText = 'Filters';
	@Input() filterModalSaveText = 'Save';
	@Input() filterModalCancelText = 'Cancel';
	@Input() filterModalResetText = 'Reset filters';

	@Input() filterModalShowReset = false;
	@Input() filterModalShowResetMobile = false;

	@Output() filterModalShow = new EventEmitter<boolean>();
	@Output() filterModalSave = new EventEmitter<void>();
	@Output() filterModalReset = new EventEmitter<boolean>();

	public rowActionsRow$ = new BehaviorSubject<TableRowActionComponent[]>([]);
	public rowActionsFloatingAll$ = new BehaviorSubject<
		TableRowActionComponent[]
	>([]);
	public rowActionsFloating$ = new BehaviorSubject<TableRowActionComponent[]>(
		[]
	);

	public isMobile$ = new BehaviorSubject(isMobile());

	// sticky self-center
	// mt-4 -mb-5 bottom-11 z-[3]
	// my-4 bottom-0
	// pointer-events-none animate-floating-menu-container-out
	// animate-floating-menu-container-in
	// hidden
	// inline-block
	public floatingMenuContainerClass = floatingMenuContainerClass;

	private _resizeTimeout: unknown;
	private _inputEnableRowSelection: boolean = this.enableRowSelection;
	private _inputRowSelectionLimit: number | undefined = this.rowSelectionLimit;

	private _themeDebounce?: ReturnType<typeof setTimeout>;

	public footerHidden$ = new BehaviorSubject(false);

	public cn = cn;

	constructor(private _cd: ChangeDetectorRef) {}

	ngOnInit() {
		this._parseItems(this.items);

		onStateChange('theme', (value: 'dark' | 'light') =>
			this._checkTheme(value)
		);

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

		if (changes['enableScroll']?.currentValue) {
			this._checkChangesSubscriptions();
		}
	}

	ngAfterViewInit() {
		if (this.enableScroll) {
			this._checkChangesSubscriptions();
		}

		if (this.columnDefinitions) {
			this.columnDefinitions.changes
				.pipe(untilDestroyed(this), debounceTime(100))
				.subscribe(() => this._generateColumns());
			this._generateColumns();
		}

		if (this.extraHeaderDefinitions) {
			this.extraHeaderDefinitions.changes
				.pipe(untilDestroyed(this), debounceTime(100))
				.subscribe(() => this._generateExtraHeaders());
			this._generateExtraHeaders();
		}
	}

	@HostListener('window:resize')
	onResize() {
		this._setRowSelectionData();
		this._calculateColumnWidths();
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

	@HostListener('document:visibilitychange')
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
		if (this.enableAction) {
			this.action.emit();
			return;
		}

		if (!this.enableEmptyStateAction) {
			return;
		}

		this.emptyStateActionClick.emit();
	}

	parseRowActionsRow(
		actions: TableRowActionComponent[] | null,
		rowIndex: number
	) {
		if (!actions?.length) {
			return [];
		}

		return actions.filter(
			a => !a.showFunction || a.showFunction(this.parsedItems[rowIndex])
		);
	}

	onContainerXScroll(ev: any) {
		if (!this.enableScroll) {
			return;
		}

		this._calculateScrollPosition(ev);
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
		let definitionsArray = [...this.columnDefinitions];

		definitionsArray = this._parseDefinitions(
			definitionsArray
		) as unknown as TableColumnComponent[];

		this.columns$.next(definitionsArray);
	}

	private _generateExtraHeaders() {
		let definitionsArray = [...this.extraHeaderDefinitions];

		definitionsArray = this._parseDefinitions(
			definitionsArray
		) as unknown as TableExtraHeaderComponent[];

		for (const col of definitionsArray) {
			col.sticky = col.sticky === true ? 'secondary' : false;
		}

		this.extraHeaders$.next(definitionsArray);
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
		return returnIndex ? returnValue : returnValue !== -1;
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

	public _rowActionClick(action: TableRowActionComponent, rowIndex?: number) {
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
			(Array.isArray(action.routerLink) && action.routerLink.length > 0)
		) {
			return;
		}

		const item =
			rowIndex === undefined
				? this.selectedRows[0]
				: this.parsedItems[rowIndex];
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
			el.dataset['isAction'] !== undefined &&
			el.dataset['isAction'] !== 'false'
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

			const actions = [...this._rowActions] as TableRowActionComponent[];

			if (this._rowActionsSubscriptions.length > 0) {
				for (const subscription of this._rowActionsSubscriptions) {
					subscription.unsubscribe();
				}
			}

			this._rowActionsSubscriptions = actions.map(action =>
				action._loadingChanged
					.pipe(untilDestroyed(this))
					.subscribe(() => this._cd.detectChanges())
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

			this.rowActionsFloating$.next(actions);
			this.floatingMenuShown$.next(true);
		});
	}

	private _parseDefinitions(
		definitionsArray: TableColumnComponent[] | TableExtraHeaderComponent[]
	) {
		return definitionsArray.map(definition =>
			this._parseDefinitionSizes(definition)
		);
	}

	private _parseDefinitionSizes(
		definition: TableColumnComponent | TableExtraHeaderComponent
	) {
		const definitionAny = definition as any;
		const parsedSizes: TableColumnSizes = { default: 'full' };

		for (const [index, size] of TABLE_COLUMN_SIZES.entries()) {
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
				definitionAny.sizes[size] ?? parsedSizes[TABLE_COLUMN_SIZES[index - 1]];
		}

		definition.parsedSizes = parsedSizes;
		return definition;
	}

	private _checkChangesSubscriptions() {
		if (!this._rowChangesSubscription && this.tableRows) {
			this._rowChangesSubscription = this.tableRows.changes
				.pipe(untilDestroyed(this), debounceTime(100))
				.subscribe(() => this._calculateColumnWidths());
		}

		if (!this._cellChangesSubscription && this.tableCells) {
			this._cellChangesSubscription = this.tableCells.changes
				.pipe(untilDestroyed(this), debounceTime(100))
				.subscribe(() => this._calculateColumnWidths());
		}
	}

	private _calculateColumnWidths() {
		if (!this.enableScroll) {
			return;
		}

		if (!this.tableCells || !this.tableRows) {
			return;
		}

		if (this._calculateColumnWidthsTimeout) {
			clearTimeout(this._calculateColumnWidthsTimeout);
			this._calculateColumnWidthsTimeout = 0;
		}

		const rows = this.tableRows.map(
			c => c.nativeElement as unknown as HTMLElement
		);
		const cells = rows.flatMap(
			row => [...row.querySelectorAll('p-table-cell-ngx')] as HTMLElement[]
		);

		this._calculateColumnWidthsTimeout = setTimeout(async () => {
			this._setRowsWidth(rows);

			const promises: Promise<void>[] = [];
			for (const cell of cells) {
				if (cell.style.width?.length) {
					cell.setAttribute('style', '');
				}

				promises.push(
					new Promise(resolve =>
						setTimeout(() => {
							const rect = cell.getBoundingClientRect();
							cell.setAttribute('style', `width: ${rect.width}px !important`);
							resolve();
						}, 100)
					)
				);
			}

			await Promise.all(promises);

			this._setRowsWidth(rows, 'min-content');

			this._resetScrollPosition();
		}, 200) as unknown as number;
	}

	private _setRowsWidth(
		rows: HTMLElement[],
		value: 'min-content' | null = null
	) {
		for (const [i, row] of rows.entries()) {
			const shadow = row.shadowRoot;
			if (!shadow) {
				continue;
			}

			const firstDiv = shadow.querySelector('*:nth-child(1)');
			if (!firstDiv) {
				continue;
			}

			const secondDiv = firstDiv.querySelector('*:nth-child(1)');
			if (!secondDiv) {
				continue;
			}

			if (value === null) {
				firstDiv.setAttribute('style', '');
				secondDiv.setAttribute('style', '');
				continue;
			}

			firstDiv.setAttribute('style', 'width: min-content;');
			secondDiv.setAttribute('style', 'width: min-content;');

			if (i === 0) {
				this._totalWidth = firstDiv.getBoundingClientRect().width;
			}
		}
	}

	private _resetScrollPosition() {
		if (this.scrollContainer) {
			this.scrollContainer.nativeElement.scrollLeft = 0;
		}

		this.reachedScrollStart$.next(true);
		this.reachedScrollEnd$.next(false);

		this._calculateScrollPosition({
			target: this.scrollContainer.nativeElement,
		});
	}

	private _calculateScrollPosition({ target }: { target: HTMLDivElement }) {
		this.reachedScrollStart$.next(target.scrollLeft < 10);

		const right = target.scrollLeft + target.getBoundingClientRect().width;
		this.reachedScrollEnd$.next(right > this._totalWidth - 10);
	}

	private _checkTheme(value: 'dark' | 'light') {
		if (this._themeDebounce) {
			clearTimeout(this._themeDebounce);
			this._themeDebounce = undefined;
		}

		this._themeDebounce = setTimeout(() => {
			this.theme = value;
			this._cd.detectChanges();
		}, 100);
	}
}
