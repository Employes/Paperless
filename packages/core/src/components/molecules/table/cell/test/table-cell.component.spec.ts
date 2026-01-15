import { newSpecPage } from '@stencil/core/testing';

import { TableCell } from '../table-cell.component';

describe('p-table-cell', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TableCell],
			html: '<p-table-cell></p-table-cell>',
		});
		expect(root).toEqualHtml(`
      <p-table-cell class="p-table-cell">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-cell>
    `);
	});
});
