import {
	Component,
	Event,
	EventEmitter,
	Host,
	Prop,
	State,
	h,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { nonce } from '../../../utils/nonce';

const checkbox = cva(
	[
		'peer appearance-none m-0 outline-none flex-shrink-0',
		'border border-inset border-solid ',
	],
	{
		variants: {
			size: {
				sm: 'rounded w-4 h-4',
				base: 'rounded-lg w-6 h-6',
			},
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					'bg-white border-black-teal-100',
					'hover:bg-supportivce-lilac-100 hover:border-black-teal-100',
					'checked:bg-supportive-lilac checked:border-black-teal/20',
					'checked:ring-2 checked:ring-supportive-lilac-100',
					'checked:hover:bg-supportive-lilac checked:hover:border-black-teal/20',
					'indeterminate:bg-supportive-lilac indeterminate:border-black-teal/20',
					'indeterminate:ring-2 indeterminate:ring-supportive-lilac-100',
					'indeterminate:hover:bg-supportive-lilac indeterminate:hover:border-black-teal/20',
				],
				true: 'bg-white-600 border-black-teal-50 cursor-not-allowed ',
			},
		},
		compoundVariants: [
			{
				disabled: false,
				class: [
					'cursor-pointer shadow-1',
					'bg-white border-black-teal-100',
					'hover:bg-supportive-lilac-100 hover:border-black-teal-100',
				],
			},
		],
	}
);

const icon = cva(
	[
		'hidden peer-indeterminate:flex peer-checked:flex',
		'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none',
	],
	{
		variants: {
			disabled: {
				false: 'text-white',
				true: 'text-black-teal-200',
			},
		},
	}
);

@Component({
	tag: 'p-checkbox',
	styleUrl: 'checkbox.component.css',
})
export class Checkbox {
	/**
	 * Wether the checkbox is checked
	 */
	@Prop() checked: boolean;

	/**
	 * Wether the checkbox is in indeterminate state
	 */
	@Prop() indeterminate: boolean;

	/**
	 * The size of the checkbox
	 */
	@Prop() size: 'sm' | 'base' = 'base';

	/**
	 * Wether the checkbox is disabled
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

	/**
	 * Wether the checkbox is required
	 */
	@Prop({ reflect: true }) required: boolean = true;

	/**
	 * The id of the checkbox button
	 */
	@Prop({ reflect: true }) id: string;

	/**
	 * The name of the checkbox button
	 */
	@Prop({ reflect: true }) name: string;

	/**
	 * Event whenever the checked changes
	 */
	@Event() checkedChange: EventEmitter<boolean>;
	/**
	 * Event whenever the indeterminate changes
	 */
	@Event() indeterminateChange: EventEmitter<boolean>;

	@State() private _nonce = nonce(5);

	render() {
		return (
			<Host class='p-checkbox'>
				<label
					htmlFor={this.id ?? this._nonce}
					class='flex items-center justify-start gap-2 text-black-teal'
				>
					<div class='relative flex flex-shrink-0 items-center'>
						<input
							class={checkbox({
								size: this.size,
								disabled: this.disabled,
							})}
							type='checkbox'
							id={this.id ?? this._nonce}
							name={this.name}
							required={this.required}
							checked={!!this.checked}
							indeterminate={this.indeterminate}
							disabled={this.disabled}
							onChange={ev => this._onChange(ev)}
						/>
						<div
							class={icon({
								disabled: this.disabled,
							})}
						>
							<p-icon
								size={this.size}
								class='drop-shadow-black-teal-10%'
								variant={!!this.indeterminate ? 'minus' : 'checkmark'}
							/>
						</div>
					</div>
					<slot></slot>
				</label>
			</Host>
		);
	}

	private _onChange(ev: Event) {
		if (this.disabled) {
			ev.preventDefault();
			return;
		}

		const checked = (ev.target as HTMLInputElement).checked;
		const indeterminate = (ev.target as HTMLInputElement).indeterminate;

		if (checked != this.checked) {
			this.checked = checked;
			this.checkedChange.emit(checked);
		}

		if (indeterminate != this.indeterminate) {
			this.indeterminate = indeterminate;
			this.indeterminateChange.emit(indeterminate);
		}
	}
}
