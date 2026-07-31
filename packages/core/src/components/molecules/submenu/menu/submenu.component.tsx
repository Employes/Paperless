import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { cn } from '../../../../utils';

const header = cva(
	[
		'group/submenu-header',
		'flex items-center gap-2',
		'py-1 pl-2 pr-4',
		'rounded-lg',
		'cursor-pointer',
		'transition-colors',
		'relative',
	],
	{
		variants: {
			open: {
				true: `
      bg-off-white-300
      dark:bg-storm-500/20
    `,
				false: '',
			},
			active: {
				true: `
      bg-indigo-50
      dark:bg-indigo-600/30
    `,
				false: `
      hover:bg-indigo-50
      dark:hover:bg-indigo-600/10
    `,
			},
		},
		compoundVariants: [],
	}
);

const indexContainer = cva(
	[
		'm-2 size-4 rounded-full p-2',
		`
    text-xs font-semibold text-storm-500
    dark:text-hurricane-500
  `,
		'transition-colors',
		'flex items-center justify-center',
	],
	{
		variants: {
			open: {
				true: 'bg-indigo-500',
				false: '',
			},
			active: {
				true: 'bg-indigo-500',
				false: '',
			},
		},
		compoundVariants: [
			{
				open: false,
				active: false,
				class: 'bg-indigo-200',
			},
		],
	}
);

@Component({
	tag: 'p-submenu',
	styleUrl: 'submenu.component.css',
	shadow: true,
})
export class Submenu {
	/**
	 * Title of the submenu
	 */
	@Prop({ reflect: true }) title = '';

	/**
	 * Subtitle of the submenu
	 */
	@Prop({ reflect: true }) subtitle = '';

	/**
	 * Index of the submenu
	 */
	@Prop({ reflect: true }) index: number = 0;

	/**
	 * Wether to show the index
	 */
	@Prop({ reflect: true }) showIndex: boolean = true;

	/**
	 * Wether the submenu is active or not
	 */
	@Prop({ reflect: true }) active: boolean = false;

	/**
	 * Wether the submenu is open or not
	 */
	@Prop({ reflect: true }) open: boolean = false;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _activeItemPosition = -1;
	@State() private _showItemIndicator = false;

	private _headerOffset = 0;

	private _submenuItems: HTMLPSubmenuItemElement[] = [];
	private _hoveringItem: HTMLPSubmenuItemElement | undefined = undefined;

	private _itemActiveListener = () => {
		const activeItemIndex = this._submenuItems.findIndex(
			i => i.active === true
		);

		this.active = activeItemIndex !== -1;

		if (activeItemIndex === -1) {
			this._showItemIndicator = false;
			return;
		}

		// set open when active changes
		if (!this.open && this.active) {
			this.open = true;
		}

		this._setItemPosition(this._submenuItems[activeItemIndex]);
	};

	private _itemMouseEnterListener = (event: MouseEvent) => {
		if (this._hoveringItem && this._hoveringItem === event.target) {
			return;
		}

		this._hoveringItem = event.target as HTMLPSubmenuItemElement;
		this._setItemPosition(this._hoveringItem);
	};

	private _itemMouseLeaveListener = (event: MouseEvent) => {
		setTimeout(() => {
			if (this._hoveringItem && this._hoveringItem !== event.target) {
				return;
			}

			this._hoveringItem = undefined;
			this._itemActiveListener();
		}, 100);
	};

	componentDidLoad() {
		const submenuItems = this._el.querySelectorAll('p-submenu-item');
		const hasActiveChild = [...submenuItems].some(i => i.active === true);

		if (!this.active && hasActiveChild) {
			this.active = true;
		}

		if (!this.active) {
			return;
		}

		this.open = true;
	}

	componentDidRender() {
		this._calculateHeaderOffset();
	}

	disconnectedCallback() {
		this._removeListeners();
	}

	render() {
		const submenuItems = this._el.querySelectorAll('p-submenu-item');

		const firstItem = getComputedStyle(submenuItems[0]);
		const maxHeight =
			submenuItems.length *
				Number.parseInt(firstItem.height.replace('px', '')) +
			16; // the margin of the content

		return (
			<ThemedHost>
				<div class='flex w-full flex-col'>
					<div
						class={cn(
							header({
								active: this.active,
								open: this.open,
							})
						)}
						onClick={() => (this.open = !this.open)}
					>
						{this.showIndex && (
							<div
								class={indexContainer({
									active: this.active,
									open: this.open,
								})}
							>
								{this.index}
							</div>
						)}

						<div class='flex flex-1 flex-col'>
							<p
								class={cn('m-0 text-sm', {
									'text-storm-400 dark:text-hurricane-100 dark:group-hover/submenu-header:text-white':
										!this.active,
									'text-storm-500 dark:text-white': this.active,
								})}
							>
								{this.title}
							</p>

							<p
								class={cn('m-0 text-xs', {
									'text-storm-300 dark:text-hurricane-300': !this.active,
									'text-storm-300 dark:text-indigo-200': this.active,
								})}
							>
								{this.subtitle}
							</p>
						</div>

						<p-icon
							class={cn({
								'text-storm-500 dark:text-white': this.active,
								'text-storm-300 dark:text-hurricane-300': !this.active,
							})}
							rotate={this.open ? 180 : 0}
							variant='caret'
						/>
					</div>

					<div
						class={cn(
							'relative flex flex-col overflow-hidden transition-[max-height]'
						)}
						style={{
							maxHeight: `${this.open ? maxHeight : 0}px`,
						}}
					>
						<div
							class={cn('absolute left-6 top-0 z-0 w-px', {
								'bg-off-white-400 dark:bg-storm-500/30': !this.active,
								'bg-indigo-100 dark:bg-hurricane-400': this.active,
							})}
							style={{
								height: `${maxHeight}px`,
							}}
						/>

						<div
							class={cn(
								`absolute left-6 top-0 z-[1] h-8 w-[2px] transform transition-all`,
								{
									'bg-indigo-600': this._showItemIndicator,
									'bg-transparent': !this._showItemIndicator,
								}
							)}
							style={{
								transform: `translateY(${this._activeItemPosition}px)`,
							}}
						/>

						<div class='z-10 my-2 flex flex-col'>
							<slot onSlotchange={() => this._slotChanged()} />
						</div>
					</div>
				</div>
			</ThemedHost>
		);
	}

	@Listen('resize', { target: 'window' })
	onWindowResize() {
		this._calculateHeaderOffset();
		this._itemActiveListener();
	}

	private _calculateHeaderOffset() {
		const headerEl = this._el.shadowRoot?.querySelector(
			String.raw`.group\/submenu-header`
		);
		if (!headerEl) {
			this._activeItemPosition = -1;
			return;
		}

		this._headerOffset = headerEl.getBoundingClientRect().bottom;
	}

	private _setItemPosition(item: HTMLPSubmenuItemElement | undefined) {
		if (!item) {
			return;
		}

		this._activeItemPosition =
			item.getBoundingClientRect().top - this._headerOffset;

		if (!this._showItemIndicator) {
			setTimeout(() => (this._showItemIndicator = true), 50);
		}
	}

	private _slotChanged() {
		this._removeListeners();

		const submenuItems = [...this._el.querySelectorAll('p-submenu-item')];

		for (const item of submenuItems) {
			item.addEventListener('activeChange', this._itemActiveListener);
			item.addEventListener('mouseenter', this._itemMouseEnterListener);
			item.addEventListener('mouseleave', this._itemMouseLeaveListener);
		}

		this._submenuItems = submenuItems;
	}

	private _removeListeners() {
		if (this._submenuItems.length > 0) {
			for (const item of this._submenuItems) {
				item.removeEventListener('activeChange', this._itemActiveListener);
				item.removeEventListener('mouseenter', this._itemMouseEnterListener);
				item.removeEventListener('mouseleave', this._itemMouseLeaveListener);
			}
		}
	}
}
