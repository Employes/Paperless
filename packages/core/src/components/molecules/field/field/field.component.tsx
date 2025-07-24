import { Placement } from '@floating-ui/dom';
import {
	AttachInternals,
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Listen,
	Prop,
	State,
	Watch,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { HTMLInputTypeAttribute } from 'react';
import { RotateOptions } from '../../../../types/tailwind';
import { asBoolean } from '../../../../utils/as-boolean';
import { cn } from '../../../../utils/cn';
import { nonce } from '../../../../utils/nonce';
import {
	IconFlipOptions,
	IconVariant,
} from '../../../atoms/icon/icon.component';
import { templateFunc } from '../container/field-container.component';

const field = cva(['flex gap-2', 'w-inherit', 'border-solid rounded-lg'], {
	variants: {
		variant: {
			read: 'border-0 items-start flex-wrap break-all leading-6',
			write: 'border px-2',
		},
		size: {
			sm: null,
			base: null,
		},
		disabled: {
			false: null,
			true: null,
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
			true: 'items-start',
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
			class: 'min-h-4 text-xs',
		},
		{
			size: 'base',
			variant: 'read',
			class: 'min-h-5 text-sm',
		},

		{
			variant: 'write',
			focused: false,
			error: false,
			class: 'border-storm-100',
		},
		{
			variant: 'write',
			disabled: false,
			focused: true,
			error: false,
			class: 'border-indigo-600 ring ring-indigo-100 selection:bg-indigo-500',
		},

		{
			variant: 'write',
			disabled: false,
			class: 'bg-white',
		},
		{
			variant: 'write',
			disabled: true,
			class: 'bg-white-600  cursor-not-allowed',
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
	[
		'text-sm placeholder:text-sm placeholder:text-storm/40 text-storm-500',
		'border-none  bg-transparent flex-1 min-w-0 p-0',
		'outline-none focus:outline-none',
		'font-geist',
	],
	{
		variants: {
			isTextarea: {
				false: 'h-full',
				true: 'mt-1',
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
			variant: {
				read: 'leading-6',
				write: null,
			},
			disabled: {
				false: null,
				true: 'text-storm-100',
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
			isTextarea: {
				false: null,
				true: 'mt-2',
			},
		},
		compoundVariants: [
			{
				disabled: false,
				focused: false,
				error: false,
				class: 'text-storm-300',
			},

			{
				disabled: false,
				focused: true,
				error: false,
				class: 'text-storm-500',
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
	formAssociated: true,
})
export class Field {
	/**
	 * The alignment of the container
	 */
	@Prop() align: 'start' | 'end' = 'start';

	/**
	 * The variant of the field
	 */
	@Prop() variant: 'read' | 'write' = 'write';

	/**
	 * The id of the field
	 */
	@Prop() id: string;

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
	@Prop() value: string | number;

	/**
	 * The label of the field
	 */
	@Prop() label: string;

	/**
	 * Wether the field is in loading state
	 */
	@Prop() loading: boolean = false;

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
	 * Wether to show optional when not required
	 */
	@Prop({ reflect: true }) showOptional: boolean = true;

	/**
	 * Wether to show an add button when empty
	 */
	@Prop({ reflect: true }) showAddOnEmpty: boolean = false;

	/**
	 * The text to show on the add button
	 */
	@Prop({ reflect: true }) addText: string = 'Add';

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
	@Event({ bubbles: false }) valueChange: EventEmitter<string | number>;

	/**
	 * Event whenever the input ref changes
	 */
	@Event() inputRefChange: EventEmitter<HTMLInputElement | HTMLTextAreaElement>;

	/**
	 * Event whenever the value changes
	 */
	@Event({ bubbles: false }) add: EventEmitter<void>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _focused = false;
	@State() private _nonce = nonce(5);

	@AttachInternals() _internals: ElementInternals;

	private _inputRef: HTMLInputElement | HTMLTextAreaElement;
	private _lastValue: string | number | null;

	componentDidLoad() {
		this._checkAutoFocus();
	}

	formResetCallback() {
		this.value = null;
		this.valueChange.emit(null);
	}

	formDisabledCallback(disabled: boolean) {
		if (!this._internals.form) {
			return;
		}

		this.disabled = disabled;
	}

	render() {
		const {
			id,
			prefix,
			suffix,
			hasHeaderSlot,
			hasLabelSlot,
			hasHelperSlot,
			hasErrorSlot,
			hasValueSlot,
		} = this._getSlotInfo();

		return (
			<p-field-container
				forceShowTooltip={
					this.forceShowTooltip || this._focused || !!this.error?.length
				}
				id={id}
				label={this.label}
				align={this.align}
				loading={this.loading}
				loadingSize={this.size}
				helper={this.helper}
				error={this.error}
				required={this.required}
				showOptional={this.showOptional}
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
						disabled: asBoolean(this.disabled),
						focused: asBoolean(this.focused) || this._focused,
						size: this.size,
						variant: this.variant,
						isTextarea: this.type === 'textarea',
					})}
					title={
						this.variant === 'read' && !hasValueSlot
							? `${this.value}`
							: undefined
					}
					slot='content'
				>
					{(this.error?.length ||
						prefix ||
						(this.icon && this.iconPosition === 'start')) && (
						<div
							class={prefixAndSuffix({
								variant: this.variant,
								error: !!this.error?.length,
								disabled: asBoolean(this.disabled),
								focused: asBoolean(this.focused) || this._focused,
								isText: typeof suffix === 'string',
								isTextarea: this.type === 'textarea',
							})}
							onClick={() => this._focusInput()}
						>
							{(this.icon && this.iconPosition === 'start') ||
							this.error?.length ? (
								<p-icon
									class={cn('flex', {
										'mt-1': this.variant === 'read' && this.size === 'base',
									})}
									variant={this.error?.length ? 'warning' : this.icon}
									rotate={this.iconRotate}
									flip={this.iconFlip}
								/>
							) : (
								prefix
							)}
						</div>
					)}

					{this._getContent(hasValueSlot, id)}

					{(suffix || (this.icon && this.iconPosition === 'end')) && (
						<div
							class={prefixAndSuffix({
								variant: this.variant,
								error: !!this.error?.length,
								disabled: asBoolean(this.disabled),
								focused: asBoolean(this.focused) || this._focused,
								isText: typeof suffix === 'string',
								isTextarea: this.type === 'textarea',
							})}
							onClick={() => this._focusInput()}
						>
							{this.icon && this.iconPosition === 'end' ? (
								<p-icon
									class={cn('flex', {
										'mt-1': this.variant === 'read' && this.size === 'base',
									})}
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
		);
	}

	@Watch('value')
	watchvalue(value: string | null) {
		if (!this._inputRef) {
			return;
		}

		if (value === this._lastValue) {
			return;
		}

		this._lastValue = value;
		this._inputRef.value = value;
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

	@Listen('keyup', { capture: true })
	handleKeyup(ev: KeyboardEvent) {
		if (this.disabled) {
			ev.preventDefault();
			return;
		}

		if (!this._internals?.form) {
			return;
		}

		if (this.type === 'textarea' || ev.key !== 'Enter') {
			return;
		}

		this._internals.form.requestSubmit();
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

		const id = this.id?.length ? this.id : this._nonce;

		return {
			id,
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

	private _getContent(hasValueSlot = false, id: string) {
		if (this.variant === 'read') {
			return hasValueSlot ? (
				<slot name='value' />
			) : !!this.value && `${this.value}`.length > 0 ? (
				this.value
			) : this.showAddOnEmpty ? (
				<p-button
					variant='text'
					icon='plus'
					size='sm'
					onClick={() => this.add.emit()}
				>
					{this.addText}
				</p-button>
			) : (
				'—'
			);
		}

		if (this.type === 'slot') {
			return <slot name='input' />;
		}

		const props = {
			id,
			class: input({
				disabled: asBoolean(this.disabled),
				isTextarea: this.type === 'textarea',
			}),
			value: this.value,
			placeholder: this.placeholder,
			disabled: this.disabled,
			onInput: (ev: InputEvent) => this._valueChange(ev),
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
		ev.stopPropagation();
		const target = (ev.originalTarget ?? ev.target) as
			| HTMLTextAreaElement
			| HTMLInputElement;
		const value =
			this.type === 'number' ? parseFloat(target.value) : target.value;
		this._lastValue = value;
		this.value = value;
		this.valueChange.emit(value);
		this._internals.setFormValue(target.value);
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
