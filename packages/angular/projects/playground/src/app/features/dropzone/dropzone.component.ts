import { Component } from '@angular/core';

import { PDropzone } from '../../../../../paperless/src/public-api';

@Component({
	templateUrl: 'dropzone.component.html',
	imports: [PDropzone],
})
export class DropzoneComponent {
	onUpload(ev: CustomEvent) {
		console.log(ev);
	}
}
