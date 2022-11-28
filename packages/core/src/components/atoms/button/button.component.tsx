import {
    Component,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Prop,
} from '@stencil/core';
import { RotateOptions } from '../../../types/tailwind';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';

@Component({
    tag: 'p-button',
    styleUrl: 'button.component.scss',
    // shadow: true,
})
export class Button {
    /**
     * The variant of the button
     */
    @Prop() variant: 'primary' | 'secondary' | 'text' = 'primary';

    /**
     * Href in case of "text" version
     */
    @Prop() href: string;

    /**
     * Target in case of "text" version
     */
    @Prop() target: string;

    /**
     * The size of the button
     */
    @Prop() size: 'small' | 'medium' = 'medium';

    /**
     * Wether to show a loader or not
     */
    @Prop() loading: boolean = false;

    /**
     * Wether to show a chevron or not
     */
    @Prop() chevron: boolean | 'up' | 'down' = false;

    /**
     * Chevron position
     */
    @Prop() chevronPosition: 'start' | 'end' = 'end';

    /**
     * Wether the button is disabled
     */
    @Prop() disabled: boolean = false;

    /**
     * Icon to show on the button
     */
    @Prop() icon: IconVariant;

    /**
     * Wether the button is icon only
     */
    @Prop() iconOnly: boolean = false;

    /**
     * Icon position
     */
    @Prop() iconPosition: 'start' | 'end' = 'end';

    /**
     * Icon flip
     */
    @Prop() iconFlip: IconFlipOptions;

    /**
     * Icon rotate
     */
    @Prop() iconRotate: RotateOptions;

    /**
     * Wether the button should inherit text styles
     */
    @Prop() inheritText: boolean = false;

    /**
     * Button click event
     */
    @Event() onClick: EventEmitter<MouseEvent>;

    render() {
        let loaderColor: 'white' | 'storm' | 'indigo' = 'white';
        switch (this.variant) {
            case 'secondary':
                loaderColor = 'storm';
                break;
            case 'text':
                loaderColor = 'indigo';
                break;
        }

        const VariableTag = this.variant === 'text' ? 'a' : 'button';

        return (
            <Host
                class={`p-button size-${this.size} ${
                    this.iconOnly && 'has-icon-only'
                } `}
            >
                <VariableTag
                    class={`variant-${this.variant}  icon-position-${
                        this.iconPosition
                    } ${this.chevron && 'has-chevron'} chevron-position-${
                        this.chevronPosition
                    } ${this.inheritText && 'should-inherit-text'}`}
                    disabled={this.disabled}
                    href={this.href}
                    target={this.target}
                >
                    {this.chevron && this.chevronPosition === 'start' && (
                        <p-icon
                            class="chevron"
                            variant="chevron"
                            rotate={this.chevron === 'up' ? 180 : 0}
                        />
                    )}

                    {this.icon &&
                        this.iconPosition === 'start' &&
                        this._getIcon()}

                    <slot />

                    {this.icon &&
                        this.iconPosition === 'end' &&
                        this._getIcon()}

                    {this.loading && <p-loader color={loaderColor} />}

                    {this.chevron && this.chevronPosition === 'end' && (
                        <p-icon
                            class="chevron"
                            variant="chevron"
                            rotate={this.chevron === 'up' ? 180 : 0}
                        />
                    )}
                </VariableTag>
            </Host>
        );
    }

    @Listen('click', { capture: true })
    handleClick(ev: MouseEvent) {
        if (this.loading || this.disabled) {
            ev.preventDefault();
            return;
        }

        this.onClick.emit(ev);
    }

    private _getIcon() {
        if (!this.icon) {
            return;
        }

        return (
            <p-icon
                variant={this.icon}
                flip={this.iconFlip}
                rotate={this.iconRotate}
            />
        );
    }
}
