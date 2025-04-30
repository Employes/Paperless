import {
	Component,
	Event,
	EventEmitter,
	h,
	Prop,
	Element,
	State,
	Listen,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import {
	defaultSize,
	defaultSizeOptions,
} from '../../../molecules/pagination/size/constants';

const footer = cva(
	[
		'justify-center relative',
		'w-full py-8 px-6',
		'after:absolute after:top-0 after:left-0  after:z-[0]',
		'after:w-full after:h-full after:transition-opacity',
		'after:bg-gradient-to-t after:from-white after:via-white/80 after:to-transparent',
	],
	{
		variants: {
			pinned: {
				false: 'after:opacity-0',
				true: 'after:opacity-100',
			},
			hidden: {
				false: 'flex',
				true: 'hidden',
			},
		},
	}
);

@Component({
	tag: 'p-table-footer',
	styleUrl: 'table-footer.component.css',
	shadow: true,
})
export class TableFooter {
	/**
	 * Wether to enable pagination size select
	 */
	@Prop() enablePaginationSize: boolean = true;

	/**
	 * Wether to enable pagination pages
	 */
	@Prop() enablePaginationPages: boolean = true;

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
	 * Event whenever the footer is hidden or nog
	 */
	@Event({
		bubbles: false,
	})
	hiddenChange: EventEmitter<boolean>;

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hideOnSinglePage: boolean = true;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _isPinned = false;
	@State() private _hasPaginationPages = true;

	private _hidePageSizeSelect = false;
	private _hidden = false;

	componentDidLoad() {
		this._checkStuck();
	}

	componentWillRender() {
		this._hidePageSizeSelect =
			this.hideOnSinglePage && this.total <= this.pageSizeOptions?.[0];

		const hidden =
			(this._hidePageSizeSelect && !this._hasPaginationPages) ||
			(!this.enablePaginationSize && !this.enablePaginationPages);

		if (hidden !== this._hidden) {
			this._hidden = hidden;
			this.hiddenChange.emit(hidden);
		}
	}

	render() {
		return (
			<div
				class={footer({
					pinned: this._isPinned,
					hidden: this._hidden,
				})}
			>
				{(this.enablePaginationPages || this.enablePaginationSize) &&
					this.total > 0 && (
						<p-pagination
							class='z-[2]'
							enablePaginationSize={this.enablePaginationSize}
							enablePaginationPages={this.enablePaginationPages}
							pageSize={this.pageSize}
							pageSizeOptions={this.pageSizeOptions}
							onPageSizeChange={({ detail }) => this._changePageSize(detail)}
							page={this.page}
							hideOnSinglePage={this.hideOnSinglePage}
							onPageChange={({ detail }) => this.pageChange.emit(detail)}
							total={this.total}
							onPagesChange={({ detail }) =>
								(this._hasPaginationPages = detail > 1)
							}
						/>
					)}
			</div>
		);
	}

	private _changePageSize(s?: number) {
		if (!s) {
			return;
		}

		this.pageSize = s;
		this.pageSizeChange.emit(this.pageSize);
	}

	private _checkStuck() {
		const rect = this._el.getBoundingClientRect();
		const layout = document.querySelector('p-layout');

		if (layout) {
			const innerContent = layout.shadowRoot.querySelector('.content');
			const innerContentComputed = getComputedStyle(innerContent);

			const layoutPaddingBottom = parseInt(
				innerContentComputed.paddingBottom,
				10
			);
			this._el.style.bottom = `-${layoutPaddingBottom}px`;
		}

		this._isPinned = window.innerHeight - rect.bottom == 0;
	}

	@Listen('scroll', { target: 'window' })
	onScroll() {
		this._checkStuck();
	}
}
