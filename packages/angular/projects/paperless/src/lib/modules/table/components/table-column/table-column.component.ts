import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    TemplateRef,
} from '@angular/core';
import { Components } from '@paperless/core';
import {
    ProxyCmp,
    proxyOutputs,
} from '../../../../stencil/angular-component-lib/utils';

export declare interface PTableColumn extends Components.PTableColumn {
    /**
     * Event to let the table know it has to re render
     */
    tableDefinitionChanged: EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
    defineCustomElementFn: undefined,
    inputs: [
        'align',
        'name',
        'path',
        'sizes',
        'type',
        'useSlot',
        'hasCheckbox',
    ],
})
@Component({
    selector: 'p-table-column',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '<ng-content></ng-content>',
    inputs: [
        'align',
        'name',
        'path',
        'sizes',
        'type',
        'useSlot',
        'hasCheckbox',
    ],
})
export class TableColumn {
    protected el: HTMLElement;

    @Input() isLast = false;

    @ContentChild(TemplateRef, {
        read: TemplateRef,
        static: true,
    })
    public template: TemplateRef<any> | undefined;

    constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['tableDefinitionChanged']);
    }
}
