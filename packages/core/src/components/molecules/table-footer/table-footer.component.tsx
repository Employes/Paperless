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
} from '@stencil/core';
import {
    formatTranslation,
    getLocaleComponentStrings,
} from '../../../utils/localization';
import { defaultSize, defaultSizeOptions } from '../page-size-select/constants';

@Component({
    tag: 'p-table-footer',
    styleUrl: 'table-footer.component.scss',
    shadow: true,
})
export class TableFooter {
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
     * The host element
     */
    @Element() private _el: HTMLElement;

    /**
     * Locales used for this component
     */
    @State() private _locales: any = {};

    componentWillLoad() {
        this._setLocales();
    }

    render() {
        return (
            <Host
                class={`p-table-footer ${
                    !this.enablePageSize && 'page-size-disabled'
                } ${!this.enablePagination && 'pagination-disabled'} ${
                    !this.enableExport && 'export-disabled'
                }`}
            >
                {this.enablePagination && this.enablePageSize && (
                    <p-page-size-select
                        class="hidden desktop-xs:flex"
                        size={this.pageSize}
                        sizeOptions={this.pageSizeOptions}
                        onSizeChange={({ detail }) =>
                            this._changePageSize(detail)
                        }
                    />
                )}
                {this.enablePagination && (
                    <p-pagination
                        pageSize={this.pageSize}
                        total={this.total}
                        page={this.page}
                        hideOnSinglePage={true}
                        onPageChange={({ detail }) =>
                            this.pageChange.emit(detail)
                        }
                    />
                )}
                {this.enableExport && (
                    <p-button
                        class="hidden desktop-xs:flex"
                        variant="secondary"
                        size="small"
                        icon="download"
                        onClick={() => this.export.emit()}
                    >
                        {formatTranslation(this._locales.export)}
                    </p-button>
                )}
            </Host>
        );
    }

    @Listen('localeChanged', { target: 'body' })
    private async _setLocales(): Promise<void> {
        this._locales = await getLocaleComponentStrings(this._el);
    }

    private _changePageSize(s?: number) {
        if (!s) {
            return;
        }

        this.pageSize = s;
        this.pageSizeChange.emit(this.pageSize);
    }
}