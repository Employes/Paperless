import {
    Component,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Prop,
    State,
} from '@stencil/core';

@Component({
    tag: 'p-drawer',
    shadow: true,
})
export class Drawer {
    /**
     * The Header of the drawer
     */
    @Prop() header?: string;

    /**
     * Wether to show the drawer or not
     */
    @Prop() show: boolean = false;

    /**
     * Wether to apply blur to the backdrop
     */
    @Prop() applyBlur: boolean = false;

    /**
     * Wether to show the close on mobile in the header
     */
    @Prop() showClose = true;

    /**
     * Wether to hide the drawer when the backdrop is clicked
     */
    @Prop() backdropClickClose = true;

    /**
     * Close click event
     */
    @Event() closeClicked: EventEmitter<MouseEvent>;

    /**
     * Closed event
     */
    @Event() closed: EventEmitter<null>;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    private _hasHeaderSlot = false;

    @State() private _closing = false;

    componentWillLoad() {
        this._hasHeaderSlot = !!this._el.querySelector(
            ':scope > [slot="header"]'
        );
    }

    render() {
        if (!this.show) {
            return;
        }

        const headerContent = <slot name="header" />;
        const bodyContent = <slot name="content" />;

        return (
            <Host class="p-drawer">
                <p-backdrop
                    variant="drawer"
                    applyBlur={this.applyBlur}
                    onClicked={(ev) => this._backdropClick(ev.detail)}
                    closing={this._closing}
                >
                    <p-drawer-container closing={this._closing}>
                        {(this.header?.length || this._hasHeaderSlot) && (
                            <p-drawer-header
                                show-close={this.showClose}
                                onClose={(ev) => this.close(ev.detail)}
                            >
                                {this._hasHeaderSlot
                                    ? headerContent
                                    : this.header}
                            </p-drawer-header>
                        )}
                        <p-drawer-body>{bodyContent}</p-drawer-body>
                    </p-drawer-container>
                </p-backdrop>
            </Host>
        );
    }

    private _backdropClick(ev) {
        if (!this.backdropClickClose) {
            return;
        }

        this.close(ev);
    }

    public close(ev: MouseEvent) {
        this.closeClicked.emit(ev);

        this._closing = true;

        setTimeout(() => {
            this.show = false;
            this._closing = false;
            this.closed.emit();
        }, 250);
    }
}
