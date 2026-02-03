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

import { ThemedHost } from '../../../../internal/themed-host.component';
import {
	PAGINATION_DEFAULT_PAGE_SIZE,
	PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS,
} from '../../../../utils/constants';

const footer = cva(
	[
		'justify-center relative',
		'w-full px-6',
		'pointer-events-none',
		'after:absolute after:top-0 after:left-0 after:z-[0]',
		'after:w-full after:h-full after:transition-opacity',
		'after:bg-gradient-to-t after:from-white dark:after:from-hurricane-700 after:via-white/80 dark:after:via-hurricane-700/80 after:to-transparent',
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
			tableHeaderHasAction: {
				true: 'pt-8 pb-20 desktop-xs:py-8',
				false: 'py-8',
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
	@Prop() pageSize: number = PAGINATION_DEFAULT_PAGE_SIZE;

	/**
	 * The options for the page size
	 */
	@Prop() pageSizeOptions: number[] = PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS;

	/**
	 * Wether the table header has an action to adjust for on mobile
	 */
	@Prop() tableHeaderHasAction: boolean = false;

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
	private _renderCheckTimeout: NodeJS.Timeout;

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

	componentDidRender() {
		if (this._renderCheckTimeout) {
			clearTimeout(this._renderCheckTimeout);
			this._renderCheckTimeout = null;
		}

		this._renderCheckTimeout = setTimeout(() => this._checkStuck(), 200);
	}

	render() {
		return (
			<ThemedHost>
				<div
					class={footer({
						pinned: this._isPinned,
						hidden: this._hidden,
						tableHeaderHasAction: this.tableHeaderHasAction,
					})}
				>
					{(this.enablePaginationPages || this.enablePaginationSize) &&
						this.total > 0 && (
							<p-pagination
								class='pointer-events-auto z-[2]'
								enablePaginationPages={this.enablePaginationPages}
								enablePaginationSize={this.enablePaginationSize}
								hideOnSinglePage={this.hideOnSinglePage}
								page={this.page}
								pageSize={this.pageSize}
								pageSizeOptions={this.pageSizeOptions}
								total={this.total}
								onPageChange={({ detail }) => this.pageChange.emit(detail)}
								onPageSizeChange={({ detail }) => this._changePageSize(detail)}
								onPagesChange={({ detail }) =>
									(this._hasPaginationPages = detail > 1)
								}
							/>
						)}
				</div>
			</ThemedHost>
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
		const modal = this._el.closest('p-modal');
		const layout = document.querySelector('p-layout');

		if (modal) {
			const modalBody = modal.shadowRoot.querySelector('p-modal-body');
			const innerContent = modalBody.shadowRoot.querySelector('div');

			const innerContentComputed = getComputedStyle(innerContent);

			const modalPaddingBottom = Number.parseInt(
				innerContentComputed.paddingBottom,
				10
			);
			this._el.style.bottom = `-${modalPaddingBottom}px`;
			this._el.style.marginBottom = `-${modalPaddingBottom - 1}px`;
		}

		if (layout && !modal) {
			const innerContent = layout.shadowRoot.querySelector('.content');
			const innerContentComputed = getComputedStyle(innerContent);

			const layoutPaddingBottom = Number.parseInt(
				innerContentComputed.paddingBottom,
				10
			);
			this._el.style.bottom = `-${layoutPaddingBottom}px`;
			this._el.style.marginBottom = `-${layoutPaddingBottom - 1}px`;
		}

		this._isPinned = window.innerHeight - rect.bottom == 0;
	}

	@Listen('scroll', { target: 'window' })
	onScroll() {
		this._checkStuck();
	}
}
