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
				sm: 'rounded-full w-8 h-4',
				base: 'rounded-full w-10 h-6',
			},
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					'bg-black-teal-50 border-black-teal-100',
					'hover:bg-supportive-lilac-100 hover:border-black-teal-100',
					'checked:bg-supportive-lilac checked:border-black-teal/20',
					'checked:ring-2 checked:ring-supportive-lilac-100',
					'checked:hover:bg-supportive-lilac-700 checked:hover:border-black-teal/20',
				],
				true: 'bg-white-600 border-black-teal-50 cursor-not-allowed ',
			},
		},
	}
);

const circle = cva(
	[
		'flex items-center justify-center',
		'rounded-full transition-all ',
		'absolute top-1/2  peer-checked:left-full  transform -translate-y-1/2 pointer-events-none',
	],
	{
		variants: {
			size: {
				sm: null,
				base: null,
			},
			disabled: {
				false: [
					'bg-white ring-1 ring-black-teal/10',
					'left-[1px] peer-checked:-translate-x-[calc(100%+1px)]',
					"after:content-[] peer-checked:after:content-['']  after:bg-supportive-lilac-800 after:rounded-full after:transition-all",
				],
				true: [
					'bg-black-teal-100 peer-checked:bg-black-teal-200',
					'left-[2px] peer-checked:-translate-x-[calc(100%+2px)]',
				],
			},
		},
		compoundVariants: [
			{
				size: 'sm',
				disabled: false,
				class: [
					'w-[14px] h-[14px] group-hover:w-[18px]',
					'after:w-1 after:h-1 group-hover:after:w-2',
				],
			},
			{
				size: 'base',
				disabled: false,
				class: [
					'w-[22px] h-[22px] group-hover:w-[26px]',
					'after:w-2 after:h-2 group-hover:after:w-3',
				],
			},

			{
				size: 'sm',
				disabled: true,
				class: 'w-3 h-3',
			},
			{
				size: 'base',
				disabled: true,
				class: 'w-[20px] h-[20px]',
			},
		],
	}
);

@Component({
	tag: 'p-toggle',
	styleUrl: 'toggle.component.css',
})
export class Toggle {
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
					<div class='group relative flex flex-shrink-0 items-center'>
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
							class={circle({
								size: this.size,
								disabled: this.disabled,
							})}
						></div>
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
