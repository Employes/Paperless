import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
	tag: 'p-range',
	styleUrl: 'range.component.css',
	shadow: true,
})
export class Range {
	/**
	 * The min value of the range
	 */
	@Prop() min: number = 0;

	/**
	 * The max value of the range
	 */
	@Prop() max: number = 100;

	/**
	 * The steps to go by
	 */
	@Prop() step: number = 0.5;

	/**
	 * The current value of the range
	 */
	@Prop() value: number = 0;

	/**
	 * Event whenever the value changes
	 */
	@Event({ bubbles: false }) valueChange: EventEmitter<string>;

	render() {
		const percentage = Math.round((this.value / (this.max - this.min)) * 100);

		return (
			<div class='flex w-inherit items-center gap-2 text-black-teal-300'>
				<p-icon variant='minus' />
				<div class='relative h-6'>
					<input
						class='z-0 flex-1'
						type='range'
						min={this.min}
						max={this.max}
						step={this.step}
						value={this.value}
						onInput={ev =>
							this.valueChange.emit((ev.target as HTMLInputElement).value)
						}
					/>
					<div
						class='z-1 absolute left-0 top-1/2 h-[2px] -translate-y-1/2 transform bg-black-teal-300'
						style={{
							width: `calc(${percentage}% - (1rem * ${percentage} / 100))`,
						}}
					></div>
				</div>
				<p-icon variant='plus' />
			</div>
		);
	}
}
