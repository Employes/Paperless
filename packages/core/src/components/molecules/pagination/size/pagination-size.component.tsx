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
} from '../../../../utils/localization';
import { defaultSize, defaultSizeOptions } from './constants';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';

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
		'flex items-center gap-2',
		'px-2 h-6',
		'text-sm text-storm-500 font-medium ',
		'cursor-pointer rounded-full',
		'shadow-1 border border-solid',
	],
	{
		variants: {
			active: {
				false: 'bg-white hover:bg-white-600 border-transparent',
				true: 'bg-white-600 border-indigo-600 ring ring-2 ring-indigo-100',
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
	@Prop({ mutable: true, reflect: true }) size: number = defaultSize;

	/**
	 * The available sizes
	 */
	@Prop() sizeOptions: number[] = defaultSizeOptions;

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
			<Host class={paginationSize({ hidden: asBoolean(this.hidden) })}>
				<p-dropdown
					applyFullWidth={true}
					applyMaxWidth={false}
					placement='top-start'
					chevronDirection='down'
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
							class='flex-shrink-0'
							variant='double-caret'
							size='sm'
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
			</Host>
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
