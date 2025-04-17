import { newSpecPage } from '@stencil/core/testing';
import { Cropper } from '../cropper.component';

describe('p-cropper', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Cropper],
			html: '<p-cropper></p-cropper>',
		});
		expect(root).toEqualHtml(`
      <p-cropper class="p-cropper">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-cropper>
    `);
	});
});
