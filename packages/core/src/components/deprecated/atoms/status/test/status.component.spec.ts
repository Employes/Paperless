import { newSpecPage } from '@stencil/core/testing';
import { Status } from '../status.component';

describe('p-status', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Status],
			html: '<p-status></p-status>',
		});
		expect(root).toEqualHtml(`
      <p-status class="p-status">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-status>
    `);
	});
});
