import {
	AfterViewInit,
	Component,
	ContentChild,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';

@Component({
	templateUrl: 'home.component.html',
})
export class HomeComponent implements AfterViewInit {
	public text = 'content';

	ngAfterViewInit() {
		setTimeout(() => (this.text = 'content but changed'), 2000);
	}
}
