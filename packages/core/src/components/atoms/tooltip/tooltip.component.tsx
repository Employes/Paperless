import {
	arrow,
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

@Component({
	tag: 'p-tooltip',
	styleUrl: 'tooltip.component.scss',
	shadow: true,
})
export class Tooltip {
	/**
	 * The variant of the popover
	 */
	@Prop() variant: 'hover' | 'click' | 'error' | 'error-element' = 'hover';

	/**
	 * The content of the popover
	 */
	@Prop() content: any = null;

	/**
	 * The placement of the popover
	 */
	@Prop() placement: Placement = 'top';

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
			<Host class='p-popover'>
				<slot name='trigger' />
				<div class='popover-container'>
					<div
						class={`popover variant-${this.variant}`}
						role='popover'
						data-placement={this.placement}
						data-strategy={this.strategy}
						ref={el => this._load(el)}
					>
						{this.content ? this.content : <slot name='content' />}
						<div class='arrow'></div>
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

		const arrowEl = this._popover.querySelector('.arrow') as HTMLElement;
		if (!arrowEl) {
			return;
		}

		computePosition(this._el, this._popover, {
			placement:
				this.variant === 'error' || this.variant === 'error-element'
					? 'top-end'
					: this.placement,
			strategy: this.strategy,

			middleware: [
				offset(this.variant === 'error' ? 14 : this.offset),
				flip(),
				shift(),
				arrow({ element: arrowEl, padding: 8 }),
			],
		}).then(({ x, y, placement, middlewareData }) => {
			this._popover.dataset.placement = placement;
			Object.assign(this._popover.style, {
				top: `${y}px`,
				left: `${x}px`,
			});

			if (middlewareData.arrow) {
				const { x, y } = middlewareData.arrow;

				Object.assign(arrowEl.style, {
					left:
						this.variant === 'error' || this.variant === 'error-element'
							? placement.indexOf('start') >= 0
								? '1rem'
								: 'calc(100% - 1rem)'
							: x != null
							? `${x}px`
							: '',
					top: y != null ? `${y}px` : '',
				});
			}
		});
	}
}
