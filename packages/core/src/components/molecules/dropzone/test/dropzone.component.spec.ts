import { newSpecPage } from '@stencil/core/testing';

import { Dropzone } from '../dropzone.component';

describe('p-dropzone', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Dropzone],
			html: '<p-dropzone></p-dropzone>',
		});
		expect(root).toEqualHtml(`
      <p-dropzone class="p-dropzone">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-dropzone>
    `);
	});
});
