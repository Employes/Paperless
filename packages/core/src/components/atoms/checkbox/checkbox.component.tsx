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

const checkbox = cva(
	[
		'peer m-0 flex-shrink-0 appearance-none outline-none',
		'border-inset border border-solid',
		'h-4 w-4 rounded',
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
						group-hover/checkbox-label:border-storm-100
						group-hover/checkbox-label:bg-indigo-100
					`,
					'checked:border-storm-500/20 checked:bg-indigo-600',
					`
						checked:ring-2 checked:ring-indigo-100
						dark:checked:ring-0
					`,
					'checked:hover:border-storm-500/20 checked:hover:bg-indigo-700',
					`
						checked:group-hover/checkbox-label:border-storm-500/20
						checked:group-hover/checkbox-label:bg-indigo-700
					`,
					'indeterminate:border-storm-500/20 indeterminate:bg-indigo-600',
					'indeterminate:ring-2 indeterminate:ring-indigo-100',
					'indeterminate:hover:border-storm-500/20 indeterminate:hover:bg-indigo-700',
					`
						indeterminate:group-hover/checkbox-label:border-storm-500/20
						indeterminate:group-hover/checkbox-label:bg-indigo-700
					`,
				],
				true: `
					cursor-not-allowed border-storm-50 bg-white-600
					dark:border-white/10 dark:bg-white/5
				`,
			},
		},
	}
);

const iconContainer = cva(
	[
		`
			hidden
			peer-checked:flex
			peer-indeterminate:flex
		`,
		`
			pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2
			-translate-y-1/2 transform
		`,
	],
	{
		variants: {
			disabled: {
				false: 'text-white',
				true: `
					text-storm-200
					dark:text-hurricane-300
				`,
			},
		},
	}
);

const icon = cva(['text-xs drop-shadow-2'], {
	variants: {
		disabled: {
			false: `
				group-hover/checkbox-label:text-sm
				group-hover/p-checkbox:text-sm
			`,
			true: null,
		},
	},
});

@Component({
	tag: 'p-checkbox',
	styleUrl: 'checkbox.component.css',
	formAssociated: true,
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

	@AttachInternals() _internals: ElementInternals;

	formResetCallback() {
		this.checked = false;
		this.indeterminate = false;
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
					class='group/p-checkbox flex items-center justify-start gap-2'
					htmlFor={id}
				>
					<div class='relative flex flex-shrink-0 items-center'>
						<input
							checked={asBoolean(this.checked)}
							class={checkbox({
								disabled: asBoolean(this.disabled),
							})}
							disabled={asBoolean(this.disabled)}
							id={id}
							indeterminate={asBoolean(this.indeterminate)}
							name={this.name}
							required={asBoolean(this.required)}
							type='checkbox'
							onChange={ev => this._onChange(ev)}
						/>
						<div
							class={iconContainer({
								disabled: asBoolean(this.disabled),
							})}
						>
							<p-icon
								class={icon({
									disabled: asBoolean(this.disabled),
								})}
								size='auto'
								variant={
									asBoolean(this.indeterminate) ? 'minus' : 'checkmarkThick'
								}
							/>
						</div>
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
		if (this.disabled) {
			ev.preventDefault();
			return;
		}

		const checked = asBoolean((ev.target as HTMLInputElement).checked);
		const indeterminate = asBoolean(
			(ev.target as HTMLInputElement).indeterminate
		);

		if (checked != this.checked) {
			this.checked = checked;
			this.checkedChange.emit(checked);
		}

		if (indeterminate != this.indeterminate) {
			this.indeterminate = indeterminate;
			this.indeterminateChange.emit(indeterminate);
		}

		this._internals.setFormValue(
			this.indeterminate ? 'indeterminate' : this.checked ? 'on' : 'off'
		);
	}
}
