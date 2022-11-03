import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-modal-header',
    styleUrl: 'modal-header.component.scss',
    shadow: true,
})
export class ModalHeader {
    /**
     * Wether to show the close button on mobile
     */
    @Prop() showMobileClose = true;

    /**
     * Close click event
     */
    @Event() close: EventEmitter<MouseEvent>;

    render() {
        return (
            <Host class="p-modal-header">
                <span>
                    <slot />
                </span>

                {this.showMobileClose && (
                    <p-button
                        variant="secondary"
                        icon="negative"
                        iconOnly={true}
                        onClick={() => this.close.emit()}
                        size="small"
                    ></p-button>
                )}
            </Host>
        );
    }
}
