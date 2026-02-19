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

import { ThemedHost } from '../../../internal/themed-host.component';
import { asBoolean } from '../../../utils/as-boolean';
import { nonce } from '../../../utils/nonce';

const radio = cva(
	[
		'peer m-0 flex-shrink-0 appearance-none outline-none',
		'border-inset rounded-full border border-solid',
		'h-4 w-4',
	],
	{
		variants: {
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					`
       border-storm-100 bg-white
       dark:border-white/15 dark:bg-white/10
     `,
					`
       hover:border-storm-500/20 hover:bg-indigo-100
       dark:hover:border-white/15 dark:hover:bg-white/20
     `,
					`
       group-hover/radio-label:border-storm-500/20
       group-hover/radio-label:bg-indigo-100
     `,
					'checked:cursor-auto',
					'checked:border-storm-500/20 checked:bg-indigo-600',
					`
       checked:ring-2 checked:ring-indigo-100
       dark:checked:ring-0
     `,
					'checked:hover:border-storm-500/20 checked:hover:bg-indigo-700',
					`
       checked:group-hover/radio-label:border-storm-500/20
       checked:group-hover/radio-label:bg-indigo-700
     `,
				],
				true: `
      cursor-not-allowed border-storm-50 bg-white-600
      dark:border-white/10 dark:bg-white/5
    `,
			},
		},
		compoundVariants: [
			{
				disabled: false,
				class: [
					'cursor-pointer shadow-1',
					'border-storm-100 bg-white',
					'hover:border-storm-500/20 hover:bg-indigo-100',
					`
       group-hover/radio-label:border-storm-500/20
       group-hover/radio-label:bg-indigo-100
     `,
				],
			},
		],
	}
);

const circle = cva(
	[
		'block',
		'rounded-full bg-transparent',
		`
    pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2
    -translate-y-1/2 transform
  `,
		'h-2 w-2',
	],
	{
		variants: {
			disabled: {
				false:
					'peer-checked:bg-white peer-checked:ring-1 peer-checked:ring-storm-500/10',
				true: `
      peer-checked:bg-storm-200
      dark:peer-checked:bg-hurricane-300
    `,
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
					class='flex items-center justify-start gap-2'
					htmlFor={id}
				>
					<div class='relative flex flex-shrink-0 items-center'>
						<input
							checked={this.checked}
							class={radio({
								disabled: asBoolean(this.disabled),
							})}
							disabled={asBoolean(this.disabled)}
							id={id}
							name={this.name}
							required={this.required}
							type='radio'
							value={this.value}
							onChange={ev => this._onChange(ev)}
						/>
						<div
							class={circle({
								disabled: asBoolean(this.disabled),
							})}
						/>
					</div>
					<div
						class='
        flex-1 overflow-hidden text-ellipsis
        empty:hidden
        dark:text-white
      '
					>
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
