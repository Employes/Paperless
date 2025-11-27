import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	NgZone,
	TemplateRef,
} from '@angular/core';
import { Components } from '@paperless/core';
import {
	ProxyCmp,
	proxyOutputs,
} from '../../../../stencil/angular-component-lib/utils';

export declare interface TableExtraHeader extends Components.PTableExtraHeader {
	/**
	 * Event to let the table know it has to re render
	 */
	tableDefinitionChanged: EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
	defineCustomElementFn: undefined,
	inputs: ['align', 'name', 'sizes', 'parsedSizes', 'useSlot', 'sticky'],
})
@Component({
	selector: 'p-table-extra-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	inputs: ['align', 'name', 'sizes', 'parsedSizes', 'useSlot', 'sticky'],
})
export class TableExtraHeader {
	protected el: HTMLElement;

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
