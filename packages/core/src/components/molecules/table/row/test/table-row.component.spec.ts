import { newSpecPage } from '@stencil/core/testing';
import { TableRow } from '../table-row.component';

describe('p-table-row', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TableRow],
			html: '<p-table-row></p-table-row>',
		});
		expect(root).toEqualHtml(`
      <p-table-row class="p-table-row">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-row>
    `);
	});
});
