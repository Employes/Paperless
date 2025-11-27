import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	OverlayService,
	TableRowActionClickEvent,
} from 'projects/paperless/src/public-api';
import { TestDrawerComponent } from '../../drawer/test-drawer.component';
import { BehaviorSubject } from 'rxjs';

@Component({
	templateUrl: 'table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	public items$ = new BehaviorSubject<any[]>(this._items);
	public showExtraColumn$ = new BehaviorSubject(false);

	public floatingMenuAmountSelectedText = '0 items selected';

	doubleRows() {
		this.items$.next([...this._items, ...this._items]);
	}
}
