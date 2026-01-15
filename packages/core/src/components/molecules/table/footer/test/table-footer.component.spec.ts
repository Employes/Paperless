import { newSpecPage } from '@stencil/core/testing';

import { TableFooter } from '../table-footer.component';

describe('p-table-footer', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TableFooter],
			html: '<p-table-footer></p-table-footer>',
		});
		expect(root).toEqualHtml(`
      <p-table-footer class="p-table-footer">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-footer>
    `);
	});
});
