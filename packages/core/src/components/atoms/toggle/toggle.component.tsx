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

const toggle = cva(
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
					'bg-storm-50 border-storm-100 dark:bg-white/10 dark:border-white/15',
					'hover:bg-indigo-100 hover:border-storm-500/20 dark:hover:bg-white/20 dark:hover:border-white/15',
					'group-hover/toggle-label:bg-indigo-100 group-hover/toggle-label:border-storm-500/20',
					'checked:bg-indigo-600 checked:border-storm-500/20',
					'checked:ring-2 checked:ring-indigo-100 dark:checked:ring-0',
					'checked:hover:bg-indigo-700 checked:hover:border-storm-500/20',
					'checked:group-hover/toggle-label:bg-indigo-700 checked:group-hover/toggle-label:border-storm-500/20',
				],
				true: 'bg-white-600 border-storm-50 cursor-not-allowed dark:bg-white/5 dark:border-white/10',
			},
		},
	}
);

const circle = cva(
	[
		'flex items-center justify-center',
		'rounded-full transition-all ',
		'absolute top-1/2 peer-checked:left-full transform -translate-y-1/2 pointer-events-none',
	],
	{
		variants: {
			disabled: {
				false: [
					'bg-white ring-1 ring-storm-500/10',
					'left-[1px] peer-checked:-translate-x-[calc(100%+1px)]',
					"after:content-[] peer-checked:after:content-['']  after:bg-indigo-800 after:rounded-full after:transition-all",
					'w-[14px] h-[14px] group-hover/p-toggle:w-[18px] group-hover/toggle-label:w-[18px]',
					'after:w-1 after:h-1 group-hover/p-toggle:after:w-2 group-hover/toggle-label:after:w-2',
				],
				true: [
					'bg-storm-100 peer-checked:bg-storm-200 dark:bg-white/15 dark:peer-checked:bg-white/15',
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
	scoped: true,
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
					<div class='group/p-toggle relative flex flex-shrink-0 items-center'>
						<input
							class={toggle({
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
								disabled: asBoolean(this.disabled),
							})}
						></div>
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
		if (checked != this.checked) {
			this.checked = checked;
			this.checkedChange.emit(checked);
			this._internals.setFormValue(this.checked ? 'on' : 'off');
		}
	}
}
