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
    @Event() sizeChange: EventEmitter<number>;

    /**
     * Chevron position
     */
    @Prop() chevronPosition: 'start' | 'end' = 'start';

    /**
     * The size of the button
     */
    @Prop() buttonSize: 'small' | 'medium' = 'small';

    /**
     * The template for the data view
     */
    @Prop() buttonTemplate: templateFunc = (size) =>
        formatTranslation(this._locales.button, { size });

    /**
     * The template for the data view
     */
    @Prop() itemTemplate: templateFunc = (size) =>
        formatTranslation(this._locales.item, { size });

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
            <Host class="p-page-size-select">
                <p-dropdown
                    placement="top-start"
                    chevronPosition={this.chevronPosition}
                    chevronDirection="down"
                >
                    <p-button
                        variant="secondary"
                        slot="trigger"
                        size={this.buttonSize}
                    >
                        {this.buttonTemplate(this.size)}
                    </p-button>
                    <slot slot="items">
                        {this.sizeOptions.map((option) => (
                            <p-dropdown-menu-item
                                active={option === this.size}
                                onClick={() => this._changeSize(option)}
                            >
                                {this.itemTemplate(option)}
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