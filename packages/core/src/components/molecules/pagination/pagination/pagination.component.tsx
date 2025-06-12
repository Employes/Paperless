import {
	Component,
	Event,
	EventEmitter,
	Fragment,
	h,
	Prop,
	State,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { defaultSize, defaultSizeOptions } from '../size/constants';

const pagination = cva(
	[
		'p-pagination',
		'items-center gap-2',
		'rounded-full',
		'bg-off-white-300 border border-off-white-700',
		'p-1',
	],
	{
		variants: {
			hidden: {
				false: 'flex',
				true: 'hidden',
			},
		},
	}
);

@Component({
	tag: 'p-pagination',
	styleUrl: 'pagination.component.css',
	shadow: true,
})
export class Pagination {
	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hideOnSinglePage: boolean = true;

	/**
	 * Wether to enable pagination size select
	 */
	@Prop() enablePaginationSize: boolean = true;

	/**
	 * Wether to enable pagination pages
	 */
	@Prop() enablePaginationPages: boolean = true;

	/**
	 * The current page
	 */
	@Prop({ mutable: true, reflect: true }) page: number = 1;

	/**
	 * The total amount of items
	 */
	@Prop() total!: number;

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
	pageChange: EventEmitter<number>;

	/**
	 * Event whenever the page changes
	 */
	@Event({
		bubbles: false,
	})
	pageSizeChange: EventEmitter<number>;

	/**
	 * The pages that were generated
	 */
	@Event({ bubbles: false }) pagesChange: EventEmitter<number>;

	@State() private _hasPaginationPages = true;

	render() {
		const hidePageSizeSelect =
			this.hideOnSinglePage && this.total <= this.pageSizeOptions?.[0];

		return (
			<div
				class={pagination({
					hidden:
						(hidePageSizeSelect && !this._hasPaginationPages) ||
						(!this.enablePaginationSize && !this.enablePaginationPages),
				})}
			>
				{this.enablePaginationPages && this.enablePaginationSize && (
					<Fragment>
						<p-pagination-size
							hidden={hidePageSizeSelect}
							size={this.pageSize}
							sizeOptions={this.pageSizeOptions}
							onSizeChange={({ detail }) => this._changePageSize(detail)}
						/>

						{!hidePageSizeSelect &&
							this.hideOnSinglePage &&
							this._hasPaginationPages && (
								<p-divider
									variant='vertical'
									class='mx-0 h-4 text-human-beige-700'
								/>
							)}
					</Fragment>
				)}

				{this.enablePaginationPages && (
					<p-pagination-pages
						pageSize={this.pageSize}
						total={this.total}
						page={this.page}
						hideOnSinglePage={this.hideOnSinglePage}
						onPageChange={({ detail }) => this.pageChange.emit(detail)}
						onPagesChange={({ detail }) => {
							this._hasPaginationPages = detail > 1;
							this.pagesChange.emit(detail);
						}}
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
}
