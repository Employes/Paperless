import {
	autoUpdate,
	computePosition,
	flip,
	offset,
	Placement,
	shift,
	Strategy,
} from '@floating-ui/dom';
import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
	Watch,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

import { cn } from '../../../utils';
import { childOfComposed } from '../../../utils/child-of';

const dropdownContainerClass = cva(['hidden'], {
	variants: {
		strategy: {
			absolute: 'absolute',
			fixed: 'fixed',
		},
		fullWidth: {
			false: null,
			true: 'w-full',
		},
		maxWidth: {
			false: null,
			true: 'max-w-[13.875rem]',
		},
		isDatepicker: {
			false: 'z-dropdown',
			true: 'z-datepicker',
		},
	},
	compoundVariants: [
		{
			fullWidth: false,
			maxWidth: true,
			class: 'w-auto',
		},
	],
});

@Component({
	tag: 'p-dropdown',
	styleUrl: 'dropdown.component.css',
	shadow: true,
})
export class Dropdown {
	/**
	 * The variant of the dropdown
	 */
	@Prop() variant: 'default' | 'storm' = 'default';

	/**
	 * The content of the dropdown menu
	 */
	@Prop({ reflect: true }) placement: Placement = 'bottom-start';

	/**
	 * The offset of the dropdown menu
	 */
	@Prop() offset: number = 8;

	/**
	 * The strategy of the dropdown placement
	 */
	@Prop() strategy: Strategy = 'absolute';

	/**
	 * Wether to show the dropdown menu
	 */
	@Prop() show: boolean = false;

	/**
	 * Wether to apply the max width
	 */
	@Prop() applyMaxWidth: boolean = true;

	/**
	 * Wether to apply the full width
	 */
	@Prop() applyFullWidth: boolean = true;

	/**
	 * Wether to allow overflow in the container
	 */
	@Prop() allowOverflow: boolean = false;

	/**
	 * Wether the dropdown container should be scrollable when the threshold is met.
	 */
	@Prop() scrollable: boolean | 'default' | 'large' = false;

	/**
	 * Wether to automatically close the dropdown menu after clicking inside
	 */
	@Prop() insideClick: boolean = false;

	/**
	 * Wether to automatically close the dropdown menu after clicking inside
	 */
	@Prop() disableTriggerClick: boolean = false;

	/**
	 * Wether to open the dropdown manually
	 */
	@Prop() manual: boolean = false;

	/**
	 * Wether to apply chevron automatically
	 */
	@Prop() applyChevron: boolean = true;

	/**
	 * Chevron position
	 */
	@Prop() chevronPosition: 'start' | 'end' = 'end';

	/**
	 * Chevron direction
	 */
	@Prop() chevronDirection: 'up' | 'down';

	/**
	 * The class of the dropdown container
	 */
	@Prop() containerClass: string;

	/**
	 * Wether the dropdown container is a datepicker dropdown
	 */
	@Prop() isDatepicker: boolean = false;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	/**
	 * Open change event
	 */
	@Event({
		bubbles: false,
	})
	isOpen: EventEmitter<boolean>;

	private _loaded = false;
	private _menu: HTMLElement;
	private _cleanup: () => void;

	componentShouldUpdate() {
		this._update();
	}

	componentDidLoad() {
		this._checkButtons();
	}

	disconnectedCallback() {
		if (this._cleanup) {
			this._cleanup();
			this._cleanup = null;
		}
	}

	componentDidRender() {
		this._checkButtons();
		this._checkItems();
	}

	render() {
		return (
			<Host class='relative'>
				<div
					class='trigger'
					onClick={() => this._triggerClickHandler()}
				>
					<slot name='trigger' />
				</div>
				<div class='relative w-full'>
					<p-dropdown-menu-container
						allowOverflow={this.allowOverflow}
						class={cn(
							dropdownContainerClass({
								strategy: this.strategy,
								maxWidth: this.applyMaxWidth,
								fullWidth: this.applyFullWidth && !this.applyMaxWidth,
								isDatepicker: this.isDatepicker,
							}),
							this.containerClass
						)}
						data-placement={this.placement}
						data-strategy={this.strategy}
						fullWidth={this.applyFullWidth && !this.applyMaxWidth}
						maxWidth={this.applyMaxWidth}
						ref={el => this._load(el)}
						role='popover'
						scrollable={this.scrollable}
						variant={this.variant}
						onClick={() => this._containerClickHandler()}
					>
						<slot name='items' />
					</p-dropdown-menu-container>
				</div>
			</Host>
		);
	}

	private _checkButtons(active: boolean = false) {
		if (!this.applyChevron) {
			return;
		}

		const buttons = this._el.querySelectorAll<HTMLPButtonElement>(
			'p-button[slot="trigger"]'
		);

		const isOpen = this._menu.dataset.show !== null;

		for (let button of buttons) {
			button.disabled = this.disableTriggerClick;
			button.active = active;

			if (button.iconOnly) {
				continue;
			}

			button.chevronPosition = this.chevronPosition;
			button.chevron =
				this.chevronDirection ??
				(this.placement.includes('top')
					? isOpen
						? 'down'
						: 'up'
					: isOpen
						? 'up'
						: 'down');
		}
	}

	private _checkItems() {
		const items = this._el.querySelectorAll<HTMLPDropdownMenuItemElement>(
			'p-dropdown-menu-item'
		);

		for (let item of items) {
			if (item.variant === 'pagination' || item.variant === 'negative') {
				continue;
			}

			item.variant = this.variant;
		}
	}

	@Watch('show')
	protected onShowChange(show) {
		if (!this._loaded) {
			return;
		}

		if (!show) {
			this._hide();
			return;
		}

		this._show();
	}

	@Listen('click', { target: 'document', capture: true })
	protected documentClickHandler(event) {
		if (
			!Object.hasOwn(this._menu.dataset, 'show') ||
			childOfComposed(event, this._menu)
		) {
			return;
		}

		this._hide();
	}

	private _containerClickHandler() {
		if (this.insideClick) {
			return;
		}

		if (Object.hasOwn(this._menu.dataset, 'show')) {
			this._hide();
		}
	}

	private _triggerClickHandler() {
		if (this.disableTriggerClick) {
			return;
		}

		if (this.manual) {
			return;
		}

		if (Object.hasOwn(this._menu.dataset, 'show')) {
			this._hide();
			return;
		}

		this._show();
	}

	private _load(popover: HTMLElement) {
		this._menu = popover;
		if (popover) {
			this._update();
			this._loaded = true;

			if (this.show) {
				setTimeout(() => this._show(), 100);
			}
		}
	}

	private _show() {
		if (!this._loaded) {
			return;
		}

		this._cleanup = autoUpdate(this._el, this._menu, () => this._update());

		this._menu.dataset.show = '';
		this._menu.classList.remove('hidden');
		this._menu.classList.add('block');

		this.isOpen.emit(true);
		this._checkButtons(true);
	}

	private _hide() {
		if (!this._loaded || this.show) {
			return;
		}

		if (this._cleanup) {
			this._cleanup();
			this._cleanup = null;
		}

		// Hide the popover
		delete this._menu.dataset.show;
		this._menu.classList.remove('block');
		this._menu.classList.add('hidden');

		this.isOpen.emit(false);
		this._checkButtons(false);
	}

	private _update() {
		if (!this._menu) {
			return;
		}

		computePosition(this._el, this._menu, {
			placement: this.placement,
			strategy: this.strategy,
			middleware: [offset(this.offset), flip(), shift()],
		}).then(({ x, y, placement }) => {
			this._menu.dataset.placement = placement;
			Object.assign(this._menu.style, {
				top: `${y}px`,
				left: `${x}px`,
			});
		});
	}
}
