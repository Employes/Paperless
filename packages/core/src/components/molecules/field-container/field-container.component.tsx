import {
	Component,
	Element,
	EventEmitter,
	h,
	Host,
	Event,
	Prop,
	Fragment,
	State,
	Listen,
} from '@stencil/core';
import { formatTranslation, getLocaleComponentStrings } from '../../../utils';
import { Placement } from '@floating-ui/dom';

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
	 * The label of the input group
	 */
	@Prop() label: string | HTMLSlotElement;

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
	 * The helper of the input group
	 */
	@Prop({ reflect: true }) error: string | HTMLSlotElement;

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

		const contentSlot = (
			<slot
				name='content'
				slot='trigger'
			/>
		);

		return (
			<Host class='p-field-container'>
				<div class='flex w-inherit flex-col gap-1'>
					<div class='flex items-end justify-between gap-1'>
						{label && (
							<div
								class='text-xs font-medium text-black-teal-300'
								onClick={() => this.focus.emit()}
							>
								{label}
							</div>
						)}

						{(!this.required || helper || hasHeaderSlot) && (
							<div class='flex items-center gap-1'>
								{!this.required && this.variant === 'write' && (
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
						class={this.variant === 'write' ? 'w-full' : ''}
						variant='error'
						content={this.error}
						show={errorAndErrorIsNotBoolean && this.forceShowTooltip}
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
				</div>
			</Host>
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
