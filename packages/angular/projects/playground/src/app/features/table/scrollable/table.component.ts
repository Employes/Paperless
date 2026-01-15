import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
	CustomDatePipe,
	PAvatar,
	PButton,
	PLabel,
	PProfile,
	TableCellComponent,
	TableColumnComponent,
	TableComponent,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		AsyncPipe,
		PButton,
		TableComponent,
		TableColumnComponent,
		TableCellComponent,
		PProfile,
		PAvatar,
		PLabel,
		CustomDatePipe,
	],
})
export class ScrollableTableComponent {
	private _items = [
		{
			employee: 'Keven de Koning',
			date: new Date(),
			hours: 8,
			status: 'Ingediend',
			canSelect: true,
			hide: true,
		},
		{
			employee: 'Jurien Hamaker',
			date: new Date(),
			hours: 6.5,
			status: 'Ingediend',
			canSelect: true,
		},
		{
			employee: 'Bart van Zanten',
			date: new Date(),
			hours: 8,
			status: 'Goedgekeurd',
			canSelect: true,
		},
		{
			employee: 'Jim Overmeent',
			date: new Date(),
			hours: 8,
			status: 'Goedgekeurd',
			canSelect: true,
		},
		{
			employee: 'Keven de Koning',
			date: new Date(),
			hours: 8,
			status: 'Afgekeurd',
			canSelect: true,
		},
		{
			employee: 'Jurien Hamaker',
			date: new Date(),
			hours: 8,
			status: 'Afgekeurd',
			canSelect: true,
		},
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public items$ = new BehaviorSubject<any[]>(this._items);
	public showExtraColumn$ = new BehaviorSubject(false);

	public floatingMenuAmountSelectedText = '0 items selected';

	doubleRows() {
		this.items$.next([...this._items, ...this._items]);
	}
}
