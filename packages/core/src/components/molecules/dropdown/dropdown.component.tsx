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
import { childOfComposed } from '../../../utils/child-of';

const dropdownContainerClass = cva(['z-dropdown hidden'], {
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
	@Prop() variant: 'default' | 'dark-teal' = 'default';

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
	 * Wether to use a portal for the dropdown container
	 */
	@Prop() usePortal: boolean = false;

	/**
	 * Wether to automatically calculate the width of the menu based on the trigger
	 */
	@Prop() calculateWidth: boolean = false;

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
	private _trigger: HTMLElement;
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

		this._menu.remove();
	}

	componentDidRender() {
		this._checkButtons();
		this._checkItems();
	}

	render() {
		const dropdownContainerProps = {
			class: dropdownContainerClass({
				strategy: this.strategy,
				maxWidth: !this.calculateWidth && this.applyMaxWidth,
				fullWidth: this.applyFullWidth && !this.applyMaxWidth,
			}),
			ref: el => this._load(el),
			onClick: () => this._containerClickHandler(),
			role: 'popover',
			'data-placement': this.placement,
			'data-strategy': this.strategy,
		};

		let dropdownContainer: HTMLElement;

		if (this.usePortal) {
			dropdownContainer = (
				<p-portal {...dropdownContainerProps}>
					<p-dropdown-menu-container
						variant={this.variant}
						maxWidth={!this.calculateWidth && this.applyMaxWidth}
						fullWidth={this.applyFullWidth && !this.applyMaxWidth}
						allowOverflow={this.allowOverflow}
						scrollable={this.scrollable}
					>
						<slot name='items' />
					</p-dropdown-menu-container>
				</p-portal>
			);
		} else {
			dropdownContainer = (
				<p-dropdown-menu-container
					variant={this.variant}
					maxWidth={!this.calculateWidth && this.applyMaxWidth}
					fullWidth={this.applyFullWidth && !this.applyMaxWidth}
					allowOverflow={this.allowOverflow}
					scrollable={this.scrollable}
					{...dropdownContainerProps}
				>
					<slot name='items' />
				</p-dropdown-menu-container>
			);
		}

		return (
			<Host class='relative'>
				<div
					class='trigger'
					ref={ref => (this._trigger = ref)}
					onClick={() => this._triggerClickHandler()}
				>
					<slot name='trigger' />
				</div>
				<div class='relative w-full'>{dropdownContainer}</div>
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

		const isOpen = this._menu.getAttribute('data-show') !== null;

		for (let button of [...buttons]) {
			button.disabled = this.disableTriggerClick;
			button.active = active;

			if (button.iconOnly) {
				continue;
			}

			button.chevronPosition = this.chevronPosition;
			button.chevron = this.chevronDirection
				? this.chevronDirection
				: this.placement.indexOf('top') >= 0
				? isOpen
					? 'down'
					: 'up'
				: isOpen
				? 'up'
				: 'down';
		}
	}

	private _checkItems() {
		const items = this._el.querySelectorAll<HTMLPDropdownMenuItemElement>(
			'p-dropdown-menu-item'
		);

		for (let item of [...items]) {
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
			!this._menu.hasAttribute('data-show') ||
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

		if (this._menu.hasAttribute('data-show')) {
			this._hide();
		}
	}

	private _triggerClickHandler() {
		if (this.disableTriggerClick) {
			return;
		}

		if (this._menu.hasAttribute('data-show')) {
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

		// Make the popover visible
		if (this.calculateWidth) {
			this._menu.style.width = `${this._trigger.clientWidth}px`;
		}

		this._cleanup = autoUpdate(this._el, this._menu, () => this._update());

		this._menu.setAttribute('data-show', '');
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
		this._menu.removeAttribute('data-show');
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
