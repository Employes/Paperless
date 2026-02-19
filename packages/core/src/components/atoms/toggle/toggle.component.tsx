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

const toggle = cva(
	[
		'peer m-0 flex-shrink-0 appearance-none outline-none',
		'border-inset border border-solid',
		'h-4 w-8 rounded-full',
	],
	{
		variants: {
			disabled: {
				false: [
					'cursor-pointer shadow-1',
					`
       border-storm-100 bg-storm-50
       dark:border-white/15 dark:bg-white/10
     `,
					`
       hover:border-storm-500/20 hover:bg-indigo-100
       dark:hover:border-white/15 dark:hover:bg-white/20
     `,
					`
       group-hover/toggle-label:border-storm-500/20
       group-hover/toggle-label:bg-indigo-100
     `,
					'checked:border-storm-500/20 checked:bg-indigo-600',
					`
       checked:ring-2 checked:ring-indigo-100
       dark:checked:ring-0
     `,
					'checked:hover:border-storm-500/20 checked:hover:bg-indigo-700',
					`
       checked:group-hover/toggle-label:border-storm-500/20
       checked:group-hover/toggle-label:bg-indigo-700
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

const circle = cva(
	[
		'flex items-center justify-center',
		'rounded-full transition-all',
		`
    pointer-events-none absolute top-1/2 -translate-y-1/2 transform
    peer-checked:left-full
  `,
	],
	{
		variants: {
			disabled: {
				false: [
					'bg-white ring-1 ring-storm-500/10',
					`
       left-[1px]
       peer-checked:-translate-x-[calc(100%+1px)]
     `,
					`
       after:rounded-full after:bg-indigo-800 after:transition-all
       after:content-[unset]
       peer-checked:after:content-['']
     `,
					`
       h-[14px] w-[14px]
       group-hover/p-toggle:w-[18px]
       group-hover/toggle-label:w-[18px]
     `,
					`
       after:h-1 after:w-1
       group-hover/p-toggle:after:w-2
       group-hover/toggle-label:after:w-2
     `,
				],
				true: [
					`
       bg-storm-100
       peer-checked:bg-storm-200
       dark:bg-white/15
       dark:peer-checked:bg-white/15
     `,
					`
       left-[2px]
       peer-checked:-translate-x-[calc(100%+2px)]
     `,
					'h-3 w-3',
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
					<div class='group/p-toggle relative flex flex-shrink-0 items-center'>
						<input
							checked={!!this.checked}
							class={toggle({
								disabled: asBoolean(this.disabled),
							})}
							disabled={asBoolean(this.disabled)}
							id={id}
							name={this.name}
							required={this.required}
							type='checkbox'
							onChange={ev => this._onChange(ev)}
						/>

						<div
							class={circle({
								disabled: asBoolean(this.disabled),
							})}
						></div>
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
		if (checked != this.checked) {
			this.checked = checked;
			this.checkedChange.emit(checked);
			this._internals.setFormValue(this.checked ? 'on' : 'off');
		}
	}
}
