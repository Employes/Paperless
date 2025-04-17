import { newSpecPage } from '@stencil/core/testing';
import { Pagination } from '../pagination.component';

describe('p-pagination', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Pagination],
			html: '<p-pagination></p-pagination>',
		});
		expect(root).toEqualHtml(`
      <p-pagination class="p-pagination">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-pagination>
    `);
	});
});
