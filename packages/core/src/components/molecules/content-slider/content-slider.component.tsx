import {
	Component,
	Element,
	h,
	Host,
	Listen,
	Prop,
	State,
} from '@stencil/core';
import { cn } from '../../../utils';

@Component({
	tag: 'p-content-slider',
	styleUrl: 'content-slider.component.scss',
	shadow: true,
})
export class ContentSlider {
	/**
	 * Wether to hide the indicator on mobile
	 */
	@Prop() hideMobileIndicator: boolean = false;

	/**
	 * Wether to disable dragging the content
	 */
	@Prop() disableDrag: boolean = false;

	/**
	 * Wether to disable auto centering the content
	 */
	@Prop() disableAutoCenter: boolean = false;

	/**
	 * Wether to disable clicking the indicator scrolls content
	 */
	@Prop() disableIndicatorClick: boolean = false;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _visibleIndex: number;
	@State() private _outerHeight = 0;
	@State() private _totalWidth = 0;
	private _sliderRef: HTMLElement;
	private _innerSliderRef: HTMLElement;
	private _items: HTMLElement[] = [];
	private _innerSliderResizeObserver: ResizeObserver;

	// mouse movement stuff
	private _startX: number;
	private _startMouseX: number;
	private _lastMouseX: number;
	private _lastIndex: number;
	private _shouldCheckLocation = false;
	@State() private _dragging = false;

	componentDidLoad() {
		this._innerSliderRef.style.setProperty('--tw-translate-x', `0px`);
	}

	disconnectedCallback() {
		if (this._innerSliderResizeObserver) {
			this._innerSliderResizeObserver.disconnect();
		}
	}

	render() {
		return (
			<Host class='p-content-slider'>
				<div
					class={`slider ${!this.disableDrag && 'draggable'} ${
						this._dragging && 'dragging'
					}`}
					style={{
						height: `${this._outerHeight}px`,
					}}
					ref={el => (this._sliderRef = el)}
					onMouseDown={e => this._mouseDownHandler(e)}
					onTouchStart={e => this._mouseDownHandler(e)}
					onMouseMove={e => this._mouseMoveHandler(e)}
					onTouchMove={e => this._mouseMoveHandler(e)}
				>
					<div
						class='inner-slider'
						ref={ref => this._setInnerSliderReft(ref)}
						onTransitionEnd={() => this._transitionEndHandler()}
					>
						<slot onSlotchange={() => this._slotChange()} />
					</div>
				</div>
				<div class={`indicator ${this.hideMobileIndicator && 'hidden'}`}>
					{this._items.map((_, i) => (
						<div
							onClick={() => this._scrollTo(i, true)}
							class={`item ${!this.disableIndicatorClick && 'cursor-pointer'}`}
						>
							<div
								class={cn('block h-2 w-2 rounded-full', {
									'bg-dark-teal-600': i === this._visibleIndex,
									'bg-dark-teal-400': i !== this._visibleIndex,
								})}
							/>
						</div>
					))}
				</div>
			</Host>
		);
	}

	private _mouseDownHandler(e) {
		if (this.disableDrag || this._dragging) {
			return;
		}

		const innerSliderStyle = getComputedStyle(this._innerSliderRef);
		if (innerSliderStyle.flexWrap === 'wrap') {
			return;
		}

		this._startMouseX = e.x;
		const sliderRect = this._sliderRef.getBoundingClientRect();
		if (e.type === 'touchstart') {
			this._startMouseX = e.touches?.[0].clientX;
		}

		const innerSliderRect = this._innerSliderRef.getBoundingClientRect();
		const offsetLeft = innerSliderRect.x - sliderRect.x;

		this._startX = this._startMouseX - sliderRect.x - offsetLeft;
		this._lastIndex = this._visibleIndex;
		this._dragging = true;
	}

	private _mouseMoveHandler(e) {
		if (!e || !this._dragging || this.disableDrag) {
			return;
		}

		e.preventDefault();

		this._shouldCheckLocation = true;

		if (this._innerSliderRef.style.getPropertyValue('pointer-events') === '') {
			this._innerSliderRef.style.pointerEvents = 'none';
		}

		const sliderRect = this._sliderRef.getBoundingClientRect();
		let x = e.clientX - sliderRect.left;
		this._lastMouseX = e.x;
		if (e.type === 'touchmove') {
			x = e.touches?.[0].clientX - sliderRect.left;
			this._lastMouseX = e.touches?.[0].clientX;
		}

		this._innerSliderRef.style.setProperty(
			'--tw-translate-x',
			`${x - this._startX}px`
		);

		this._checkBoundary();
		this._calculateIndicator();
	}

	private _transitionEndHandler() {
		this._calculateIndicator();
	}

	private _slotChange() {
		const items = this._el.querySelectorAll(':scope > *');
		this._items = Array.from(items) as HTMLElement[];

		setTimeout(() => {
			this._innerSliderRef.style.setProperty('--tw-translate-x', '0px');
			this._calculateWidth();
			this._calculateIndicator();
		}, 100);
	}

	@Listen('mouseup', { target: 'window' })
	@Listen('touchend', { target: 'window' })
	mouseUpHandler() {
		this._dragging = false;
		this._innerSliderRef.style.removeProperty('pointer-events');

		this._checkLocation();
	}

	@Listen('resize', { target: 'window' })
	resizeHandler() {
		if (this._innerSliderRef) {
			this._innerSliderRef.style.setProperty('--tw-translate-x', '0px');
			this._calculateWidth();
			this._calculateIndicator();
		}
	}

	private _setInnerSliderReft(ref) {
		this._innerSliderRef = ref;
		this._innerSliderResizeObserver = new ResizeObserver(() =>
			this._calculateHeight()
		);
		this._innerSliderResizeObserver.observe(this._innerSliderRef);
	}

	private _scrollTo(i: number, manual = false) {
		if (this.disableIndicatorClick && manual) {
			return;
		}

		const el = this._items[i];

		if (i === 0) {
			this._innerSliderRef.style.setProperty('--tw-translate-x', `0px`);
			return;
		}

		const sliderRect = this._sliderRef.getBoundingClientRect();
		const innerSliderRect = this._innerSliderRef.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();

		const offsetLeft = elRect.x - innerSliderRect.x;

		const centerOffset = offsetLeft + elRect.width / 2 - sliderRect.width / 2;

		this._innerSliderRef.style.setProperty(
			'--tw-translate-x',
			`-${centerOffset}px`
		);

		this._checkBoundary();
		this._calculateIndicator();
	}

	private _checkBoundary() {
		let outer = this._sliderRef.getBoundingClientRect();

		const left = parseInt(
			this._innerSliderRef.style.getPropertyValue('--tw-translate-x')
		);
		if (left > 0) {
			this._innerSliderRef.style.setProperty('--tw-translate-x', `0px`);
		}

		const maxLeft = (this._totalWidth - outer.width) * -1;
		if (left < maxLeft) {
			this._innerSliderRef.style.setProperty(
				'--tw-translate-x',
				`${maxLeft}px`
			);
		}
	}

	private _calculateIndicator() {
		for (let i = 0; i < this._items.length; i++) {
			const item = this._items[i];
			const visible = this._isVisible(item);

			if (visible) {
				this._visibleIndex = i;
			}

			if (i === 0 && visible) {
				break;
			}
		}
	}

	private _checkLocation() {
		if (!this._shouldCheckLocation) {
			return;
		}

		let scrollToIndex = null;
		if (this._lastIndex !== this._visibleIndex) {
			scrollToIndex = this._visibleIndex;
		}

		if (this._lastIndex === this._visibleIndex) {
			if (this._lastMouseX > this._startMouseX && this._lastIndex !== 0) {
				scrollToIndex = this._lastIndex - 1;
			}

			if (
				this._lastMouseX < this._startMouseX &&
				this._lastIndex !== this._items?.length - 1
			) {
				scrollToIndex = this._lastIndex + 1;
			}
		}

		if (scrollToIndex !== null) {
			this._shouldCheckLocation = false;
			setTimeout(() => this._scrollTo(scrollToIndex), 100);
		}
	}

	private _isVisible(el: HTMLElement) {
		if (!this._el || !el) {
			return false;
		}

		const elRect = el.getBoundingClientRect();
		const sliderRect = this._sliderRef.getBoundingClientRect();

		return (
			(elRect.left >= sliderRect.left && elRect.right <= sliderRect.right) ||
			(this._isMobile(el) &&
				elRect.left + elRect.width / 2 >= sliderRect.left &&
				elRect.left + elRect.width / 2 <= sliderRect.right)
		);
	}

	private _calculateWidth() {
		let totalWidth = 0;

		for (let item of this._items) {
			const rect = item.getBoundingClientRect();
			totalWidth += rect.width;
		}

		const sliderStyle = getComputedStyle(this._sliderRef);
		const padding = parseInt(sliderStyle.padding) * 2;

		const innerSliderStyle = getComputedStyle(this._innerSliderRef);
		const gap = parseInt(innerSliderStyle.gap) * (this._items.length - 1);

		totalWidth += padding + gap;

		this._totalWidth = totalWidth;
	}

	private _calculateHeight() {
		const outerHeight = this._items.at(0).getBoundingClientRect().height;
		if (outerHeight != this._outerHeight) {
			this._outerHeight = outerHeight;
		}
	}

	private _isMobile(el?: HTMLElement) {
		if (!el) {
			el = this._items.at(0);
		}

		const elRect = el.getBoundingClientRect();
		const sliderRect = this._sliderRef.getBoundingClientRect();

		return sliderRect.width - elRect.width < 10;
	}
}
