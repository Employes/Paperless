import {
	AttachInternals,
	Component,
	Event,
	EventEmitter,
	Prop,
	State,
	h,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../utils/as-boolean';
import { nonce } from '../../../utils/nonce';
import { ThemedHost } from '../../../internal/themed-host.component';

const radio = cva(
	[
		'peer appearance-none m-0 outline-none flex-shrink-0',
		'rounded-full border border-inset border-solid ',
		'w-4 h-4',
	],
	{
		variants: {
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					'bg-white border-storm-100 dark:bg-white/10 dark:border-white/15',
					'hover:bg-indigo-100 hover:border-storm-500/20 dark:hover:bg-white/20 dark:hover:border-white/15',
					'group-hover/radio-label:bg-indigo-100 group-hover/radio-label:border-storm-500/20',
					'checked:cursor-auto',
					'checked:bg-indigo-600 checked:border-storm-500/20',
					'checked:ring-2 checked:ring-indigo-100 dark:checked:ring-0',
					'checked:hover:bg-indigo-700 checked:hover:border-storm-500/20',
					'checked:group-hover/radio-label:bg-indigo-700 checked:group-hover/radio-label:border-storm-500/20',
				],
				true: 'bg-white-600 border-storm-50 cursor-not-allowed dark:bg-white/5 dark:border-white/10',
			},
		},
		compoundVariants: [
			{
				disabled: false,
				class: [
					'cursor-pointer shadow-1',
					'bg-white border-storm-100',
					'hover:bg-indigo-100 hover:border-storm-500/20',
					'group-hover/radio-label:bg-indigo-100 group-hover/radio-label:border-storm-500/20',
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
		'w-2 h-2',
	],
	{
		variants: {
			disabled: {
				false:
					'peer-checked:bg-white peer-checked:ring-1 peer-checked:ring-storm-500/10',
				true: 'peer-checked:bg-storm-200 dark:peer-checked:bg-hurricane-300',
			},
		},
	}
);

@Component({
	tag: 'p-radio',
	styleUrl: 'radio.component.css',
	formAssociated: true,
})
export class Radio {
	/**
	 * The value of the radio button
	 */
	@Prop() value: string;

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

	@AttachInternals() _internals: ElementInternals;

	formResetCallback() {
		this._setValue(false);
	}

	formDisabledCallback(disabled: boolean) {
		if (!this._internals.form) {
			return;
		}

		this.disabled = disabled;
	}

	render() {
		const id = this.id?.length ? this.id : this._nonce;

		return (
			<ThemedHost>
				<label
					htmlFor={id}
					class='flex items-center justify-start gap-2'
				>
					<div class='relative flex flex-shrink-0 items-center'>
						<input
							class={radio({
								disabled: asBoolean(this.disabled),
							})}
							type='radio'
							id={id}
							name={this.name}
							required={this.required}
							value={this.value}
							checked={this.checked}
							disabled={asBoolean(this.disabled)}
							onChange={ev => this._onChange(ev)}
						/>
						<div
							class={circle({
								disabled: asBoolean(this.disabled),
							})}
						/>
					</div>
					<div class='flex-1 overflow-hidden text-ellipsis dark:text-white'>
						<slot />
					</div>
				</label>
			</ThemedHost>
		);
	}

	private _onChange(ev: Event) {
		if (asBoolean(this.disabled)) {
			ev.preventDefault();
			return;
		}

		const checked = (ev.target as HTMLInputElement).checked;
		this._setValue(checked);
	}

	private _setValue(checked: boolean) {
		this.checked = checked;
		this.checkedChange.emit(checked);
		this._internals.setFormValue(checked ? 'on' : 'off');
	}
}
