import { Placement } from '@floating-ui/dom';
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

const field = cva(['flex gap-2', 'w-inherit', 'border-solid rounded-lg'], {
	variants: {
		variant: {
			read: 'border-0 items-center',
			write: 'border px-2',
		},
		size: {
			sm: null,
			base: null,
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
		isTextarea: {
			false: null,
			true: null,
		},
	},
	compoundVariants: [
		{
			size: 'sm',
			variant: 'write',
			isTextarea: false,
			class: 'h-6',
		},
		{
			size: 'base',
			variant: 'write',
			isTextarea: false,
			class: 'h-8',
		},

		{
			size: 'sm',
			variant: 'read',
			class: 'h-4',
		},
		{
			size: 'base',
			variant: 'read',
			class: 'h-6',
		},

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
});

const input = cva(
	'text-sm placeholder:text-sm placeholder:text-black-teal-200 text-black-teal border-none outline-none focus:outline-none bg-transparent flex-1 min-w-0',
	{
		variants: {
			isTextarea: {
				false: 'h-full',
				true: null,
			},
			disabled: {
				false: null,
				true: 'cursor-not-allowed',
			},
		},
	}
);

const prefixAndSuffix = cva(
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
			isText: {
				false: null,
				true: 'text-sm',
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
	 * The variant of the field
	 */
	@Prop() variant: 'read' | 'write' = 'write';

	/**
	 * The size of the field
	 */
	@Prop() size: 'sm' | 'base' = 'base';

	/**
	 * The type of the field
	 */
	@Prop() type: HTMLInputTypeAttribute | 'textarea' | 'slot' = 'text';

	/**
	 * The size of the field
	 */
	@Prop() properties: any | string = {};

	/**
	 * The prefix of the field
	 */
	@Prop() prefix: string;

	/**
	 * The suffix of the field
	 */
	@Prop() suffix: string;

	/**
	 * Icon of the field
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
	 * The label of the field
	 */
	@Prop() label: string;

	/**
	 * The placeholder of the input
	 */
	@Prop() placeholder: string;

	/**
	 * The helper of the field
	 */
	@Prop() helper: string;

	/**
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean = true;

	/**
	 * Wether to autofocus the field
	 */
	@Prop({ reflect: true }) autofocus: boolean = false;

	/**
	 * The error to display
	 */
	@Prop({ reflect: true }) error: string;

	/**
	 * The placement of the error popover
	 */
	@Prop() errorPlacement: Placement;

	/**
	 * Wether the field is disabled
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

	/**
	 * Wether the field is focused
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

	componentDidLoad() {
		this._checkAutoFocus();
	}

	render() {
		const {
			prefix,
			suffix,
			hasHeaderSlot,
			hasLabelSlot,
			hasHelperSlot,
			hasErrorSlot,
			hasValueSlot,
		} = this._getSlotInfo();

		return (
			<Host class='p-field'>
				<p-field-container
					forceShowTooltip={this.forceShowTooltip || this._focused}
					label={this.label}
					helper={this.helper}
					error={this.error}
					required={this.required}
					variant={this.variant}
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
							variant: this.variant,
							isTextarea: this.type === 'textarea',
						})}
						slot='content'
					>
						{(prefix || (this.icon && this.iconPosition === 'start')) && (
							<div
								class={prefixAndSuffix({
									error: !!this.error?.length,
									disabled: this.disabled,
									focused: this.focused || this._focused,
									isText: typeof suffix === 'string',
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

						{this._getContent(hasValueSlot)}

						{(suffix || (this.icon && this.iconPosition === 'end')) && (
							<div
								class={prefixAndSuffix({
									error: !!this.error?.length,
									disabled: this.disabled,
									focused: this.focused || this._focused,
									isText: typeof suffix === 'string',
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
		const hasValueSlot = !!this._el.querySelector(':scope > [slot="value"]');

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
			hasValueSlot,
			prefix,
			suffix,
			errorAndErrorIsNotBoolean,
		};
	}

	private _getContent(hasValueSlot = false) {
		if (this.variant === 'read') {
			return (
				<div class='text-sm'>
					{hasValueSlot ? (
						<slot name='value' />
					) : !!this.value && this.value.length > 0 ? (
						this.value
					) : (
						'—'
					)}
				</div>
			);
		}

		if (this.type === 'slot') {
			return <slot name='input' />;
		}

		const props = {
			class: input({
				disabled: this.disabled,
				isTextarea: this.type === 'textarea',
			}),
			value: this.value,
			placeholder: this.placeholder,
			disabled: this.disabled,
			onInput: (ev: Event) => this._valueChange(ev),
		};

		let properties = this.properties ?? {};
		if (typeof properties === 'string') {
			properties = JSON.parse(this.properties);
		}

		if (this.type === 'textarea') {
			return (
				<textarea
					ref={ref => this._setInputRef(ref)}
					{...props}
					{...properties}
				/>
			);
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

	private _valueChange(ev) {
		const value = (ev.target as HTMLTextAreaElement | HTMLInputElement).value;
		this.value = value;
		this.valueChange.emit(value);
	}

	private _checkAutoFocus() {
		if (!this.autofocus) {
			return;
		}

		if (!this._inputRef) {
			setTimeout(() => this._checkAutoFocus(), 100);
			return;
		}

		this._focusInput();
	}
}
