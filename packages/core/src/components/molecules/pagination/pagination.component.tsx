import {
	Component,
	Event,
	EventEmitter,
	h,
	Host,
	Prop,
	Watch,
} from '@stencil/core';

type PaginationSetItem = {
	type: string;
	value?: number | Element | JSX.Element | string;
};

@Component({
	tag: 'p-pagination',
	styleUrl: 'pagination.component.scss',
})
export class Pagination {
	/**
	 * The current page
	 */
	@Prop({ mutable: true, reflect: true }) page: number = 1;

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
	@Prop() pageSize: number = 12;

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hideOnSinglePage: boolean = false;

	/**
	 * The total amount of items
	 */
	@Prop() total!: number;

	private _pages: number[] = [];
	private _set: PaginationSetItem[] = [];

	componentWillRender() {
		this._generate();
	}

	render() {
		return (
			<Host
				class={`p-pagination ${
					this.hideOnSinglePage && this._set?.length === 3 && 'hidden'
				}`}
			>
				{this._set?.map(p => {
					if (p.type === 'previous' || p.type === 'next') {
						return (
							<p-pagination-item
								onClick={() =>
									p.type === 'previous'
										? this._previousClick()
										: this._nextClick()
								}
							>
								{p.value}
							</p-pagination-item>
						);
					}

					if (p.type === 'ellipsis') {
						return <p-pagination-item>...</p-pagination-item>;
					}

					return (
						<p-pagination-item
							active={p.value === this.page}
							onClick={() => this._pageClick(p.value as number)}
						>
							{p.value}
						</p-pagination-item>
					);
				})}
			</Host>
		);
	}

	@Watch('page')
	@Watch('pageSize')
	@Watch('total')
	protected pageChangeHandler() {
		this._generate();
	}

	private _generate() {
		this._pages = this._generatePages();
		this._set = this._generateSet();

		if (this.page > this._pages?.length) {
			this._changePage(this._pages.length);
		}
	}

	private _changePage(p?: number) {
		if (!p) {
			return;
		}

		this.page = p;
		this.pageChange.emit(this.page);
	}

	private _previousClick() {
		const previousPage = this.page - 1;
		if (previousPage < this._pages[0]) {
			return;
		}

		this._changePage(previousPage);
	}

	private _nextClick = () => {
		const nextPage = this.page + 1;
		if (nextPage > this._pages[this._pages.length - 1]) {
			return;
		}

		this._changePage(nextPage);
	};

	private _pageClick = (p?: number) => this._changePage(p);

	private _generatePages() {
		if (!this.total || !this.pageSize) {
			return [];
		}

		const pages = Math.ceil(this.total / this.pageSize);
		return new Array(pages).fill(undefined).map((_, i) => i + 1);
	}

	private _generateSet = (
		range: number = 1,
		enableBoundaries: boolean = true
	): PaginationSetItem[] => {
		const totalPages = this._pages.length;

		if (!totalPages) {
			return [];
		}

		let start = this.page - range;
		let end = this.page + range;

		if (end > totalPages) {
			end = totalPages;
			start = totalPages - range * 2;
			start = start < 1 ? 1 : start;
		}

		if (start <= 1) {
			start = 1;
			end = Math.min(range * 2 + 1, totalPages);
		}

		const set = [];

		const previous = {
			type: 'previous',
			value: (
				<p-icon
					variant='caret'
					rotate={90}
				/>
			),
		};

		const next = {
			type: 'next',
			value: (
				<p-icon
					variant='caret'
					rotate={-90}
				/>
			),
		};

		// Disable page range, display all the pages
		if (range === null) {
			const p = this._pages.map(p => ({
				type: 'page',
				value: p,
			}));

			return enableBoundaries ? [previous, ...p, next] : p;
		}

		if (enableBoundaries) {
			set.push(previous);
		}

		if (start <= 3) {
			for (let i = 1; i < start; i++) {
				set.push({
					type: 'page',
					value: this._pages[i - 1],
				});
			}
		} else {
			set.push({
				type: 'page',
				value: 1,
			});

			set.push({
				type: 'ellipsis',
				value: 'ellipsis',
			});
		}

		for (let i = start; i <= end; i++) {
			set.push({
				type: 'page',
				value: this._pages[i - 1],
			});
		}

		if (end >= totalPages - 2) {
			for (let i = end + 1; i <= totalPages; i++) {
				set.push({
					type: 'page',
					value: this._pages[i - 1],
				});
			}
		} else {
			set.push({
				type: 'ellipsis',
			});

			set.push({
				type: 'page',
				value: this._pages[this._pages.length - 1],
			});
		}

		if (enableBoundaries) {
			set.push(next);
		}

		return set;
	};
}
