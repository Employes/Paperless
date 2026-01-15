import { newSpecPage } from '@stencil/core/testing';

import { PaginationSize } from '../pagination-size.component';

describe('p-pagination-size', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [PaginationSize],
			html: '<p-pagination-size></p-pagination-size>',
		});
		expect(root).toEqualHtml(`
      <p-pagination-size class="p-pagination-size">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-pagination-size>
    `);
	});
});
