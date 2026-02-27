import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Listen,
	Prop,
	State,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { cn } from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';
import {
	PAGINATION_DEFAULT_PAGE_SIZE,
	PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS,
} from '../../../../utils/constants';
import {
	formatTranslation,
	getLocaleComponentStrings,
} from '../../../../utils/localization';

export type templateFunc = (value: number) => string;

const paginationSize = cva('p-pagination-size', {
	variants: {
		hidden: {
			false: null,
			true: 'hidden',
		},
	},
});

const trigger = cva(
	[
		'group/pagination-size-trigger',
		'flex items-center gap-2',
		'h-6 px-2',
		'text-sm font-medium text-storm-500',
		'dark:text-white',
		'cursor-pointer rounded-full',
		'border border-solid shadow-1',
	],
	{
		variants: {
			active: {
				false: [
					`
       border-transparent bg-white
       hover:bg-white-600
     `,
					`
       dark:bg-white/15
       dark:hover:bg-white/25
     `,
				],
				true: [
					'border-indigo-600 bg-white-600 ring ring-2 ring-indigo-100',
					'dark:bg-white/25 dark:ring-0',
				],
			},
		},
	}
);

@Component({
	tag: 'p-pagination-size',
	styleUrl: 'pagination-size.component.css',
	shadow: true,
})
export class PaginationSize {
	private _defaultItemTemplate: templateFunc = size =>
		formatTranslation(this._locales.item, { size });
	/**
	 * The current page
	 */
	@Prop({ mutable: true, reflect: true }) size: number =
		PAGINATION_DEFAULT_PAGE_SIZE;

	/**
	 * The available sizes
	 */
	@Prop() sizeOptions: number[] = PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS;

	/**
	 * Event whenever the size changes
	 */
	@Event({
		bubbles: false,
	})
	sizeChange: EventEmitter<number>;

	/**
	 * The template for the data view
	 */
	@Prop() itemTemplate: templateFunc = this._defaultItemTemplate;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hidden: boolean = false;

	/**
	 * Wether the dropdown is open
	 */
	@State() dropdownIsOpen = false;

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	componentWillLoad() {
		this._setLocales();
	}

	render() {
		return (
			<ThemedHost class={paginationSize({ hidden: asBoolean(this.hidden) })}>
				<p-dropdown
					applyFullWidth={true}
					applyMaxWidth={false}
					chevronDirection='down'
					placement='top-start'
					onIsOpen={({ detail }) => (this.dropdownIsOpen = detail)}
				>
					<div
						class={trigger({
							active: this.dropdownIsOpen,
						})}
						slot='trigger'
					>
						<p class='min-w-0 flex-1 overflow-hidden text-ellipsis text-nowrap'>
							{this.itemTemplate
								? this.itemTemplate(this.size)
								: this._defaultItemTemplate(this.size)}
						</p>
						<p-icon
							class={cn(
								[
									'flex-shrink-0',
									'group-hover/pagination-size-trigger:text-storm-500',
									'dark:group-hover/pagination-size-trigger:text-white',
								],
								{
									'text-storm-300 dark:text-hurricane-200':
										!this.dropdownIsOpen,
									'text-storm-500 dark:text-white': !!this.dropdownIsOpen,
								}
							)}
							size='sm'
							variant='double-caret'
						/>
					</div>
					<slot slot='items'>
						{this.sizeOptions.map(option => (
							<p-dropdown-menu-item
								active={option === this.size}
								onClick={() => this._changeSize(option)}
							>
								{this.itemTemplate
									? this.itemTemplate(option)
									: this._defaultItemTemplate(option)}
							</p-dropdown-menu-item>
						))}
					</slot>
				</p-dropdown>
			</ThemedHost>
		);
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}

	private _changeSize(s?: number) {
		if (!s) {
			return;
		}

		this.size = s;
		this.sizeChange.emit(this.size);
	}
}
