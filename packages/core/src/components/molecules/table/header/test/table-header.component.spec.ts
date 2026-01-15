import { newSpecPage } from '@stencil/core/testing';

import { TableHeader } from '../table-header.component';

describe('p-table-header', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TableHeader],
			html: '<p-table-header></p-table-header>',
		});
		expect(root).toEqualHtml(`
      <p-table-header class="p-table-header">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-header>
    `);
	});
});
