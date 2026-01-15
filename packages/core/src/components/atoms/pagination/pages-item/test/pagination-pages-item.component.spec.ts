import { newSpecPage } from '@stencil/core/testing';

import { PaginationPagesItem } from '../pagination-pages-item.component';

describe('p-pagination-pages-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [PaginationPagesItem],
			html: '<p-pagination-pages-item>#</p-pagination-pages-item>',
		});
		expect(root).toEqualHtml(`
      <p-counter class="p-pagination-pages-item">
        <mock:shadow-root>
          #
        </mock:shadow-root>
      </p-pagination-pages-item>
    `);
	});
});
