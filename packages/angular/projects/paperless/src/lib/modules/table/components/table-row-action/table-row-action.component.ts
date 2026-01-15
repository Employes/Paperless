/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Observable, Subscribable } from 'rxjs';

import { Components } from '@paperless/core';
import { TableRowActionShowFunc } from '@paperless/core/dist/types/components';

import { ProxyCmp } from '../../../../stencil/angular-component-lib/utils';

export interface TableRowActionClickEvent {
	item?: any;
	items?: any[];
	multi: boolean;
	ctrlDown: boolean;
}
export declare interface TableRowActionComponent extends Omit<
	Components.PTableRowAction,
	'action' | 'showFunction'
> {
	action: EventEmitter<TableRowActionClickEvent>;
	showFunction?: TableRowActionShowFunc;
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
		'showFunction',
	],
})
@Component({
	selector: 'p-table-row-action',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content />',

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
	standalone: false,
})
export class TableRowActionComponent implements OnChanges {
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
	@Output() action = new EventEmitter<TableRowActionClickEvent>();

	/**
	 * Event whenever loading has changed
	 */
	@Output() _loadingChanged = new EventEmitter<boolean>();

	/**
	 * A function for row actions of type "single" or "both" that determines if the action is shown on the row
	 */
	@Input() showFunction?: TableRowActionShowFunc;

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
