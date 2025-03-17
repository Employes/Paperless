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

const radio = cva(
	[
		'peer appearance-none m-0 outline-none flex-shrink-0',
		'rounded-full border border-inset border-solid ',
	],
	{
		variants: {
			size: {
				sm: 'w-4 h-4',
				base: 'w-6 h-6',
			},
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					'bg-white border-black-teal-100',
					'hover:bg-supportivce-lilac-100 hover:border-black-teal-100',
					'checked:cursor-auto',
					'checked:bg-supportive-lilac checked:border-black-teal/20',
					'checked:ring-2 checked:ring-supportive-lilac-100',
					'checked:hover:bg-supportive-lilac checked:hover:border-black-teal/20',
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

const circle = cva(
	[
		'block',
		'rounded-full bg-transparent',
		'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none',
	],
	{
		variants: {
			size: {
				sm: 'w-2 h-2',
				base: 'w-3 h-3',
			},
			disabled: {
				false:
					'peer-checked:bg-white peer-checked:ring-1 peer-checked:ring-black-teal/10',
				true: 'peer-checked:bg-black-teal-200',
			},
		},
	}
);

@Component({
	tag: 'p-radio',
	styleUrl: 'radio.component.css',
})
export class Radio {
	/**
	 * The value of the radio button
	 */
	@Prop() value: string;

	/**
	 * The size of the radio
	 */
	@Prop() size: 'sm' | 'base' = 'base';

	/**
	 * Wether the radio is disabled
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

	/**
	 * Wether the radio is required
	 */
	@Prop({ reflect: true }) required: boolean = true;

	/**
	 * The id of the radio button
	 */
	@Prop({ reflect: true }) id: string;

	/**
	 * The name of the radio button
	 */
	@Prop({ reflect: true }) name: string;

	/**
	 * Wether the radio is checked
	 */
	@Prop({ reflect: true }) checked: boolean = false;

	/**
	 * Event whenever the checked changes
	 */
	@Event() checkedChange: EventEmitter<boolean>;

	@State() private _nonce = nonce(5);

	render() {
		return (
			<Host class='p-radio'>
				<label
					htmlFor={this.id ?? this._nonce}
					class='flex items-center justify-start gap-2 text-black-teal'
				>
					<div class='relative flex flex-shrink-0 items-center'>
						<input
							class={radio({
								size: this.size,
								disabled: this.disabled,
							})}
							type='radio'
							id={this.id ?? this._nonce}
							name={this.name}
							required={this.required}
							value={this.value}
							checked={this.checked}
							disabled={this.disabled}
							onChange={ev => this._onChange(ev)}
						/>
						<div
							class={circle({
								size: this.size,
								disabled: this.disabled,
							})}
						/>
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
		this.checked = checked;
		this.checkedChange.emit(checked);
	}
}
