import { newSpecPage } from '@stencil/core/testing';
import { Table } from '../table.component';

describe('p-table', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Table],
			html: '<p-table>#</p-table>',
		});
		expect(root).toEqualHtml(`
      <p-table class="p-table">
        <mock:shadow-root>
          #
        </mock:shadow-root>
      </p-table>
    `);
	});
});
