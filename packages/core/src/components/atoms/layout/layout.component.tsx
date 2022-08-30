import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'p-layout',
    styleUrl: 'layout.component.scss',
    shadow: true,
})
export class Layout {
    /**
     * Variant of the layout
     */
    @Prop() variant: 'default' | 'login' = 'default';

    render() {
        return (
            <Host class={`p-layout variant-${this.variant}`}>
                <div class="topbar">
                    <slot name="topbar" />
                </div>
                <div class="sidebar">
                    <slot name="sidebar" />
                </div>
                <div class="content">
                    <div class="inner-content">
                        <slot name="content" />
                    </div>
                </div>
            </Host>
        );
    }
}