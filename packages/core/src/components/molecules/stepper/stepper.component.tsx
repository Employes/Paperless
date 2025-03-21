import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

@Component({
	tag: 'p-stepper',
	styleUrl: 'stepper.component.scss',
	shadow: true,
})
export class Stepper {
	/**
	 * The currently active step
	 */
	@Prop() activeStep: number = 1;

	/**
	 * Wether to automatically apply active & finished to items
	 */
	@Prop() enableAutoStatus: boolean = true;

	/**
	 * The direction of the stepper
	 */
	@Prop({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * The position of the content in case of vertical direction
	 */
	@Prop({ reflect: true }) contentPosition: 'start' | 'end' = 'end';

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

		let activeStep = this.activeStep - 1 || 0;
		const items = this._el.querySelectorAll('p-stepper-item');

		let directionChanged = false;
		for (let i = 0; i < items?.length; i++) {
			const item = items.item(i) as any;

			if (this.enableAutoStatus) {
				item.active = i === activeStep;
				item.finished = i < activeStep;
			}

			if (!this.activeStep || activeStep < 0) {
				if (item.active) {
					activeStep = i;
				}

				if (activeStep < 0 && item.finished) {
					activeStep = i + 1;
				}
			}

			if (item.direction !== this.direction && !directionChanged) {
				directionChanged = true;
			}

			item.direction = this.direction;
			item.align =
				this.direction === 'vertical'
					? 'start'
					: i === 0
					? 'start'
					: i === items?.length - 1
					? 'end'
					: 'center';
			item.contentPosition = this.contentPosition;
		}

		if (directionChanged) {
			// super hacky way to ensure all elements that have a direction changed are re-rendered
			await new Promise(resolve => setTimeout(resolve, 200));
		}

		for (let i = 0; i < items?.length; i++) {
			const item = items.item(i) as any;

			if (i < items.length - 1) {
				let nextItem = item.nextElementSibling;

				if (nextItem && nextItem.tagName.toLowerCase() === 'p-stepper-item') {
					const stepperLine = document.createElement('p-stepper-line');
					this._el.insertBefore(stepperLine, nextItem);
					this._setStepperLineData(stepperLine, item, nextItem, i, activeStep);

					const previous = stepperLine.previousElementSibling;
					if (previous && previous.tagName.toLowerCase() === 'p-stepper-line') {
						previous.remove();
					}

					continue;
				}

				if (nextItem && nextItem.tagName.toLowerCase() === 'p-stepper-line') {
					const stepperLine = nextItem;
					nextItem = nextItem.nextElementSibling;

					if (nextItem && nextItem.tagName.toLowerCase() === 'p-stepper-item') {
						this._setStepperLineData(
							stepperLine,
							item,
							nextItem,
							i,
							activeStep
						);
					}
				}
			}

			if (i > 0) {
				const previousItem = item.previousElementSibling;
				if (
					previousItem &&
					previousItem.tagName.toLowerCase() === 'p-stepper-line'
				) {
					previousItem.direction = this.direction;
					previousItem.active = item.active || item.finished;
				}
			}
		}

		const lines = this._el.querySelectorAll(
			'p-stepper-line:not(:has(+ p-stepper-item)), p-stepper-line:first-child'
		);
		for (let j = lines.length - 1; j >= 0; j--) {
			const line = lines.item(j);
			line.remove();
		}
	};

	private _setStepperLineData = (
		stepperLine: HTMLPStepperLineElement,
		item: HTMLPStepperItemElement,
		nextItem: HTMLPStepperItemElement,
		i: number,
		activeStep: number
	) => {
		const heightDiff = item.clientHeight / 2;
		const heightDiffNext = nextItem.clientHeight / 2;

		stepperLine.direction = this.direction;
		stepperLine.active = i < activeStep;

		if (heightDiff > 0 && this.direction === 'vertical') {
			stepperLine.style.marginTop = `-${heightDiff / 16}rem`;
			stepperLine.style.marginBottom = `-${heightDiffNext / 16}rem`;
			stepperLine.style.minHeight = `calc(1rem + ${
				(heightDiff + heightDiffNext) / 16
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
			<Host class='p-stepper'>
				<slot onSlotchange={() => this._generateStepsOnce()} />
			</Host>
		);
	}

	@Watch('activeStep')
	protected _onActiveStepChange() {
		this._generateStepsOnce();
	}
}
