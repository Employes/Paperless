import { Component, Element, h } from '@stencil/core';

@Component({
	tag: 'p-listing',
	styleUrl: 'listing.component.css',
	shadow: true,
})
export class Listing {
	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	private _generateTimeout: NodeJS.Timeout | undefined;
	private _resizeObserver: ResizeObserver;

	private _generateStepsOnce = () => {
		if (this._generateTimeout) {
			clearTimeout(this._generateTimeout);
			this._generateTimeout = null;
		}

		this._generateTimeout = setTimeout(() => this._generateSteps(), 50);
	};

	private _generateSteps = async () => {
		if (!this._el) {
			return;
		}

		const items = this._el.querySelectorAll('p-listing-item');

		for (let i = 0; i < items?.length; i++) {
			const item = items.item(i) as any;

			if (i < items.length - 1) {
				let nextItem = item.nextElementSibling;

				if (nextItem && nextItem.tagName.toLowerCase() === 'p-listing-item') {
					const listingLine = document.createElement('p-listing-line');
					this._el.insertBefore(listingLine, nextItem);
					this._setListingLineData(listingLine, item, nextItem);

					const previous = listingLine.previousElementSibling;
					if (previous && previous.tagName.toLowerCase() === 'p-listing-line') {
						previous.remove();
					}

					continue;
				}

				if (nextItem && nextItem.tagName.toLowerCase() === 'p-listing-line') {
					const listingLine = nextItem;
					nextItem = nextItem.nextElementSibling;

					if (nextItem && nextItem.tagName.toLowerCase() === 'p-listing-item') {
						this._setListingLineData(
							listingLine,
							item,
							nextItem,
						);
					}
				}
			}
		}

		const lines = this._el.querySelectorAll(
			'p-listing-line:not(:has(+ p-listing-item)), p-listing-line:first-child'
		);
		for (let j = lines.length - 1; j >= 0; j--) {
			const line = lines.item(j);
			line.remove();
		}
	};

	private _setListingLineData = (
		listingLine: HTMLPListingLineElement,
		item: HTMLPListingItemElement,
		nextItem: HTMLPListingItemElement,
	) => {
		let heightDiff = (item.clientHeight - 16) / 2;
		let heightDiffNext = (nextItem.clientHeight - 16) / 2;

		if (heightDiff > 0) {
			let totalHeight = heightDiff + heightDiffNext;

			listingLine.style.marginTop = `-${heightDiff / 16}rem`;
			listingLine.style.marginBottom = `-${heightDiffNext / 16}rem`;

			listingLine.style.minHeight = `calc(1.5rem + ${
				((totalHeight - 16) / 16)
			}rem)`;
		}
	};

	componentDidLoad() {
		this._resizeObserver = new ResizeObserver(() => this._generateStepsOnce());
		this._resizeObserver.observe(this._el);
	}

	disconnectCallback() {
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
		}
	}

	render() {
		return (
			<div class="flex gap-1 w-full flex-col flex-wrap items-start">
				<slot onSlotchange={() => this._generateStepsOnce()} />
			</div>
		);
	}
}
