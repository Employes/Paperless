import {
    AttachInternals,
    Component,
    Event,
    EventEmitter,
    Prop,
    State,
    h
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../utils/as-boolean';
import { nonce } from '../../../utils/nonce';

const checkbox = cva(
	[
		'peer appearance-none m-0 outline-none flex-shrink-0',
		'border border-inset border-solid ',
		'rounded-full w-8 h-4',
	],
	{
		variants: {
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
			disabled: {
				false: [
					'bg-white ring-1 ring-black-teal/10',
					'left-[1px] peer-checked:-translate-x-[calc(100%+1px)]',
					"after:content-[] peer-checked:after:content-['']  after:bg-supportive-lilac-800 after:rounded-full after:transition-all",
					'w-[14px] h-[14px] group-hover:w-[18px]',
					'after:w-1 after:h-1 group-hover:after:w-2',
				],
				true: [
					'bg-black-teal-100 peer-checked:bg-black-teal-200',
					'left-[2px] peer-checked:-translate-x-[calc(100%+2px)]',
					'w-3 h-3',
				],
			},
		},
	}
);

@Component({
	tag: 'p-toggle',
	styleUrl: 'toggle.component.css',
	formAssociated: true,
})
export class Toggle {
	/**
	 * Wether the checkbox is checked
	 */
	@Prop() checked: boolean;

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
	}

	formDisabledCallback(disabled: boolean) {
		if(!this._internals.form) {
			return;
		}

		this.disabled = disabled;
	}

	render() {
		const id = this.id?.length ? this.id : this._nonce;

		return (
			<label
				htmlFor={id}
				class='flex items-center justify-start gap-2 text-black-teal'
			>
				<div class='group relative flex flex-shrink-0 items-center'>
					<input
						class={checkbox({
							disabled: asBoolean(this.disabled),
						})}
						type='checkbox'
						id={id}
						name={this.name}
						required={this.required}
						checked={!!this.checked}
						disabled={asBoolean(this.disabled)}
						onChange={ev => this._onChange(ev)}
					/>
					<div
						class={circle({
							disabled: this.disabled,
						})}
					></div>
				</div>
				<slot />
			</label>
		);
	}

	private _onChange(ev: Event) {
		if (asBoolean(this.disabled)) {
			ev.preventDefault();
			return;
		}

		const checked = (ev.target as HTMLInputElement).checked;
		if (checked != this.checked) {
			this.checked = checked;
			this.checkedChange.emit(checked);
			this._internals.setFormValue(this.checked ? "on" : "off");
		}

	}
}
