import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
	State,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { HTMLInputTypeAttribute } from 'react';
import { RotateOptions } from '../../../types/tailwind';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';
import { templateFunc } from '../field-container/field-container.component';
import { Placement } from '@floating-ui/dom';

const field = cva(
	['flex gap-2', 'w-inherit px-2', 'border border-solid rounded-lg'],
	{
		variants: {
			size: {
				sm: 'h-6',
				base: 'h-8',
			},
			disabled: {
				false: 'bg-white',
				true: 'bg-white-600 cursor-not-allowed',
			},
			focused: {
				false: null,
				true: null,
			},
			error: {
				false: null,
				true: null,
			},
		},
		compoundVariants: [
			{
				focused: false,
				error: false,
				class: 'border-black-teal-100',
			},
			{
				disabled: false,
				focused: true,
				error: false,
				class:
					'border-supportive-lilac-800 ring ring-supportive-lilac-100 selection:bg-supportive-lilac',
			},

			{
				disabled: false,
				error: true,
				class: 'border-negative-red',
			},
			{
				disabled: false,
				focused: true,
				error: true,
				class: 'ring ring-negative-red-50 selection:bg-negative-red-50',
			},
		],
	}
);

const input = cva(
	'text-sm placeholder:text-sm placeholder:text-black-teal-200 text-black-teal border-none outline-none focus:outline-none bg-transparent flex-1 min-w-0 h-full',
	{
		variants: {
			disabled: {
				false: null,
				true: 'cursor-not-allowed',
			},
		},
	}
);

const prefixAndSuffic = cva(
	['flex flex-shrink-0 justify-center items-center text-center'],
	{
		variants: {
			disabled: {
				false: null,
				true: 'text-black-teal-100',
			},
			focused: {
				false: null,
				true: null,
			},
			error: {
				false: null,
				true: null,
			},
		},
		compoundVariants: [
			{
				disabled: false,
				focused: false,
				error: false,
				class: 'text-black-teal-300',
			},

			{
				disabled: false,
				focused: true,
				error: false,
				class: 'text-black-teal-500',
			},

			{
				disabled: false,
				focused: false,
				error: true,
				class: 'text-negative-red',
			},

			{
				disabled: false,
				focused: true,
				error: true,
				class: 'text-negative-red-800',
			},
		],
	}
);

@Component({
	tag: 'p-field',
	styleUrl: './field.component.css',
	shadow: true,
})
export class Field {
	/**
	 * The size of the input group
	 */
	@Prop() size: 'sm' | 'base' = 'base';

	/**
	 * The type of the input group
	 */
	@Prop() type: HTMLInputTypeAttribute | 'textarea' | 'slot' = 'text';

	/**
	 * The size of the input group
	 */
	@Prop() properties: any | string = {};

	/**
	 * The prefix of the input group
	 */
	@Prop() prefix: string;

	/**
	 * The suffix of the input group
	 */
	@Prop() suffix: string;

	/**
	 * Icon of the input group
	 */
	@Prop() icon: IconVariant;

	/**
	 * Icon flip */
	@Prop() iconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate: RotateOptions;

	/**
	 * Icon position
	 */
	@Prop() iconPosition: 'start' | 'end' = 'start';

	/**
	 * The value of the input
	 */
	@Prop() value: string;

	/**
	 * The label of the input group
	 */
	@Prop() label: string;

	/**
	 * The placeholder of the input
	 */
	@Prop() placeholder: string;

	/**
	 * The helper of the input group
	 */
	@Prop() helper: string;

	/**
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean = true;

	/**
	 * The error to display
	 */
	@Prop({ reflect: true }) error: string;

	/**
	 * The placement of the error popover
	 */
	@Prop() errorPlacement: Placement;

	/**
	 * Wether the input group is disabled
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

	/**
	 * Wether the input group is focused
	 */
	@Prop({ reflect: true }) focused: boolean = false;

	/**
	 * Force show the error tooltip
	 */
	@Prop({ reflect: true }) forceShowTooltip: boolean = false;

	/**
	 * Wether to select all text on focus
	 */
	@Prop({ reflect: true }) selectAllOnFocus: boolean = true;

	/**
	 * The method to use when focusing the input
	 */
	@Prop() focusMethod: 'focus' | 'click' = 'focus';

	/**
	 * The template for the optional text
	 */
	@Prop() optionalTemplate: templateFunc;

	/**
	 * Event whenever the value changes
	 */
	@Event() valueChange: EventEmitter<string>;

	/**
	 * Event whenever the input ref changes
	 */
	@Event() inputRefChange: EventEmitter<HTMLInputElement | HTMLTextAreaElement>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _focused = false;

	private _inputRef: HTMLInputElement | HTMLTextAreaElement;

	render() {
		const {
			prefix,
			suffix,
			hasHeaderSlot,
			hasLabelSlot,
			hasHelperSlot,
			hasErrorSlot,
		} = this._getSlotInfo();

		return (
			<Host class='p-field'>
				<p-field-container
					forceShowTooltip={this.forceShowTooltip || this._focused}
					label={this.label}
					helper={this.helper}
					error={this.error}
					required={this.required}
				>
					{hasLabelSlot && (
						<slot
							name='label'
							slot='label'
						/>
					)}

					{hasHeaderSlot && (
						<slot
							name='header'
							slot='header'
						/>
					)}

					{hasHelperSlot && (
						<slot
							name='helper'
							slot='helper'
						/>
					)}

					{hasErrorSlot && (
						<slot
							name='error'
							slot='error'
						/>
					)}

					<div
						class={field({
							error: !!this.error?.length,
							disabled: this.disabled,
							focused: this.focused || this._focused,
							size: this.size,
						})}
						slot='content'
					>
						{(prefix || (this.icon && this.iconPosition === 'start')) && (
							<div
								class={prefixAndSuffic({
									error: !!this.error?.length,
									disabled: this.disabled,
									focused: this.focused || this._focused,
								})}
								onClick={() => this._focusInput()}
							>
								{this.icon && this.iconPosition === 'start' ? (
									<p-icon
										class='flex'
										variant={this.icon}
										rotate={this.iconRotate}
										flip={this.iconFlip}
									/>
								) : (
									prefix
								)}
							</div>
						)}

						{this._getInput()}

						{(suffix || (this.icon && this.iconPosition === 'end')) && (
							<div
								class={prefixAndSuffic({
									error: !!this.error?.length,
									disabled: this.disabled,
									focused: this.focused || this._focused,
								})}
								onClick={() => this._focusInput()}
							>
								{this.icon && this.iconPosition === 'end' ? (
									<p-icon
										class='flex'
										variant={this.icon}
										rotate={this.iconRotate}
										flip={this.iconFlip}
									/>
								) : (
									suffix
								)}
							</div>
						)}
					</div>
				</p-field-container>
			</Host>
		);
	}

	@Listen('focusin')
	handleFocusIn() {
		if (this.disabled) {
			return;
		}

		this._focused = true;
		this._selectAll();
	}

	@Listen('focusout')
	handleFocusOut() {
		if (this.disabled) {
			return;
		}

		this._focused = false;
	}

	private _getSlotInfo() {
		const hasHelperSlot = !!this._el.querySelector(':scope > [slot="helper"]');
		const hasLabelSlot = !!this._el.querySelector(':scope > [slot="label"]');
		const hasPrefixSlot = !!this._el.querySelector(':scope > [slot="prefix"]');
		const hasSuffixSlot = !!this._el.querySelector(':scope > [slot="suffix"]');
		const hasHeaderSlot = !!this._el.querySelector(':scope > [slot="header"]');
		const hasErrorSlot = !!this._el.querySelector(':scope > [slot="error"]');

		const prefix = hasPrefixSlot ? <slot name='prefix' /> : this.prefix;
		const suffix = hasSuffixSlot ? <slot name='suffix' /> : this.suffix;

		const errorAndErrorIsNotBoolean =
			this.error && typeof this.error === 'string' && this.error !== 'true';

		return {
			hasHelperSlot,
			hasLabelSlot,
			hasPrefixSlot,
			hasSuffixSlot,
			hasHeaderSlot,
			hasErrorSlot,
			prefix,
			suffix,
			errorAndErrorIsNotBoolean,
		};
	}

	private _getInput() {
		if (this.type === 'custom') {
			return <slot name='input' />;
		}

		const props = {
			class: input({
				disabled: this.disabled,
			}),
			value: this.value,
			placeholder: this.placeholder,
			disabled: this.disabled,
			onInput: (ev: Event) => {
				this.valueChange.emit(
					(ev.target as HTMLTextAreaElement | HTMLInputElement).value
				);
			},
		};

		let properties = this.properties ?? {};
		if (typeof properties === 'string') {
			properties = JSON.parse(this.properties);
		}

		if (this.type === 'textarea') {
			<textarea
				ref={ref => this._setInputRef(ref)}
				{...props}
				{...properties}
			/>;
		}

		return (
			<input
				type={this.type}
				ref={ref => this._setInputRef(ref)}
				{...props}
				{...properties}
			/>
		);
	}

	private _setInputRef(ref: HTMLInputElement | HTMLTextAreaElement) {
		this._inputRef = ref;
		this.inputRefChange.emit(ref);
	}

	private _focusInput() {
		if (this._inputRef) {
			this._inputRef.focus();
			return;
		}

		const input = this._el.querySelector(':scope > [slot="input"]');
		(input as HTMLElement)[this.focusMethod]();
	}

	private _selectAll() {
		if (!this._inputRef || !this.selectAllOnFocus) {
			return;
		}

		this._inputRef.select();
	}
}
