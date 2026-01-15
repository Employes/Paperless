import { newSpecPage } from '@stencil/core/testing';

import { Backdrop } from '../backdrop.component';

describe('p-backdrop', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Backdrop],
			html: '<p-backdrop></p-backdrop>',
		});
		expect(root).toEqualHtml(`
      <p-backdrop class="p-backdrop">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-backdrop>
    `);
	});
});
