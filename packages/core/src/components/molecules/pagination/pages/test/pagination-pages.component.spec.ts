import { newSpecPage } from '@stencil/core/testing';

import { PaginationPages } from '../pagination-pages.component';

describe('p-pagination-pages', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [PaginationPages],
			html: '<p-pagination-pages></p-pagination-pages>',
		});
		expect(root).toEqualHtml(`
      <p-pagination-pages class="p-pagination-pages">
        <mock:shadow-root>
          #
        </mock:shadow-root>
      </p-pagination-pages>
    `);
	});
});
