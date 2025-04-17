import {
	Component,
	Element,
	h,
	Host,
	Listen,
	Prop,
	State,
} from '@stencil/core';
import { RotateOptions } from '../../../../../types/tailwind';
import {
	IconFlipOptions,
	IconVariant,
} from '../../../../atoms/icon/icon.component';

@Component({
	tag: 'p-input-group',
	styleUrl: './input-group.component.scss',
	shadow: true,
})
export class InputGroup {
	/**
	 * The size of the input group
	 */
	@Prop() size: 'small' | 'medium' = 'medium';

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
	 * Icon flip
	 */
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
	 * The label of the input group
	 */
	@Prop() label: string;

	/**
	 * The helper of the input group
	 */
	@Prop() helper: string;

	/**
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean;

	/**
	 * The helper of the input group
	 */
	@Prop({ reflect: true }) error: string;

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
	 * The method to use when focusing the input
	 */
	@Prop() focusMethod: 'focus' | 'click' = 'focus';

	/**
	 * The error variant to use
	 */
	@Prop() errorVariant: 'auto' | 'suffix' | 'element' = 'auto';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _forceShowTooltip = false;

	private _whitelistedTags = ['input', 'textarea'];

	componentDidLoad() {
		console.warn('[p-input-group] Deprecated, please use p-field');
	}

	componentWillRender() {
		this._setInputClasses();
	}

	render() {
		const {
			hasHeaderSlot,
			helper,
			label,
			prefix,
			suffix,
			errorAndErrorIsNotBoolean,
			errorVariant,
		} = this._getSlotInfo();

		return (
			<Host
				class={`p-input-group ${this.error?.length && 'error'} ${
					this.disabled && 'disabled'
				} ${this.focused && 'focused'} size-${this.size}`}
			>
				<div class='flex items-end justify-between'>
					{label && (
						<div
							class='input-label'
							onClick={() => this._focusInput()}
						>
							{label}
							{this.required && <span class='ml-1 text-negative'>*</span>}
						</div>
					)}

					{(helper || hasHeaderSlot) && (
						<div class='input-header'>
							{hasHeaderSlot && <slot name='header' />}
							{helper && (
								<p-helper
									class={`flex ${hasHeaderSlot ? 'ml-2' : ''}`}
									placement='top-end'
								>
									{helper}
								</p-helper>
							)}
						</div>
					)}
				</div>
				<p-tooltip
					class='w-full'
					variant='error'
					content={this.error}
					show={
						errorAndErrorIsNotBoolean &&
						errorVariant === 'element' &&
						(this.forceShowTooltip || this._forceShowTooltip)
					}
					enableUserInput={false}
				>
					<div
						class='content'
						slot='trigger'
					>
						{(prefix || (this.icon && this.iconPosition === 'start')) && (
							<div
								class={`prefix size-${this.size}`}
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
						{(suffix ||
							(errorAndErrorIsNotBoolean && errorVariant === 'icon') ||
							(this.icon && this.iconPosition === 'end')) && (
							<div
								class={`suffix size-${this.size}`}
								onClick={() => this._focusInput()}
							>
								{errorAndErrorIsNotBoolean && errorVariant === 'icon' ? (
									<p-input-error
										error={this.error}
										forceShowTooltip={
											this.forceShowTooltip || this._forceShowTooltip
										}
									/>
								) : this.icon && this.iconPosition === 'end' ? (
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

						<slot name='input' />
					</div>
				</p-tooltip>
			</Host>
		);
	}

	@Listen('focusin')
	handleFocusIn() {
		this._forceShowTooltip = true;
	}

	@Listen('focusout')
	handleFocusOut() {
		this._forceShowTooltip = false;
	}
	/*
     With this, we shall hack the system in ways no one would ever have thought.

     <div class="pl-0 pr-0 border-l-0 border-r-0 rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none"></div>
     */
	private _setInputClasses() {
		const input = this._el.querySelector(':scope > [slot="input"]');

		if (!input) {
			return;
		}

		const tagName = input.tagName.toLowerCase();
		if (this._whitelistedTags.indexOf(tagName) === -1) {
			return;
		}

		if (!input.classList.contains('p-input')) {
			input.classList.add('p-input');
		}

		const { prefix, suffix, errorAndErrorIsNotBoolean, errorVariant } =
			this._getSlotInfo();

		if (
			suffix ||
			(errorAndErrorIsNotBoolean && errorVariant === 'icon') ||
			(this.icon && this.iconPosition === 'end')
		) {
			input.classList.add(
				'border-r-0',
				'rounded-tr-none',
				'rounded-br-none',
				'pr-0'
			);
		} else {
			input.classList.remove(
				'border-r-0',
				'rounded-tr-none',
				'rounded-br-none',
				'pr-0'
			);
		}

		if (prefix || (this.icon && this.iconPosition === 'start')) {
			input.classList.add(
				'border-l-0',
				'rounded-tl-none',
				'rounded-bl-none',
				'pl-0'
			);
		} else {
			input.classList.remove(
				'border-l-0',
				'rounded-tl-none',
				'rounded-bl-none',
				'pl-0'
			);
		}

		if (this.size === 'small' && !input.classList.contains('size-small')) {
			input.classList.add('size-small');
		}

		if (this.size !== 'small' && input.classList.contains('size-small')) {
			input.classList.remove('size-small');
		}
	}

	private _getSlotInfo() {
		const hasHelperSlot = !!this._el.querySelector(':scope > [slot="helper"]');
		const hasLabelSlot = !!this._el.querySelector(':scope > [slot="label"]');
		const hasPrefixSlot = !!this._el.querySelector(':scope > [slot="prefix"]');
		const hasSuffixSlot = !!this._el.querySelector(':scope > [slot="suffix"]');
		const hasHeaderSlot = !!this._el.querySelector(':scope > [slot="header"]');

		const helper = hasHelperSlot ? <slot name='helper' /> : this.helper;
		const label = hasLabelSlot ? <slot name='label' /> : this.label;
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
			helper,
			label,
			prefix,
			suffix,
			errorAndErrorIsNotBoolean,
			errorVariant:
				this.errorVariant === 'auto'
					? this._el.offsetWidth <= 72
						? 'element'
						: 'icon'
					: this.errorVariant,
		};
	}

	private _focusInput() {
		const input = this._el.querySelector(':scope > [slot="input"]');
		(input as HTMLElement)[this.focusMethod]();
	}
}
