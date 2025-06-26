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

const popover = cva(
	[
		'inline-block px-2',
		'text-xs',
		'opacity-0 drop-shadow-3 transition-opacity',
		'rounded-lg',

		'z-tooltip',
		'pointer-events-none',
	],
	{
		variants: {
			variant: {
				hover: 'bg-black-teal text-white py-1 max-w-[14.5rem]',
				click: 'max-w-[18rem]',
				error: 'max-w-full w-full',
			},
			strategy: {
				fixed: 'fixed',
				absolute: 'absolute',
			},
		},
		compoundVariants: [
			{
				variant: ['hover', 'click'],
				class: 'w-max',
			},
			{
				variant: ['click', 'error'],
				class: 'bg-white text-black-teal-300 py-2',
			},
		],
	}
);

@Component({
	tag: 'p-tooltip',
	styleUrl: 'tooltip.component.css',
	shadow: true,
})
export class Tooltip {
	/**
	 * The variant of the popover
	 */
	@Prop() variant: 'hover' | 'click' | 'error' = 'hover';

	/**
	 * The content of the popover
	 */
	@Prop() content: string;

	/**
	 * The placement of the popover
	 */
	@Prop() placement: Placement;

	/**
	 * The offset of the popover
	 */
	@Prop() offset: number = 8;

	/**
	 * The strategy of the popover placement
	 */
	@Prop() strategy: Strategy = 'absolute';

	/**
	 * Wether the tooltip can be shown by user input
	 */
	@Prop() enableUserInput: boolean = true;

	/**
	 * Wether to show the popover
	 */
	@Prop() show: boolean = false;

	/**
	 * Wether to someone can manually close the popover
	 */
	@Prop() canManuallyClose: boolean = true;

	/**
	 * Open change event
	 */
	@Event({
		bubbles: false,
	})
	isOpen: EventEmitter<boolean>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	private _hasContentSlot = false;

	private _loaded = false;
	private _popover: HTMLElement;
	private _cleanup: () => void;

	componentWillLoad() {
		this._hasContentSlot = !!this._el.querySelector(
			':scope > [slot="content"]'
		);
	}

	componentShouldUpdate() {
		this._update();
	}

	disconnectedCallback() {
		if (this._cleanup) {
			this._cleanup();
			this._cleanup = null;
		}
	}

	render() {
		return (
			<Host>
				<slot name='trigger' />
				<div
					class={popover({
						variant: this.variant,
						strategy: this.strategy,
					})}
					role='popover'
					data-placement={this.placement}
					ref={el => this._load(el)}
				>
					<div class='flex gap-2 whitespace-normal'>
						{this.variant === 'error' && (
							<div class='w-[2px] bg-negative-red'></div>
						)}
						{this.content ? this.content : <slot name='content' />}
					</div>
				</div>
			</Host>
		);
	}

	@Listen('click', { capture: true })
	protected clickHandler() {
		if (this.variant === 'hover' || !this.enableUserInput) {
			return;
		}

		if (this._popover.hasAttribute('data-show')) {
			return;
		}

		this._show();
	}

	@Listen('click', { target: 'document', capture: true })
	protected documentClickHandler() {
		if (this.variant === 'hover' || !this.canManuallyClose || this.show) {
			return;
		}

		if (!this._popover.hasAttribute('data-show')) {
			return;
		}

		this._hide();
	}

	@Listen('mouseenter')
	@Listen('focus')
	protected mouseEnterHandler() {
		if (this.variant !== 'hover' || !this.enableUserInput) {
			return;
		}

		this._show();
	}

	@Listen('mouseleave')
	@Listen('blur')
	protected mouseLeaveHandler() {
		if (this.show || this.variant !== 'hover' || !this.enableUserInput) {
			return;
		}

		this._hide();
	}

	@Watch('show')
	onShowChange(show: boolean) {
		if (show && !this._popover.hasAttribute('data-show')) {
			return this._show();
		}

		return this._hide();
	}

	@Watch('content')
	onContentChange(content: string) {
		if (!content || content.length > 0) {
			return;
		}

		this._hide();
	}

	private _show() {
		if (!this._loaded) {
			return;
		}

		if (!this.content?.length && !this._hasContentSlot) {
			if (this._popover.hasAttribute('data-show')) {
				this._hide();
			}

			return;
		}

		this._cleanup = autoUpdate(this._el, this._popover, () => this._update());

		// Make the popover visible
		this._popover.setAttribute('data-show', '');

		this._popover.classList.remove('opacity-0', 'pointer-events-none');
		this._popover.classList.add('opacity-100', 'pointer-events-auto');

		// Update its position
		this.isOpen.emit(true);
	}

	private _hide() {
		if (!this._loaded) {
			return;
		}

		if (this._cleanup) {
			this._cleanup();
			this._cleanup = null;
		}

		// Hide the popover
		this._popover.removeAttribute('data-show');

		this._popover.classList.remove('opacity-100', 'pointer-events-auto');
		this._popover.classList.add('opacity-0', 'pointer-events-none');

		this.isOpen.emit(false);
	}

	private _load(popover: HTMLElement) {
		this._popover = popover;

		if (popover) {
			this._update();
			this._loaded = true;

			if (this.show) {
				setTimeout(() => this._show(), 100);
			}
		}
	}

	private _update() {
		if (!this._popover) {
			return;
		}

		computePosition(this._el, this._popover, {
			placement:
				this.variant === 'error' && !this.placement
					? 'bottom-start'
					: this.placement ?? 'top',
			strategy: this.strategy,

			middleware: [offset(this.offset), flip(), shift()],
		}).then(({ x, y, placement }) => {
			this._popover.dataset.placement = placement;
			Object.assign(this._popover.style, {
				top: `${y}px`,
				left: `${x}px`,
			});
		});
	}
}
