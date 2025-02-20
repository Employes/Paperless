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
import {
	formatTranslation,
	getLocaleComponentStrings,
} from '../../../utils/localization';
import { defaultSize, defaultSizeOptions } from './constants';

export type templateFunc = (value: number) => string;

@Component({
	tag: 'p-page-size-select',
	shadow: true,
})
export class PageSizeSelect {
	private _defaultButtonTemplate: templateFunc = size =>
		formatTranslation(this._locales.item, { size });
	private _defaultItemTemplate: templateFunc = size =>
		formatTranslation(this._locales.item, { size });
	/**
	 * The current page
	 */
	@Prop({ mutable: true, reflect: true }) size: number = defaultSize;

	/**
	 * The available sizes
	 */
	@Prop() sizeOptions: number[] = defaultSizeOptions;

	/**
	 * Event whenever the size changes
	 */
	@Event({
		bubbles: false,
	})
	sizeChange: EventEmitter<number>;

	/**
	 * Chevron position
	 */
	@Prop() chevronPosition: 'start' | 'end' = 'start';

	/**
	 * The size of the button
	 */
	@Prop() buttonSize: 'sm' | 'base' = 'sm';

	/**
	 * The template for the data view
	 */
	@Prop() buttonTemplate: templateFunc = this._defaultButtonTemplate;

	/**
	 * The template for the data view
	 */
	@Prop() itemTemplate: templateFunc = this._defaultItemTemplate;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	/**
	 * Wether to hide when there is only 1 page available
	 */
	@Prop() hidden: boolean = false;

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	componentWillLoad() {
		this._setLocales();
	}

	render() {
		return (
			<Host class={`p-page-size-select ${this.hidden && 'hidden'}`}>
				<p-dropdown
					placement='top-start'
					chevronPosition={this.chevronPosition}
					chevronDirection='down'
				>
					<p-button
						variant='secondary'
						slot='trigger'
						size={this.buttonSize}
					>
						{this.buttonTemplate
							? this.buttonTemplate(this.size)
							: this._defaultButtonTemplate(this.size)}
					</p-button>
					<slot slot='items'>
						{this.sizeOptions.map(option => (
							<p-dropdown-menu-item
								active={option === this.size}
								onClick={() => this._changeSize(option)}
							>
								{this.itemTemplate
									? this.itemTemplate(option)
									: this._defaultItemTemplate(option)}
							</p-dropdown-menu-item>
						))}
					</slot>
				</p-dropdown>
			</Host>
		);
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}

	private _changeSize(s?: number) {
		if (!s) {
			return;
		}

		this.size = s;
		this.sizeChange.emit(this.size);
	}
}
