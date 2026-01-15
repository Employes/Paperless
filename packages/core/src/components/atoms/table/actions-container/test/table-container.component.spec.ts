import { newSpecPage } from '@stencil/core/testing';

import { TableContainer } from '../table-container.component';

describe('p-table-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TableContainer],
			html: '<p-table-container></p-table-container>',
		});
		expect(root).toEqualHtml(`
      <p-table-container class="p-table-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-container>
    `);
	});
});
