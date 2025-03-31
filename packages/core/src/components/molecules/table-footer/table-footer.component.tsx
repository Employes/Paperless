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
import { defaultSize, defaultSizeOptions } from '../pagination-size/constants';

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
	 * Wether we want to show loading state
	 */
	@Prop() loading: boolean = false;

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
	@Prop() pageSize: number = defaultSize;

	/**
	 * The options for the page size
	 */
	@Prop() pageSizeOptions: number[] = defaultSizeOptions;

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
		const hidePageSizeSelect =
			this.hideOnSinglePage && this.total < this.pageSizeOptions?.[0];
		return (
			<Host
				class={`p-table-footer ${
					!this.enablePageSize && 'page-size-disabled'
				} ${!this.enablePagination && 'pagination-disabled'} ${
					!this.enableExport && 'export-disabled'
				}`}
			>
				{!this.loading && this.enablePagination && this.enablePageSize && (
					<p-pagination-size
						class={!hidePageSizeSelect && 'hidden desktop-xs:flex'}
						hidden={hidePageSizeSelect}
						size={this.pageSize}
						sizeOptions={this.pageSizeOptions}
						onSizeChange={({ detail }) => this._changePageSize(detail)}
					/>
				)}

				{this.loading && (
					<p-loader
						variant='ghost'
						class='h-8 w-full rounded'
					></p-loader>
				)}

				{!this.loading && this.enablePagination && (
					<p-pagination-pages
						pageSize={this.pageSize}
						total={this.total}
						page={this.page}
						hideOnSinglePage={this.hideOnSinglePage}
						onPageChange={({ detail }) => this.pageChange.emit(detail)}
					/>
				)}

				{!this.loading && this.enableExport && (
					<p-button
						class='hidden desktop-xs:flex'
						variant='secondary'
						size='sm'
						icon='download'
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
