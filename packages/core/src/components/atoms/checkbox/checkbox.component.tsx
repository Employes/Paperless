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

const checkbox = cva(
	[
		'peer appearance-none m-0 outline-none flex-shrink-0',
		'border border-inset border-solid ',
		'rounded w-4 h-4',
	],
	{
		variants: {
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					'bg-white border-storm-100',
					'hover:bg-indigo-100 hover:border-storm-500/20',
					'group-hover/checkbox-label:bg-indigo-100 group-hover/checkbox-label:border-storm-100',
					'checked:bg-indigo-600 checked:border-storm-500/20',
					'checked:ring-2 checked:ring-indigo-100',
					'checked:hover:bg-indigo-700 checked:hover:border-storm-500/20',
					'checked:group-hover/checkbox-label:bg-indigo-700 checked:group-hover/checkbox-label:border-storm-500/20',
					'indeterminate:bg-indigo-600 indeterminate:border-storm-500/20',
					'indeterminate:ring-2 indeterminate:ring-indigo-100',
					'indeterminate:hover:bg-indigo-700 indeterminate:hover:border-storm-500/20',
					'indeterminate:group-hover/checkbox-label:bg-indigo-700 indeterminate:group-hover/checkbox-label:border-storm-500/20',
				],
				true: 'bg-white-600 border-storm-50 cursor-not-allowed',
			},
		},
	}
);

const iconContainer = cva(
	[
		'hidden peer-indeterminate:flex peer-checked:flex',
		'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none',
	],
	{
		variants: {
			disabled: {
				false: 'text-white',
				true: 'text-storm-200',
			},
		},
	}
);

const icon = cva(['drop-shadow-2 text-xs'], {
	variants: {
		disabled: {
			false:
				'group-hover/p-checkbox:text-sm group-hover/checkbox-label:text-sm',
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
			<label
				htmlFor={id}
				class='group/p-checkbox flex items-center justify-start gap-2'
			>
				<div class='relative flex flex-shrink-0 items-center'>
					<input
						class={checkbox({
							disabled: asBoolean(this.disabled),
						})}
						type='checkbox'
						id={id}
						name={this.name}
						required={asBoolean(this.required)}
						checked={asBoolean(this.checked)}
						indeterminate={asBoolean(this.indeterminate)}
						disabled={asBoolean(this.disabled)}
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
				<div class='flex-1 overflow-hidden text-ellipsis'>
					<slot />
				</div>
			</label>
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
