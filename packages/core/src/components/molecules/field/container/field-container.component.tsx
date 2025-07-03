import { Placement } from '@floating-ui/dom';
import {
	Component,
	Element,
	Event,
	EventEmitter,
	Fragment,
	h,
	Listen,
	Prop,
	State,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import {
	cn,
	formatTranslation,
	getLocaleComponentStrings,
} from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';

const loader = cva(['rounded-lg w-full'], {
	variants: {
		variant: {
			read: null,
			write: null,
		},
		size: {
			base: null,
			sm: null,
		},
	},
	compoundVariants: [
		{
			variant: 'read',
			size: 'base',
			class: 'h-5',
		},
		{
			variant: 'read',
			size: 'sm',
			class: 'h-4',
		},

		{
			variant: 'write',
			size: 'base',
			class: 'h-8',
		},
		{
			variant: 'write',
			size: 'sm',
			class: 'h-6',
		},
	],
});

export type templateFunc = () => string;

@Component({
	tag: 'p-field-container',
	styleUrl: 'field-container.component.css',
	shadow: true,
})
export class FieldContainer {
	private _defaultOptionalTemplate: templateFunc = () =>
		formatTranslation(this._locales.optional);
	/**
	 * The id for the label
	 */
	@Prop() id: string;

	/**
	 * Align content to the start or end
	 */
	@Prop() align: 'start' | 'end' = 'start';

	/**
	 * The label of the input group
	 */
	@Prop() label: string | HTMLSlotElement;

	/**
	 * Wether the field container is in loading state
	 */
	@Prop() loading: boolean = false;

	/**
	 * The size of the loader
	 */
	@Prop() loadingSize: 'base' | 'sm' = 'base';

	/**
	 * The variant of the field container
	 */
	@Prop() variant: 'read' | 'write';

	/**
	 * The helper of the input group
	 */
	@Prop() helper: string | HTMLSlotElement;

	/**
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean;

	/**
	 * Wether to show optional when not required
	 */
	@Prop({ reflect: true }) showOptional: boolean = true;

	/**
	 * The helper of the input group
	 */
	@Prop({ reflect: true }) error: string;

	/**
	 * The placement of the error popover
	 */
	@Prop() errorPlacement: Placement;

	/**
	 * Force show the error tooltip
	 */
	@Prop({ reflect: true }) forceShowTooltip: boolean = false;

	/**
	 * The template for the optional text
	 */
	@Prop() optionalTemplate: templateFunc = this._defaultOptionalTemplate;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@Event() focus: EventEmitter<void>;

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	componentWillLoad() {
		this._setLocales();
	}

	render() {
		const {
			hasHeaderSlot,
			hasErrorSlot,
			helper,
			label,
			errorAndErrorIsNotBoolean,
		} = this._getSlotInfo();

		let contentSlot = (
			<slot
				slot='trigger'
				name='content'
			/>
		);

		if (this.loading) {
			contentSlot = (
				<p-loader
					variant='ghost'
					class={loader({ variant: this.variant, size: this.loadingSize })}
					slot='trigger'
				/>
			);
		}

		return (
			<label
				htmlFor={this.id}
				class='flex w-inherit flex-col gap-1'
			>
				<div
					class={cn('flex items-end justify-between gap-1 empty:hidden', {
						'flex-row-reverse': this.align === 'end',
					})}
				>
					{!!label?.length && (
						<div
							class='text-xs font-medium text-black-teal-300'
							onClick={() => this.focus.emit()}
						>
							{label}
						</div>
					)}

					{((!asBoolean(this.required) && asBoolean(this.showOptional)) ||
						helper ||
						hasHeaderSlot) && (
						<div class='flex items-center gap-1'>
							{!asBoolean(this.required) &&
								asBoolean(this.showOptional) &&
								this.variant === 'write' && (
									<span class='text-xs font-medium text-black-teal-200'>
										{this.optionalTemplate()}
									</span>
								)}

							{(helper || hasHeaderSlot) && (
								<Fragment>
									{hasHeaderSlot && <slot name='header' />}
									{helper && (
										<p-helper
											class={`flex ${hasHeaderSlot ? 'ml-2' : ''}`}
											placement='top-end'
										>
											{helper}
										</p-helper>
									)}
								</Fragment>
							)}
						</div>
					)}
				</div>

				<p-tooltip
					class={cn({
						'w-full': this.variant === 'write' || this.loading,
						'ml-auto': this.align === 'end',
						'font-normal': this.variant === 'read',
					})}
					variant='error'
					content={this.error}
					show={errorAndErrorIsNotBoolean && asBoolean(this.forceShowTooltip)}
					enableUserInput={false}
					placement={this.errorPlacement}
				>
					{hasErrorSlot && (
						<slot
							name='error'
							slot='content'
						/>
					)}

					{contentSlot}
				</p-tooltip>
			</label>
		);
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}

	private _getSlotInfo() {
		const hasHelperSlot = !!this._el.querySelector(':scope > [slot="helper"]');
		const hasLabelSlot = !!this._el.querySelector(':scope > [slot="label"]');
		const hasHeaderSlot = !!this._el.querySelector(':scope > [slot="header"]');
		const hasErrorSlot = !!this._el.querySelector(':scope > [slot="error"]');

		const helper = hasHelperSlot ? <slot name='helper' /> : this.helper;
		const label = hasLabelSlot ? <slot name='label' /> : this.label;

		const errorAndErrorIsNotBoolean =
			hasErrorSlot ||
			(this.error && typeof this.error === 'string' && this.error !== 'true');

		return {
			hasHelperSlot,
			hasLabelSlot,
			hasHeaderSlot,
			hasErrorSlot,
			helper,
			label,
			errorAndErrorIsNotBoolean,
		};
	}
}
