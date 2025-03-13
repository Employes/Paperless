import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	OverlayService,
	TableRowActionClickEvent,
} from 'projects/paperless/src/public-api';
import { TestDrawerComponent } from '../drawer/test-drawer.component';
import { BehaviorSubject } from 'rxjs';

@Component({
	templateUrl: 'table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	public items = JSON.parse(
		'[{"date":"01/01/2022","hours":8,"status":"Ingediend", "canSelect": true, "hide": true},{"date":"02/01/2022","hours":6.5,"status":"Ingediend", "canSelect": true},{"date":"03/01/2022","hours":8,"status":"Goedgekeurd", "canSelect": true},{"date":"08/01/2022","hours":8,"status":"Goedgekeurd", "canSelect": true},{"date":"09/01/2022","hours":8,"status":"Afgekeurd", "canSelect": true},{"date":"10/01/2022","hours":8,"status":"Afgekeurd", "canSelect": true}]'
	);

	public floatingMenuAmountSelectedText = '0 items selected';

	public downloading$ = new BehaviorSubject(false);
	private _downloadTimeout: any;

	public showNavigateButton = (item: any) => {
		console.log('Show navigate button');
		return item.hide === undefined ? true : !item.hide;
	};

	constructor(private _overlay: OverlayService) {}

	showDrawer() {
		this._overlay.open<TestDrawerComponent>(TestDrawerComponent);
	}

	actionClick(name: string, event: TableRowActionClickEvent) {
		if (name === 'download') {
			if (this._downloadTimeout) {
				clearTimeout(this._downloadTimeout);
				this._downloadTimeout = undefined;
			}

			this.downloading$.next(true);
			console.log('Started downloading');
			this._downloadTimeout = setTimeout(() => {
				console.log('Stopped downloading');
				this.downloading$.next(false);
			}, 3000);
		}

		if (event.multi) {
			const { items } = event;
			console.log('Multi', name, items);
			return;
		}

		const { item } = event;
		console.log('Single', name, item);
	}

	rowsChange(rows: any[]) {
		if (!rows?.length) {
			this.floatingMenuAmountSelectedText = '0 items selected';
			return;
		}

		if (rows.length === 1) {
			this.floatingMenuAmountSelectedText = '1 item selected';
			return;
		}

		this.floatingMenuAmountSelectedText = `${rows.length} items selected`;
	}
}
