import {
	Component,
	Element,
	Fragment,
	h,
	Prop,
	State,
	Watch,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

export interface StepperStepItemObj {
	content: string;
	active: boolean;
	finished: boolean;
}

const stepper = cva(['flex gap-2'], {
	variants: {
		direction: {
			vertical: 'w-full flex-col flex-wrap',
			horizontal: 'h-auto items-center',
		},
		generatedOnce: {
			true: 'opacity-100',
			false: 'opacity-0',
		},
	},
});

@Component({
	tag: 'p-stepper',
	styleUrl: 'stepper.component.css',
	shadow: true,
})
export class Stepper {
	/**
	 * The steps but as a property, can also be used via slot
	 */
	@Prop() steps: string | string[] | StepperStepItemObj[];

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
	@Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * The alignment of the content in case of vertical direction
	 */
	@Prop() align: 'start' | 'center' | 'end' = 'center';

	/**
	 * The position of the content in case of vertical direction
	 */
	@Prop() contentPosition: 'start' | 'end' = 'end';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _generatedOnce = false;
	@State() private _loaded = false;

	private _generateTimeout: NodeJS.Timeout | undefined;
	private _containerRef: HTMLDivElement;
	private _resizeObserver: ResizeObserver;

	private _hasSlotItems = false;

	componentDidLoad() {
		this._hasSlotItems = !!this._el.querySelector(':scope > *');
		this._loaded = true;
	}

	disconnectCallback() {
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
		}
	}

	render() {
		if (!this._loaded) {
			return;
		}

		if (!this._hasSlotItems) {
			const steps =
				typeof this.steps === 'string' ? JSON.parse(this.steps) : this.steps;
			if (!steps?.length) {
				return;
			}

			const items = steps.map((step, index) => {
				const item = this._getItem(
					typeof step === 'string'
						? {
								active: false,
								finished: false,
								content: step,
							}
						: step,
					index
				);
				return (
					<Fragment>
						{item}
						{index < steps.length - 1 && this._getLine(index)}
					</Fragment>
				);
			});

			return (
				<div
					class={stepper({
						direction: this.direction,
						generatedOnce: true,
					})}
					ref={ref => this._setContainerRef(ref)}
				>
					{items}
				</div>
			);
		}

		return (
			<div
				class={stepper({
					direction: this.direction,
					generatedOnce: this._generatedOnce,
				})}
				ref={ref => this._setContainerRef(ref)}
			>
				<slot onSlotchange={() => this._generateLinesOnce()} />
			</div>
		);
	}

	@Watch('align')
	protected _onAlignChange() {
		this._generateLinesOnce();
	}

	@Watch('direction')
	protected _onDirectionChange() {
		this._generateLinesOnce();
	}

	@Watch('activeStep')
	protected _onActiveStepChange() {
		this._generateLinesOnce();
	}

	private _setContainerRef(ref: HTMLDivElement) {
		this._containerRef = ref;

		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
		}

		this._resizeObserver = new ResizeObserver(() => this._generateLinesOnce());
		this._resizeObserver.observe(this._containerRef);
	}

	private _getItem(data: StepperStepItemObj, i: number) {
		const activeStep = this.activeStep - 1 || 0;

		return (
			<p-stepper-item
				active={this.enableAutoStatus ? i === activeStep : data.active}
				finished={this.enableAutoStatus ? i < activeStep : data.finished}
				number={i + 1}
				align={this.direction === 'vertical' ? this.align : 'start'}
				contentPosition={this.contentPosition}
			>
				{data.content}
			</p-stepper-item>
		);
	}

	private _getLine(i: number) {
		const activeStep = this.activeStep - 1 || 0;
		return (
			<p-stepper-line
				active={i < activeStep}
				direction={this.direction}
			/>
		);
	}

	private _checkItems(items: NodeListOf<HTMLPStepperItemElement>) {
		const activeStep = this.activeStep - 1 || 0;

		for (let i = 0; i < items?.length; i++) {
			const item = items.item(i) as any;

			if (this.enableAutoStatus) {
				item.active = i === activeStep;
				item.finished = i < activeStep;
			}

			item.number = i + 1;
			item.align = this.direction === 'vertical' ? this.align : 'start';
			item.direction = this.direction;
			item.contentPosition = this.contentPosition;
		}
	}

	private _generateLinesOnce() {
		if (!this._hasSlotItems) {
			return;
		}

		if (this._generateTimeout) {
			clearTimeout(this._generateTimeout);
			this._generateTimeout = null;
		}

		this._generateTimeout = setTimeout(() => {
			const items = this._el.querySelectorAll('p-stepper-item');
			this._checkItems(items);
			this._generateLines(items);
			this._generateTimeout = null;
		}, 50);
	}

	private _generateLines(items: NodeListOf<HTMLPStepperItemElement>) {
		if (!this._el) {
			return;
		}

		let activeStep = this.activeStep - 1 || 0;

		for (let i = 0; i < items?.length; i++) {
			const item = items.item(i) as any;

			if (i < items.length - 1) {
				let nextItem = item.nextElementSibling;

				if (nextItem && nextItem.tagName.toLowerCase() === 'p-stepper-item') {
					const stepperLine = document.createElement('p-stepper-line');
					this._el.insertBefore(stepperLine, nextItem);
					this._setLineData(stepperLine, item, nextItem, i, activeStep);

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
						this._setLineData(stepperLine, item, nextItem, i, activeStep);
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

		if (!this._generatedOnce) {
			this._generatedOnce = true;
		}
	}

	private _setLineData(
		stepperLine: HTMLPStepperLineElement,
		item: HTMLPStepperItemElement,
		nextItem: HTMLPStepperItemElement,
		i: number,
		activeStep: number
	) {
		let heightDiff = item.clientHeight - 24;
		let heightDiffNext = nextItem.clientHeight - 24;

		if (this.align === 'center') {
			heightDiff = heightDiff / 2;
			heightDiffNext = heightDiffNext / 2;
		}

		stepperLine.direction = this.direction;
		stepperLine.active = i < activeStep;

		if (heightDiff > 0 && this.direction === 'vertical') {
			let totalHeight = 0;

			stepperLine.style.marginTop = '0';
			stepperLine.style.marginBottom = '0';

			if (this.align === 'start' || this.align === 'center') {
				stepperLine.style.marginTop = `-${
					heightDiff / 16 - (this.align === 'start' ? 1.5 : 0)
				}rem`;
				totalHeight += heightDiff - (this.align === 'start' ? 8 : 0);

				if (this.align === 'start') {
					stepperLine.style.marginBottom = `-1rem`;
				}
			}

			if (this.align === 'center' || this.align === 'end') {
				stepperLine.style.marginBottom = `-${
					heightDiffNext / 16 - (this.align === 'end' ? 1.5 : 0)
				}rem`;
				totalHeight += heightDiffNext - (this.align === 'end' ? 8 : 0);

				if (this.align === 'end') {
					stepperLine.style.marginTop = `-1rem`;
				}
			}

			stepperLine.style.minHeight = `calc(${totalHeight / 16}rem)`;
		}
	}
}
