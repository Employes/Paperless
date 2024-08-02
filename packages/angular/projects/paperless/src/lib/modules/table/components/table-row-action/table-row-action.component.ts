import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	NgZone,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { Params } from '@angular/router';
import { Components } from '@paperless/core';
import { Observable, Subscribable } from 'rxjs';
import { ProxyCmp } from '../../../../stencil/angular-component-lib/utils';

export interface TableRowActionClickEvent {
	item?: any;
	items?: any[];
	multi: boolean;
	ctrlDown: boolean;
}
export declare interface TableRowAction
	extends Omit<Components.PTableRowAction, 'action'> {
	action: EventEmitter<TableRowActionClickEvent>;
}

export type AsyncItem<T> = Observable<T> | Subscribable<T> | Promise<T>;

export type TableRowActionRouterLink =
	| string
	| any[]
	| AsyncItem<string | any[]>
	| ((item: any) => AsyncItem<string | any[]> | string | any[]);

export type TableRowActionQueryParams =
	| Params
	| AsyncItem<Params>
	| ((item: any) => Params | AsyncItem<Params>);

@ProxyCmp({
	inputs: [
		'disabled',
		'icon',
		'iconFlip',
		'iconOnly',
		'iconRotate',
		'label',
		'type',
		'loading',
	],
})
@Component({
	selector: 'p-table-row-action',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'disabled',
		'icon',
		'iconFlip',
		'iconOnly',
		'iconRotate',
		'label',
		'type',
		'loading',
	],
})
export class TableRowAction implements OnChanges {
	protected el: HTMLElement;

	/**
	 * Routerlink to navigate to
	 */
	@Input() routerLink?: TableRowActionRouterLink;

	/**
	 * Queryparams to add to the navigation
	 */
	@Input() queryParams?: TableRowActionQueryParams;

	/**
	 * Event whenever a row is clicked
	 */
	@Output() action: EventEmitter<TableRowActionClickEvent> =
		new EventEmitter();

	/**
	 * Event whenever loading has changed
	 */
	@Output() _loadingChanged: EventEmitter<boolean> = new EventEmitter();

	constructor(
		private _c: ChangeDetectorRef,
		protected z: NgZone,
		r: ElementRef
	) {
		this._c.detach();
		this.el = r.nativeElement;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['loading']) {
			this._loadingChanged.emit(changes['loading'].currentValue);
		}
	}
}
