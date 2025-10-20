import {
	Component,
	Event,
	EventEmitter,
	h,
	Prop,
	Watch,
	State,
	Listen,
	Element,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { ThemedHost } from '../../../../internal/themed-host.component';
import { childOfComposed } from '../../../../utils/child-of';
import { PAGINATION_DEFAULT_PAGE_SIZE } from '../../../../utils/constants';
import {
	formatTranslation,
	getLocaleComponentStrings,
} from '../../../../utils/localization';

export type templateFunc = (page: number) => string;

type PaginationSetItem = {
	type: string;
	value?: number | Element | JSX.Element | string;
	dropdownIndex?: number;
	options?: number[];
};

const pagination = cva(['p-pagination', 'flex gap-2 items-center'], {
	variants: {
		hidden: {
			false: 'flex',
			true: 'hidden',
		},
	},
});

@Component({
	tag: 'p-pagination-pages',
	styleUrl: 'pagination-pages.component.css',
	shadow: true,
})
export class PaginationPages {
	private _defaultDropdownPageTemplate: templateFunc = page =>
		formatTranslation(this._locales.page, { page });

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
	 * The template for the data view
	 */
	@Prop() dropdownPageTemplate: templateFunc =
		this._defaultDropdownPageTemplate;

	/**
	 * The amount of items per page
	 */
	@Prop() pageSize: number = PAGINATION_DEFAULT_PAGE_SIZE;

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hideOnSinglePage: boolean = false;

	/**
	 * The total amount of items
	 */
	@Prop() total!: number;

	/**
	 * The pages that were generated
	 */
	@Event({ bubbles: false }) pagesChange: EventEmitter<number>;

	@State() private _showDropdown = [false, false];
	@State() private _dropdowns = [];

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	private _pages: number[] = [];
	private _set: PaginationSetItem[] = [];

	componentWillLoad() {
		this._setLocales();
	}

	componentWillRender() {
		this._generate();
	}

	render() {
		return (
			<ThemedHost>
				<div
					class={pagination({
						hidden: this.hideOnSinglePage && this._set?.length === 3,
					})}
				>
					{this._set?.map(p => {
						if (p.type === 'previous' || p.type === 'next') {
							return (
								<p-pagination-pages-item
									variant='carousel'
									disabled={this._carouselDisabled(p.type)}
									onClick={() =>
										p.type === 'previous'
											? this._previousClick()
											: this._nextClick()
									}
								>
									{p.value}
								</p-pagination-pages-item>
							);
						}

						if (p.type === 'ellipsis') {
							return (
								<p-dropdown
									placement='top'
									applyChevron={false}
									insideClick={true}
									show={this._showDropdown[p.dropdownIndex]}
									onIsOpen={({ detail }) =>
										this._onShowDropdown(detail, p.dropdownIndex)
									}
									ref={el => (this._dropdowns[p.dropdownIndex] = el)}
								>
									<p-pagination-pages-item slot='trigger'>
										...
									</p-pagination-pages-item>
									{p.options?.slice(0, 5).map(v => (
										<p-dropdown-menu-item
											variant='pagination'
											autoHeight={true}
											onClick={() => this._pageClick(v)}
											slot='items'
										>
											{this.dropdownPageTemplate
												? this.dropdownPageTemplate(v)
												: this._defaultDropdownPageTemplate(v)}
										</p-dropdown-menu-item>
									))}
									{p.options?.length > 5 &&
										this._showDropdown[p.dropdownIndex] && (
											<p-field
												class='mt-2 w-28'
												size='sm'
												icon='enter-key'
												iconPosition='end'
												type='number'
												properties={{
													min: 1,
													max: this._pages.length,
													step: 1,
												}}
												autoFocus={true}
												onEnter={({ detail }) => this._enterPress(detail)}
												slot='items'
											></p-field>
										)}
								</p-dropdown>
							);
						}

						return (
							<p-pagination-pages-item
								active={p.value === this.page}
								onClick={() => this._pageClick(p.value as number)}
							>
								{p.value}
							</p-pagination-pages-item>
						);
					})}
				</div>
			</ThemedHost>
		);
	}

	@Watch('page')
	@Watch('pageSize')
	@Watch('total')
	protected pageChangeHandler() {
		this._generate();
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}

	@Listen('click', { target: 'document', capture: true })
	protected documentClickHandler(event) {
		const dropdowns = [false, false];
		if (this._dropdowns[0] && childOfComposed(event, this._dropdowns[0])) {
			dropdowns[0] = true;
		}

		if (this._dropdowns[1] && childOfComposed(event, this._dropdowns[1])) {
			dropdowns[1] = true;
		}

		this._showDropdown = dropdowns;
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

		this._showDropdown = [false, false];
		this.page = p;
		this.pageChange.emit(this.page);
	}

	private _previousClick() {
		if (this._carouselDisabled('previous')) {
			return;
		}

		this._changePage(this.page - 1);
	}

	private _nextClick = () => {
		if (this._carouselDisabled('next')) {
			return;
		}

		this._changePage(this.page + 1);
	};

	private _carouselDisabled = (type: 'previous' | 'next') => {
		if (type === 'next') {
			const nextPage = this.page + 1;
			if (nextPage > this._pages[this._pages.length - 1]) {
				return true;
			}
		}

		if (type === 'previous') {
			const previousPage = this.page - 1;
			if (previousPage < this._pages[0]) {
				return true;
			}
		}

		return false;
	};

	private _pageClick = (p?: number) => this._changePage(p);

	private _enterPress(p: string | number) {
		if (typeof p === 'string') {
			p = parseInt(p);
		}

		if (isNaN(p)) {
			return;
		}

		if (p < 1) {
			p = 1;
		}

		if (p > this._pages.length) {
			p = this._pages.length;
		}

		this._changePage(p);
	}

	private _onShowDropdown(show = false, dropdownIndex: number) {
		const showDropdown = [...this._showDropdown];
		showDropdown[dropdownIndex] = show;
		this._showDropdown = showDropdown;
	}

	private _generatePages() {
		if (!this.total || !this.pageSize) {
			return [];
		}

		const pages = Math.ceil(this.total / this.pageSize);
		this.pagesChange.emit(pages);
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
					size='sm'
					rotate={90}
				/>
			),
		};

		const next = {
			type: 'next',
			value: (
				<p-icon
					variant='caret'
					size='sm'
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

		let dropdownIndex = 0;

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
				dropdownIndex,
				options: Array.from({ length: start - 2 }, (_, i) => i + 2),
			});
			dropdownIndex++;
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
				dropdownIndex,
				options: Array.from(
					{ length: totalPages - end - 1 },
					(_, i) => i + end + 1
				),
			});
			dropdownIndex++;

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
