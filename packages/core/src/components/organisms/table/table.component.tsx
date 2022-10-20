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
import { QuickFilter } from '../../../types/table';
import { objectGetByPath } from '../../../utils/object-get-by-path';
import { TableDefinition } from '../../helpers/table-definition/table-definition.component';
import {
    defaultSize,
    defaultSizeOptions,
} from '../../molecules/page-size-select/constants';
import { templateFunc } from '../../molecules/page-size-select/page-size-select.component';

@Component({
    tag: 'p-table',
    styleUrl: 'table.component.scss',
    shadow: false,
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
     * Wether to enable selection
     */
    @Prop() enableRowSelection: boolean = true;

    /**
     * Wether to enable row clicking
     */
    @Prop() enableRowClick: boolean = true;

    /**
     * The current selection of items
     */
    @Prop() selectedRows: any[] = [];

    /**
     * Event whenever the current selection changes
     */
    @Event() selectedRowsChange: EventEmitter<any>;

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
    @Event() rowClick: EventEmitter<any>;

    /**
     * Event whenever a row is selected
     */
    @Event() rowSelected: EventEmitter<any>;

    /**
     * Event whenever a row is deselected
     */
    @Event() rowDeselected: EventEmitter<any>;

    /** START HEADER */
    /**
     * Quick filters to show
     */
    @Prop() quickFilters: QuickFilter[] = [];

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
     * The amount of filters being selected
     */
    @Prop() selectedFiltersAmount: number;

    /**
     * The template for the filter button text
     */
    @Prop() filterButtonTemplate: templateFunc;

    /**
     * Wether to show the edit button
     */
    @Prop() enableEdit: boolean = true;

    /**
     * The template for the edit button text
     */
    @Prop() editButtonTemplate: templateFunc;

    /**
     * Event when one of the quick filters is clicked
     */
    @Event() quickFilter: EventEmitter<QuickFilter>;

    /**
     * Event when the query changes
     */
    @Event() queryChange: EventEmitter<string>;

    /**
     * Event when the filter button is clicked
     */
    @Event() filter: EventEmitter<null>;

    /**
     * Event when the edit button is clicked
     */
    @Event() edit: EventEmitter<null>;

    /** START FOOTER */

    /**
     * Wether to enable page size select
     */
    @Prop() enablePageSize: boolean = true;

    /**
     * Wether to enable pagination
     */
    @Prop() enablePagination: boolean = true;

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
    @Event() pageChange: EventEmitter<number>;

    /**
     * The amount of items per page
     */
    @Prop() pageSize: number = defaultSize;

    /**
     * The options for the page size
     */
    @Prop() pageSizeOptions: number[] = defaultSizeOptions;

    /**
     * Event whenever the page changes
     */
    @Event() pageSizeChange: EventEmitter<number>;

    /**
     * Event whenever the page changes
     */
    @Event() export: EventEmitter<number>;

    /**
     * Wether to hide when there is only 1 page available
     */
    @Prop() hideOnSinglePage: boolean = true;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _columns: any[] = [];
    @State() private _items: any[] = [];

    componentWillLoad() {
        this._parseItems(this.items);
        this._generateColumns();
    }

    render() {
        return (
            <Host class="p-table">
                <p-table-container>
                    <p-table-header
                        // quick filters
                        quickFilters={this.quickFilters}
                        activeQuickFilterIdentifier={
                            this.activeQuickFilterIdentifier
                        }
                        onQuickFilter={({ detail }) =>
                            this.quickFilter.emit(detail)
                        }
                        // search
                        enableSearch={this.enableSearch}
                        query={this.query}
                        onQueryChange={({ detail }) =>
                            this.queryChange.emit(detail)
                        }
                        // filter button
                        enableFilter={this.enableFilter}
                        selectedFiltersAmount={this.selectedFiltersAmount}
                        filterButtonTemplate={this.filterButtonTemplate}
                        onFilter={() => this.filter.emit()}
                        // edit button
                        enableEdit={this.enableEdit}
                        canEdit={!!this.selectedRows?.length}
                        editButtonTemplate={this.editButtonTemplate}
                        onEdit={() => this.edit.emit()}
                        itemsSelectedAmount={this.selectedRows?.length}
                    ></p-table-header>

                    {this._getHeader()}
                    <div class="flex flex-col">{this._getRows()}</div>

                    <p-table-footer
                        // overall
                        hideOnSinglePage={this.hideOnSinglePage}
                        // page size select
                        enablePageSize={this.enablePageSize}
                        pageSize={this.pageSize}
                        pageSizeOptions={this.pageSizeOptions}
                        onPageSizeChange={({ detail }) =>
                            this.pageSizeChange.emit(detail)
                        }
                        // pagination
                        enablePagination={this.enablePagination}
                        page={this.page}
                        total={this.total}
                        onPageChange={({ detail }) =>
                            this.pageChange.emit(detail)
                        }
                        // export
                        enableExport={this.enableExport}
                        onExport={() => this.export.emit()}
                    ></p-table-footer>
                </p-table-container>
            </Host>
        );
    }

    @Listen('tableDefinitionChanged', { target: 'body' })
    onTableDefinitionUpdated() {
        this._generateColumns();
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

    private _generateColumns() {
        const definitions = this._el.querySelectorAll('p-table-definition');
        this._columns = Array.from(definitions);
    }

    private _getHeader() {
        return (
            <p-table-row variant="header">
                {this._columns.map((col: TableDefinition, index) => (
                    <div class={this._getColumnClasses(col, true)}>
                        {this._getCheckbox(index, null, 'header')}

                        <div class="flex">{col.name}</div>
                    </div>
                ))}
            </p-table-row>
        );
    }

    private _getRows() {
        if (this.loading) {
            return Array.from(
                {
                    length: this.pageSizeOptions?.[0]
                        ? this.pageSizeOptions?.[0] / 2
                        : 4,
                },
                (_, i) => (
                    <p-table-row
                        enableHover={
                            this.enableRowSelection || this.enableRowClick
                        }
                    >
                        {this._getLoadingColumns(i)}
                    </p-table-row>
                )
            );
        }

        return this._items.map((item, index) => (
            <p-table-row
                enableHover={this.enableRowSelection || this.enableRowClick}
                onClick={(ev) => this._rowClick(ev, index)}
            >
                {this._getRowColumns(item, index)}
            </p-table-row>
        ));
    }

    private _getRowColumns(item, index) {
        return this._columns.map((col: TableDefinition, colIndex) => {
            return (
                <div class={this._getColumnClasses(col)}>
                    {this._getCheckbox(colIndex, index)}
                    <div class="flex" data-is-action="true">
                        {col.template({
                            value: objectGetByPath(item, col.path),
                            item,
                            index,
                        })}
                    </div>
                </div>
            );
        });
    }

    private _getLoadingColumns(index) {
        return this._columns.map((col: TableDefinition, colIndex) => {
            return (
                <div class={this._getColumnClasses(col)}>
                    {this._getCheckbox(colIndex, index, 'loading')}
                    <p-loader
                        variant="ghost"
                        class="rounded flex-1 w-full h-6"
                    />
                </div>
            );
        });
    }

    private _getCheckbox(
        index,
        rowIndex,
        variant: 'header' | 'default' | 'loading' = 'default'
    ) {
        if (variant === 'loading') {
            return (
                this.enableRowSelection &&
                index === 0 && (
                    <p-loader variant="ghost" class="rounded w-6 h-6" />
                )
            );
        }

        if (variant === 'header') {
            return (
                this.enableRowSelection &&
                index === 0 && (
                    <input
                        class="p-input"
                        type="checkbox"
                        onChange={(ev) => this._selectAllChange(ev)}
                        checked={this._selectionContainsAll()}
                        indeterminate={this._selectionIndeterminate()}
                    />
                )
            );
        }

        const item = this._items[rowIndex];

        return (
            this.enableRowSelection &&
            index === 0 && (
                <input
                    class="p-input"
                    type="checkbox"
                    onChange={(ev) =>
                        this._checkboxChange(ev?.target, rowIndex)
                    }
                    disabled={this.canSelectKey && !item[this.canSelectKey]}
                    checked={this._selectionContains(item, rowIndex)}
                />
            )
        );
    }

    private _getColumnClasses(col?: TableDefinition, isHeader = false) {
        const sizes = col ? this._getSizes(col) : {};
        return {
            flex: true,
            'gap-4': true,
            'items-center': true,
            'justify-start': !col?.align || col?.align === 'start',
            'justify-center': col?.align === 'center',
            'justify-end': col?.align === 'end',
            'font-semibold': !isHeader && col?.type === 'th',
            'text-storm-dark': !isHeader && col?.type === 'th',
            ...sizes,
        };
    }

    private _selectAllChange($event: any) {
        if (!this.enableRowSelection) {
            return;
        }

        const value = this._getCheckedValue($event.target);
        if (value) {
            for (let i = 0; i < this._items.length; i++) {
                const row = this._items[i];
                if (this.canSelectKey && !row[this.canSelectKey]) {
                    continue;
                }

                const key = this._getSelectionValue(row, i);

                if (this.selectedRows.indexOf(key) >= 0) {
                    continue;
                }

                this.selectedRows = [...this.selectedRows, key];
                this.rowSelected.emit(row);
            }

            this.selectedRowsChange.emit(this.selectedRows);
            return;
        }

        for (let i = 0; i < this.selectedRows.length; i++) {
            const value = this.selectedRows[i];
            const row = this._items.find(
                (d) => this._getSelectionValue(d, i) === value
            );

            if (!row) {
                continue;
            }

            this.rowDeselected.emit(row);
        }

        this.selectedRows = [];
        this.selectedRowsChange.emit(this.selectedRows);
    }

    private _checkboxChange(target: any, index: number) {
        if (!this.enableRowSelection) {
            return;
        }

        const row = this._items[index];

        if (this.canSelectKey && !row[this.canSelectKey]) {
            target.checked = false;
            return;
        }

        const value = this._getCheckedValue(target);
        if (value) {
            this.selectedRows = [...this.selectedRows, row];
            this.selectedRowsChange.emit(this.selectedRows);
            this.rowSelected.emit(row);
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

    private _selectionContains(row, index, returnIndex = false): any {
        const returnValue = this.selectedRows.findIndex(
            (item) =>
                this._getSelectionValue(row, index) ===
                this._getSelectionValue(item, index)
        );
        return !returnIndex ? returnValue >= 0 : returnValue;
    }

    private _selectionContainsAll() {
        let returnValue = true;
        if (!this._items?.length) {
            return false;
        }

        for (let i = 0; i < this._items?.length; i++) {
            const item = this._items[i];
            const contains = this._selectionContains(item, i);

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

        let containsCount = 0;
        for (let i = 0; i < this._items?.length; i++) {
            const item = this._items[i];
            const contains = this._selectionContains(item, i);

            if (contains) {
                containsCount++;
            }
        }

        return containsCount > 0;
    }

    private _rowClick($event, index) {
        const target = $event.target;

        if (
            target.tagName.toLowerCase() === 'input' ||
            target.type === 'checkbox'
        ) {
            return this._checkboxChange(target, index);
        }

        const row = this._findRow($event.target);

        if (this.enableRowClick) {
            const action = this._findRowAction($event.target);

            if (action) {
                return;
            }

            const item = this._items[index];
            this.rowClick.emit(item);
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

    /* 
     With this, we shall hack the system in ways no one would ever have thought.
     
     w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12 w-10/12 w-11/12 w-12/12
     tablet:w-1/12 tablet:w-2/12 tablet:w-3/12 tablet:w-4/12 tablet:w-5/12 tablet:w-6/12 tablet:w-7/12 tablet:w-8/12 tablet:w-9/12 tablet:w-10/12 tablet:w-11/12 tablet:w-12/12
     desktop-xs:w-1/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-12/12
     desktop-xs:w-1/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-12/12
     desktop-sm:w-1/12 desktop-sm:w-2/12 desktop-sm:w-3/12 desktop-sm:w-4/12 desktop-sm:w-5/12 desktop-sm:w-6/12 desktop-sm:w-7/12 desktop-sm:w-8/12 desktop-sm:w-9/12 desktop-sm:w-10/12 desktop-sm:w-11/12 desktop-sm:w-12/12
     desktop:w-1/12 desktop:w-2/12 desktop:w-3/12 desktop:w-4/12 desktop:w-5/12 desktop:w-6/12 desktop:w-7/12 desktop:w-8/12 desktop:w-9/12 desktop:w-10/12 desktop:w-11/12 desktop:w-12/12
     desktop-lg:w-1/12 desktop-lg:w-2/12 desktop-lg:w-3/12 desktop-lg:w-4/12 desktop-lg:w-5/12 desktop-lg:w-6/12 desktop-lg:w-7/12 desktop-lg:w-8/12 desktop-lg:w-9/12 desktop-lg:w-10/12 desktop-lg:w-11/12 desktop-lg:w-12/12
     desktop-xl:w-1/12 desktop-xl:w-2/12 desktop-xl:w-3/12 desktop-xl:w-4/12 desktop-xl:w-5/12 desktop-xl:w-6/12 desktop-xl:w-7/12 desktop-xl:w-8/12 desktop-xl:w-9/12 desktop-xl:w-10/12 desktop-xl:w-11/12 desktop-xl:w-12/12

     
        ⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⠿⣷⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⣷⠿⣿⣿⣶⣦⣀⠀⠀⠀⠀⠀
        ⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣶⣦⣬⡉⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠚⢉⣥⣴⣾⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀
        ⠀⠀⠀⡾⠿⠛⠛⠛⠛⠿⢿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⠿⠿⠛⠛⠛⠛⠿⢧⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⣠⣤⠶⠶⠶⠰⠦⣤⣀⠀⠙⣷⠀⠀⠀⠀⠀⠀⠀⢠⡿⠋⢀⣀⣤⢴⠆⠲⠶⠶⣤⣄⠀⠀⠀⠀⠀⠀⠀
        ⠀⠘⣆⠀⠀⢠⣾⣫⣶⣾⣿⣿⣿⣿⣷⣯⣿⣦⠈⠃⡇⠀⠀⠀⠀⢸⠘⢁⣶⣿⣵⣾⣿⣿⣿⣿⣷⣦⣝⣷⡄⠀⠀⡰⠂⠀
        ⠀⠀⣨⣷⣶⣿⣧⣛⣛⠿⠿⣿⢿⣿⣿⣛⣿⡿⠀⠀⡇⠀⠀⠀⠀⢸⠀⠈⢿⣟⣛⠿⢿⡿⢿⢿⢿⣛⣫⣼⡿⣶⣾⣅⡀⠀
        ⢀⡼⠋⠁⠀⠀⠈⠉⠛⠛⠻⠟⠸⠛⠋⠉⠁⠀⠀⢸⡇⠀⠀⠄⠀⢸⡄⠀⠀⠈⠉⠙⠛⠃⠻⠛⠛⠛⠉⠁⠀⠀⠈⠙⢧⡀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇⢠⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡇⠀⠀⠀⠀⢸⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⠁⣿⠇⠀⠀⠀⠀⢸⡇⠙⢿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠰⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⠖⡾⠁⠀⠀⣿⠀⠀⠀⠀⠀⠘⣿⠀⠀⠙⡇⢸⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠄⠀
        ⠀⠀⢻⣷⡦⣤⣤⣤⡴⠶⠿⠛⠉⠁⠀⢳⠀⢠⡀⢿⣀⠀⠀⠀⠀⣠⡟⢀⣀⢠⠇⠀⠈⠙⠛⠷⠶⢦⣤⣤⣤⢴⣾⡏⠀⠀
        ⠀⠀⠈⣿⣧⠙⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⢊⣙⠛⠒⠒⢛⣋⡚⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⡿⠁⣾⡿⠀⠀⠀
        ⠀⠀⠀⠘⣿⣇⠈⢿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⡿⢿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⡟⠁⣼⡿⠁⠀⠀⠀
        ⠀⠀⠀⠀⠘⣿⣦⠀⠻⣿⣷⣦⣤⣤⣶⣶⣶⣿⣿⣿⣿⠏⠀⠀⠻⣿⣿⣿⣿⣶⣶⣶⣦⣤⣴⣿⣿⠏⢀⣼⡿⠁⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠘⢿⣷⣄⠙⠻⠿⠿⠿⠿⠿⢿⣿⣿⣿⣁⣀⣀⣀⣀⣙⣿⣿⣿⠿⠿⠿⠿⠿⠿⠟⠁⣠⣿⡿⠁⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠈⠻⣯⠙⢦⣀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⣠⠴⢋⣾⠟⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⡀⠈⠉⠒⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠐⠒⠉⠁⢀⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⣠⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⡀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    */
    private _getSizes({ sizes }: TableDefinition) {
        if (sizes === 'auto') {
            return {
                'w-auto': true,
            };
        }

        if (typeof sizes === 'object') {
            const classes = {};
            for (const size of Object.keys(sizes)) {
                if (size === 'default') {
                    classes[`w-${sizes.default}/12`] = true;
                    continue;
                }

                classes[`${size}:w-${sizes[`${size}`]}/12`] = true;
            }

            return classes;
        }

        // is a number.
        return {
            [`w-${sizes}/12`]: true,
        };
    }
}
