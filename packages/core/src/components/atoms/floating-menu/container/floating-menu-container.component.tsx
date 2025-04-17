import {
	Component,
	Event,
	EventEmitter,
	Fragment,
	Host,
	Listen,
	Prop,
	h,
	Element,
	State,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import {
	formatTranslation,
	getLocaleComponentStrings,
} from '../../../../utils';

const container = cva(
	[
		'floating-menu-container z-floating-menu',
		'bg-dark-teal-600 shadow-3',
		'h-10 py-1 w-auto',
		'rounded-lg',
		'text-sm',
		'flex items-center gap-2',
	],
	{
		variants: {
			enableAmountSelected: {
				false: 'px-1',
				true: 'pl-3 pr-1',
			},
		},
	}
);

const amountSelected = cva([
	'text-dark-teal-100',
	'min-w-0',
	'overflow-hidden text-ellipsis text-nowrap',
]);

export type amountSelectedTemplateFunc = (amount: number) => string;

@Component({
	tag: 'p-floating-menu-container',
	styleUrl: 'floating-menu-container.component.css',
	shadow: true,
})
export class FloatingMenuContainer {
	/**
	 * Wether the container is used in the table
	 */
	@Prop() usedInTable: boolean = false;

	/**
	 * Wether to show the amount selected
	 */
	@Prop() enableAmountSelected = true;

	/**
	 * The amount selected
	 */
	@Prop() amount = 0;

	/**
	 * Wether to enablethe close button
	 */
	@Prop() enableClose = true;

	/**
	 * The template for amount selected
	 */
	@Prop() amountSelectedTemplate: amountSelectedTemplateFunc = (
		amount: number
	) =>
		formatTranslation(
			(amount === 1
				? this._locales.amount_selected
				: this._locales.amount_selected_plural
			)?.replace('{{amount}}', amount)
		);

	/**
	 * Event whenever the close button is clicked
	 */
	@Event() close: EventEmitter<MouseEvent>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	componentWillLoad() {
		this._setLocales();
	}

	render() {
		return (
			<Host>
				<div
					class={container({
						enableAmountSelected: this.enableAmountSelected,
					})}
				>
					{this.enableAmountSelected && (
						<Fragment>
							<p class={amountSelected()}>
								{this.amountSelectedTemplate(this.amount)}
							</p>

							<p-divider
								class='mx-0 h-4 text-black-teal-400'
								variant='vertical'
							/>
						</Fragment>
					)}

					{this.usedInTable ? <slot name='floating-menu-item' /> : <slot />}

					{this.enableClose && (
						<div
							class='ml-auto cursor-pointer p-2 text-dark-teal-300 hover:text-dark-teal-100'
							onClick={ev => this.close.emit(ev)}
						>
							<p-icon variant='negative' />
						</div>
					)}
				</div>
			</Host>
		);
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}
}
